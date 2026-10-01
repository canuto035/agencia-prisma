---
name: campanhas-midia
description: "Planeje e opere tráfego pago em Meta e Google Ads: pesquisa, públicos, remarketing, funil e orçamento."
---

# Campanhas e mídia paga

## Como trabalhar

Assuma a entrega inteira pedida: diagnóstico, estratégia, configuração, publicação, leitura e otimização quando fizerem parte do comando. Não encerre uma solicitação de execução com um plano se houver acesso e parâmetros para agir. Para operar uma conta, leia o fluxo da plataforma: [Meta Ads](references/operacao-meta-ads.md) ou [Google Ads](references/operacao-google-ads.md). Para outra plataforma, consulte as instruções oficiais atuais antes de configurar; não adapte campos de Meta ou Google por analogia.

Para estratégia nova, auditoria ou decisão de verba, siga [diagnóstico e decisão de mídia](references/estrategia-e-diagnostico.md). Quando uma análise ou produção usar instrução livre, componha um prompt específico do cliente a partir dos [padrões de prompts estratégicos](references/prompts-estrategicos.md); configuração no portal usa campos e parâmetros reais, não um prompt genérico.

Quando mercado, jornada, concorrência ou restrições setoriais puderem mudar a estratégia, a coordenação aciona `pesquisa-mercado` e, para mudanças ao longo do tempo, `inteligencia-competitiva`; passe os achados com fonte, data, região e confiança à decisão de mídia. Desenhe o funil junto de `funis-crm-automacao`, incluindo quem atende, quando e como o lead é qualificado. Não presuma que toda campanha precise de remarketing ou de todas as etapas do funil.

Quando a decisão depender de recurso, política, automação ou comportamento recente da plataforma, aplique o [ciclo de atualização e aprendizado](references/atualizacao-e-aprendizado.md). Verifique a fonte oficial e a disponibilidade na conta; uma novidade anunciada não é função ativada para todos. Reavalie em campanhas novas, auditorias e otimizações relevantes, sem transformar cada ajuste trivial em pesquisa extensa. A skill só faz essa checagem durante uma tarefa ou rotina realmente configurada.

Levante objetivo, oferta, canal e destino. Para plano ou operação de mídia, inclua verba, período e rastreamento disponível. Se dados essenciais ao escopo faltarem, apresente premissas condicionadas, nunca gasto aprovado. Um pedido apenas de criativos não exige definir novo orçamento de mídia.

Organize campanha por hipótese de público e mensagem; conecte cada criativo à página de destino e ao evento de conversão. Proponha distribuição de verba em valores cuja soma confira com o total fornecido.

Para criativos, leia [criação humana e distintiva](../coordenacao-agencia/references/criacao-humana-distintiva.md) e monte uma ficha por conceito: público/situação, ângulo, promessa, prova, formato, posicionamento, destino e hipótese de resultado. Em campanha nova importante, compare conceitos que mudem a observação, demonstração ou prova antes de variar acabamento; uma peça surpreendente sem oferta clara não resolve aquisição. Antes de pedir um lote, selecione uma peça representativa para validar marca, leitura e custo. Ao iterar com dados, diferencie padrão observado de causalidade; preserve os identificadores das peças. Defina evento principal, métricas de diagnóstico, janela de avaliação e critérios de revisão proporcionais ao volume. Não declare vencedor com poucos dados; se não houver base para limiares, explique a incerteza.

Cruze o resultado da plataforma com eventos testados, CRM ou vendas quando existirem; priorize qualidade de lead e lucro viável, não apenas volume ou CPL baixo. Antes de escalar, confira o gasto marginal, a capacidade de atendimento e o teto restante. Cada alteração relevante deve deixar hipótese, evidência, decisão e próxima leitura na ficha do cliente.

Peça formatos realmente adaptados aos posicionamentos, incluindo leitura em celular, abertura do vídeo, áudio e áreas seguras quando pertinentes. Compare anúncio, página e oferta; uma peça bonita com CTA sem destino não está pronta. Verifique políticas e especificações vigentes em fontes oficiais antes de recomendar configurações concretas. Não prometa ROAS ou retorno. Na operação, configure e confira o estado real no portal; planejamento, rascunho, em análise e veiculação são estados distintos.

