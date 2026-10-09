# Padrões de prompt para produção criativa

Estes são **padrões reutilizáveis**, não comandos prontos nem um prompt fixo por skill. Em cada ação, siga [a regra de instrução específica](../.agents/skills/coordenacao-agencia/references/instrucao-por-acao.md), substitua somente os campos pertinentes por fatos do cliente e use o contrato real da ferramenta. Preserve o original. Prompt bem escrito não comprova qualidade do resultado.

Escolha a etapa antes de preencher: exploração recebe uma decisão aberta e devolve caminhos comparáveis; produção recebe a direção escolhida e devolve um artefato; edição recebe versão e mudanças permitidas; revisão recebe a saída real e devolve evidência e defeitos. Os textos citados abaixo são instruções de produção/edição ou briefing ao especialista, conforme indicado. Não envie histórico, DNA completo, rubrica ou operações que o campo não aceita. A responsável salva, abre, compara e revisa o resultado fora do prompt quando a ferramenta não executa essas ações; registra aceita, corrigir, bloqueada ou não verificável. Arquivo/ID sem inspeção não comprova conclusão.

Em pedidos de imagem, identifique o modo antes de escrever: **corrigir a foto**, **editar uma parte** ou **criar cena nova**. Aponte o arquivo/ID e a versão de cada entrada e seu papel (alvo, identidade, produto, estilo ou composição). Separe em frases curtas o que deve mudar e o que deve permanecer idêntico; não acrescente detalhes que o briefing não sustenta. Para uso em arte, informe enquadramento, área protegida do sujeito e espaço de texto. O texto final, logotipo e rótulo que exigirem exatidão devem permanecer em camada editável ou no ativo original sempre que possível. Após cada saída, compare com a referência principal e corrija somente o defeito observado.

Em criação nova, acrescente somente a matéria-prima que altera a saída: cena, fala autorizada, objeto, hábito ou pergunta real; origem da prova; tensão específica; linguagem da marca; e o que não pode ser encenado como fato. Se faltar material, marque a hipótese. “Humanizado”, “premium”, “autêntico” ou “fora do comum” sozinhos não especificam ação visual. Escolha um defeito relevante a evitar, como pessoa/produto descaracterizado, prova inventada, texto genérico ou linguagem incompatível. Ilustração autorizada não deve ser rejeitada por não parecer fotografia. Avalie o artefato, não só o prompt.

Para campanha, identidade, série ou peça principal, explore enquanto houver uma decisão material aberta; escolha pelo problema, prova e linguagem visual e confira uma amostra antes do lote. Produção recebe essa direção sem escolhê-la novamente. No prompt de cada item, descreva função, ativo distintivo, relação texto–imagem e defeito relevante. Em exploração, mude o conceito; em teste controlado, preserve invariantes e altere apenas a variável do experimento.

## Tratar uma foto existente

> Edite a foto principal [arquivo/versão]. Corrija apenas [ajustes necessários] com intensidade [compatível com a origem], para [uso e proporção]. Preserve identidade, rosto, idade aparente, expressão, pose, roupa, acessórios, pele real, fundo, produto, rótulo, logo e texto. Use [arquivo] só como referência de cor/luz, sem copiar seu sujeito. Não adicione objetos.

Se o pedido autorizar mudar fundo, pose ou roupa, liste essas mudanças explicitamente e retire apenas esses itens do bloco de preservação.

## Edição localizada de imagem existente

> Edite [arquivo/ID/versão] para [uso]. Altere somente [região ou elemento] de [estado atual] para [resultado desejado]. Mantenha intactos [pessoa/personagem/produto e características protegidas] conforme a referência principal. Use [referência secundária] apenas para [papel permitido]. Enquadramento e proporção [destino], preservando [área que não pode ser cortada]. Evite [desvio observável específico].

Quando a edição direta não preservar identidade, produto ou texto, mantenha o original e faça composição controlada; não continue regenerando às cegas.

## Nova cena de pessoa ou produto

> Crie uma imagem para [função na campanha], na linguagem escolhida [fotografia, ilustração, render ou outra expressão autorizada]. Referência principal de identidade: [arquivo/versão]. Referência de estilo: [arquivo], apenas para [papel]. Sujeito/produto: [descrição comprovada]. Preserve [traços distintivos ou geometria/embalagem/logo/rótulo]. Cena [local e ação], luz [origem e qualidade], enquadramento [plano e espaço para texto], proporção [destino]. Mantenha [traço/material e relações de anatomia, contato, sombra ou escala pertinentes à linguagem]. Evite [desvio relevante], texto inventado e marca alterada.

Para série, mude a função e um aspecto dominante de cada cena. Fotografia pede naturalidade compatível com a origem; personagem ilustrado conserva traço e proporções, sem conversão automática em pessoa real. Quando rótulo ou logotipo exigir exatidão, priorize edição ou composição com o produto original. A cena gerada não vira prova factual de presença, uso ou resultado.

## Imagem-base para anúncio ou carrossel

