# Operação de tráfego pago no Google Ads

Leia para configurar, publicar, alterar ou otimizar uma conta Google Ads. Aplique a [estratégia e diagnóstico](estrategia-e-diagnostico.md) e os [critérios de aceite](criterios-de-aceite.md) proporcionais ao pedido; registre estado e decisões na [ficha do cliente](../../../../modelos/ficha-campanha-google.md). Não afirme que uma campanha está ativa sem reler seu estado no portal.

Para alterações, pausas e retomadas, aplique [execução e recuperação](execucao-e-recuperacao.md). Registre estado desejado e resultado persistido; confira dependências e nunca repita uma criação ou aumento de verba cuja confirmação se perdeu sem antes verificar seu efeito.

## Conferir conta e objetivo

1. Identifique cliente, ID da conta, moeda, fuso, acesso, cobrança, campanhas já ativas e gasto acumulado no período. Confirme que a conta exibida corresponde ao cliente. Registre oferta, praça, destino, teto autorizado, período e quem atende ou processa a venda.
2. Escolha o tipo de campanha e a estratégia de lances conforme demanda, ativos, dados e opções realmente disponíveis. Para Pesquisa, investigue intenção das consultas, correspondência, termos de pesquisa, exclusões, localização e página correspondente. Para Shopping ou Performance Max, confira feed, ativos, canais e controles pertinentes à conta. Não copie uma estrutura de outra vertical por conveniência.
3. Verifique a ação de conversão usada para otimização, sua classificação como principal/secundária quando aplicável, valor, origem, duplicidade e teste do evento. Confira também metas herdadas, específicas e personalizadas conforme [auditoria do sinal](../../rastreamento-conversoes/references/plano-e-auditoria.md); uma ação secundária em meta personalizada pode participar de lances. Um envio de formulário pode ser apenas proxy de venda; confronte com lead qualificado e CRM. Mudança de objetivo, ação de conversão ou lance altera o aprendizado: registre antes/depois e janela de leitura.

## Limite de gasto

Some gasto já ocorrido, campanhas em andamento e nova verba no mesmo teto do cliente. **Orçamento diário médio não é teto diário rígido**; confirme na ajuda oficial atual como a plataforma pode distribuir gasto e como mudanças de orçamento alteram o limite. Quando o pedido exigir um teto total estrito, use um controle de limite total disponível e adequado ao tipo de campanha, ou mantenha rascunho se o limite não puder ser garantido. Não apresente monitoramento manual futuro como trava automática. Registre moeda, período, mecanismo observado de limitação e pior exposição plausível antes de publicar.

Em revisão de 22/10/2026, a [ajuda sobre mudanças de orçamento](https://support.google.com/google-ads/answer/10487143?hl=en) informa que o limite diário no dia da edição considera o maior orçamento médio escolhido naquele dia. Reduzir depois não desfaz essa exposição. Registre o histórico relevante antes de propor aumento ou afirmar que uma redução restabeleceu o teto. Orçamento total de campanha não pode ser aplicado a uma campanha diária existente por simples troca; confirme elegibilidade na criação e lembre que teto total não é teto diário. Não crie uma substituta automaticamente para contornar essa limitação.

## Prioridade e alocação por canal

Conferido em 19/10/2026: a disponibilidade é gradual e varia por conta e campanha. Confira os controles reais antes de planejar seu uso. Prioridade High/Low pode abranger Pesquisa, Shopping, Performance Max e Demand Gen; Demand Gen ainda não aceita alocação percentual.

Antes de salvar, confira o alcance: padrão da conta, campanha ou orçamento compartilhado. Um padrão pode afetar outras campanhas elegíveis; um orçamento compartilhado aplica o controle ao conjunto vinculado. Altere somente o escopo autorizado e registre antes/depois.

A alocação percentual de canais Low é calculada sobre o orçamento diário médio, não sobre o gasto efetivo. Funciona por melhor esforço e pode ser excedida: **não substitui o teto financeiro aprovado**. Prioridade pode não mudar a distribuição quando o orçamento não limita a campanha. Com orçamento total de campanha, a compatibilidade indicada é apenas Demand Gen.

Na data da revisão, o suporte estava no Google Ads e Search Ads 360; API e Ads Editor permaneciam anunciados para depois. Reconfirme disponibilidade e limitações na [ajuda oficial](https://support.google.com/google-ads/answer/18385152); consulte também o [anúncio de 14/10/2026](https://blog.google/products/ads-commerce/channel-prioritization-budget-allocation/).

## Montar e conferir

- Configure campanha, objetivo, lances, verba, datas, localização, idioma, redes/canais, termos/exclusões quando cabíveis, anúncios e ativos, URL, UTMs e conversões. Faça prévia por formato e compare promessa, página, preço e disponibilidade.
- Verifique políticas e certificações setoriais atuais na região; setores como saúde e finanças podem ter exigências adicionais. Não tente contornar reprovação com grafia, destino oculto ou conta alternativa.
- Antes de publicar, releia conta, teto, gasto acumulado, objetivo, conversão usada para lances, destino funcional, políticas pertinentes e prévias. Depois da ação, releia estado, IDs, verba, data e eventuais avisos ou reprovações; registre na ficha do cliente.
- Na otimização, investigue consultas e intenção, entrega, clique, página, evento, qualidade do lead, venda e gasto marginal antes de alterar lances, público ou criativo. Confira alterações automáticas ou recomendações aplicadas na conta; não aceite recomendações por padrão.

Consulte a documentação oficial atual quando o detalhe importar: [políticas do Google Ads](https://support.google.com/adspolicy/answer/6008942?hl=en), [ações de conversão principais e secundárias](https://support.google.com/google-ads/answer/10995103?hl=en), [gestão de gasto](https://support.google.com/google-ads/answer/1704424?hl=en) e [efeito de mudanças no orçamento](https://support.google.com/google-ads/answer/10487143?hl=en). A interface e a política vigentes para a conta, país e tipo de campanha prevalecem sobre nomes ou limites memorizados.

## Destino e ativos que a automação pode mudar

Na configuração ou alteração de Performance Max/AI Max, confira expansão de URL final, personalização de texto, ativos automáticos e exclusões disponíveis. Um endereço preenchido e uma prévia não garantem que toda entrega use somente aquela página. Em Performance Max, um page feed com expansão ligada não restringe sozinho a entrega à lista fornecida. Se o escopo exige uma única LP, ajuste os controles adequados dentro do mandato e verifique o estado salvo; não dependa de uma suposta lista permitida. Teste destino expandido, parâmetros e redirecionamentos quando disponíveis, e confira a compatibilidade de preço, prova e condições nas páginas elegíveis.

Não desative toda automação por padrão. Escolha recurso por hipótese e restrição da marca, verifique combinações e efeitos compartilhados; se não houver como conferir uma condição indispensável, mantenha a publicação dependente dessa confirmação. Fontes oficiais consultadas em 22/10/2026: [expansão no Performance Max](https://support.google.com/google-ads/answer/14337539?hl=en) e [AI Max e compatibilidade de rastreamento](https://support.google.com/google-ads/answer/15910187?hl=en). Reconfira quando a decisão depender do comportamento atual.
