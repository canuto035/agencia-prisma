---
name: metricas-marketing
description: "Analise dados de conteúdo, campanhas e conversão para explicar resultados e orientar próximos testes."
---

# Métricas e otimização

## Como trabalhar

Inspecione origem, período, unidade, definição de conversão, atribuição e dados ausentes. Diferencie zero de ausência. Compare períodos equivalentes e explicite mudanças de investimento ou composição.

Calcule CTR como cliques/impressões, CPC como gasto/cliques, CPA como gasto/conversões e ROAS como receita atribuída/gasto. Identifique o tipo de clique e conversão. Denominador zero torna a métrica indefinida. Não chame CPA de CAC sem dados de novos clientes; não chame ROAS de lucro.

Entregue resumo executivo, tabela de métricas, achados, limitações e ações priorizadas. Separe correlação, hipótese e causalidade; não atribua melhoria a uma mudança sem evidência adequada.

Cada recomendação deve apontar dado de origem, hipótese, ação e critério para avaliar o próximo teste. Sem dados, indique a entrada ausente; acione `rastreamento-conversoes` se houver necessidade de planejar, diagnosticar ou corrigir a coleta no escopo. Não crie relatório fictício nem transforme a falta de um CSV em implantação de tags.

Ao planejar mensuração de campanhas ou produção recorrente, defina com `rastreamento-conversoes` um plano mínimo: objetivo, indicador principal, indicadores de diagnóstico, fonte, responsável, frequência, linha de base, meta quando aprovada e decisão que cada indicador pode provocar. Use nomes e parâmetros consistentes para relacionar conteúdo, campanha, página, lead e venda.

Quando receber CSVs locais, consulte a [bancada de dados estratégicos](../coordenacao-agencia/references/bancada-dados-estrategicos.md) para auditar ausências, resumir colunas numéricas e calcular taxas a partir de totais compatíveis. Confira a definição de cada coluna antes de interpretar o resultado; a ferramenta não identifica sozinha conversões, clientes novos ou causalidade.

## Critérios específicos

Ao exibir taxas em porcentagem, multiplique a razão por 100 e informe denominador. Não tire a média simples de taxas de grupos com volumes diferentes: use totais compatíveis. Deduplicate eventos quando houver identificador e método válido; não some alcance entre plataformas como pessoas únicas.

Para Reels, analise retenção, tempo médio, conclusão, compartilhamentos e salvamentos somente quando disponíveis e com a definição da plataforma. Ligue conclusões às ideias e ganchos identificados, devolvendo hipóteses aproveitáveis ao planejamento. Inclua tamanho da amostra e evite rankings misturando durações ou objetivos incompatíveis.

Para carrosséis, Stories, imagens e publicações, relacione o objetivo registrado da peça às métricas realmente disponíveis no canal e à etapa seguinte da jornada. Compare versões e períodos com distribuição comparável, observando posição na sequência, formato, alcance, resposta e conversão sem inventar métricas de slide ou atribuir ganho à direção visual por uma correlação isolada. Devolva à criação um diagnóstico específico: conceito, abertura, prova, ritmo, layout, CTA ou distribuição a testar na próxima peça.

## Contexto e entrega
Trabalhe em português brasileiro, salvo pedido diferente. No projeto Agência Prisma, consulte o briefing e o DNA do cliente quando existirem. Não bloqueie tarefas independentes por documentos ausentes: use hipóteses identificadas e pergunte apenas pelo que muda a entrega.
Quando o usuário pedir arquivos, salve na pasta do cliente com nome descritivo e preserve versões aprovadas. Para tarefas fora deste projeto, use os materiais e o destino disponíveis. Use as especialidades complementares somente quando contribuírem para a entrega; respeite a coordenação e as decisões existentes.

## Inteligência ampliada

Quando o gatilho da demanda corresponder, a coordenação consulta automaticamente os apoios de `operacao/mapa-inteligencia-github.json`; carregue somente os complementos necessários e mantenha esta skill, o contexto aprovado e as instruções do usuário como autoridade.

- Comece pela decisão e construa uma árvore que ligue objetivo, resultado, direcionadores e métricas de proteção. Audite definição, numerador, denominador, janela, moeda, fuso, duplicidade e cobertura antes de interpretar variações.
- Compare coortes e segmentos para evitar médias enganosas. Defina limiares de ação, incerteza e custo de erro; quando causalidade não estiver demonstrada, apresente explicações concorrentes e o teste que as separa.

## Formato padrão de entrega

Inclua, conforme o escopo do pedido: objetivo e plano de mensuração; fontes, período e definições; qualidade e lacunas dos dados; linha de base; métricas com fórmula e denominador; comparação adequada; achados sustentados; hipóteses; ações priorizadas; teste, métrica e critério para cada ação; responsável e data de leitura; limitações. Vincule conteúdos, campanhas e conversões aos identificadores existentes quando disponíveis.

Considere a análise pronta quando cada conclusão pode ser rastreada a um dado e cada recomendação declara o que será testado. Não confunda alcance com pessoas únicas entre plataformas, CPA com CAC ou ROAS com lucro.


## Decisões de qualidade e execução

Conserve dados brutos e identifique arquivo, período, moeda, timezone e regra de atribuição. Faça os cálculos com ferramentas quando houver planilhas ou volume relevante. Uma mudança de 4% para 5% corresponde a 1 ponto percentual e 25% de aumento relativo. Para inferência causal ou dimensionamento de amostra, use ../ab-testing/SKILL.md; taxa maior em amostra pequena pode ser inconclusiva.

Antes de calcular, escreva a pergunta de decisão e fixe população, período, unidade e denominador. Teste se o achado se mantém ao separar segmentos relevantes, mudanças de composição, janela de atribuição, dados ausentes e valores extremos. Quando a média geral contradizer os segmentos, investigue a mistura antes de concluir. Priorize recomendações que mudam uma decisão, não apenas métricas fáceis de obter.
