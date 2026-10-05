# Bancada de código aberto para design

Em cada entrega de design, confira se há arquivos locais para análise técnica. A bancada em `scripts/design-tools/` usa versões fixadas de [Sharp](https://github.com/lovell/sharp), [Color.js](https://github.com/color-js/color.js) e [SVGO](https://github.com/svg/svgo). O código fica como dependência do projeto, não como instrução copiada de uma página do GitHub. Consulte `README.md` da bancada para instalação e comandos.

| Situação | Rotina | Decisão que ela apoia |
|---|---|---|
| Foto ou arte raster recebida/exportada | `inspect` | Dimensões, formato, resolução efetiva e eventual ampliação indevida |
| Texto sobre cor plana | `contrast` | Relação de contraste antes da inspeção em tamanho real |
| Reconstrução com referência e saída acessíveis | `compare` | Prévia lado a lado na mesma escala para revisão visual humana |
| SVG final autorizado | `optimize-svg` | Reduzir o arquivo em cópia, preservando o original e inspecionando o resultado |

Execute apenas as rotinas pertinentes, em toda peça a que se aplicarem. Não rode otimização SVG sobre logo mestre aprovado sem comparar as duas versões. Não aplique “melhoria” automática de cor sobre pele, embalagem ou produto; Sharp ajuda a medir e preparar, mas o tratamento permanece com `imagens-marketing` e deve preservar a identidade. Contraste calculado para cores planas não prova legibilidade sobre fotografia ou gradiente. A prévia comparativa também não decide direitos ou equivalência editorial.

Se Node/dependências ou arquivo local não estiverem disponíveis, continue com a ferramenta de criação e sua inspeção visual; registre qual verificação técnica ficou indisponível. Não descreva os códigos como agentes autônomos, nem prometa execução contínua fora de uma tarefa aberta.
