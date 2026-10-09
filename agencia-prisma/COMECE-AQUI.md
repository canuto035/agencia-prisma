# Agência Prisma — comece aqui

Abra a pasta principal **Agencia-Prisma** como projeto no Codex, diga o nome do cliente, envie os links e arquivos disponíveis e peça a entrega. Não abra apenas `clientes/<identificador>/` como projeto isolado: a entrada e as skills da agência estão na pasta principal. A coordenação escolhe as especialidades necessárias, produz e revisa. Não é preciso citar skills ou comandos.

Se esta base foi instalada como skill global, você também pode chamá-la de qualquer projeto com `$agencia-prisma`. Nesse caso, os arquivos do cliente ficam no projeto em uso ou no destino que você indicar, nunca dentro da pasta de instalação da skill.

Após a primeira ativação, os próximos pedidos de marketing e ajustes seguem pela Prisma sem repetir o nome. Em outro projeto, o coordenador usa [o ativador](scripts/Ativar-Prisma-No-Projeto.ps1) para registrar esse método em um bloco das instruções, preservando o texto e guardando backup. Ele usa `AGENTS.override.md` quando existir; caso contrário, `AGENTS.md`. Isso permite recuperar a coordenação em outras conversas do mesmo projeto enquanto a skill estiver disponível. Você também pode pedir uso apenas nesta conversa ou remoção desse bloco.

Comando único para começar: **“Prisma, cliente [nome]: [entrega desejada]. Referências: [links ou arquivos].”**

Exemplos de pedido: “Analisa estes links e cria cinco Reels para a Loja X”; “Monta um carrossel com as fotos do cliente Y”; “Cria uma campanha de aquisição com peças, página, rastreamento e plano de mídia”.

Os trabalhos ficam separados em clientes/<identificador>/. Para iniciar outro cliente nesta base, peça “inicia o cliente [nome]”. Para criar uma base independente, peça “cria uma nova base da agência em [pasta]”. O utilitário copia instruções e modelos, sem os clientes e sem o histórico de manutenção.

## Como a operação funciona

As 33 especialidades permitem seleção implícita, e o `AGENTS.md` encaminha os pedidos à coordenação. A lista inicial de skills do Codex tem limite de espaço; se alguma descrição não aparecer, o coordenador ainda pode ler o arquivo da especialidade pelo mapa da agência. O verificador local confirma arquivos e configuração, não comprova que uma sessão aplicou uma skill. Skills são instruções especializadas; não são agentes permanentes nem garantem uma ferramenta conectada. A configuração local solicita Astra/Ultra quando carregada pelo Codex, mas o modelo efetivo depende da sessão.

Durante a execução, cada etapa devolve o controle à coordenação, que confere o resultado e segue para a próxima etapa autorizada sem esperar um novo comando. Correções e perguntas de status mantêm o restante do pedido em andamento. Se a conversa foi interrompida ou fechada, ao retomá-la informe o cliente e a demanda quando não estiverem claros; a coordenação localiza a seção certa em `contexto/entregas-em-andamento.md`, confere os arquivos reais e segue do primeiro item viável. Várias demandas do mesmo cliente ficam separadas; um bloqueio continua pendente até ser resolvido. Esse registro mantém a continuidade entre conversas; não executa tarefas sozinho enquanto o chat está fechado.

Higgsfield, Canva, Google Drive e outras integrações são conferidos quando necessários. A conexão, o saldo e o custo precisam ser verificados na sessão real. Nenhuma geração paga, publicação ou envio é presumido. O orçamento aprovado do cliente orienta o uso de créditos. Links de vídeo são analisados até o nível que o acesso permitir; capa e título não equivalem a assistir ao vídeo.

Esta base recebe verificações estruturais e testes controlados em cada atualização relevante. Serviços, preços, recursos e políticas externos podem mudar e devem ser verificados no momento do uso. Uma cópia baixada não se atualiza sozinha.

