import { readFile, writeFile, mkdir, lstat, realpath } from 'node:fs/promises';
import { dirname, resolve, relative, isAbsolute, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import satori from 'satori';
import sharp from 'sharp';

const LIMITS = { input: 2 * 1024 ** 2, file: 20 * 1024 ** 2, side: 4096, pixels: 16_000_000, slides: 24, nodes: 300, depth: 24, text: 20_000 };
const require = createRequire(import.meta.url);
const hash = data => createHash('sha256').update(data).digest('hex');
const fail = message => { throw new Error(message); };
const plain = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const own = (value, key) => Object.hasOwn(value, key);
const escapeXml = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);
const faces = font => `${font.family}\u0000${font.weight}\u0000${font.style ?? 'normal'}`;

function keys(value, allowed, label) {
  if (!plain(value)) fail(`${label}: esperado objeto.`);
  for (const key of Object.keys(value)) if (!allowed.includes(key)) fail(`${label}: campo não permitido: ${key}.`);
}
function text(value, label, maximum = 300) {
  if (typeof value !== 'string' || !value.trim() || value.length > maximum || /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(value)) fail(`${label}: texto inválido.`);
  return value;
}
function positive(value, label, maximum = LIMITS.side) {
  if (!Number.isInteger(value) || value < 1 || value > maximum) fail(`${label}: inteiro entre 1 e ${maximum}.`);
  return value;
}
async function smallFile(path, maximum) {
  const info = await lstat(path);
  if (!info.isFile() || info.isSymbolicLink() || info.size > maximum) fail(`Arquivo inválido, link ou muito grande: ${path}`);
  const data = await readFile(path);
  if (data.length > maximum) fail(`Arquivo muito grande: ${path}`);
  return data;
}
async function localFile(root, name, extensions) {
  if (typeof name !== 'string' || !name || name.length > 512 || /[:\x00]/.test(name) || isAbsolute(name)) fail('Ativo deve usar caminho local relativo.');
  const segments = name.replaceAll('\\', '/').split('/');
  if (segments.some(part => !part || part === '.' || part === '..')) fail('Caminho de ativo contém travessia ou segmento inválido.');
  const target = resolve(root, ...segments);
  if (!extensions.includes(extname(target).toLowerCase())) fail(`Formato de ativo não permitido: ${name}`);
  let cursor = root;
  for (const part of segments) {
    cursor = resolve(cursor, part);
    if ((await lstat(cursor)).isSymbolicLink()) fail(`Links simbólicos não são permitidos: ${name}`);
  }
  const actual = await realpath(target);
  const rel = relative(root, actual);
  if (!rel || rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) fail(`Ativo fora da pasta da composição: ${name}`);
  return { path: actual, data: await smallFile(actual, LIMITS.file) };
}

const enums = {
  display: ['flex', 'block', 'inline', 'inline-block', 'none'], position: ['relative', 'absolute'],
  flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'], flexWrap: ['wrap', 'nowrap'],
  justifyContent: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
  alignItems: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'], alignSelf: ['auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
  textAlign: ['left', 'right', 'center', 'justify'], fontStyle: ['normal', 'italic'],
  whiteSpace: ['normal', 'pre', 'pre-wrap'], wordBreak: ['normal', 'break-all', 'break-word'],
  objectFit: ['contain', 'cover', 'fill'], overflow: ['visible', 'hidden'],
  borderStyle: ['solid', 'dashed', 'dotted'], boxSizing: ['border-box', 'content-box'],
};
const lengths = new Set(('width height minWidth minHeight maxWidth maxHeight top left right bottom gap rowGap columnGap padding paddingTop paddingRight paddingBottom paddingLeft margin marginTop marginRight marginBottom marginLeft borderWidth borderTopWidth borderRightWidth borderBottomWidth borderLeftWidth borderRadius borderTopLeftRadius borderTopRightRadius borderBottomLeftRadius borderBottomRightRadius flexBasis').split(' '));
const numbers = new Set(['fontSize', 'lineHeight', 'letterSpacing', 'opacity', 'flexGrow', 'flexShrink', 'zIndex', 'order']);
const colors = new Set(['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor']);

