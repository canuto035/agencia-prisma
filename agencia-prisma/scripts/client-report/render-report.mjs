import { readFile, writeFile, realpath, stat } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text = (v, key) => { if (typeof v !== 'string' || !v.trim() || v.length > 12000) throw new Error(`Texto ausente ou inválido: ${key}`); };
const list = (v, key, max = 100) => { if (!Array.isArray(v) || v.length > max) throw new Error(`Lista inválida: ${key}`); };
const safeUrl = v => { if (!v) return ''; const u = new URL(v); if (!['https:', 'http:'].includes(u.protocol) || u.username || u.password) throw new Error('Fonte deve usar URL HTTP(S) sem credenciais'); return u.href; };
const id = v => { if (typeof v !== 'string' || !/^[a-zA-Z0-9-]{1,50}$/.test(v)) throw new Error('ID inválido'); return v; };

export function validate(report) {
  if (!report || typeof report !== 'object') throw new Error('Relatório inválido');
  for (const k of ['client','title','date','summary','goal','nextStep']) text(report[k], k);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(report.date) || Number.isNaN(Date.parse(report.date)) || new Date(report.date).toISOString().slice(0,10) !== report.date) throw new Error('Data inválida');
  if (typeof report.demo !== 'boolean') throw new Error('Declare demo: true ou false');
  for (const k of ['coverage','evidence','improvements','comparisons','content','roadmap']) list(report[k], k);
  if (!report.coverage.length || !report.evidence.length || !report.improvements.length) throw new Error('Cobertura, evidências e melhorias são necessárias');
  if (report.limits !== undefined) { list(report.limits, 'limits'); report.limits.forEach(x => text(x,'limits')); }
  const seen = new Set();
  for (const e of report.evidence) {
    id(e.id); if (seen.has(e.id)) throw new Error('ID de evidência duplicado'); seen.add(e.id);
    for (const k of ['label','detail','date','kind']) text(e[k], `evidence.${k}`);
    if (!['observado','relato','dado','hipótese','demonstração'].includes(e.kind)) throw new Error('Tipo de evidência inválido');
    if (e.kind === 'demonstração' && !report.demo) throw new Error('Remova dados de demonstração do relatório real');
    if (e.kind === 'observado' && !e.url && !e.artifact) throw new Error('Observação requer URL ou identificação do artefato');
    if (e.url) safeUrl(e.url);
  }
  const refs = item => {
    list(item.evidence, 'evidence IDs');
    if (!item.evidence.length || item.evidence.some(x => !seen.has(x))) throw new Error('Item sem evidência válida');
  };
  for (const c of report.coverage) {
    text(c.area,'coverage.area'); text(c.detail,'coverage.detail');
    if (!['observado','parcial','indisponível','demonstração'].includes(c.state)) throw new Error('Estado de cobertura inválido');
    if (c.state === 'demonstração' && !report.demo) throw new Error('Cobertura fictícia no relatório real');
  }
  const findings = new Set();
  for (const i of report.improvements) {
    id(i.id); if (findings.has(i.id)) throw new Error('ID de melhoria duplicado'); findings.add(i.id); refs(i);
    for (const k of ['title','before','after','reason','owner','verify','effort']) text(i[k], `improvements.${k}`);
    if (!['Agora','Próximo','Depois'].includes(i.priority)) throw new Error('Prioridade inválida');
  }
  for (const c of report.comparisons) {
    text(c.title, 'comparison.title'); refs(c);
    if (c.status !== 'proposta') throw new Error('Este renderer compara antes e proposta; resultados implementados exigem documentação própria');
    if (!report.demo && !c.evidence.some(x => ['observado','dado'].includes(report.evidence.find(e => e.id === x).kind))) throw new Error('Antes precisa de trecho/captura ou dado efetivamente observado');
    for (const [side, data] of [['before',c.before],['after',c.after]]) {
      if (!data) throw new Error(`Comparação sem ${side}`);
      for (const k of ['title','body']) text(data[k], `${side}.${k}`);
      if (data.image) text(data.alt, `${side}.alt`);
    }
    list(c.changes,'comparison.changes'); c.changes.forEach(x => text(x,'change'));
  }
  for (const c of report.content) {
    refs(c); for (const k of ['format','title','insight']) text(c[k], `content.${k}`);
    if (c.status !== 'proposta') throw new Error('Amostra deve ser identificada como proposta');
    list(c.frames,'content.frames',40);
    if (!c.frames.length) throw new Error('Amostra vazia');
    for (const f of c.frames) for (const k of ['label','text','visual']) text(f[k], `frame.${k}`);
  }
  for (const r of report.roadmap) for (const k of ['phase','action','owner','check']) text(r[k], `roadmap.${k}`);
  if (report.brand?.accent && !/^#[a-f0-9]{6}$/i.test(report.brand.accent)) throw new Error('Accent deve ser cor hexadecimal de 6 dígitos');
  return report;
}

