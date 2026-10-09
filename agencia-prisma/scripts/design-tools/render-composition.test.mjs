import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, copyFile, readFile, writeFile, mkdir, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { renderComposition } from './render-composition.mjs';

const font = process.env.PRISMA_TEST_FONT ?? 'C:/Windows/Fonts/arial.ttf';
const sampleText = 'Ação & cuidado <script>alert("teste")</script> — 10%';
const clone = object => JSON.parse(JSON.stringify(object));

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'prisma-composition-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'assets'));
  await copyFile(font, join(root, 'assets', 'test.ttf'));
  await sharp({ create: { width: 80, height: 60, channels: 4, background: '#447799' } }).png().toFile(join(root, 'assets', 'image.png'));
  const data = {
    client: 'Cliente de teste', dnaVersion: 'teste-1', width: 320, height: 400,
    fonts: [{ family: 'Teste', weight: 400, style: 'normal', path: 'assets/test.ttf', license: 'Fonte local usada apenas em teste, não distribuída.' }],
    slides: [
      { id: 'abertura', role: 'Abertura', argument: 'Argumento', alt: 'Peça de teste', tree: { type: 'div', props: { style: { display: 'flex', flexDirection: 'column', padding: 20, gap: 12, fontFamily: 'Teste', fontWeight: 400, fontSize: 24, backgroundColor: '#ffffff', color: '#111111' }, children: [{ type: 'div', props: { children: sampleText } }, { type: 'img', props: { src: 'assets/image.png', width: 80, height: 60, alt: 'Retângulo de teste' } }] } } },
      { id: 'fim', tree: { type: 'div', props: { style: { display: 'flex', padding: 20, fontFamily: 'Teste', fontWeight: 400, fontSize: 30, backgroundColor: '#112233', color: '#ffffff' }, children: 'Última página.' } } },
    ],
  };
  const input = join(root, 'composition.json'), output = join(root, 'new-output');
  const save = async value => writeFile(input, JSON.stringify(value, null, 2));
  await save(data);
  return { root, data, input, output, save };
}

test('renderiza dois slides, preserva textos, incorpora ativos e relata hashes/medidas', async t => {
  const f = await fixture(t), original = await readFile(f.input);
  const { report } = await renderComposition(f.input, f.output);
  assert.equal(report.status, 'rendered-awaiting-visual-review');
  assert.deepEqual(report.slides.map(slide => slide.id), ['abertura', 'fim']);
  assert.deepEqual(report.slides[0].texts, [sampleText]);
  assert.equal(report.slides[0].assets[0].path, 'assets/image.png');
  assert.equal(report.slides[0].role, 'Abertura');
  assert.ok(report.slides[0].layout.length > 0);
  assert.ok(report.slides[0].layout.every(n => [n.left, n.top, n.width, n.height].every(Number.isFinite)));
  assert.deepEqual(await readFile(f.input), original);
  for (const record of report.files) {
    const bytes = await readFile(join(f.output, record.name));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), record.sha256);
  }
  const meta = await sharp(join(f.output, '01-abertura.png')).metadata();
  assert.equal(meta.width, 320); assert.equal(meta.height, 400);
  const sheet = await sharp(join(f.output, 'contact-sheet.png')).metadata();
  assert.equal(sheet.width, 480); assert.equal(sheet.height, 330);
  const svg = await readFile(join(f.output, '01-abertura.svg'), 'utf8');
  assert.ok(svg.includes('<path'));
  assert.ok(svg.includes('data:image/png;base64,'));
  assert.ok(!/<script\b|<text\b|https?:\/\/(?!www\.w3\.org)/i.test(svg));
  const saved = JSON.parse(await readFile(join(f.output, 'report.json'), 'utf8'));
  assert.deepEqual(saved.slides[0].texts, [sampleText]);
});

test('bloqueia entrada remota, travessia, SVG externo, código e estilos não permitidos', async t => {
  const f = await fixture(t);
  const cases = [
    [data => { data.fonts[0].path = '../outside.ttf'; }, /travessia/],
    [data => { data.fonts[0].path = font; }, /relativo/],
    [data => { data.slides[0].tree.props.children[1].props.src = 'https://example.com/image.png'; }, /relativo/],
    [data => { data.slides[0].tree.props.children[1].props.src = 'assets/image.svg'; }, /Formato/],
    [data => { data.slides[0].tree.type = 'script'; }, /raiz/],
    [data => { data.slides[0].tree.props.onClick = 'alert(1)'; }, /campo não permitido/],
    [data => { data.slides[0].tree.props.style.backgroundImage = 'url(https://example.com)'; }, /Estilo não permitido/],
    [data => { data.slides[0].tree.props.dangerouslySetInnerHTML = '<svg/>'; }, /campo não permitido/],
    [data => { data.width = 99999; }, /inteiro/],
  ];
  for (const [change, expected] of cases) {
    const data = clone(f.data); change(data); await f.save(data);
    await assert.rejects(renderComposition(f.input, f.output), expected);
  }
});

test('recusa fonte ausente e face não carregada em vez de substituir família/peso', async t => {
  const f = await fixture(t);
  const missing = clone(f.data); missing.fonts[0].path = 'assets/missing.ttf';
  await f.save(missing); await assert.rejects(renderComposition(f.input, f.output), /ENOENT/);
  for (const [key, value] of [['fontFamily', 'OutraFonte'], ['fontWeight', 700], ['fontStyle', 'italic']]) {
    const data = clone(f.data); data.slides[0].tree.props.style[key] = value;
    await f.save(data); await assert.rejects(renderComposition(f.input, f.output), /face solicitada não carregada/);
  }
});