Para artes locais em SVG/PNG, a coordenação pode usar a [bancada de composição e verificação](scripts/design-tools/README.md): o designer define conteúdo, ativos, fontes e composição de cada cliente, renderiza e confere as páginas. As dependências precisam ser instaladas uma vez por máquina. O mestre JSON permite reproduzir a peça; o SVG exportado tem letras em contornos. Pedidos de arquivos editáveis no Canva seguem o fluxo do Canva.

## Atualizar cópias antigas

Cada cópia da Agência Prisma em outro computador é independente. Envie ao dono o ZIP mais recente, peça que o extraia em uma pasta separada e que abra o projeto no Codex com o pedido: “Atualize minha cópia antiga da Agência Prisma usando este pacote; faça a prévia, preserve meus clientes e aplique o atualizador”. O utilitário [Atualizar-Projeto.ps1](scripts/Atualizar-Projeto.ps1) reconhece cópias antigas, guarda backup das instruções substituídas e não toca nos arquivos dos clientes nem na configuração local já existente do Codex. O dono precisa ter acesso à pasta antiga e ao pacote na própria máquina; apenas atualizar o Drive não modifica projetos já distribuídos.

Depois da atualização, inicie uma **nova conversa** com a pasta principal aberta para carregar as instruções novas. Em uma conversa que já estava aberta, peça explicitamente para reler `AGENTS.md` e a skill de coordenação antes de continuar; não presuma que uma alteração no disco mudou as instruções já carregadas naquela sessão.

## Catálogo

| Skill | Especialidade |
|---|---|
| `ab-testing` | Experimentos de Marketing |
| `atendimento-reputacao` | Atendimento e Reputação |
| `briefing-cliente` | Briefing do Cliente |
| `campanhas-midia` | Campanhas e Mídia |
| `carrosseis` | Carrosséis |
| `comercial-agencia` | Comercial da Agência |
| `coordenacao-agencia` | Coordenação da Agência |
| `copy-ofertas` | Copy e Ofertas |
| `customer-research` | Pesquisa com Clientes |
| `design-grafico` | Design Gráfico |
| `direcao-arte` | Direção de Arte |
| `dna-marca` | DNA de Marca |
| `ensaios-fotograficos` | Ensaios Fotográficos |
| `financeiro-rentabilidade` | Financeiro e Rentabilidade |
| `funis-crm-automacao` | Funis, CRM e Automação |
| `governanca-ativos-lgpd` | Governança, Ativos e LGPD |
| `higgsfield-producao` | Produção com Higgsfield |
| `imagens-marketing` | Imagens de Marketing |
| `inteligencia-competitiva` | Inteligência Competitiva |
| `metricas-marketing` | Métricas de Marketing |
| `operacao-agencia` | Operação da Agência |
| `paginas-conversao` | Páginas de Conversão |
| `pesquisa-mercado` | Pesquisa de Mercado |
| `planejamento-editorial` | Planejamento Editorial |
| `producao-video` | Produção de Vídeo |
| `publicacao-distribuicao` | Publicação e Distribuição |
| `referencias-conteudo` | Referências de Conteúdo |
| `rastreamento-conversoes` | Rastreamento e Conversões |
| `revisao-conteudo` | Revisão de Conteúdo |
| `roteiros-reels` | Roteiros de Reels |
| `seo-descoberta` | SEO e Descoberta |
| `stories-comunidade` | Stories e Comunidade |
| `sucesso-cliente` | Sucesso do Cliente |

## Materiais úteis

- [Mapa das especialidades](MAPA-DA-AGENCIA.md)
- [Decisões para o gestor](DECISOES-DO-GESTOR.md)
- [Fluxo de produção criativa](.agents/skills/coordenacao-agencia/references/fluxo-criativo.md)
- [Utilitários](scripts/LEIA-ME.md)
- [Origem dos complementos](.agents/fontes-externas.md)

O histórico de auditorias e validações anteriores foi preservado em `backups/` da pasta principal e fica fora das cópias para novos projetos.
