# Bancada de código aberto para design

Em cada entrega de design, confira se há composição ou verificação local que contribua para o pedido. A bancada em `scripts/design-tools/` usa versões fixadas de [Satori](https://github.com/vercel/satori), [Sharp](https://github.com/lovell/sharp), [Color.js](https://github.com/color-js/color.js) e [SVGO](https://github.com/svg/svgo). São dependências executáveis integradas, separadas dos complementos metodológicos do mapa GitHub. Consulte o [guia da bancada](../../../../scripts/design-tools/README.md) para instalação, limites e comandos.

| Situação | Rotina | Decisão que ela apoia |
|---|---|---|
| Foto ou arte raster recebida/exportada | `inspect` | Dimensões, formato, resolução efetiva e eventual ampliação indevida |
| Texto sobre cor plana | `contrast` | Relação de contraste antes da inspeção em tamanho real |
| Reconstrução com referência e saída acessíveis | `compare` | Prévia lado a lado na mesma escala para revisão visual humana |
| SVG final autorizado | `optimize-svg` | Reduzir o arquivo em cópia, preservando o original e inspecionando o resultado |
| Arte ou série em SVG/PNG com composição local | `render-composition.mjs` | Gerar os arquivos com texto literal, fontes locais e composição específica por página, junto de prancha de contato e relatório |

Execute apenas as rotinas pertinentes, em toda peça a que se aplicarem. Não rode otimização SVG sobre logo mestre aprovado sem comparar as duas versões. Não aplique “melhoria” automática de cor sobre pele, embalagem ou produto; Sharp ajuda a medir e preparar, mas o tratamento permanece com `imagens-marketing` e deve preservar a identidade. Contraste calculado para cores planas não prova legibilidade sobre fotografia ou gradiente. A prévia comparativa também não decide direitos ou equivalência editorial.

## Composição com Satori e Sharp

Use quando os arquivos pedidos forem compatíveis com SVG/PNG e uma composição local permitir controlar texto, grade, fontes e exportações. O designer define a direção, a hierarquia e as variações da sequência; o motor organiza a árvore de elementos e renderiza. Uma peça no Canva continua no Canva quando esse for o pedido. A biblioteca não pesquisa o cliente, não escreve a narrativa e não torna todo layout criativamente bom por conta própria.

O repasse reúne cliente, versão do DNA, dimensão, fonte licenciada disponível, texto literal e composição por página. Reaproveite o mapa narrativo de carrosséis e as regras visuais da direção de arte, sem converter todas as páginas em uma mesma moldura. Comece por amostra representativa; depois renderize o lote autorizado e examine a prancha de contato, cada PNG e os detalhes relevantes. Falha de leitura volta à composição/conteúdo; erro de cliente ou afirmação sem prova volta à estratégia/origem.

O JSON é o mestre reproduzível. O SVG desta rotina preserva aparência com letras em contornos; não equivale a texto editável no Canva, Figma ou Illustrator. Escolha outra ferramenta se esse tipo de editabilidade fizer parte da entrega. Fotos são ativos locais já aprovados; este comando não faz tratamento generativo. Fontes, imagens e JSON precisam viajar juntos quando a reprodução em outra máquina for necessária, respeitando as licenças.

## Decisões sobre outros códigos

Avaliação de 09/10/2026: Satori 0.44.3 foi escolhido para composição e tipografia; Sharp já faz a rasterização. Uma segunda engine com resvg não foi incorporada por duplicar essa função sem ganho comprovado neste fluxo. Pixelmatch é útil para detectar regressões exatas em renders estáveis, mas não para medir originalidade, fidelidade de pessoa ou qualidade criativa; não foi acrescentado sem essa necessidade. Bibliotecas adicionais de fontes/tokens só entram quando resolverem uma operação concreta que a bancada e a ferramenta escolhida não resolvam.

A versão e o lockfile são parte da entrega do código. O pacote fixa também uma correção transitiva de fflate; detalhes de licença e manutenção estão no guia. Atualização de dependência exige nova renderização de teste: adotar “latest” silenciosamente pode mudar quebra de linha, métrica tipográfica e exportação.

Se Node/dependências ou arquivo local não estiverem disponíveis, continue com a ferramenta de criação e sua inspeção visual; registre qual verificação técnica ficou indisponível. Não descreva os códigos como agentes autônomos, nem prometa execução contínua fora de uma tarefa aberta.
