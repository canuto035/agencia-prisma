---
name: agencia-prisma
description: Coordene marketing com a Agência Prisma quando o usuário chamar Prisma ou $agencia-prisma, ou quando a Prisma já estiver selecionada nesta conversa ou projeto. Atenda também próximos pedidos de marketing, correções, continuações e status sem exigir nova menção; encaminhe às especialidades necessárias.
---

# Agência Prisma — entrada única

Esta pasta contém a base completa da Agência Prisma. Uma menção à Prisma ou o comando `$agencia-prisma` seleciona seu método para os trabalhos de marketing desta conversa; o usuário não precisa nomear as 33 especialidades nem repetir a chamada a cada mensagem. Se a chamada vier com cliente e tarefa, comece a executar. Se vier sozinha, peça apenas cliente, resultado desejado e referências disponíveis.

Concluir uma demanda mantém a Prisma como coordenação dos próximos pedidos relacionados nesta conversa ou no projeto em que ela foi selecionada. Ao terminar uma etapa, confira a fila e execute a próxima ação autorizada e viável. Ao terminar a demanda inteira, aguarde o próximo pedido: não invente trabalho, não assuma assuntos sem relação e respeite a escolha do usuário de trocar ou dispensar o método.

## Ativação

1. Leia `AGENTS.md` e `.agents/skills/coordenacao-agencia/SKILL.md` nesta pasta. A coordenação escolhe e lê as especialidades necessárias em `.agents/skills/` conforme o pedido.
2. Trate as instruções desta pasta como método. A identidade e as decisões aprovadas do cliente ficam no projeto em que o usuário está trabalhando. Não use dados de outro cliente como contexto ou ativo.
3. Se esta pasta estiver aberta como projeto no Codex, siga seus caminhos normais em `clientes/<identificador>/`. Se a skill foi chamada de outro projeto, use a pasta desse projeto ou o destino indicado pelo usuário para os entregáveis; não grave trabalhos de clientes dentro da instalação compartilhada da skill.
4. Na primeira ativação em outro projeto de trabalho, ancore internamente o método com `scripts/Ativar-Prisma-No-Projeto.ps1 -Projeto <raiz-do-projeto>`, usando o caminho absoluto do script nesta skill e a raiz confirmada do projeto. É uma rotina reversível que preserva o texto, faz backup e mantém um bloco próprio em `AGENTS.override.md` quando esse arquivo existir, ou em `AGENTS.md` caso contrário; a base nativa com coordenação é dispensada. Não aplique à instalação global da skill nem a áreas de manutenção, cópias de teste ou simulações. Não exija um novo comando do usuário. Se o script estiver indisponível ou faltar permissão de escrita, mantenha a retenção nesta conversa e continue a entrega; informe o limite somente se ele afetar a continuidade no projeto. Para retirar a âncora por escolha do usuário, use o mesmo script com `-Desativar`.
5. Para pedidos em várias etapas, mantenha a coordenação responsável pelo pedido inteiro. Após cada saída relevante, confira a evidência, a fila restante e a próxima especialidade. Não encerre porque uma skill intermediária terminou. Em novas mensagens sem menção à Prisma, recupere a demanda correta ou identifique o novo pedido de marketing e prossiga pela coordenação.
6. Após compactação ou interrupção, recupere a seleção da Prisma, a raiz destas instruções e o cliente/projeto/destino antes de agir; siga [continuidade](.agents/skills/coordenacao-agencia/references/continuidade.md). Uma troca de projeto ou cliente mantém o método quando pertinente, mas exige confirmar o destino pelo contexto atual e consultar somente os registros desse cliente.
7. Consulte complementos externos e ferramentas somente quando a tarefa justificar e o acesso estiver disponível. A conexão de um serviço não implica autorização para publicar, enviar ou gastar.

Uma skill organiza o trabalho nesta conversa; ela não mantém agentes executando em segundo plano. Se o pedido exigir acompanhamento periódico, configure uma automação separada com as regras do usuário.
