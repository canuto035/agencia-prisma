---
name: paginas-conversao
description: "Crie páginas de conversão ou apresentações de diagnóstico em LP, com evidências, antes/proposta e plano de melhorias."
---

# Páginas de conversão

## Como trabalhar

Primeiro diferencie a entrega: **LP de diagnóstico/apresentação** mostra pesquisa, estado atual e melhorias propostas ao cliente; **página comercial** conduz o visitante a uma conversão. Para pesquisa da página do cliente → antes/depois → apresentação em LP, leia [LP de diagnóstico e antes/depois](references/lp-diagnostico-antes-depois.md) e receba de `referencias-conteudo` o acesso e a evidência reais. Nesse modo, o objetivo principal é compreender e avaliar as recomendações; formulário, CRM, pixels, implantação do site do cliente e publicação só entram quando o pedido também os incluir.

Para a página comercial, comece por oferta, público, origem do tráfego, estágio de consciência, ação principal e destino do lead. Uma página deve ter uma conversão principal. Ações secundárias só entram quando reduzem fricção sem competir com o objetivo.

Crie a arquitetura da página antes do texto final: promessa responsável, contexto, problema, mecanismo, benefícios, prova, oferta, objeções, perguntas frequentes, CTA e rodapé. Ajuste a ordem ao nível de consciência e não aplique uma fórmula fixa quando o caso exigir outra sequência.

Defina campos do formulário, mensagem de consentimento, confirmação, encaminhamento e tratamento de erros. Solicite apenas dados necessários para a finalidade declarada. Conecte formulário, CRM ou WhatsApp por meio de `funis-crm-automacao` e defina e valide eventos com `rastreamento-conversoes`; use `metricas-marketing` para interpretar os resultados.

Em correções pontuais de uma página pronta, preserve oferta, identidade e integrações aprovadas; revise somente o trecho e os fluxos afetados. Quando o usuário pedir a página pronta, use a ferramenta de criação de sites disponível e confira o fluxo em diferentes tamanhos de tela. Trabalhe com `copy-ofertas`, `design-grafico`, `dna-marca` e `revisao-conteudo`; com `campanhas-midia` quando houver tráfego pago.

Se o Higgsfield for escolhido para site ou aplicativo, leia `../higgsfield-producao/SKILL.md` e carregue as instruções obrigatórias do fluxo antes de criar. Quando a ferramenta exigir distinguir site simples de aplicativo integrado, use a escolha explícita do usuário ou pergunte se o pedido for ambíguo. Criação e implantação são estados diferentes; mantenha custo e publicação dentro do escopo autorizado.

## Critérios específicos

Garanta hierarquia clara, CTA identificável, contraste, navegação por teclado, textos alternativos, rótulos de formulário, estados de foco e mensagens de erro compreensíveis. Otimize mídia sem destruir qualidade nem distorcer ativos.

Não publique depoimentos, números, selos, escassez, garantias ou afirmações sem fonte e aprovação. Para requisitos legais e privacidade, registre a necessidade de revisão responsável; não apresente o texto como parecer jurídico.

## Contexto e entrega

Trabalhe em português brasileiro, salvo pedido diferente. Consulte briefing, DNA, oferta e destino de conversão. Se faltar prova ou condição comercial, use marcador explícito em vez de inventar.

## Inteligência ampliada

Quando o gatilho da demanda corresponder, a coordenação consulta automaticamente os apoios de `operacao/mapa-inteligencia-github.json`; carregue somente os complementos necessários e mantenha esta skill, o contexto aprovado e as instruções do usuário como autoridade.

- Avalie correspondência entre origem do tráfego, intenção, promessa da primeira dobra, prova e chamada. Mapeie fricções de compreensão, confiança, esforço, risco e distração em ordem de impacto provável.
- Teste escaneabilidade em celular, clareza em poucos segundos e custo de cada campo ou etapa. Converta recomendações em hipóteses priorizadas, com métrica, proteção, esforço e evidência necessária.

## Formato padrão de entrega

Para LP de diagnóstico, entregue síntese, cobertura real da pesquisa, evidências e fontes datadas, comparação entre antes original e depois proposto, recomendações priorizadas, conteúdo sugerido, roteiro de execução e pendências. Confira o HTML ou a prévia em celular e desktop. Se faltar a URL ou o original, identifique o arquivo como estrutura demonstrativa; uma demonstração não comprova análise de cliente.

Inclua, conforme o escopo do pedido: objetivo e origem do tráfego; público e estágio; arquitetura da página; copy por seção; CTAs; prova e pendências; formulário e pós-conversão; eventos de mensuração; direção visual; requisitos de acessibilidade; arquivos ou endereço de prévia; resultado da conferência.

Considere a página comercial pronta para avaliação quando oferta, CTA, formulário, pós-conversão, eventos, acessibilidade e conteúdo verificável estiverem definidos. Uma estrutura textual não equivale a uma página implementada ou publicada. A LP de diagnóstico só fica pronta quando os achados podem ser rastreados, as propostas estão identificadas e o arquivo final foi inspecionado; publicar continua sendo um estado distinto.

## Decisões de qualidade e execução

Teste o caminho real do CTA, validação do formulário, estado de erro, confirmação e destino do lead; não simule sucesso quando não há integração. Uma prévia pode funcionar com formulário demonstrativo claramente identificado, mas a entrega deve declarar o limite. Em melhoria de conversão, priorize atrito observado e adequação da oferta antes de cosmética; use ../ab-testing/SKILL.md quando houver tráfego para teste.

Faça o teste de correspondência: a primeira tela deve continuar a promessa e o nível de consciência do anúncio, busca ou mensagem que trouxe a pessoa. Ordene seções pela próxima dúvida real, não por modelo decorativo. Revise a página como jornada completa — origem, carregamento, compreensão, prova, ação, erro, confirmação e atendimento — e localize onde a intenção pode ser perdida.
