# Bancada de dados para decisões estratégicas

Use `scripts/strategy-tools/strategy-data.mjs` somente quando o cliente fornecer CSV local pertinente à decisão. A bancada usa versões fixadas de [Papa Parse](https://github.com/mholt/PapaParse) para leitura de CSV e [Simple Statistics](https://github.com/simple-statistics/simple-statistics) para estatística descritiva. O código é executado localmente, sem enviar arquivos do cliente a serviço externo. Consulte o README na pasta da bancada para instalação e comandos.

1. Faça `audit` para conhecer colunas, número de linhas, campos ausentes e erros de leitura. Confirme período, unidade, moeda, fuso, definição de conversão e atribuição com o cliente ou exportação; o script não infere esses significados.
2. Faça `summarize` apenas em uma coluna numérica cuja unidade foi confirmada. Ele informa quantidade válida, ausências, soma, média e mediana; IDs e datas não são métricas numéricas.
3. Faça `rate` para comparar grupos usando **soma do numerador / soma do denominador**. Separe períodos e populações que não sejam comparáveis. Nunca calcule média simples das taxas dos grupos para obter a taxa geral.
4. Devolva à síntese a pergunta de decisão, o achado, a fonte, as lacunas e uma explicação alternativa. A coordenação escolhe prioridades por objetivo, capacidade, evidência e custo de erro, não por ranking automático do script.

Não execute a bancada sem dados, para uma arte pontual ou sobre dados de outro cliente. Não grave CSV, linhas individuais ou relatórios com dados privados na base pública. Se Node ou dependências faltarem, use ferramentas de planilha disponíveis para a análise e registre o método realmente aplicado.