test('recusa destino existente e preserva seus arquivos', async t => {
  const f = await fixture(t); await mkdir(f.output);
  await writeFile(join(f.output, 'original.txt'), 'preservar');
  await assert.rejects(renderComposition(f.input, f.output), /EEXIST/);
  assert.equal(await readFile(join(f.output, 'original.txt'), 'utf8'), 'preservar');
});

test('recusa diretório de ativos ligado por symlink/junction', async t => {
  const f = await fixture(t), link = join(f.root, 'linked');
  try { await symlink(join(f.root, 'assets'), link, process.platform === 'win32' ? 'junction' : 'dir'); }
  catch (error) { if (['EPERM', 'EACCES'].includes(error.code)) { t.skip('O sistema não permite criar symlink de teste.'); return; } throw error; }
  f.data.fonts[0].path = 'linked/test.ttf'; await f.save(f.data);
  await assert.rejects(renderComposition(f.input, f.output), /simbólicos/);
});

test('marca transbordamento para revisão visual', async t => {
  const f = await fixture(t);
  f.data.slides[0].tree.props.children = [{ type: 'div', props: { style: { position: 'absolute', left: 310, top: 0, width: 100, height: 100 }, children: 'Fora' } }];
  await f.save(f.data);
  const { report } = await renderComposition(f.input, f.output);
  assert.ok(report.slides[0].warnings.some(value => value.includes('limites da tela')));
});

test('inclui padding no canvas e quebra texto longo dentro das margens', async t => {
  const f = await fixture(t);
  const longText = 'Texto aprovado pelo cliente, com acentos e pontuação, para conferir a quebra de linhas dentro da margem.';
  f.data.slides = [f.data.slides[0]];
  const root = f.data.slides[0].tree;
  root.props.style.lineHeight = 1.25;
  root.props.children = [{ type: 'div', props: { children: longText } }];
  await f.save(f.data);
  const { report } = await renderComposition(f.input, f.output);
  const slide = report.slides[0], canvas = slide.layout[0];
  assert.equal(canvas.width, f.data.width);
  assert.equal(canvas.height, f.data.height);
  const textBox = slide.layout.find(node => node.text === longText);
  assert.ok(textBox, 'O bloco de texto precisa constar na medição.');
  assert.ok(textBox.height >= 60, 'O texto longo precisa ocupar pelo menos duas linhas.');
  assert.ok(textBox.left >= 20 && textBox.left + textBox.width <= f.data.width - 20);
  assert.ok(textBox.top >= 20 && textBox.top + textBox.height <= f.data.height - 20);
  assert.deepEqual(slide.warnings, []);
  const png = sharp(join(f.output, slide.png));
  const metadata = await png.metadata();
  assert.equal(metadata.width, f.data.width); assert.equal(metadata.height, f.data.height);
  const margin = await png.extract({ left: f.data.width - 20, top: 0, width: 20, height: f.data.height }).ensureAlpha().raw().toBuffer();
  assert.ok(margin.every(channel => channel === 255), 'A margem direita deve continuar branca, sem texto cortado sobre ela.');
});

test('preserva content-box explícito e avisa quando padding amplia a raiz além do canvas', async t => {
  const f = await fixture(t);
  f.data.slides = [f.data.slides[0]];
  f.data.slides[0].tree.props.style.boxSizing = 'content-box';
  await f.save(f.data);
  const { report } = await renderComposition(f.input, f.output);
  assert.equal(report.slides[0].layout[0].width, f.data.width + 40);
  assert.equal(report.slides[0].layout[0].height, f.data.height + 40);
  assert.ok(report.slides[0].warnings.some(value => value.includes('limites da tela')));
});

test('exemplo distribuído quebra o parágrafo e renderiza sem transbordamento', async t => {
  const f = await fixture(t);
  const example = JSON.parse(await readFile(new URL('./composition.example.json', import.meta.url), 'utf8'));
  example.fonts[0].path = 'assets/test.ttf';
  example.fonts[0].license = 'Fonte local de teste; não distribuída.';
  await f.save(example);
  const { report } = await renderComposition(f.input, f.output);
  for (const slide of report.slides) {
    assert.deepEqual(slide.warnings, []);
    assert.equal(slide.layout[0].width, example.width);
    assert.equal(slide.layout[0].height, example.height);
  }
  const body = report.slides[0].layout.find(node => node.text?.startsWith('Texto literal da peça'));
  assert.ok(body && body.height > 34 * 1.4, 'O parágrafo do exemplo precisa quebrar em mais de uma linha.');
  assert.ok(body.left >= 80 && body.left + body.width <= example.width - 80);
});

test('falha de glifo é explícita no relatório, sem considerar o lote aprovado', async t => {
  const f = await fixture(t);
  f.data.slides[0].tree.props.children = 'Glifo: \u{10FFFF}'; await f.save(f.data);
  await assert.rejects(renderComposition(f.input, f.output), /Glifo sem fonte/);
  const report = JSON.parse(await readFile(join(f.output, 'report.json'), 'utf8'));
  assert.equal(report.status, 'failed');
  assert.match(report.error, /Glifo sem fonte/);
});
