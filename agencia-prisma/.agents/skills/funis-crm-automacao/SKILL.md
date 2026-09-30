---
name: funis-crm-automacao
description: "Desenhe funis, captura e qualificação de leads, CRM, nutrição e automações de e-mail ou WhatsApp."
---

# Funis, CRM e automação

## Como trabalhar

Mapeie a jornada desde a origem até venda, onboarding, retenção e reativação. Para cada etapa, registre intenção do contato, informação necessária, ação esperada, responsável, canal, prazo, gatilho de entrada, condição de saída e métrica.

Defina um CRM mínimo antes de propor automações. Inclua identificador, origem, consentimento quando aplicável, produto de interesse, etapa, responsável, última interação, próxima ação, data e motivo de perda. Evite campos sem uso operacional.

Desenhe automações como fluxos verificáveis: gatilho, filtros, mensagem, espera, ramificações, limite de frequência, condição de parada, tratamento de erro e registro. Uma resposta humana, conversão, descadastro ou mudança de etapa deve interromper sequências incompatíveis.

Escreva sequências de e-mail e WhatsApp com `copy-ofertas` e `stories-comunidade` quando houver atendimento. Defina páginas e formulários com `paginas-conversao`, eventos com `rastreamento-conversoes`, análise dos resultados com `metricas-marketing` e aquisição com `campanhas-midia` ou `seo-descoberta`.

## Critérios específicos

Não misture lead, oportunidade, cliente e receita. Defina conversão e atribuição. Evite duplicidade por identificadores consistentes e registre a origem sem sobrescrever histórico relevante.

Trate consentimento, preferência de canal, descadastro, retenção de dados e acesso como requisitos do desenho. Verifique regras atuais da plataforma e obrigações aplicáveis antes de configurar um fluxo real. Não afirme conformidade jurídica sem revisão adequada.

## Contexto e entrega

Trabalhe em português brasileiro, salvo pedido diferente. Consulte oferta, capacidade de atendimento, horários, responsáveis e ferramentas existentes. Prefira o fluxo mínimo que a equipe consegue operar.

## Inteligência ampliada

Quando o gatilho da demanda corresponder, a coordenação consulta automaticamente os apoios de `operacao/mapa-inteligencia-github.json`; carregue somente os complementos necessários e mantenha esta skill, o contexto aprovado e as instruções do usuário como autoridade.

- Defina cada etapa com critérios de entrada e saída, campos obrigatórios, proprietário, SLA e destino de exceção antes de automatizar. Combine aderência ao perfil e comportamento de intenção na qualificação.
- Faça fluxos idempotentes: repetição do mesmo evento não pode duplicar mensagens, negócios ou tarefas. Inclua supressão, consentimento, limite de frequência, fallback, recuperação e registro de cada decisão automática.

## Formato padrão de entrega

Inclua, conforme o escopo do pedido: objetivo; mapa da jornada; etapas e critérios; campos do CRM; fontes e destinos dos dados; automações com gatilhos e paradas; mensagens; responsáveis e prazos; eventos e métricas; exceções; requisitos de consentimento e acesso; plano de teste; pendências.

Considere o fluxo pronto para configuração quando entradas, etapas, responsáveis, mensagens, regras de parada, eventos, exceções e teste estiverem definidos. Configuração, importação de contatos e disparos dependem do pedido e da autorização do usuário.

## Decisões de qualidade e execução

Antes de ativação autorizada, verifique reentrada, contatos duplicados, concorrência com resposta humana, fuso e regra de parada. Registre identificador do evento processado para impedir envio duplicado em repetição. Login aberto ou um fluxo desenhado não constitui automação ativa. Se a ferramenta real não estiver conectada, entregue o desenho e o plano de teste, distinguindo configuração de funcionamento.

Modele cada fluxo como estado atual → evento → condição → próximo estado → efeito → registro. Teste caminhos felizes, resposta humana, evento repetido, dados ausentes, atraso, falha parcial, descadastro e reprocessamento. Toda exceção precisa de proprietário e fila visível; automação que falha silenciosamente ou não permite reconstruir o histórico não está pronta para operar.