> Crie a imagem-base do item [ID] para [slide/posicionamento e objetivo], na linguagem [escolhida]. Use [arquivo/ID/versão] como referência principal de [pessoa/produto] e [arquivo] apenas para [estilo]. Preserve [invariantes comprovadas]. Ilustre [ação ou conceito] em [cenário], com [enquadramento] e espaço livre em [região definida pelo layout] para [título/CTA] que serão adicionados pelo design. Proporção [destino], área protegida [sujeito, produto ou detalhe]. Sem texto, logo ou rótulo inventados.

Prova factual usa ativo documentado; não gere uma cena para simular evidência ausente. Design recebe versão escolhida, recorte viável e texto exato, monta e confere identidade, contraste, produto e arte editável. Para anúncios, confira também correspondência entre imagem, oferta e página de destino.

## Arte editável nova

> Crie o layout de [cliente] para [canal/posicionamento e objetivo], no formato [dimensão/proporção verificada], seguindo a direção escolhida [conceito e relação texto–visual]. Aplique apenas o kit [ID/nome vinculado ao cliente] ou as decisões visuais aprovadas [fonte/versão]. Público [situação concreta]. Mensagem literal: “[texto]”; apoio: “[texto]”; CTA literal: “[texto]”, com destino [link/ação]. Use [ativos oficiais com ID/arquivo/versão] nos papéis [logo, foto, produto, prova], preservando [áreas e características]. Hierarquia [ordem de leitura] e composição [decisão pertinente]. Mantenha texto, logo e CTA em elementos controláveis conforme a capacidade real do formato.

Use este briefing para a ferramenta que cria **layout**. Design salva, registra ID/arquivo, confere texto literal, kit, recorte, contraste, CTA e editabilidade e exporta pelas capacidades disponíveis. Para uma imagem avulsa, use os padrões de imagem; não apresente raster com texto como design editável.

## Reconstruir uma referência autorizada

> Reconstrua [arquivo/ID/versão] autorizado pelo cliente [nome] para [canal, formato e dimensões]. Preserve [texto, logo, hierarquia, paleta, tipografia disponível, proporções, espaçamentos, imagens e áreas protegidas]. Recrie em camadas editáveis quando solicitado e suportado. Mude apenas [lista explícita]. Use os ativos originais [arquivos/versões].

Design compara saída e referência na mesma escala e tamanho de uso e registra diferenças, fontes ou elementos indisponíveis. Se não houver permissão clara para reprodução fiel, não use este modo; descreva princípios aproveitáveis e produza uma peça original da marca.

## Criar do zero ou com referências de inspiração

> Produza [peça] para [cliente/público/canal], com objetivo [resultado] e mensagem literal [texto]. Execute a direção escolhida [conceito sustentado e relação texto–visual], usando [referências] somente para [ritmo, hierarquia ou técnica], sem copiar [ativos ou composição distintivos de terceiros]. Ativos e papéis [arquivos/versões], hierarquia [ordem], composição [decisão], formato [dimensão], kit do cliente [ID/versão]. Preserve [invariantes] e evite [defeito específico].

Se o conceito estiver aberto, a especialidade explora caminhos que mudem ponto de vista, prova ou mecanismo visual e compara ajuste ao DNA, leitura e viabilidade antes deste prompt. Pare quando houver base para decidir; não mande a ferramenta escolher novamente durante a montagem. Depois, faça inspeção visual e as verificações pertinentes da bancada de código aberto. Código não aprova sozinho a peça.

## Editar ou adaptar um design existente

> No design [ID/versão] do cliente [nome], altere somente [página/elemento] de [estado atual] para [resultado autorizado]. Preserve [texto, marca, fotografia, produto, demais páginas e elementos]. O destino é [canal e formato verificados]; se houver redimensionamento, recomponha [rosto/produto/logo/CTA/área segura].

Discrimine páginas e operações quando houver vários elementos; ajustes independentes podem compartilhar a mesma edição. A responsável segue a transação/confirmação da ferramenta e verifica a mudança no design salvo e na nova exportação. Se a API não permitir a propriedade necessária, mantenha a versão válida e registre o ajuste que precisa do editor. Rascunho não é arquivo salvo.

## Logo novo ou redesenho solicitado

> Desenvolva o logo de [nome exato] para [público/categoria], guiado pelo DNA [arquivo/versão] e pela direção de arte [decisões confirmadas]. A marca precisa transmitir [atributos ligados ao posicionamento] e funcionar em [usos prioritários]. Preserve [elementos do logo anterior, se for redesenho] e evite [semelhanças ou símbolos genéricos identificados]. Resolva [decisão conceitual ainda aberta] explorando construção, tipografia e relação símbolo–nome com racional. Se a direção já estiver escolhida, execute [direção/versão] sem nova exploração. Não invente slogan, selo ou significado não aprovado.

Esse texto é um briefing à especialidade de design, não uma chamada para o gerador entregar sozinho uma identidade. Após selecionar a direção, produza o mestre editável/vetorial quando suportado e confira grafia, escala pequena, uma cor, fundos claros/escuros e aplicações reais. Use raster somente para exploração ou ativos auxiliares; mockup e imagem raster não são mestre vetorial.

## Cena de vídeo novo