function style(input = {}) {
  if (!plain(input)) fail('style deve ser objeto.');
  const result = {};
  for (const [key, value] of Object.entries(input)) {
    if (own(enums, key)) {
      if (!enums[key].includes(value)) fail(`Valor de estilo inválido: ${key}.`);
    } else if (lengths.has(key)) {
      if (!(typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 8192) && !(typeof value === 'string' && /^(?:100|\d{1,2})(?:\.\d{1,2})?%$/.test(value) && parseFloat(value) <= 100)) fail(`Comprimento inválido: ${key}. Use pixels numéricos ou percentual de 0 a 100.`);
    } else if (colors.has(key)) {
      if (typeof value !== 'string' || !/^(?:#[\da-f]{3}|#[\da-f]{4}|#[\da-f]{6}|#[\da-f]{8}|transparent)$/i.test(value)) fail(`Cor inválida: ${key}. Use hexadecimal ou transparent.`);
    } else if (numbers.has(key)) {
      if (typeof value !== 'number' || !Number.isFinite(value) || Math.abs(value) > 8192) fail(`Número de estilo inválido: ${key}.`);
      if (['fontSize', 'lineHeight'].includes(key) && (value <= 0 || value > (key === 'fontSize' ? 1024 : 10))) fail(`Valor fora do limite: ${key}.`);
      if (['flexGrow', 'flexShrink', 'opacity'].includes(key) && value < 0) fail(`Valor negativo: ${key}.`);
      if (key === 'opacity' && value > 1) fail('opacity deve estar entre 0 e 1.');
    } else if (key === 'fontFamily') {
      text(value, 'fontFamily', 100);
      if (!/^[\p{L}\p{N} _-]+$/u.test(value)) fail('Use uma única família de fonte, sem lista de fallback.');
    } else if (key === 'fontWeight') {
      if (!Number.isInteger(value) || value < 100 || value > 900 || value % 100) fail('fontWeight deve ser 100, 200, ..., 900.');
    } else fail(`Estilo não permitido: ${key}.`);
    result[key] = value;
  }
  return result;
}

async function prepare(manifest, root) {
  keys(manifest, ['client', 'dnaVersion', 'width', 'height', 'fonts', 'slides'], 'Composição');
  text(manifest.client, 'client'); text(manifest.dnaVersion, 'dnaVersion');
  const width = positive(manifest.width, 'width'), height = positive(manifest.height, 'height');
  if (width * height > LIMITS.pixels) fail('Área da composição excede 16 milhões de pixels.');
  if (!Array.isArray(manifest.fonts) || !manifest.fonts.length || manifest.fonts.length > 12) fail('Declare entre 1 e 12 fontes.');
  if (!Array.isArray(manifest.slides) || !manifest.slides.length || manifest.slides.length > LIMITS.slides) fail('Declare entre 1 e 24 slides.');
  const loaded = [], fontReport = [], faceSet = new Set(), imageCache = new Map(), ids = new Set();
  let fontBytes = 0, imageBytes = 0;
  for (const font of manifest.fonts) {
    keys(font, ['family', 'weight', 'style', 'path', 'license'], 'Fonte');
    const checked = style({ fontFamily: font.family, fontWeight: font.weight, fontStyle: font.style ?? 'normal' });
    text(font.license, 'Declaração de licença da fonte', 1000);
    const face = faces(font);
    if (faceSet.has(face)) fail('Face de fonte duplicada.');
    faceSet.add(face);
    const file = await localFile(root, font.path, ['.ttf', '.otf', '.woff']);
    fontBytes += file.data.length;
    if (fontBytes > 60 * 1024 ** 2) fail('Fontes excedem 60 MiB no total.');
    loaded.push({ name: checked.fontFamily, weight: checked.fontWeight, style: checked.fontStyle, data: file.data });
    fontReport.push({ ...font, style: checked.fontStyle, sha256: hash(file.data), bytes: file.data.length });
  }
  const prepared = [];
  for (const slide of manifest.slides) {
    keys(slide, ['id', 'role', 'argument', 'alt', 'tree'], 'Slide');
    if (typeof slide.id !== 'string' || !/^[a-z0-9][a-z0-9-]{0,39}$/.test(slide.id) || ids.has(slide.id)) fail('id deve ser único e conter até 40 letras minúsculas, números ou hífens.');
    ids.add(slide.id);
    for (const label of ['role', 'argument', 'alt']) if (own(slide, label)) text(slide[label], label, 3000);
    const texts = [], usedImages = new Set(); let count = 0, characters = 0;
    async function node(value, inherited = { fontStyle: 'normal' }, depth = 0) {
      if (++count > LIMITS.nodes || depth > LIMITS.depth) fail('Árvore excede o limite de nós ou profundidade.');
      if (typeof value === 'string') {
        if (/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(value)) fail('Texto contém caracteres de controle inválidos.');
        characters += value.length;
        if (characters > LIMITS.text) fail('Texto do slide excede o limite.');
        if (!faceSet.has(faces({ family: inherited.fontFamily, weight: inherited.fontWeight, style: inherited.fontStyle })) || !inherited.fontSize) fail('Todo texto precisa de fontFamily, fontWeight e fontSize válidos; face solicitada não carregada ou tamanho ausente.');
        texts.push(value); return value;
      }
      keys(value, ['type', 'props'], 'Nó');
      if (!['div', 'span', 'p', 'img'].includes(value.type)) fail('Tag não permitida. Use div, span, p ou img.');
      keys(value.props, value.type === 'img' ? ['style', 'src', 'width', 'height', 'alt'] : ['style', 'children'], 'Props');
      const checked = style(value.props.style);
      const effective = { ...inherited, ...checked };
      const props = { style: checked };
      if (value.type === 'img') {
        positive(value.props.width, 'Largura da imagem'); positive(value.props.height, 'Altura da imagem');
        const src = value.props.src;
        if (!imageCache.has(src)) {
          if (imageCache.size >= 32) fail('A composição excede 32 imagens diferentes.');
          const file = await localFile(root, src, ['.png', '.jpg', '.jpeg', '.webp']);
          const meta = await sharp(file.data, { limitInputPixels: 40_000_000 }).metadata();
          if (!['png', 'jpeg', 'webp'].includes(meta.format) || (meta.pages ?? 1) > 1) fail('Imagem precisa ser raster PNG, JPEG ou WebP estático.');
          const rendered = await sharp(file.data, { limitInputPixels: 40_000_000 }).rotate().png().toBuffer({ resolveWithObject: true });
          imageBytes += rendered.data.length;
          if (imageBytes > 60 * 1024 ** 2) fail('Imagens PNG embutidas excedem 60 MiB no total.');
          imageCache.set(src, { uri: `data:image/png;base64,${rendered.data.toString('base64')}`, record: { path: src, sha256: hash(file.data), width: rendered.info.width, height: rendered.info.height, bytes: file.data.length } });
        }
        usedImages.add(src);
        Object.assign(props, { src: imageCache.get(src).uri, width: value.props.width, height: value.props.height });
        if (own(value.props, 'alt')) props.alt = text(value.props.alt, 'alt da imagem', 3000);
      } else {
        const children = value.props.children ?? [];
        if (!(typeof children === 'string' || Array.isArray(children) || plain(children))) fail('children deve ser texto, nó ou lista de textos/nós.');
        if (Array.isArray(children)) {
          props.children = [];
          for (const child of children) props.children.push(await node(child, effective, depth + 1));
        } else props.children = await node(children, effective, depth + 1);
      }
      return { type: value.type, props };
    }
    if (slide.tree?.type !== 'div') fail('A raiz de cada slide deve ser div.');
    const tree = await node(slide.tree);
    for (const [key, expected] of Object.entries({ width, height })) {
      if (own(tree.props.style, key) && tree.props.style[key] !== expected && tree.props.style[key] !== '100%') fail(`A raiz deve usar ${key} igual à dimensão da composição.`);
      tree.props.style[key] = expected;
    }
    if (!own(tree.props.style, 'boxSizing')) tree.props.style.boxSizing = 'border-box';
    prepared.push({ ...slide, tree, texts, assets: [...usedImages].map(src => imageCache.get(src).record) });
  }
  return { width, height, loaded, fontReport, prepared };
}

export async function renderComposition(input, destination) {
  const source = resolve(input), output = resolve(destination);
  const raw = await smallFile(source, LIMITS.input);
  const manifest = JSON.parse(raw.toString('utf8'));
  const root = await realpath(dirname(source));
  const { width, height, loaded, fontReport, prepared } = await prepare(manifest, root);
  // mkdir is deliberately non-recursive: an existing destination is never reused.
  await mkdir(output);
  const report = {
    status: 'rendering', client: manifest.client, dnaVersion: manifest.dnaVersion,
    renderer: { satori: require('satori/package.json').version, sharp: sharp.versions.sharp, librsvg: sharp.versions.rsvg, node: process.versions.node, embedFont: true },
    source: { path: source, sha256: hash(raw) }, width, height, fonts: fontReport,
    notes: ['O JSON de entrada é o mestre. SVG exportado usa contornos de glifos, não texto editável.', 'A face solicitada precisa estar carregada, mas Satori pode obter um glifo ausente em outra fonte carregada. Confira visualmente a tipografia; esta rotina não certifica a origem de cada glifo.', 'Licenças são declarações de entrada; esta ferramenta não verifica os direitos de uso.', 'Medidas detectam limites da tela; não comprovam ausência de corte interno nem qualidade visual.', 'Imagens são recodificadas em PNG com orientação EXIF aplicada; não há retoque automático.'],
    slides: [], files: [],
  };
  const save = async (name, buffer) => {
    await writeFile(resolve(output, name), buffer, { flag: 'wx' });
    report.files.push({ name, bytes: Buffer.byteLength(buffer), sha256: hash(buffer) });
  };
  try {
    const thumbs = [], thumbWidth = 240, thumbHeight = Math.min(600, Math.max(60, Math.round(240 * height / width))), labelHeight = 30;
    for (const [index, slide] of prepared.entries()) {
      const layout = [];
      const svg = await satori(slide.tree, {
        width, height, fonts: loaded, embedFont: true,
        loadAdditionalAsset: async (_language, segment) => { fail(`Glifo sem fonte local carregada: ${segment}`); },
        onNodeDetected: node => layout.push({ type: node.type, left: node.left, top: node.top, width: node.width, height: node.height, ...(node.textContent === undefined ? {} : { text: node.textContent }) }),
      });
      const name = `${String(index + 1).padStart(2, '0')}-${slide.id}`;
      const png = await sharp(Buffer.from(svg), { limitInputPixels: LIMITS.pixels }).png().toBuffer();
      await save(`${name}.svg`, svg); await save(`${name}.png`, png);
      const outside = layout.filter(n => n.left < -0.5 || n.top < -0.5 || n.left + n.width > width + 0.5 || n.top + n.height > height + 0.5);
      report.slides.push({ order: index + 1, id: slide.id, role: slide.role ?? null, argument: slide.argument ?? null, alt: slide.alt ?? null, texts: slide.texts, assets: slide.assets, layout, warnings: outside.length ? [`${outside.length} nós ultrapassam os limites da tela; revisar o slide.`] : [], svg: `${name}.svg`, png: `${name}.png` });
      const preview = await sharp(png).resize(thumbWidth, thumbHeight, { fit: 'contain', background: '#ffffff' }).png().toBuffer();
      const label = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${thumbWidth}" height="${labelHeight}"><rect width="100%" height="100%" fill="#ffffff"/><text x="8" y="20" font-size="12" fill="#222222">${escapeXml(name)}</text></svg>`);
      thumbs.push(await sharp({ create: { width: thumbWidth, height: thumbHeight + labelHeight, channels: 4, background: '#ffffff' } }).composite([{ input: preview, top: 0, left: 0 }, { input: label, top: thumbHeight, left: 0 }]).png().toBuffer());
    }
    const columns = Math.min(4, thumbs.length), rows = Math.ceil(thumbs.length / columns), cellHeight = thumbHeight + labelHeight;
    const contact = await sharp({ create: { width: columns * thumbWidth, height: rows * cellHeight, channels: 4, background: '#eeeeee' } }).composite(thumbs.map((input, i) => ({ input, left: (i % columns) * thumbWidth, top: Math.floor(i / columns) * cellHeight }))).png().toBuffer();
    await save('contact-sheet.png', contact);
    report.status = 'rendered-awaiting-visual-review';
  } catch (error) {
    report.status = 'failed'; report.error = error.message;
    await writeFile(resolve(output, 'report.json'), JSON.stringify(report, null, 2), { flag: 'wx' });
    throw error;
  }
  await writeFile(resolve(output, 'report.json'), JSON.stringify(report, null, 2), { flag: 'wx' });
  return { output, report };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 4) fail('Uso: node render-composition.mjs <composicao.json> <pasta-nova>');
    const result = await renderComposition(process.argv[2], process.argv[3]);
    process.stdout.write(`${JSON.stringify({ output: result.output, status: result.report.status, slides: result.report.slides.length, report: resolve(result.output, 'report.json') }, null, 2)}\n`);
  } catch (error) { process.stderr.write(`${error.message}\n`); process.exitCode = 1; }
}
