---
name: ab-testing
description: "Planeje e avalie testes A/B de anúncios, páginas e mensagens com hipótese, métrica e regra de decisão."
license: MIT
---

# Experimentos de Marketing

## Entrada e método

Consulte o dossiê do cliente, a decisão a tomar, a linha de base e os dados disponíveis. Defina hipótese, mudança, público elegível, unidade de randomização, métrica principal, métricas de proteção, distribuição, duração e regra de encerramento antes da execução.

Escolha uma mudança por teste quando o objetivo for identificar seu efeito. Um teste de conceito completo pode combinar mudanças, mas a conclusão vale para o conjunto. Testes fatoriais exigem volume e desenho apropriados. Duas postagens orgânicas em dias distintos normalmente são comparação observacional; não as anuncie como A/B causal.

## Volume e análise

Calcule a amostra com método identificado, taxa de base, efeito mínimo detectável absoluto ou relativo, poder, nível de significância e número de comparações. Não use tabelas genéricas como garantia. Verifique distribuição das amostras, perdas, rastreamento, contaminação e diferenças de exposição antes de interpretar.

Para plano de horizonte fixo, não encerre por olhar repetidamente significância; métodos sequenciais exigem regra específica. Falha técnica ou dano nas métricas de proteção pode justificar interrupção registrada. Se não houver volume suficiente, proponha entrevista, avaliação de usabilidade ou teste exploratório e marque a limitação.

Apresente tamanho do efeito, intervalo de confiança, contagens e método realmente calculados. Um p-valor não é a probabilidade de a hipótese nula ser verdadeira nem a chance de o resultado ser aleatório. Ausência de significância não prova igualdade; efeito estatístico não garante relevância comercial. Não multiplique ganhos de testes distintos como receita comprovada.

## Integração

metricas-marketing prepara dados e métricas; copy-ofertas, design-grafico e paginas-conversao produzem variantes; campanhas-midia define a operação autorizada. Priorize pelo gargalo, evidência, esforço e capacidade, sem metas universais de quantidade de experimentos.

## Inteligência ampliada

Quando o gatilho da demanda corresponder, a coordenação consulta automaticamente os apoios de `operacao/mapa-inteligencia-github.json`; carregue somente os complementos necessários e mantenha esta skill, o contexto aprovado e as instruções do usuário como autoridade.

- Registre antes do teste a decisão que será tomada, hipótese, unidade de exposição, métrica principal, métricas de proteção, população, janela e regra de parada. Não escolha a regra depois de olhar o resultado.
- Verifique contaminação entre variantes, novidade, sazonalidade, múltiplas comparações e perda de dados. Se o volume não sustentar inferência, trate o teste como aprendizado direcional e recomende a próxima coleta.

## Formato padrão de entrega

Inclua conforme o pedido: decisão, hipótese, desenho, amostra, duração, variantes, evento, proteções, método, resultados calculados, incerteza e próxima decisão. Registre aprendizados em contexto/aprendizados.md do cliente.

Considere o plano pronto quando houver hipótese testável, métrica, divisão, volume, evento verificável e regra de parada. Uma análise só está concluída quando os dados permitem ou limitam explicitamente a conclusão; nunca declare vencedor sem suporte.

## Decisão sob incerteza

Defina antes do teste qual menor efeito mudaria a decisão e qual é o custo de falso positivo e falso negativo. Na leitura, teste se a conclusão muda com janela de atribuição plausível, perdas, valores extremos ou segmentos definidos previamente. Quando o resultado for inconclusivo, escolha entre coletar mais dados, aceitar equivalência dentro de margem apropriada ou encerrar por baixo valor esperado; não recomende “testar mais” automaticamente.

## Origem

Adaptação revisada da skill ab-testing do repositório coreyhaines31/marketingskills, commit 5b2c0007766c6a1cf1d53fd8fc73e979e0821022. Licença preservada em [LICENSE](LICENSE). A versão local corrige a interpretação de p-valor e remove metas genéricas. Consulte [o registro de fontes](../../fontes-externas.md) para rastreabilidade.