Antes de apresentar um plano como pronto ou publicar, aplique os [critérios de aceite da campanha](references/criterios-de-aceite.md). Separe lacunas estratégicas que podem virar hipótese de bloqueios operacionais que impedem gasto seguro.

## Critérios específicos

Separe verba de mídia, honorários e produção. Em um plano com datas, confira a correspondência entre orçamento diário e total; registre a moeda. Não escolha segmentação ou evento só por costume: justifique sua relação com a conversão desejada.

Inclua nomenclatura consistente e parâmetros de campanha quando houver destino rastreável. Liste como verificar o evento antes da ativação, sem afirmar que foi testado sem acesso. Considere atraso de atribuição ao avaliar resultados e evite somar receitas atribuídas por plataformas como se fossem vendas únicas.

Para Marketing Studio, UGC, produto ou variações de anúncio no Higgsfield, use `../higgsfield-producao/SKILL.md` com copy, design, revisão e experimento conforme o caso. Defina exatamente o elemento que varia e preserve os demais. Estime o lote completo, valide uma amostra representativa e registre o custo de produção separado da verba de mídia.

## Contexto e entrega
Trabalhe em português brasileiro, salvo pedido diferente. No projeto Agência Prisma, consulte o briefing e o DNA do cliente quando existirem. Não bloqueie tarefas independentes por documentos ausentes: use hipóteses identificadas e pergunte apenas pelo que muda a entrega.
Quando o usuário pedir arquivos, salve na pasta do cliente com nome descritivo e preserve versões aprovadas. Para tarefas fora deste projeto, use os materiais e o destino disponíveis. Use as especialidades complementares somente quando contribuírem para a entrega; respeite a coordenação e as decisões existentes.

## Inteligência ampliada

Quando o gatilho da demanda corresponder, a coordenação consulta automaticamente os apoios de `operacao/mapa-inteligencia-github.json`; carregue somente os complementos necessários e mantenha esta skill, o contexto aprovado e as instruções do usuário como autoridade.

- Monte a matriz público × problema × promessa × prova × formato × canal antes de distribuir verba. Cada conjunto deve testar uma diferença estratégica legível, evitando variações cosméticas sem aprendizado.
- Analise eficiência marginal, frequência, saturação, qualidade pós-clique e capacidade comercial junto do custo por resultado. Defina gatilhos de manter, iterar, reduzir ou interromper com métricas de proteção.
- Derive CAC/CPL suportáveis da margem, conversão comercial e prazo de retorno do cliente quando esses dados existirem; quando não existirem, mostre a conta condicional e qual dado falta. Nunca importe percentuais fixos de distribuição ou escala de um playbook externo como se fossem regra da plataforma.

## Formato padrão de entrega

Inclua, conforme o escopo do pedido: objetivo e evento principal; premissas; estrutura de campanha; matriz público × mensagem × criativo; destino e rastreamento; orçamento por período; métricas de diagnóstico; janela e critérios de avaliação; riscos e pendências. Faça as somas de verba e identifique moeda, honorários e produção separadamente.

Considere o plano pronto para configuração quando oferta, destino, evento de conversão, orçamento, período, peças necessárias e forma de verificar o rastreamento estiverem definidos. Use `rastreamento-conversoes` para implementar e validar a coleta, `funis-crm-automacao` quando o lead atravessar CRM/atendimento e `financeiro-rentabilidade` para separar mídia, produção e margem. Configuração pronta ainda não significa campanha ativada.


## Decisões de qualidade e execução

Antes de propor investimento, confronte capacidade de atendimento, destino e qualidade do evento. Liste condições concretas de pausa e de expansão, sem inventar limiares de desempenho. Mudanças simultâneas de público, oferta e criativo impedem atribuir o resultado a um único fator. Para desenho de teste controlado, leia ../ab-testing/SKILL.md; uma plataforma distribuir mais verba a um criativo não prova causalidade.

Modele pelo menos os cenários conservador, base e favorável quando orçamento ou retorno dependerem de taxas incertas. Mostre quais premissas movem mais o resultado e qual dado deve ser obtido primeiro. Na otimização, investigue separadamente entrega, atenção, clique, página, lead, venda e capacidade de atendimento; não tente resolver todo gargalo trocando apenas o anúncio.
