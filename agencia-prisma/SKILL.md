---
name: agencia-prisma
description: Ative a equipe da Agência Prisma por um único pedido, dentro de qualquer projeto Codex. Use quando o usuário chamar Prisma ou $agencia-prisma para planejar ou executar trabalho de marketing; encaminhe às especialidades incluídas nesta skill.
---

# Agência Prisma — entrada única

Esta pasta contém a base completa da Agência Prisma. O comando `$agencia-prisma` é a porta de entrada; o usuário não precisa nomear as 33 especialidades. Se o comando vier com cliente e tarefa, comece a executar. Se vier sozinho, peça apenas cliente, resultado desejado e referências disponíveis.

## Ativação

1. Leia `AGENTS.md` e `.agents/skills/coordenacao-agencia/SKILL.md` nesta pasta. A coordenação escolhe e lê as especialidades necessárias em `.agents/skills/` conforme o pedido.
2. Trate as instruções desta pasta como método. A identidade e as decisões aprovadas do cliente ficam no projeto em que o usuário está trabalhando. Não use dados de outro cliente como contexto ou ativo.
3. Se esta pasta estiver aberta como projeto no Codex, siga seus caminhos normais em `clientes/<identificador>/`. Se a skill foi chamada de outro projeto, use a pasta desse projeto ou o destino indicado pelo usuário para os entregáveis; não grave trabalhos de clientes dentro da instalação compartilhada da skill.
4. Para pedidos em várias etapas, mantenha a coordenação responsável pelo pedido inteiro. Após cada saída relevante, confira a evidência, a fila restante e a próxima especialidade. Não encerre porque uma skill intermediária terminou.
5. Consulte complementos externos e ferramentas somente quando a tarefa justificar e o acesso estiver disponível. A conexão de um serviço não implica autorização para publicar, enviar ou gastar.

Uma skill organiza o trabalho nesta conversa; ela não mantém agentes executando em segundo plano. Se o pedido exigir acompanhamento periódico, configure uma automação separada com as regras do usuário.