> Gere [duração] de vídeo para [objetivo e canal]. Sujeito principal baseado em [referência confirmada], preservando [invariantes]. Quadro inicial [composição], ação [movimento observável], câmera [trajetória], cenário [elementos estáveis], quadro final [estado]. Luz e continuidade [regras]. Áudio/fala [fornecido ou nenhum], conforme a sincronização suportada. Formato [proporção]. Evite mudanças de identidade, objetos aparecendo sem causa, texto distorcido e cortes não pedidos.

A responsável confere quadro inicial, trechos intermediários, final e áudio ouvido na saída real antes de encaminhar à edição.

## Variação de anúncio

> Produza a versão [ID] para [público/situação], com ângulo [hipótese], promessa [texto confirmado], prova [ativo documentado], CTA [texto e destino]. Formato [canal/posicionamento verificado] e elementos de marca [ativos oficiais]. Mantenha [oferta, preço, demais invariantes] e altere apenas [variável definida] quando for teste controlado. Deixe texto exato editável no design quando possível.

Campanha e design conferem especificação atual, leitura móvel, área segura, correspondência com a página e arquivo final; não atribuem desempenho à variante antes de medi-lo.

## Roteiro de Reel

> Escreva o Reel [ID] para [cliente e público em situação concreta]. Objetivo [resultado] e duração [faixa]. Baseie-se em [fontes realmente acessadas], usando [mecanismo narrativo] sem copiar texto ou cenas. Gancho [tensão específica], desenvolvimento [demonstração/prova], recompensa [aprendizado] e CTA [ação existente]. Voz [DNA do cliente]. Entregue fala, ações filmáveis, texto na tela, capa e legenda separadamente. Preserve [fatos e restrições]; não afirme resultados sem prova. Confira se a fala cabe no tempo com pausas.

## Carrossel montado no Canva

> Monte o carrossel [ID] do cliente [nome] no Canva com o kit [ID/nome vinculado a esse cliente] e direção escolhida [template/design aprovado ou conceito]. Destino [canal/formato]. Monte [número] páginas na ordem do mapa: [slide → função → texto final literal → prova/fonte e status → ativo/versão → composição → transição → ordem]. Preserve [termos, marca, preço e CTA confirmados]. Use [arquivos] como conteúdo e [referências] apenas para [estilo permitido]. Mantenha texto editável onde a ferramenta permitir.

O mapa conserva tese, gramática visual, ritmo e prova escolhidos; a montagem não os reinventa. Design salva e confere quantidade/ordem, texto literal, acentuação, cortes, leitura móvel, editabilidade e marca, então entrega link/ID e exportações reais. Se falhar, encaminhe à causa: narrativa, ativo ou composição. Não peça “humanização” por filtros ou texturas.

## Sequência de Stories

> Planeje [quantidade] Stories para [cliente], destinados a [público em situação]. Parta de [momento, pergunta ou detalhe real com fonte] e mostre [observação ou decisão sustentada]. Voz [exemplo aprovado]. Por tela, entregue função, fala ou texto literal, ativo/versão ou captação pendente, composição e transição. Quando útil, indique interação nativa [recurso/opções, área reservada e destino] e devolutiva que [equipe/responsável] possa atender. Não invente mensagem recebida, bastidor, depoimento ou resultado.

Este briefing à especialidade produz roteiro. Se o pedido for Story pronto, passe texto e ativos ao design e confira todas as telas exportadas. Botão, caixa ou enquete desenhados não comprovam recurso funcional: a responsável pela publicação implementa e confere a interação nativa quando isso estiver no escopo. Distinga arquivo pronto de publicação.

Esses padrões não ordenam compra, publicação ou ativação de mídia. Após a execução, registre ferramenta, referências, versão, custo quando houver e rejeições relevantes.

## Diagnóstico da página e antes/proposta em LP

> Analise [URL ou materiais do cliente] para [objetivo e ação]. Registre acesso real, data, amostra e IDs das evidências; separe o que foi observado de hipótese e o que não pôde ser examinado. Para cada prioridade, ligue [evidência] a [obstáculo da jornada] e produza uma mudança concreta de [copy/layout/conteúdo], preservando [DNA, kit e ativos confirmados]. Mostre [trecho/captura original] e [proposta correspondente] no mesmo recorte, com rótulos claros e razão da mudança. Crie [formatos e quantidade pedidos], baseados em [situação do público e prova disponível], e passe às especialidades de produção/revisão. Monte a apresentação em [HTML local ou destino pedido], com cobertura, fontes, comparações, critérios de validação e sequência executável. Não invente métricas nem ganho percentual. Confira arquivo e apresentação desktop/celular; não encerre enquanto faltar formato final autorizado e executável.

Esse é um briefing à coordenação, desdobrado em ações conforme a ferramenta; não envie todas as etapas a um campo de geração. O gerador local organiza dados e imagens selecionados; não faz a pesquisa ou a criação sozinho. Consulte [o diagnóstico](diagnostico-pagina.md) e [o esquema de apresentação](relatorio-cliente.example.json). Cada peça recebe evidência, intenção e relação texto–visual; “premium”, “viral” ou “humanizado” isolados não especificam produção.
