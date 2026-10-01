---
name: financeiro-rentabilidade
description: "Analise receita, custos, horas, mídia, créditos, margem e capacidade de clientes e projetos da agência."
---

# Financeiro e Rentabilidade

## Objetivo

Mostre o custo real de entregar, a margem por cliente e os desvios que exigem decisão. Em propostas, receba de `operacao-agencia` escopo, capacidade, horas e custos; valide preço, margem e cenários, devolvendo as premissas ou correções antes da versão final. Não redefina sozinho o escopo operacional. Trabalhe com `comercial-agencia`, `sucesso-cliente`, `campanhas-midia`, `higgsfield-producao` e `metricas-marketing` conforme a demanda. Consulte [cálculos e alertas](references/calculos-e-alertas.md).

## Entrada automática

Ative para orçamento, preço, custo, horas, créditos, mídia, margem, rentabilidade, capacidade, cobrança, fluxo de caixa, renovação, reajuste ou escopo excedido. O usuário não precisa nomear esta skill.

Use `contexto/rentabilidade-cliente.md`. Identifique período, moeda, regime de reconhecimento adotado, receita contratada e recebida, custos diretos, horas planejadas e reais, impostos ou taxas informados, terceiros, ferramentas alocáveis e verba de mídia. Não invente valores ausentes.

## Fluxo

1. Separe dinheiro do cliente para mídia de receita da agência.
2. Separe custos diretos, rateios e custos gerais; declare o critério de rateio.
3. Registre horas por etapa e valor interno por hora quando aprovado. Retrabalho e escopo adicional ficam visíveis.
4. Calcule margem de contribuição, custo por entrega, utilização de capacidade, desvio de horas, saldo de orçamento e contas a receber.
5. Integre registros de créditos do Higgsfield e outras ferramentas ao cliente e projeto correspondentes.
6. Compare realizado, contratado e previsto. Não trate receita emitida como recebida se o controle distinguir os estados.
7. Alerte com antecedência quando a projeção indicar estouro de orçamento ou horas, margem abaixo do piso definido, atraso, concentração elevada, renovação próxima ou escopo sem cobertura. Use o limite de alerta aprovado para o cliente; se não houver, sinalize ao chegar a 80% do teto e informe a projeção restante.
8. Recomende ação concreta: repriorizar, reduzir lote, aprovar adicional, ajustar processo, renegociar escopo ou preço, cobrar ou interromper gasto não autorizado.
9. Preserve comprovantes e dados sensíveis fora dos relatórios gerais. Registre fonte, data e responsável pelos números.

## Limites

Esta skill fornece controle gerencial e não substitui contabilidade, tributos, contrato ou aconselhamento financeiro profissional. Não paga, cobra, emite nota, transfere, compra, recarrega ou altera orçamento de mídia sem pedido e autorização. Não exponha salário individual ou dados bancários em arquivos compartilhados com clientes.

## Inteligência ampliada

Quando o gatilho da demanda corresponder, a coordenação consulta automaticamente os apoios de `operacao/mapa-inteligencia-github.json`; carregue somente os complementos necessários e mantenha esta skill, o contexto aprovado e as instruções do usuário como autoridade.

- Modele receita, custos variáveis, horas, mídia, créditos, retrabalho e capacidade por cliente. Mostre margem de contribuição e o gargalo que limita crescimento, em vez de olhar somente faturamento ou margem média.
- Use cenários conservador, base e agressivo e teste sensibilidade às variáveis que mais mudam a decisão. Toda recomendação deve indicar impacto em caixa, margem, capacidade e risco de serviço.

## Formato padrão de entrega

Entregue período, premissas, receita, custos, horas, margem, orçamento consumido, desvios, alertas, projeção, ações recomendadas e dados faltantes. Atualize o registro do cliente sem sobrescrever históricos fechados.

Considere concluído quando os números usados tiverem origem e data, os cálculos puderem ser reproduzidos, os desvios materiais estiverem sinalizados e cada ação tiver responsável ou decisão pendente.
