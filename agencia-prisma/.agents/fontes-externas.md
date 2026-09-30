# Complementos externos revisados

Consulta e adaptação em 11/09/2026. Repositório: https://github.com/coreyhaines31/marketingskills
Commit fixado: 5b2c0007766c6a1cf1d53fd8fc73e979e0821022. Licença MIT, Copyright (c) 2025 Corey Haines, incluída nas duas skills.

Foram baixadas pelo instalador oficial as pastas skills/ab-testing e skills/customer-research para revisão. Apenas as instruções adaptadas e licenças entram no catálogo ativo; nenhuma CLI, servidor, chave, hook, conta ou dependência do repositório foi instalada. O código do repositório não foi executado.

O material bruto contém simplificações que não foram aceitas: interpretação de significância como chance de resultado aleatório; metas genéricas de volume e ganhos; confiança qualitativa por contagem rígida; pedido obrigatório de escolha de entregável. As versões locais corrigem esses pontos e usam os caminhos e especialidades da agência.

Fontes de orientação:
- Skills e descoberta local: https://developers.openai.com/codex/skills/
- Configuração: https://developers.openai.com/codex/config-reference/
- Teste de hipótese e erro tipo I: https://www.itl.nist.gov/div898/handbook/prc/section2/prc22.htm
- Conteúdo gerado com IA e utilidade: https://developers.google.com/search/docs/fundamentals/using-gen-ai-content

A configuração Astra/Ultra foi conferida no catálogo local de modelos e aceita pelo parser do Codex instalado. A tabela pública de configuração consultada ainda enumera níveis até xhigh; o suporte a Ultra foi confirmado localmente, não inferido daquela tabela.

## Auditoria GitHub de 15/09/2026

Foram revisadas as seguintes fontes públicas, no estado observado em 15/09/2026:

- `coreyhaines31/marketingskills`, revisão `5b2c000`, licença MIT: arquitetura de contexto central, relações entre especialidades e métodos de marketing.
- `openai/skills`, revisão `49f948f`: estrutura de skills, metadados, recursos por demanda e validação. O próprio repositório está depreciado e informa licenças por pasta; nenhum arquivo foi importado.
- `anthropics/skills`, revisão `34040c9`: divulgação progressiva, descrições de acionamento e testes. As licenças variam por pasta; nenhum arquivo foi importado.
- `obra/superpowers`, revisão `b36e082`, licença MIT: verificação baseada em evidência e ciclos de correção.

A Agência Prisma incorporou apenas sínteses próprias nos 33 arquivos `SKILL.md` e uma referência compartilhada da coordenação. Nenhum código, hook, plugin, CLI, pacote ou dependência desses repositórios foi instalado ou executado. O mapa `operacao/mapa-inteligencia-github.json` registra o roteamento; auditorias anteriores permanecem no backup da pasta principal.

## Orquestração sob demanda

O arquivo `operacao/mapa-inteligencia-github.json` conecta as 33 skills locais a 48 complementos de `coreyhaines31/marketingskills`, usando URLs fixadas na revisão `5b2c0007766c6a1cf1d53fd8fc73e979e0821022`. A consulta ocorre somente quando o gatilho da demanda corresponder e normalmente carrega no máximo três referências.

Os complementos são consultivos. As instruções do usuário, o contexto aprovado do cliente e as skills locais prevalecem. Conteúdo externo não autoriza instalação, execução, envio, publicação, credencial, gasto ou alteração de conta. Nenhum arquivo executável externo foi incorporado.

