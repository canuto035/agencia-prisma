import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { validate, render } from './render-report.mjs';

const fixture = JSON.parse(await readFile(new URL('../../modelos/relatorio-cliente.example.json',import.meta.url),'utf8'));
const copy = () => structuredClone(fixture);
test('gera demonstração rotulada, vínculos e texto sem HTML executável',async()=>{
  const r=copy(); r.title='<script>alert("x")</script>'; r.evidence[0].detail='Foto <img src=x onerror=alert(1)>';
  const html=await render(r,os.tmpdir());
  assert.ok(html.includes('Demonstração fictícia'));
  assert.ok(html.includes('&lt;script&gt;alert(&quot;x&quot;)'));
  assert.ok(!html.includes('<img src=x'));
  assert.ok(html.includes('id="evidence-E1"'));
  assert.ok(html.includes('data-mode="before"'));
  assert.ok(html.includes('Depois · proposta'));
  assert.ok(!html.includes('fetch('));
});
test('rejeita fonte ativa e vínculos sem evidência',()=>{
  const r=copy(); r.evidence[0].url='javascript:alert(1)'; assert.throws(()=>validate(r),/HTTP/);
  const r2=copy(); r2.improvements[0].evidence=['inexistente']; assert.throws(()=>validate(r2),/evidência/);
  const r3=copy(); r3.demo=false; assert.throws(()=>validate(r3),/demonstração/);
});
test('comparação real requer original acessado, sem chamar relato de observação',()=>{
  const r=copy(); r.demo=false;
  r.coverage=r.coverage.map(c=>({...c,state:c.state==='demonstração'?'parcial':c.state}));
  r.evidence=r.evidence.map(e=>({...e,kind:e.kind==='demonstração'?'relato':e.kind}));
  assert.throws(()=>validate(r),/efetivamente observado/);
  r.evidence[0].kind='observado'; r.evidence[0].artifact='bio-fornecida.txt';
  assert.equal(validate(r),r);
});
test('imagens locais são embutidas; caminho fora da pasta é rejeitado',async()=>{
  const dir=await mkdtemp(path.join(os.tmpdir(),'prisma-report-test-'));
  try {
    const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aK1cAAAAASUVORK5CYII=','base64');
    await writeFile(path.join(dir,'image.png'),png);
    const r=copy(); r.comparisons[0].before.image='image.png'; r.comparisons[0].before.alt='Amostra de imagem';
    assert.ok((await render(r,dir)).includes('data:image/png;base64,'));
    const inner=await mkdtemp(path.join(dir,'inside-'));
    r.comparisons[0].before.image='../image.png'; await assert.rejects(render(r,inner),/fora da pasta/);
  } finally { await rm(dir,{recursive:true,force:true}); }
});
test('CLI preserva arquivo de saída existente e aceita caminho com espaços',async()=>{
  const dir=await mkdtemp(path.join(os.tmpdir(),'prisma report test '));
  try {
    const input=path.join(dir,'report.json'), output=path.join(dir,'report.html');
    await writeFile(input,JSON.stringify(fixture));
    const script=fileURLToPath(new URL('./render-report.mjs',import.meta.url));
    const first=spawnSync(process.execPath,[script,input,output],{encoding:'utf8'});
    assert.equal(first.status,0,first.stderr);
    const original=await readFile(output,'utf8');
    const second=spawnSync(process.execPath,[script,input,output],{encoding:'utf8'});
    assert.equal(second.status,1);
    assert.equal(await readFile(output,'utf8'),original);
    const same=spawnSync(process.execPath,[script,input,input],{encoding:'utf8'}); assert.equal(same.status,1);
  } finally { await rm(dir,{recursive:true,force:true}); }
});
