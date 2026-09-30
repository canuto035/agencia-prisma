# Padrões de prompt para produção criativa

Estes são **padrões reutilizáveis**, não comandos prontos nem um prompt fixo por skill. Em cada ação, siga [a regra de instrução específica](../.agents/skills/coordenacao-agencia/references/instrucao-por-acao.md), substitua os campos por fatos do cliente e do item e use o contrato real da ferramenta. Preserve o original. Prompt bem escrito não comprova qualidade do resultado.

Antes de escrever, identifique o modo: **corrigir a foto**, **editar uma parte** ou **criar cena nova**. Aponte o arquivo/ID e a versão de cada entrada e seu papel (alvo, identidade, produto, estilo ou composição). Separe em frases curtas o que deve mudar e o que deve permanecer idêntico; não acrescente detalhes que o briefing não sustenta. Para uso em arte, informe enquadramento, área protegida do sujeito e espaço de texto. O texto final, logotipo e rótulo que exigirem exatidão devem permanecer em camada editável ou no ativo original sempre que possível. Após cada saída, compare com a referência principal e corrija somente o defeito observado.

## Tratar uma foto existente

> Edite a foto principal [arquivo]. Corrija apenas [exposição/balanço de branco/contraste/ruído/nitidez] com intensidade [natural/moderada], para [uso e proporção]. Preserve sem mudanças: identidade, rosto, idade aparente, expressão, pose, roupa, acessórios, pele real, fundo, produto, rótulo, logo e texto. Use [arquivo] só como referência de cor/luz, sem copiar seu sujeito. Não adicione objetos. Depois compare com o original na mesma escala.

Se o pedido autorizar mudar fundo, pose ou roupa, liste essas mudanças explicitamente e retire apenas esses itens do bloco de preservação.

## Edição localizada de imagem existente

> Edite [arquivo/ID/versão] para [uso]. Altere somente [região ou elemento] de [estado atual] para [resultado desejado]. Mantenha intactos [pessoa/personagem/produto, traços, geometria, pele, embalagem, marca, texto, outras regiões] conforme a referência principal. Use [referência secundária] apenas para [papel permitido]. Enquadramento e proporção [destino], preservando [área que não pode ser cortada]. Rejeite se houver [desvio observável específico]. Compare original e saída lado a lado antes de aceitar.

Quando a edição direta não preservar identidade, produto ou texto, mantenha o original e faça composição controlada; não continue regenerando às cegas.

## Nova cena de pessoa ou produto

> Crie uma imagem para [função na campanha]. Referência principal de identidade: [arquivo]. Referência de estilo: [arquivo], apenas para [luz/paleta/composição]. Sujeito/produto: [descrição comprovada]. Preserve [traços distintivos ou geometria/embalagem/logo/rótulo]. Cena [local e ação], luz [origem e qualidade], enquadramento [plano e espaço para texto], proporção [destino]. Aparência fotográfica natural; anatomia, contato, sombra, reflexos e escala plausíveis. Evite texto gerado, marca alterada, pele plástica e objetos extras. Compare resultado e referência principal; rejeite desvios.

Para série, mude a função e um aspecto dominante de cada cena. Quando rótulo ou logotipo exigir exatidão, priorize edição ou composição com o produto original.

## Imagem-base para anúncio ou carrossel

> Crie a imagem-base do item [ID] para [slide/posicionamento e objetivo]. Use [arquivo/ID/versão] como referência principal de [pessoa/produto] e [arquivo] apenas para [estilo]. Preserve [invariantes comprovadas]. Mostre [ação ou prova visual] em [cenário], com [enquadramento] e espaço livre em [região definida pelo layout] para [título/CTA] que serão adicionados pelo design. Proporção [destino], área protegida [sujeito, produto ou detalhe]. Sem texto, logo ou rótulo inventados. Rejeite se a identidade, o recorte, o contraste para a futura tipografia ou o produto falharem.

O especialista de design recebe a versão final escolhida, recorte viável e texto exato; ele monta e confere a arte editável. Para anúncios, confira ainda correspondência entre imagem, oferta e página de destino.

## Arte editável nova

> Crie uma peça de layout para [cliente], [canal/posicionamento] e [objetivo], no formato [dimensão/proporção verificada]. Aplique apenas o kit [ID/nome vinculado ao cliente] ou, se não houver kit confirmado, as decisões visuais aprovadas [fonte/versão]. Público [situação concreta]. Mensagem principal literal: “[texto]”; apoio: “[texto]”; CTA literal: “[texto]”, com destino [link/ação]. Use [ativos oficiais com ID/arquivo/versão] nos papéis [logo, foto, produto, prova], preservando [áreas e características]. Hierarquia [ordem de leitura] e composição [grade/área de respiro pertinente]. Mantenha texto, logo e CTA editáveis quando a ferramenta permitir. Rejeite se houver texto alterado, kit incorreto, corte do sujeito, contraste insuficiente, CTA sem destino ou formato divergente. Entregue o ID/link do design salvo e confira a versão visual; exporte somente pela capacidade realmente disponível.

