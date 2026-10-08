# Apresentação local de diagnóstico

Gera um único HTML responsivo com cobertura, melhorias por prioridade, antes/proposta, amostras de conteúdo, sequência de execução e fontes. Funciona offline; não pesquisa páginas, não envia dados nem publica. Usa Node.js e bibliotecas nativas, sem instalar dependências.

```powershell
node scripts/client-report/render-report.mjs clientes/cliente/entregas/diagnostico/relatorio.json clientes/cliente/entregas/diagnostico/index.html
```

Crie primeiro a pasta de destino. A saída precisa ser nova: o gerador recusa sobrescrever arquivos. Para revisar, use uma nova versão ou remova explicitamente uma saída temporária do teste. Abra no navegador externo e confira desktop e celular. O HTML é editável como código; não é um design editável no Canva.

## Dados e evidências

Use [modelos/relatorio-cliente.example.json](../../modelos/relatorio-cliente.example.json) como esquema. O exemplo inteiro é fictício. Em relatório real, substitua todos os campos, defina `demo: false`, use fontes reais e confirme que nenhum trecho da demonstração sobrou. O validador verifica tipos, IDs e vínculos; não verifica se uma afirmação é verdadeira.

- Campos gerais: `client`, `title`, `date` (AAAA-MM-DD), `summary`, `goal`, `nextStep`, `demo`. `brand.accent` é opcional e aceita `#RRGGBB`. O estilo padrão é neutro de apresentação, não kit aprovado do cliente; personalize conforme o contexto. Confira contraste ao trocar cores.
- `coverage`: área, estado (`observado`, `parcial`, `indisponível` ou `demonstração`) e detalhe. `limits` é lista opcional de limitações.
- `evidence`: ID único, rótulo, detalhe, data/recorte e tipo (`observado`, `relato`, `dado`, `hipótese`, `demonstração`). Observado requer `url` HTTP(S) ou `artifact` identificado. Não inclua tokens, contatos privados nem caminhos absolutos do computador. Uma URL não comprova inspeção; registre a observação de fato obtida.
- `improvements`: ID, título, IDs de evidência, antes, depois, razão/hipótese, prioridade (`Agora`, `Próximo`, `Depois`), esforço, responsável e critério de verificação. Não converta essas prioridades editoriais em prazo ou impacto garantido.
- `comparisons`: título, IDs de evidência, `status: proposta`, antes e depois com título/corpo e CTA opcional, mudanças concretas. O antes usa captura/trecho real acessado; uma síntese textual precisa estar indicada e ligada à fonte. Não recrie uma captura original com gerador ou layout fictício. Acesso parcial precisa dessa indicação no texto. Esta versão é para diagnóstico/propostas; relatório de resultados implementados deve ter sua evidência e formato próprios.
- `content`: formato, título, insight, IDs de evidência, `status: proposta`, telas com rótulo/texto/visual. São amostras editoriais; peças finais solicitadas precisam ser produzidas e conferidas na ferramenta de design.
- `roadmap`: fase, ação, responsável e critério de conferência. Lista vazia é válida se não fizer parte do escopo.

## Imagens e compartilhamento

`before.image` e `after.image` aceitam caminhos relativos de PNG/JPEG/WebP dentro da pasta do JSON; informe `alt`. Selecione e copie somente os ativos pertinentes para essa pasta (por exemplo `assets/antes.png`). Original e proposta devem mostrar o mesmo recorte, escala e dispositivo; o gerador não ajusta isso sozinho. SVG, caminhos que escapam dessa pasta e links externos de imagem são rejeitados. Limites: 5 MB por imagem, aproximadamente 20 MB no conjunto; JSON até 1 MB.

As imagens são embutidas no HTML, que pode ser enviado como arquivo único pelo destino autorizado. Fontes externas só são acessadas quando o leitor abre um link. O relatório não carrega fontes remotas, scripts de terceiros ou analytics. `noindex` não é controle de acesso; dados privados não devem ir a hospedagem pública. PDF opcional pode ser exportado pelo navegador, com revisão visual da impressão; não é criado por este comando.

## Validação

```powershell
node --test scripts/client-report/render-report.test.mjs
```

Os testes conferem referências, rótulos, conteúdo escapado, rejeição de URL ativa e de caminho de imagem fora da pasta e proteção de sobrescrita. Abra o HTML final para verificar apresentação e interação; testes de estrutura não aprovam design.
