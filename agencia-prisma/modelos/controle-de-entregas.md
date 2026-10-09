# Controle de entregas em andamento

Use em `clientes/<identificador>/contexto/entregas-em-andamento.md` desde o início de trabalho complexo ou com várias entregas dependentes, e quando um trabalho curto cruzar mensagens ou ficar bloqueado. Mantenha uma seção por demanda; acrescente a nova seção sem apagar outras. O identificador deve ser único e estável dentro do cliente para distinguir trabalhos simultâneos. Remova os campos não aplicáveis do exemplo ao usar.

## DEMANDA-AAAA-MM-DD-identificador

Raiz das instruções/método:
Raiz do projeto:
Cliente e destino oficial:
Pedido original e data:
Correções posteriores e escopo atual:
Autorizações vigentes e limites:
Objetivo:
Situação da demanda e última atualização: aberta

| Item | Entrega pedida e aceite observável | Estado | Dependências e entradas/versões | Último artefato, versão e evidência | Próxima especialidade e ação | Processo ativo: ferramenta, ID, estado e acompanhamento | Bloqueio real ou pausa explícita |
|---|---|---|---|---|---|---|---|
| 1 |  | pendente |  |  |  |  |  |

Estados de trabalho: `pendente`, `em execução`, `produzido`, `precisa corrigir`, `verificado`, `bloqueado`, `pausado pelo usuário` ou `retirado pelo usuário`. `Produzido` ainda requer conferência; uma correção anterior pode voltar itens posteriores a `produzido` ou `precisa corrigir`, preservando a entrada e versão que motivaram a mudança. Ao retomar, confira se um item antigo `em execução` ainda tem processo ativo; caso contrário, reclassifique-o pela evidência. Registre apenas identificadores reais de subagentes/jobs e o método disponível para recolher seu resultado. `Bloqueado` exige causa e próximo passo e mantém a demanda aberta. Pausa e retirada exigem pedido explícito e afetam apenas o escopo indicado. Só marque a demanda concluída quando todos os itens estiverem `verificado` ou `retirado pelo usuário`. Confira a evidência no arquivo ou serviço antes de marcar `verificado`; após cada resultado, aplique a decisão de continuidade do protocolo `.agents/skills/coordenacao-agencia/references/execucao-e-handoffs.md` na raiz de instruções registrada.
