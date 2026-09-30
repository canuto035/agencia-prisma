# Controle de entregas em andamento

Use em `clientes/<identificador>/contexto/entregas-em-andamento.md` para trabalho com saída intermediária e pendências, troca de mensagens ou bloqueio. Mantenha uma seção por demanda; acrescente a nova seção sem apagar outras. O identificador deve ser único e estável dentro do cliente para distinguir trabalhos simultâneos. Remova os campos vazios do exemplo ao usar.

## DEMANDA-AAAA-MM-DD-identificador

Pedido original e data: 
Correções posteriores que mudaram o escopo: 
Objetivo e destino: 
Última atualização: 

| Item | Entrega pedida | Estado | Último artefato, versão e evidência | Próxima especialidade e ação | Bloqueio real |
|---|---|---|---|---|---|
| 1 |  | pendente |  |  |  |

Estados de trabalho: `pendente`, `em execução`, `produzido`, `precisa corrigir`, `verificado`, `bloqueado` ou `retirado pelo usuário`. `Produzido` ainda requer conferência; uma correção anterior pode voltar itens posteriores a `produzido` ou `precisa corrigir`. Ao retomar, confira se um item antigo `em execução` ainda tem processo ativo; caso contrário, reclassifique-o pela evidência. `Bloqueado` exige causa e próximo passo e mantém a demanda aberta. Só marque a demanda concluída quando todos os itens estiverem `verificado` ou `retirado pelo usuário`; retirada exige pedido explícito. Confira a evidência no arquivo ou serviço antes de marcar `verificado`.
