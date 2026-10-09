# Agência Prisma

Base compartilhável de marketing digital com 33 especialidades e uma entrada única para o Codex. Esta edição contém instruções, modelos e utilitários; não inclui trabalhos de clientes, credenciais ou backups.

## Usar com um comando

Instale a pasta `agencia-prisma` como skill do Codex. Depois, em qualquer projeto, escreva:

> `$agencia-prisma Cliente: [nome]. Entrega: [o que deseja]. Referências: [links ou arquivos].`

O coordenador lê as instruções da base, escolhe as especialidades pertinentes e acompanha a entrega até a revisão final. Se chamar apenas `$agencia-prisma`, ele solicitará o mínimo necessário para começar.

Depois da primeira ativação, faça os próximos pedidos de marketing e correções normalmente, sem repetir o nome. Em um projeto de trabalho com permissão de escrita, a entrada registra a coordenação em um bloco próprio das instruções do projeto, com backup e preservação do conteúdo existente. Isso permite recuperar o método nas próximas conversas desse projeto enquanto a skill estiver instalada. Se preferir usar só na conversa atual, diga isso. A coordenação avança entre etapas autorizadas e confere o pedido inteiro antes de encerrar; não mantém execução com o chat fechado.

O modelo indicado na configuração incluída é Astra/Ultra; o modelo efetivo e o custo de uso dependem da conta e das configurações da sessão. Quem instalar pode ajustar `.codex/config.toml` conforme sua disponibilidade.

Também é possível abrir a pasta `agencia-prisma` como projeto no Codex e fazer um pedido em linguagem natural, sem chamar a skill. Consulte [o guia de início](agencia-prisma/COMECE-AQUI.md).

## Instalação

No Codex, peça: “Instale a skill `agencia-prisma` de `https://github.com/canuto035/agencia-prisma/tree/main/agencia-prisma`”. A skill instalada contém a coordenação e as 33 especialidades; não é preciso instalar cada uma separadamente. Para uso como projeto, baixe ou clone o repositório e abra a subpasta `agencia-prisma` no Codex.

As funções de Canva, Higgsfield, Google Drive e demais serviços dependem das conexões e permissões disponíveis na conta de cada pessoa. A instalação da skill não cria essas conexões e não autoriza gastos, envios ou publicações.

## Atualizações

Quem usa uma cópia local precisa atualizar essa cópia para receber versões novas. O utilitário [Atualizar-Projeto.ps1](agencia-prisma/scripts/Atualizar-Projeto.ps1) faz prévia, backup e validação em projetos baseados na Prisma, preservando dados de clientes. Instalações globais da skill também precisam ser atualizadas; o GitHub não muda automaticamente os arquivos já instalados em outra máquina.

**30/09/2026 — criação de marca e conteúdo:** revisão de DNA, direção de arte, logos, design, imagens, carrosséis, Stories, prompts e checagem final. A nova referência de criação humana e distintiva orienta o uso de cenas, falas e provas reais do cliente, evita fórmulas intercambiáveis e exige conferir os arquivos finais. Projetos e instalações anteriores precisam receber esta versão para aplicar as mudanças.

**30/09/2026 — referências por tarefa:** a coordenação agora verifica o mapa de apoios em cada pedido e retomada, consulta fontes pertinentes em entregas substantivas e repassa à especialidade a decisão concreta aproveitada. A revisão confere seu efeito no resultado; fontes sem ganho são descartadas. Isso não instala nem executa código dos repositórios consultados.

**09/10/2026 — retenção e retomada:** entrada e coordenação passam a cobrir pedidos posteriores sem nova menção, com registro do contexto e da fila desde o início de entregas complexas. Os repasses distinguem etapa pronta, demanda concluída e bloqueio; status e correções devolvem o controle à coordenação. O ativador preserva instruções do projeto e o atualizador inclui também os arquivos da entrada global. Validação estrutural e testes controlados têm escopos próprios; não garantem comportamento de toda sessão futura.

## Estrutura

- `agencia-prisma/SKILL.md`: comando único.
- `agencia-prisma/AGENTS.md`: entrada automática quando a pasta é aberta como projeto.
- `agencia-prisma/.agents/skills/`: 33 especialidades.
- `agencia-prisma/operacao/`: catálogo e integrações previstas.
- `agencia-prisma/modelos/`: modelos sem dados de clientes.
- `agencia-prisma/scripts/`: criação, atualização e verificação de projetos.

As referências do GitHub mapeadas pela agência são material de consulta, não código instalado ou executado automaticamente.