async function imageData(file, folder) {
  if (path.isAbsolute(file)) throw new Error('Imagens devem estar dentro da pasta do JSON');
  const root = await realpath(folder), target = await realpath(path.resolve(folder,file));
  const relative = path.relative(root,target);
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) throw new Error('Imagem fora da pasta do relatório');
  if ((await stat(target)).size > 5 * 1024 * 1024) throw new Error('Imagem excede 5 MB');
  const bytes = await readFile(target);
  let mime;
  if (bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) mime = 'image/png';
  else if (bytes[0]===255 && bytes[1]===216 && bytes[2]===255) mime = 'image/jpeg';
  else if (bytes.toString('ascii',0,4)==='RIFF' && bytes.toString('ascii',8,12)==='WEBP') mime = 'image/webp';
  else throw new Error('Imagem precisa ser PNG, JPEG ou WebP; SVG não é embutido');
  return `data:${mime};base64,${bytes.toString('base64')}`;
}

export async function render(report, folder) {
  validate(report);
  let total = 0;
  const images = new Map();
  for (const c of report.comparisons) for (const side of [c.before,c.after]) if (side.image) {
    if (!images.has(side.image)) { const data = await imageData(side.image,folder); total += data.length; if(total > 28 * 1024 * 1024) throw new Error('Imagens embutidas excedem 20 MB aproximados'); images.set(side.image,data); }
  }
  const sources = ids => `<div class="sources">${ids.map(x => `<a href="#evidence-${id(x)}">${esc(x)}</a>`).join('')}</div>`;
  const panel = (v, side) => `<article class="panel ${side}"><div class="panel-top"><span>${side==='before' ? (report.demo?'Exemplo de versão atual':'Antes · referência registrada') : 'Depois · proposta'}</span><span>${esc(v.eyebrow || report.client)}</span></div>${v.image ? `<img src="${images.get(v.image)}" alt="${esc(v.alt)}" loading="lazy">` : ''}<div class="panel-copy"><h3>${esc(v.title)}</h3><p>${esc(v.body)}</p>${v.cta ? `<span class="mock-cta">${esc(v.cta)}</span>`:''}</div></article>`;
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="referrer" content="no-referrer"><title>${esc(report.client)} — ${esc(report.title)}</title>
<style>
:root{--paper:#f5f2eb;--ink:#21352f;--muted:#5d6863;--accent:${report.brand?.accent || '#98482e'};--line:#d2d7cb;--white:#fffefa}*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:100px}body{margin:0;background:var(--paper);color:var(--ink);font-family:Arial,Helvetica,sans-serif;line-height:1.6}a{color:inherit;text-underline-offset:4px}button{font:inherit;cursor:pointer}button,a{touch-action:manipulation}a:focus-visible,button:focus-visible,summary:focus-visible{outline:3px solid var(--accent);outline-offset:5px}p,h1,h2,h3{margin:0}p{white-space:pre-line}h1,h2{font-family:Georgia,'Times New Roman',serif;font-weight:400;letter-spacing:-.045em;line-height:1.05}h1{font-size:clamp(3rem,6.4vw,6.1rem);max-width:870px}h2{font-size:clamp(2.1rem,4vw,3.7rem)}h3{font-size:1.2rem;line-height:1.25}.wrap{max-width:1200px;margin:auto;padding:0 36px}.eyebrow{text-transform:uppercase;font-size:.72rem;letter-spacing:.18em;font-weight:700}.skip{position:absolute;left:-9999px}.skip:focus{left:20px;top:20px;background:white;padding:15px;z-index:10}.demo{padding:12px 25px;background:#eadac4;text-align:center;font-size:.85rem}.nav{border-bottom:1px solid var(--line)}.nav-inner{min-height:82px;display:flex;align-items:center;justify-content:space-between;gap:20px}.wordmark{display:flex;align-items:center;gap:12px;font-weight:700;letter-spacing:-.02em}.mark{width:26px;height:26px;border:1px solid var(--ink);transform:rotate(45deg);display:inline-block}.nav-links{display:flex;gap:23px;font-size:.8rem;flex-wrap:wrap}.nav-links a{text-decoration:none}.hero{padding:80px 0 64px}.hero .eyebrow{margin-bottom:26px}.hero h1 span{color:var(--accent)}.lead{font-size:1.12rem;max-width:760px;color:var(--muted);margin-top:28px}.hero-foot{display:flex;justify-content:space-between;gap:25px;align-items:end;border-top:1px solid var(--line);margin-top:44px;padding-top:24px}.goal{max-width:660px}.goal p{margin-top:8px;font-size:1rem}.jump{display:inline-block;border:1px solid var(--ink);padding:13px 20px;text-decoration:none;white-space:nowrap;font-size:.86rem}section{padding:62px 0;border-top:1px solid var(--line)}.section-head{display:grid;grid-template-columns:110px 1fr;gap:20px;margin-bottom:34px}.number{font:italic 2rem Georgia;color:var(--accent)}.section-head p{color:var(--muted);margin-top:16px;max-width:650px}.coverage{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.coverage article{border:1px solid var(--line);padding:24px;background:var(--white)}.badge{display:inline-block;padding:3px 8px;background:#e4e9df;font-size:.71rem;text-transform:uppercase;letter-spacing:.07em;margin-bottom:13px}.coverage h3{margin-bottom:8px}.coverage p{font-size:.88rem;color:var(--muted)}.limits{margin-top:20px;color:var(--muted);font-size:.85rem}.filters{display:flex;gap:8px;margin-bottom:22px;flex-wrap:wrap}.filters button,.controls button{border:1px solid var(--line);background:transparent;padding:10px 15px;font-size:.85rem}.filters button[aria-pressed=true],.controls button[aria-pressed=true]{background:var(--ink);color:white;border-color:var(--ink)}.findings{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.finding{background:var(--white);padding:30px;border:1px solid var(--line)}.finding header{display:flex;justify-content:space-between;gap:16px;margin-bottom:17px}.finding .tag{font-size:.75rem;color:var(--muted)}.finding h3{margin-bottom:20px;font-size:1.5rem;font-family:Georgia;font-weight:400}.finding dl{margin:0}.finding dt{font-size:.7rem;text-transform:uppercase;letter-spacing:.1em;font-weight:700;margin-top:15px}.finding dd{margin:4px 0 0;font-size:.94rem}.finding .check{border-top:1px solid var(--line);margin-top:20px;padding-top:16px;font-size:.86rem;color:var(--muted)}.sources{display:flex;gap:8px;margin-top:16px;font-size:.73rem}.sources a{border:1px solid var(--line);padding:2px 7px}.compare{margin-bottom:36px}.compare-title{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-bottom:17px}.compare-title h3{font:1.55rem Georgia}.controls{display:flex;gap:5px;flex-wrap:wrap}.panels{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.panel{border:1px solid var(--line);background:#e9e9e2;overflow:hidden}.panel.after{background:var(--ink);color:var(--white)}.panel-top{display:flex;justify-content:space-between;gap:12px;padding:18px 22px;border-bottom:1px solid #a6b4a64d;font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;flex-wrap:wrap}.panel img{width:100%;height:auto;display:block}.panel-copy{padding:36px;min-height:230px}.panel-copy h3{font:clamp(1.65rem,2.4vw,2.5rem)/1.12 Georgia;letter-spacing:-.02em;margin-bottom:20px;max-width:460px}.panel-copy p{font-size:.95rem;max-width:470px}.mock-cta{display:inline-block;padding:10px 17px;border:1px solid currentColor;margin-top:25px;font-size:.8rem}.after .mock-cta{background:#eedbb9;color:var(--ink);border-color:#eedbb9}.compare[data-mode=before] .after,.compare[data-mode=after] .before{display:none}.compare[data-mode=before] .panels,.compare[data-mode=after] .panels{grid-template-columns:1fr}.changes{font-size:.88rem;color:var(--muted);padding-left:20px;margin-bottom:0}.sample{margin-bottom:36px}.sample-header{max-width:800px;margin-bottom:22px}.sample-header h3{font:1.6rem Georgia;margin:8px 0 12px}.sample-header p{color:var(--muted);font-size:.94rem}.frames{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.frame{padding:25px;background:var(--white);border:1px solid var(--line);min-height:260px;display:flex;flex-direction:column}.frame:nth-child(3n+2){background:#e3e9df}.frame:nth-child(3n){background:#eadfcf}.frame .eyebrow{font-size:.65rem;margin-bottom:25px}.frame .copy{font:1.35rem/1.3 Georgia;margin-bottom:25px}.frame .visual{margin-top:auto;padding-top:15px;border-top:1px solid #b8c0b2;font-size:.78rem;color:var(--muted)}.note{font-size:.8rem;color:var(--muted);margin-top:15px}.roadmap{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.phase{padding-top:20px;border-top:2px solid var(--ink)}.phase h3{margin:8px 0 18px;font:1.4rem Georgia}.phase p{font-size:.9rem;margin-bottom:16px}.phase .meta{font-size:.8rem;color:var(--muted)}.evidence-list{display:grid;gap:10px}.evidence-list details{border-bottom:1px solid var(--line);padding:15px 0}.evidence-list summary{cursor:pointer;font-weight:700;font-size:.95rem}.evidence-body{padding:18px 0 5px;max-width:850px;color:var(--muted);font-size:.9rem;overflow-wrap:anywhere}.evidence-body p{margin-bottom:12px}.closing{padding:55px;background:var(--ink);color:var(--white);margin:30px 0 60px}.closing h2{max-width:700px}.closing p{margin-top:23px;max-width:760px}.footer{padding:24px 0;border-top:1px solid var(--line);color:var(--muted);font-size:.76rem;display:flex;justify-content:space-between;gap:20px}#filter-status{font-size:.8rem;color:var(--muted);margin-bottom:12px}[hidden]{display:none!important}
@media(max-width:760px){.wrap{padding:0 20px}.nav-inner{align-items:flex-start;flex-direction:column;padding:22px 0;gap:17px}.nav-links{gap:16px}.hero{padding:47px 0}.hero-foot{flex-direction:column;align-items:flex-start}.section-head{grid-template-columns:40px 1fr;gap:12px}.coverage,.findings,.panels,.frames,.roadmap{grid-template-columns:1fr}.finding,.panel-copy{padding:24px}.frame{min-height:220px}.closing{padding:30px 25px}.footer{flex-direction:column}section{padding:40px 0}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}@media print{body{background:white}.wrap{max-width:none;padding:0 15px}.nav-links,.jump,.controls,.filters,#filter-status{display:none}.hero{padding:25px 0}section{padding:25px 0}.compare .panel{display:block!important}.panels{grid-template-columns:1fr 1fr!important}.finding,.frame,.phase,.panel{break-inside:avoid}.coverage,.roadmap{grid-template-columns:1fr 1fr}.closing{margin-bottom:15px}.evidence-body{display:block}h1{font-size:40pt}h2{font-size:24pt}}
</style></head><body><a class="skip" href="#main">Ir para o conteúdo</a>
${report.demo?'<div class="demo">Demonstração fictícia. Textos e achados ilustrativos; nenhuma página real foi auditada.</div>':''}
<header class="nav"><div class="wrap nav-inner"><div class="wordmark"><span class="mark" aria-hidden="true"></span>${esc(report.client)}</div><nav class="nav-links" aria-label="Seções"><a href="#diagnostico">Diagnóstico</a><a href="#comparacao">Antes e depois</a><a href="#conteudo">Conteúdo</a><a href="#plano">Plano</a></nav></div></header>
<main id="main" class="wrap"><div class="hero"><div class="eyebrow">Plano de evolução · ${esc(report.date)}</div><h1>${esc(report.title)}</h1><p class="lead">${esc(report.summary)}</p><div class="hero-foot"><div class="goal"><div class="eyebrow">O que queremos destravar</div><p>${esc(report.goal)}</p></div><a class="jump" href="#comparacao">Ver as propostas ↗</a></div></div>
<section aria-labelledby="coverage-title"><div class="section-head"><span class="number">01</span><div><h2 id="coverage-title">O que foi analisado.</h2><p>A cobertura define o que podemos afirmar e o que ainda precisa de acesso ou validação.</p></div></div><div class="coverage">${report.coverage.map(c=>`<article><span class="badge">${esc(c.state)}</span><h3>${esc(c.area)}</h3><p>${esc(c.detail)}</p></article>`).join('')}</div>${report.limits?.length?`<ul class="limits">${report.limits.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}</section>
<section id="diagnostico" aria-labelledby="diagnosis-title"><div class="section-head"><span class="number">02</span><div><h2 id="diagnosis-title">Mudar com um motivo.</h2><p>Cada proposta liga a situação atual a uma decisão e a um critério de verificação.</p></div></div><div class="filters" aria-label="Filtrar prioridades">${['Todas','Agora','Próximo','Depois'].map((s,i)=>`<button type="button" data-filter="${s}" aria-pressed="${i===0}">${s}</button>`).join('')}</div><p id="filter-status" role="status">${report.improvements.length} melhorias</p><div class="findings">${report.improvements.map(i=>`<article class="finding" data-priority="${i.priority}"><header><span class="eyebrow">${esc(i.id)} · ${esc(i.priority)}</span><span class="tag">${esc(i.effort)}</span></header><h3>${esc(i.title)}</h3><dl><dt>Situação atual</dt><dd>${esc(i.before)}</dd><dt>Mudança proposta</dt><dd>${esc(i.after)}</dd><dt>Por que testar</dt><dd>${esc(i.reason)}</dd></dl><p class="check"><strong>Responsável:</strong> ${esc(i.owner)}<br><strong>Verificação:</strong> ${esc(i.verify)}</p>${sources(i.evidence)}</article>`).join('')}</div></section>
<section id="comparacao" aria-labelledby="comparison-title"><div class="section-head"><span class="number">03</span><div><h2 id="comparison-title">Veja a diferença.</h2><p>O depois é uma proposta para avaliação. Não representa publicação ou resultado já obtido.</p></div></div>${report.comparisons.length?report.comparisons.map((c,i)=>`<div class="compare" data-mode="both"><div class="compare-title"><h3>${esc(c.title)}</h3><div class="controls" aria-label="Visualização de ${esc(c.title)}">${[['both','Comparar'],['before','Antes'],['after','Proposta']].map(([m,l])=>`<button type="button" data-mode="${m}" aria-pressed="${m==='both'}" aria-controls="comparison-${i}">${l}</button>`).join('')}</div></div><div class="panels" id="comparison-${i}">${panel(c.before,'before')}${panel(c.after,'after')}</div><ul class="changes">${c.changes.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${sources(c.evidence)}</div>`).join(''):'<p>Sem comparação visual nesta versão. Consulte as propostas de texto no diagnóstico.</p>'}</section>
<section id="conteudo" aria-labelledby="content-title"><div class="section-head"><span class="number">04</span><div><h2 id="content-title">Ideias que têm origem.</h2><p>Exemplos de como a estratégia vira mensagem, sequência e direção visual.</p></div></div>${report.content.map(c=>`<article class="sample"><div class="sample-header"><span class="eyebrow">${esc(c.format)} · proposta editorial</span><h3>${esc(c.title)}</h3><p>${esc(c.insight)}</p>${sources(c.evidence)}</div><div class="frames">${c.frames.map(f=>`<div class="frame"><span class="eyebrow">${esc(f.label)}</span><p class="copy">${esc(f.text)}</p><p class="visual">${esc(f.visual)}</p></div>`).join('')}</div></article>`).join('') || '<p>Nenhuma amostra de conteúdo incluída no escopo desta versão.</p>'}<p class="note">Estas amostras apresentam texto e direção visual. Arquivos finais de publicação são entregas separadas quando solicitados.</p></section>
<section id="plano" aria-labelledby="plan-title"><div class="section-head"><span class="number">05</span><div><h2 id="plan-title">Uma ordem para avançar.</h2><p>Sequência proposta. Prazos e capacidade precisam corresponder à operação real do cliente.</p></div></div><div class="roadmap">${report.roadmap.map(r=>`<article class="phase"><span class="eyebrow">${esc(r.phase)}</span><h3>${esc(r.action)}</h3><p class="meta"><strong>Responsável:</strong> ${esc(r.owner)}</p><p><strong>Conferir:</strong> ${esc(r.check)}</p></article>`).join('')}</div></section>
<section aria-labelledby="evidence-title"><div class="section-head"><span class="number">06</span><div><h2 id="evidence-title">Fontes e limites.</h2><p>Abra cada referência para conferir a origem das decisões.</p></div></div><div class="evidence-list">${report.evidence.map(e=>`<details id="evidence-${id(e.id)}"><summary>${esc(e.id)} · ${esc(e.label)}</summary><div class="evidence-body"><p>${esc(e.detail)}</p><p>${esc(e.kind)} · ${esc(e.date)}${e.artifact?` · ${esc(e.artifact)}`:''}</p>${e.url?`<a href="${esc(safeUrl(e.url))}" target="_blank" rel="noopener noreferrer">Abrir fonte ↗</a>`:''}</div></details>`).join('')}</div></section>
<div class="closing"><div class="eyebrow">Próximo passo</div><h2>Transformar proposta em decisão.</h2><p>${esc(report.nextStep)}</p></div></main><footer class="wrap footer"><span>${esc(report.client)} · ${esc(report.date)}</span><span>Diagnóstico e propostas · Agência Prisma</span></footer>
<script>
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));let n=0;document.querySelectorAll('.finding').forEach(x=>{x.hidden=b.dataset.filter!=='Todas'&&x.dataset.priority!==b.dataset.filter;if(!x.hidden)n++});document.getElementById('filter-status').textContent=n+' melhorias nesta seleção'}));
document.querySelectorAll('.controls button').forEach(b=>b.addEventListener('click',()=>{const c=b.closest('.compare');c.dataset.mode=b.dataset.mode;c.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))}));
document.querySelectorAll('.sources a').forEach(a=>a.addEventListener('click',()=>{const d=document.getElementById(a.hash.slice(1));if(d)d.open=true}));
addEventListener('beforeprint',()=>{document.querySelectorAll('details').forEach(d=>{d.dataset.wasOpen=String(d.open);d.open=true});document.querySelectorAll('.finding').forEach(d=>{d.dataset.wasHidden=String(d.hidden);d.hidden=false})});
addEventListener('afterprint',()=>{document.querySelectorAll('details').forEach(d=>d.open=d.dataset.wasOpen==='true');document.querySelectorAll('.finding').forEach(d=>d.hidden=d.dataset.wasHidden==='true')});
</script></body></html>`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const [input,output,...rest] = process.argv.slice(2);
    if (!input || !output || rest.length) throw new Error('Uso: node render-report.mjs <relatorio.json> <saida.html>');
    if (path.resolve(input) === path.resolve(output)) throw new Error('Entrada e saída precisam ser diferentes');
    if ((await stat(input)).size > 1024 * 1024) throw new Error('JSON excede 1 MB');
    const report = JSON.parse((await readFile(input,'utf8')).replace(/^\uFEFF/,''));
    const html = await render(report,path.dirname(path.resolve(input)));
    await writeFile(output,html,{encoding:'utf8',flag:'wx'});
    console.log(JSON.stringify({file:path.resolve(output),bytes:Buffer.byteLength(html),demo:report.demo,status:'HTML gerado; revisão visual ainda necessária'}));
  } catch (e) { console.error(e.message); process.exitCode=1; }
}
