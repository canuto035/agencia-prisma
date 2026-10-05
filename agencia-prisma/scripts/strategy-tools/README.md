# Dados para estratégia

Esta bancada lê CSVs **locais** de clientes. Instale as dependências fixadas uma vez por máquina com Node.js:

```powershell
Set-Location scripts/strategy-tools
npm ci --ignore-scripts
```

Com um CSV de colunas `canal`, `cliques` e `impressoes`, por exemplo:

```powershell
node strategy-data.mjs audit "C:\\caminho\\dados.csv"
node strategy-data.mjs summarize "C:\\caminho\\dados.csv" cliques dot
node strategy-data.mjs rate "C:\\caminho\\dados.csv" canal cliques impressoes dot
```

Use `comma` no último argumento quando os números tiverem vírgula decimal e ponto de milhar; use `dot` para ponto decimal e vírgula de milhar. Para `rate`, informe colunas de **contagens** não negativas: o programa soma numeradores e denominadores antes de dividir. Linhas com grupo ou valores ausentes ficam fora da taxa e são contadas; zeros permanecem válidos. Erros de leitura ou valores numéricos inválidos interrompem o cálculo.

O programa não descobre a definição das colunas, não demonstra causalidade e não ordena prioridades automaticamente. Confira período, moeda, fuso, atribuição, população e duplicidade antes de interpretar. Não envie CSVs de clientes para o GitHub.

Projetos copiados recebem código e lockfile; execute `npm ci --ignore-scripts` na outra máquina antes do primeiro uso. Fontes: [Papa Parse (MIT)](https://github.com/mholt/PapaParse) e [Simple Statistics (ISC)](https://github.com/simple-statistics/simple-statistics).
