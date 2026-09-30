---
name: rastreamento-conversoes
description: "Planeje, implemente ou audite UTMs, eventos, pixels, tags e conversões entre site, anúncios e CRM."
---

# Rastreamento e Conversões

## Objetivo

Transforme objetivos comerciais em eventos verificáveis e uma cadeia de atribuição auditável. Trabalhe com `paginas-conversao`, `campanhas-midia`, `funis-crm-automacao`, `metricas-marketing` e `governanca-ativos-lgpd` quando houver dados pessoais ou consentimento. Leia [plano e auditoria](references/plano-e-auditoria.md) quando houver implementação ou diagnóstico técnico.

## Entrada automática

Ative quando o pedido mencionar pixel, tag, GA4, Tag Manager, CAPI, conversão, UTM, formulário, origem de lead, atribuição, evento, venda offline, divergência entre plataformas ou campanha sem medição. O usuário não precisa nomear esta skill.

Identifique negócio, canais, domínio, ações importantes, ferramentas atuais, responsável técnico, ambiente de teste e acesso realmente disponível. Use `contexto/plano-mensuracao.md` do cliente. Separe planejado, configurado, publicado e validado.

## Fluxo

1. Defina a decisão que cada dado precisa apoiar. Evite coletar eventos sem uso.
2. Mapeie a jornada da impressão ou origem até receita, incluindo identificadores e passagem ao CRM.
3. Crie taxonomia estável: evento, gatilho, parâmetros, valor, moeda, origem, destino, proprietário e critério de sucesso.
4. Planeje UTMs com nomes controlados. Não use dados pessoais em URLs.
5. Defina tags de navegador e, quando adequado, integrações de servidor, conversões aprimoradas ou importação offline. Documente consentimento, base operacional e minimização de dados; não invente conformidade jurídica.
6. Evite contagem duplicada. Registre `event_id`, fonte e janela quando a mesma conversão segue por navegador e servidor.
7. Implemente somente nas contas e ambientes acessíveis e dentro da autorização do pedido. Preserve versões e exporte configuração antes de mudanças relevantes quando a ferramenta permitir.
8. Valide em ambiente de teste e depois no destino real: disparo único, parâmetros, consentimento, recebimento, diagnóstico da plataforma e chegada ao relatório ou CRM.
9. Registre evidência, horário, versão, limitações e responsável. A ausência de erro visual não comprova coleta.

## Qualidade e segurança

Não publique tags em produção só porque o plano está pronto. Não exponha tokens, IDs privados ou dados pessoais nos arquivos gerais da agência. Nunca descreva uma conversão como validada sem uma ação de teste observada de ponta a ponta. Divergências entre plataformas podem refletir janelas, atribuição, modelagem, consentimento e fuso; investigue antes de declarar falha.

Use nomes recomendados pela plataforma quando existirem. Priorize eventos ligados a receita ou avanço real: lead qualificado, agendamento, compra, pagamento aprovado, renovação. Cliques e rolagem podem apoiar diagnóstico, mas não substituem resultado comercial.

## Inteligência ampliada

Quando o gatilho da demanda corresponder, a coordenação consulta automaticamente os apoios de `operacao/mapa-inteligencia-github.json`; carregue somente os complementos necessários e mantenha esta skill, o contexto aprovado e as instruções do usuário como autoridade.

- Trabalhe de trás para frente: decisão de negócio → pergunta → evento → propriedades → origem → destino → responsável. Use taxonomia consistente e contrato de dados com definição, tipo, obrigatoriedade e regra de qualidade.
- Valide disparo, parâmetros, consentimento, deduplicação, identidade, fuso, moeda e reconciliação com o sistema de venda. Uma tag presente só conta como concluída quando o evento correto chega ao destino e pode ser auditado.

## Formato padrão de entrega

Entregue objetivo, mapa da jornada, tabela de eventos, convenção UTM, ferramentas e acessos, plano de implementação, testes executados, evidências, lacunas e próxima verificação. Atualize o modelo do cliente.

Considere concluído quando o escopo solicitado estiver documentado e, se a implementação foi pedida, cada evento essencial tiver estado real e evidência suficiente: configurado, publicado, validado ou bloqueado com motivo preciso.
