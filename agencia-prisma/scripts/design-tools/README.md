# Verificação técnica de design

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

Use `inspect` em raster recebido ou exportado; o alvo opcional ajuda a detectar ampliação. Use `contrast` para texto sobre cor plana, nunca como única prova de leitura sobre foto. Use `compare` para colocar uma referência autorizada e o resultado lado a lado; a prévia não mede fidelidade automaticamente. Use `optimize-svg` apenas para cópia de publicação e compare visualmente com o SVG original. Preserve o arquivo mestre e suas camadas.

Projetos copiados para outra máquina incluem este código e o lockfile, mas precisam executar `npm ci --ignore-scripts` localmente antes da primeira utilização. A bancada não pesquisa imagens, não cria layouts e não substitui a inspeção humana ou a ferramenta de design.

Fontes e licenças: [Sharp (Apache-2.0)](https://github.com/lovell/sharp), [Color.js (MIT)](https://github.com/color-js/color.js), [SVGO (MIT)](https://github.com/svg/svgo). Não vendorizamos seus repositórios; as dependências são instaladas pelo gerenciador de pacotes.
