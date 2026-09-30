---
name: atendimento-reputacao
description: "Opere inbox, comentários, avaliações e crises da marca: triagem, resposta, encaminhamento e estado dos casos."
---

# Atendimento e Reputação

## Objetivo

Transforme interações públicas e privadas em atendimento consistente, seguro e mensurável. Use `stories-comunidade` para redação, consultando o DNA existente; `copy-ofertas` para mensagens comerciais novas, `funis-crm-automacao` para leads, `sucesso-cliente` para relacionamento com a conta da agência, `metricas-marketing` para análise de atendimento e `governanca-ativos-lgpd` para risco de dados, acessos ou incidentes, somente conforme a demanda. Consulte [triagem e escalonamento](references/triagem-e-escalonamento.md).

## Entrada automática

Ative para inbox, direct, comentários, avaliações, dúvidas, reclamações, moderação, crise, tempo de resposta, venda pelo atendimento ou acompanhamento recorrente. O usuário não precisa nomear esta skill.

Identifique cliente, canais, horário, responsáveis, tom, informações confirmadas, ofertas vigentes, política de troca, dados que podem ser solicitados e casos que exigem humano. Use `contexto/atendimento-reputacao.md`.

## Fluxo

1. Leia a interação completa e o histórico acessível. Não deduza intenção por uma frase isolada.
2. Classifique: oportunidade, dúvida, suporte, elogio, objeção, reclamação, spam, risco ou crise.
3. Defina prioridade e prazo. Casos de segurança, ameaça, discriminação, exposição de dados, saúde, jurídico, imprensa ou grande repercussão vão para responsável humano.
4. Responda com fato confirmado, próximo passo claro e tom da marca. Nunca invente estoque, prazo, preço, reembolso, política ou solução já executada.
5. Leve dados pessoais e detalhes de pedido para canal privado. Colete apenas o necessário.
6. Registre responsável, estado, tempo, sentimento, tema, resultado e eventual lead no CRM.
7. Quando houver autorização para responder e conta acessível, envie e confirme a publicação. Se o pedido for preparar respostas, entregue rascunhos para avaliação.
8. Identifique padrões recorrentes e envie aprendizados para conteúdo, oferta, produto e sucesso do cliente.

## Operação contínua

Uma conversa aberta não mantém vigilância permanente. Para acompanhamento periódico, configure automação ou rotina explícita com canais, frequência, horário, SLA, critérios de silêncio e casos que geram alerta. Mantenha modo assistido até haver base de respostas aprovada e histórico suficiente; respostas automáticas devem ser limitadas a casos claros e reversíveis.

Não apague comentários, bloqueie pessoas, ofereça compensação, admita responsabilidade, revele dados ou responda a crise sem autorização adequada. Não simule cliente nem publique depoimento sem consentimento.

## Inteligência ampliada

Quando o gatilho da demanda corresponder, a coordenação consulta automaticamente os apoios de `operacao/mapa-inteligencia-github.json`; carregue somente os complementos necessários e mantenha esta skill, o contexto aprovado e as instruções do usuário como autoridade.

- Trate cada interação como um caso com estado, prioridade, sentimento, risco, responsável, prazo e próxima ação. Dê prioridade a risco público, intenção de compra, cliente bloqueado e repetição de problema.
- Separe resposta imediata de solução definitiva. Use somente fatos confirmados, registre o motivo de escalonamento e transforme padrões recorrentes em insumos para conteúdo, oferta, produto e sucesso do cliente.

## Formato padrão de entrega

Entregue fila por prioridade, respostas preparadas ou enviadas, estado, responsável, prazo, casos escalados, leads registrados, padrões observados e recomendações operacionais.

Considere concluído quando cada interação do escopo tiver resposta ou encaminhamento, estado verificável e próximo responsável, e quando riscos relevantes estiverem escalados sem exposição indevida.
