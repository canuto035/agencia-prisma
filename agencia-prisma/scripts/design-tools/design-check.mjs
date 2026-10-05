import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';
import Color from 'colorjs.io';
import { optimize } from 'svgo';

const [command, ...args] = process.argv.slice(2);
const usage = `Uso:
  node design-check.mjs inspect <arquivo> [largura-alvo altura-alvo]
  node design-check.mjs contrast <cor-texto> <cor-fundo> [normal|grande]
  node design-check.mjs compare <referencia> <resultado> <saida.png>
  node design-check.mjs optimize-svg <entrada.svg> <saida.svg>

As rotinas fazem verificações técnicas; a inspeção visual e editorial continua obrigatória.`;

function requireArgs(count) {
  if (args.length < count) throw new Error(usage);
}

function positiveInteger(value, label) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) throw new Error(`${label} deve ser inteiro positivo.`);
  return number;
}

async function inspect() {
  requireArgs(1);
  const file = resolve(args[0]);
  const metadata = await sharp(file).metadata();
  const result = {
    arquivo: file,
    formato: metadata.format,
    largura: metadata.width,
    altura: metadata.height,
    canais: metadata.channels,
    perfilCor: metadata.space,
    orientacaoExif: metadata.orientation ?? null,
  };
  if (args.length >= 3) {
    const width = positiveInteger(args[1], 'largura-alvo');
    const height = positiveInteger(args[2], 'altura-alvo');
    result.destino = { largura: width, altura: height };
    result.resolucaoSuficienteSemAmpliar = metadata.width >= width && metadata.height >= height;
  }
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

async function contrast() {
  requireArgs(2);
  const foreground = new Color(args[0]);
  const background = new Color(args[1]);
  if (foreground.alpha !== 1 || background.alpha !== 1) {
    throw new Error('Use cores opacas. Para transparência, avalie a composição final.');
  }
  const ratio = foreground.contrastWCAG21(background);
  const large = args[2] === 'grande';
  if (args[2] && !['normal', 'grande'].includes(args[2])) throw new Error('Tamanho deve ser normal ou grande.');
  const minimum = large ? 3 : 4.5;
  process.stdout.write(`${JSON.stringify({ texto: args[0], fundo: args[1], razao: Number(ratio.toFixed(2)), minimo: minimum, atendeContrasteDeCorPlana: ratio >= minimum }, null, 2)}\n`);
}

async function compare() {
  requireArgs(3);
  const [reference, result, output] = args.map(path => resolve(path));
  if (output === reference || output === result) throw new Error('A saída não pode sobrescrever uma entrada.');
  const width = 800;
  const height = 1000;
  const previews = await Promise.all([reference, result].map(file =>
    sharp(file).rotate().resize(width, height, { fit: 'contain', background: '#ffffff' }).png().toBuffer()
  ));
  await sharp({ create: { width: width * 2, height, channels: 3, background: '#ffffff' } })
    .composite(previews.map((input, index) => ({ input, left: index * width, top: 0 })))
    .png().toFile(output);
  process.stdout.write(`${JSON.stringify({ referencia: reference, resultado: result, previaLadoALado: output, observacao: 'Compare visualmente; esta rotina não mede fidelidade.' }, null, 2)}\n`);
}

async function optimizeSvg() {
  requireArgs(2);
  const [input, output] = args.map(path => resolve(path));
  if (input === output) throw new Error('Preserve o original; a saída deve ter outro nome.');
  if (!input.toLowerCase().endsWith('.svg') || !output.toLowerCase().endsWith('.svg')) throw new Error('Entrada e saída devem ser SVG.');
  const original = await readFile(input, 'utf8');
  const optimized = optimize(original, { path: input, multipass: false, plugins: [{ name: 'preset-default', params: { overrides: { cleanupIds: false } } }] });
  await writeFile(output, optimized.data, 'utf8');
  process.stdout.write(`${JSON.stringify({ original: input, saida: output, bytesAntes: Buffer.byteLength(original), bytesDepois: Buffer.byteLength(optimized.data), observacao: 'Abra e compare as duas versões antes de usar.' }, null, 2)}\n`);
}

try {
  switch (command) {
    case 'inspect': await inspect(); break;
    case 'contrast': await contrast(); break;
    case 'compare': await compare(); break;
    case 'optimize-svg': await optimizeSvg(); break;
    case 'help': process.stdout.write(`${usage}\n`); break;
    default: throw new Error(usage);
  }
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
