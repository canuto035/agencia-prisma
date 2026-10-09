# Composição e verificação de design

Esta bancada usa bibliotecas abertas de terceiros, com versões fixadas em `package-lock.json`. Instale uma vez por máquina com Node.js 20.9 ou superior:

```powershell
Set-Location scripts/design-tools
npm ci --ignore-scripts
```

Em cada entrega visual, o designer escolhe as verificações aplicáveis aos arquivos disponíveis:

```powershell
node design-check.mjs inspect "C:\\caminho\\arte.png" 1080 1350
node design-check.mjs contrast "#222222" "#FFFFFF" normal
node design-check.mjs compare "C:\\caminho\\referencia.png" "C:\\caminho\\final.png" "C:\\caminho\\comparacao.png"
node design-check.mjs optimize-svg "C:\\caminho\\logo-original.svg" "C:\\caminho\\logo-otimizado.svg"
```

Use `inspect` em raster recebido ou exportado; o alvo opcional considera a orientação EXIF para detectar ampliação. Use `contrast` para texto sobre cor plana, nunca como única prova de leitura sobre foto. Use `compare` para colocar uma referência autorizada e o resultado lado a lado; a prévia não mede fidelidade automaticamente. Use `optimize-svg` apenas para cópia de publicação e compare visualmente com o SVG original. As saídas de comparação e otimização precisam de nomes novos; originais e arquivos existentes não são sobrescritos.

## Produzir uma composição local

O coordenador seleciona esta rota para SVG/PNG local quando ela corresponder ao pedido. Crie um JSON próprio do cliente seguindo [o exemplo fictício](composition.example.json), com `client`, `dnaVersion`, `width`, `height`, fontes locais e `slides`. Cada página tem sua função, argumento e árvore de composição; a ordem no array é a ordem de exportação. O exemplo demonstra a interface, não é o kit padrão da agência.

```powershell
node render-composition.mjs "C:\caminho\cliente\composicao.json" "C:\caminho\cliente\exportacao-v1"
npm test
```

O motor Satori calcula composição/tipografia e produz SVG; Sharp exporta PNG e prancha de contato. `report.json` identifica arquivos, textos e dados da renderização para conferência. A pasta de saída precisa ser nova. Fontes e imagens são arquivos locais relativos ao JSON, dentro da sua pasta; caminhos externos, links remotos, scripts, HTML bruto e estilos fora do subconjunto aceito são recusados. Copie somente os ativos autorizados para esse pacote de produção. A rotina não navega nem envia arquivos do cliente a um serviço.

A raiz de cada slide usa por padrão as dimensões do canvas com `boxSizing: "border-box"`: padding e bordas entram na largura/altura declaradas. O motor aplica esse padrão somente à raiz quando omitido; os nós internos mantêm o estilo informado. Um `content-box` explícito na raiz é preservado e pode expandi-la além do canvas, gerando aviso de transbordamento no relatório. Dimensione os blocos de texto para o espaço disponível e revise a quebra de linhas no PNG, especialmente depois de trocar texto, tamanho ou fonte.

Forneça a fonte exata usada na peça, com família, peso, estilo, caminho e referência de licença. A face solicitada precisa estar carregada; se faltar um glifo nela, Satori ainda pode obtê-lo em outra fonte carregada. Confira a tipografia no resultado: esta rotina não certifica a origem de cada glifo. O arquivo não é distribuído pela Prisma; copie uma fonte somente quando houver direito para isso. Não trate indicação de licença no JSON como comprovação automática. O teste usa fonte local fornecida por `PRISMA_TEST_FONT`, ou Arial da máquina Windows, sem incluí-la no repositório. Para reprodução por terceiros, entregue fontes/ativos permitidos junto do JSON, ou instruções de aquisição quando a licença não permitir a cópia.

O mestre reproduzível é o JSON mais fontes e ativos. SVG com letras em contornos preserva aparência, mas não oferece edição de texto como um arquivo nativo de design. Se o pedido exigir Canva ou outra ferramenta, use essa ferramenta. Nenhuma biblioteca cria posicionamento, prova ou originalidade: resolva a ideia e o ritmo das páginas antes da renderização, abra cada PNG e compare texto, identidade, fontes, cortes e legibilidade em tamanho de uso. Métricas de caixas e prancha de contato não certificam o acabamento sozinhas.

Projetos copiados para outra máquina incluem este código e o lockfile, mas precisam executar `npm ci --ignore-scripts` localmente antes da primeira utilização. A bancada não pesquisa imagens nem substitui geração/edição especializada de fotografias.

## Dependências e decisões

Versões fixadas: [Satori 0.44.3 (MPL-2.0)](https://github.com/vercel/satori), [Sharp 0.35.5 (Apache-2.0)](https://github.com/lovell/sharp), [Color.js 0.7.1 (MIT)](https://github.com/color-js/color.js), [SVGO 4.1.0 (MIT)](https://github.com/svg/svgo). Dependências são instaladas pelo gerenciador; os repositórios e fontes tipográficas não são copiados para esta base.

Em 09/10/2026, o registro npm confirmou Satori 0.44.3. O pacote original fixava fflate 0.7.3; a auditoria apontou [GHSA-px8p-9vwx-vf98](https://github.com/advisories/GHSA-px8p-9vwx-vf98). O override restrito a Satori usa a correção compatível `fflate@0.7.5`, com lockfile atualizado. `npm audit --omit=dev` não apontou vulnerabilidades após essa correção nessa data; isso não equivale a garantia permanente. Preserve o override até que a dependência original o torne desnecessário e testes confirmem a atualização. Não use `npm audit fix --force` sem avaliar mudanças e regressões.

Satori tem subconjunto próprio de HTML/CSS; a aparência não é garantida como idêntica à de um navegador. resvg foi avaliado e dispensado porque Sharp já cumpre a rasterização requerida. Pixelmatch ficou para um caso futuro de regressão exata entre renders estáveis, pois não mede qualidade criativa. Mudança de versão requer teste de quebra de linha, fontes, dimensões e saída visual antes de distribuir.
