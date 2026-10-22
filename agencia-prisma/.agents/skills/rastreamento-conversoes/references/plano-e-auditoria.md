# Plano e auditoria de mensuração

## Cadeia mínima

Origem → campanha/UTM → página → ação → evento → plataforma → CRM → venda → receita.

Para cada evento, registre nome, descrição, gatilho exato, parâmetros, plataforma de destino, deduplicação, consentimento, responsável e evidência. Um teste completo confirma o evento na origem, no depurador ou diagnóstico e no relatório ou sistema receptor.

## Estados

- planejado: existe apenas no documento;
- configurado: regra criada, ainda sem publicação;
- publicado: alteração ativa, ainda sem teste completo;
- validado: teste observado com parâmetros corretos;
- degradado: funciona parcialmente ou com diagnóstico;
- bloqueado: falta acesso, consentimento, desenvolvimento ou decisão.

## Auditoria

Confira domínios, IDs, versões, tags duplicadas, UTMs, eventos recomendados, moeda e valor, cross-domain, consentimento, exclusão de tráfego interno, conversões primárias, CAPI/servidor, deduplicação, importação offline e ligação com o CRM. Registre o que foi realmente acessado.

## Sinal recebido versus sinal usado para otimizar

Em mídia paga, devolva a campanhas uma evidência separada para cada ponto: evento recebido, evento semanticamente correto, ação usada para lances nesta campanha e valor/contagem que representam. Um clique no WhatsApp não comprova conversa, formulário enviado não comprova lead qualificado, início de checkout não comprova pagamento.

No Google Ads, confira metas herdadas da conta, metas específicas da campanha e metas personalizadas, além da classificação principal/secundária de cada ação. A [documentação oficial](https://support.google.com/google-ads/answer/11461796?hl=en), consultada em 22/10/2026, esclarece que uma ação secundária incluída em meta personalizada pode participar dos lances. Portanto, mudar só o rótulo não comprova que foi removida da otimização. Antes de alterar metas compartilhadas, identifique campanhas afetadas e preserve aquelas fora do escopo.

Compare fontes que representam a mesma venda, como tag nativa e importação de Analytics, e a regra de contagem. Não presuma deduplicação entre ações independentes nem desative todas por aparência semelhante. Para navegador/servidor, verifique as chaves e regras atuais da plataforma e se a mesma ação comercial foi contada uma vez. Deduplicar transporte não elimina automaticamente duplicidade entre objetivos.

Quando o valor alimentar lances, registre se é receita, contribuição ou pontuação estimada. Não misture essas unidades; valor atribuído a um lead não é faturamento. Defina atualização do estado comercial, taxa de vinculação, atraso de envio, rejeições e responsável por falhas. Um upload aceito não comprova correspondência, inclusão em relatório ou uso em lances.

Para cancelamentos, devoluções ou correções de valor, reconcilie primeiro com pedidos/CRM. [Ajustes de conversão no Google](https://support.google.com/google-ads/answer/7686447?hl=en) distinguem alteração de valor de retirada da conversão. Confira suporte, identificadores, prazo e consequências atuais antes de envio autorizado; não reapresente vendas como novas para forçar números a fechar. Preserve a trilha original e o estado da correção.