Use este briefing para a ferramenta que cria **layout**. Para uma imagem avulsa, use os padrões de imagem; não peça ao gerador raster uma arte com texto exato e depois a apresente como design editável.

## Editar ou adaptar um design existente

> No design [ID/versão] do cliente [nome], altere somente [página/elemento] de [estado atual] para [resultado autorizado]. Preserve [texto, marca, fotografia, produto, demais páginas e elementos]. O destino é [canal e formato verificados]; se houver redimensionamento, recomponha [rosto/produto/logo/CTA/área segura] em vez de aceitar o recorte automático sem inspeção. A operação estará concluída quando [mudança observável] aparecer na prévia e no design salvo, sem perda dos elementos protegidos. Siga a transação e a confirmação exigidas pela ferramenta; rascunho não é arquivo salvo.

Quando a alteração afetar vários elementos, discrimine cada página e operação. Se a API não permitir mudar a propriedade necessária, não invente uma edição equivalente: mantenha a versão válida e registre o ajuste que precisa do editor.

## Logo novo ou redesenho solicitado

> Desenvolva o logo de [nome exato] para [público/categoria], guiado pelo DNA [arquivo/versão] e pela direção de arte [decisões confirmadas]. A marca precisa transmitir [atributos ligados ao posicionamento] e funcionar em [usos prioritários]. Preserve [elementos do logo anterior, se for redesenho] e evite [semelhanças ou símbolos genéricos identificados]. Proponha [quantidade proporcional ao pedido] direções distintas com racional, construção, tipografia e relação símbolo–nome. Não invente slogan, selo ou significado não aprovado. Após escolher a direção, produza o mestre em formato editável/vetorial quando a ferramenta permitir e confira grafia, tamanho pequeno, uma cor, fundos claros/escuros e aplicação real. Entregue apenas os formatos efetivamente criados; mockup e imagem raster não são mestre vetorial.

Esse texto é um briefing de design, não uma ordem para o gerador de imagens entregar sozinho uma identidade final. Use geração raster somente para exploração visual ou ativos auxiliares; refaça com elementos controláveis quando a entrega exigir logo mestre.

## Cena de vídeo novo

> Gere [duração] de vídeo para [objetivo e canal]. Sujeito principal baseado em [referência confirmada], preservando [invariantes]. Quadro inicial [composição], ação [movimento observável], câmera [trajetória], cenário [elementos estáveis], quadro final [estado]. Luz e continuidade [regras]. Áudio/fala [fornecido ou nenhum], sem prometer sincronização não suportada. Formato [proporção]. Evite mudanças de identidade, objetos aparecendo sem causa, texto distorcido e cortes não pedidos. Confira quadro inicial, trechos intermediários, final e áudio da saída.

## Variação de anúncio

> Produza a versão [ID] para [público/situação], com ângulo [hipótese], promessa [texto confirmado], prova [origem], CTA [texto e destino]. Formato [canal/posicionamento] e elementos de marca [ativos oficiais]. Mantenha [oferta, preço, demais invariantes] e altere apenas [variável definida] quando for teste controlado. Deixe texto exato editável no design quando possível. Verifique especificação atual, leitura móvel, área segura, correspondência com a página e arquivo final.

## Roteiro de Reel

> Escreva o Reel [ID] para [cliente e público em situação concreta]. Objetivo [resultado] e duração [faixa]. Baseie-se em [fontes realmente acessadas], usando [mecanismo narrativo] sem copiar texto ou cenas. Gancho [tensão específica], desenvolvimento [demonstração/prova], recompensa [aprendizado] e CTA [ação existente]. Voz [DNA do cliente]. Entregue fala, ações filmáveis, texto na tela, capa e legenda separadamente. Preserve [fatos e restrições]; não afirme resultados sem prova. Confira se a fala cabe no tempo com pausas.

## Carrossel montado no Canva

> Crie o carrossel [ID] do cliente [nome] no Canva com o kit [ID/nome vinculado a esse cliente], usando [template/design aprovado ou brief de criação]. Destino [canal/formato]. Monte [número] páginas na ordem do mapa aprovado: [slide → função → texto final → ativo → prova]. Preserve exatamente [termos, marca, preço e CTA confirmados]. Use [arquivos] como imagens de conteúdo e [referências] apenas para [estilo permitido]. Mantenha texto editável onde a ferramenta permitir. Antes de concluir, confira no design salvo número e ordem das páginas, acentuação, cortes, legibilidade em celular e identidade da marca; entregue link/ID e somente os arquivos realmente exportados.

Esses padrões não ordenam compra, publicação ou ativação de mídia. Após a execução, registre ferramenta, referências, versão, custo quando houver e rejeições relevantes.
