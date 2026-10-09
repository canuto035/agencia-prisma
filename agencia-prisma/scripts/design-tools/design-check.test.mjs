import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const cli = fileURLToPath(new URL('./design-check.mjs', import.meta.url));
const run = (...args) => spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' });

test('inspeção usa dimensões após orientação EXIF para avaliar resolução', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'prisma-exif-'));
  const path = join(dir, 'vertical.jpg');
  await sharp({ create: { width: 80, height: 40, channels: 3, background: '#224477' } }).jpeg().withMetadata({ orientation: 6 }).toFile(path);
  const result = run('inspect', path, '40', '80');
  assert.equal(result.status, 0, result.stderr);
  const data = JSON.parse(result.stdout);
  assert.deepEqual(data.dimensoesAposOrientacao, { largura: 40, altura: 80 });
  assert.equal(data.resolucaoSuficienteSemAmpliar, true);
  assert.equal(run('inspect', path, '40').status, 1);
});

test('comparação e otimização não sobrescrevem saída já existente', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'prisma-preservacao-'));
  const image = join(dir, 'entrada.png');
  const preview = join(dir, 'previa.png');
  const svg = join(dir, 'original.svg');
  const optimized = join(dir, 'otimizado.svg');
  await sharp({ create: { width: 24, height: 32, channels: 3, background: '#ffffff' } }).png().toFile(image);
  await writeFile(svg, '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32"><rect width="24" height="32" fill="red"/></svg>');
  await writeFile(preview, 'arquivo aprovado');
  await writeFile(optimized, 'mestre aprovado');
  assert.equal(run('compare', image, image, preview).status, 1);
  assert.equal(run('optimize-svg', svg, optimized).status, 1);
  assert.equal(await readFile(preview, 'utf8'), 'arquivo aprovado');
  assert.equal(await readFile(optimized, 'utf8'), 'mestre aprovado');
  const fresh = join(dir, 'comparacao-nova.png');
  assert.equal(run('compare', image, image, fresh).status, 0);
  const metadata = await sharp(fresh).metadata();
  assert.equal(metadata.width, 1600);
  assert.equal(metadata.height, 1000);
});
