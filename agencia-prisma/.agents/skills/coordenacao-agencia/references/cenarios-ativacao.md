# Cenários de ativação para revisão da base

Use estes pedidos de mesa para conferir se a matriz e as skills continuam indicando a responsável, os apoios e a passagem de estado corretos. Não execute nem publique uma ação externa durante esta checagem. Registrar que o texto cobre um cenário não comprova o comportamento de uma sessão futura; para isso, teste um pedido real em ambiente controlado e confira o registro de leitura, execução e artefatos.

| Pedido de exemplo | Responsável | Apoios e resultado esperado |
|---|---|---|
| “Cliente novo: analise estes links e monte a estratégia” | `coordenacao-agencia` | `briefing-cliente`, `referencias-conteudo`, pesquisa e `dna-marca` conforme lacunas; separar fatos de hipóteses e consolidar decisão |
| “Analise meu Instagram e apresente melhorias com antes/depois em LP” | `coordenacao-agencia` | Referências registra a amostra e acesso; planejamento e copy criam propostas vinculadas aos achados; páginas e design montam apresentação local; revisão compara fontes e estados. Login bloqueado deixa limites visíveis, não uma auditoria completa inventada |
| “Analise este site no celular; crie nova primeira dobra e um carrossel na apresentação” | `coordenacao-agencia` | Referências inspeciona página; páginas/copy/design criam proposta da dobra; carrosseis/design montam sequência quando arte final foi pedida; revisão abre LP e finais. Depois proposto não significa site alterado ou conversão medida |
| “Crie um carrossel final no Canva com minhas fotos” | `carrosseis` pela narrativa e `design-grafico` pela peça | `imagens-marketing` confere fotos e fidelidade; `revisao-conteudo` confere páginas exportadas; kit do cliente, nunca kit global |
| “Corrija só o texto desta arte pronta” | `revisao-conteudo` | `design-grafico` apenas se houver alteração e exportação do layout; não reabrir a campanha inteira |
| “Crie uma sequência de Stories e sugestões de resposta” | `stories-comunidade` | `design-grafico` e revisão se houver arte final; respostas-modelo não são casos enviados |
| “Responda aos comentários reais desta conta” | `atendimento-reputacao` | `stories-comunidade` apoia a linguagem; conferir conta e histórico, enviar se autorizado, registrar estado ou encaminhamento |
| “Monte e opere remarketing no Meta Ads” | `campanhas-midia` | `rastreamento-conversoes`, `funis-crm-automacao`, criação, métricas e financeiro conforme necessidade; conferir conta, teto e estado real |
| “Faça ensaio deste produto em três cenários” | `ensaios-fotograficos` | `imagens-marketing` confere referência, rótulo e fidelidade; Higgsfield só se adequado e dentro do orçamento |
| “Monte uma proposta mensal para este cliente” | `operacao-agencia` pelo escopo e capacidade | `financeiro-rentabilidade` confere preço, margem e cenários; `comercial-agencia` conduz a proposta quando envolver venda |
| “Analise o desempenho e proponha o próximo teste” | `metricas-marketing` | `rastreamento-conversoes` se coleta estiver falha; `ab-testing` se houver experimento controlado; distinguir dado de hipótese |

Ao revisar, marque cada cenário como coberto, divergente ou dependente de teste real. Corrija divergências entre matriz, skill e mapa antes de distribuir uma nova versão da base.

## Cenários de continuidade

Confira pedido original, controle por demanda, evidência observada e próxima ação; use somente clientes e arquivos fictícios nesta revisão.

| Situação de teste | Comportamento esperado |
|---|---|
| Prisma foi mencionada; depois o usuário pede outra peça de marketing sem repetir o nome | Coordenação atende o novo pedido com demanda própria e somente as especialidades necessárias |
| Roteiro terminou, mas o pedido incluía arte final | Conferir roteiro e continuar montagem, inspeção e exportação sem esperar nova convocação |
| Usuário pergunta “como está?” durante a montagem | Informar brevemente em comentário e continuar a próxima ação autorizada |
| Usuário faz pergunta sobre assunto alheio durante uma entrega | Responder à pergunta sem apagar ou substituir a fila existente; manter a demanda original identificada |
| Conversa foi interrompida com item antigo `em execução` | Consultar controle e arquivos/processo reais; reclassificar pela evidência e retomar sem duplicar execução |
| Texto corrigido depois de uma exportação conferida | Invalidar apenas as saídas dependentes afetadas, corrigir e conferir a nova versão |
| Um subagente devolve resultado enquanto outro ainda trabalha | Conferir a saída recebida, executar dependências prontas e acompanhar o outro responsável pelo ID real |
| Job assíncrono foi submetido e ainda está ativo | Registrar ID, estado e forma de acompanhar; avançar partes independentes, recolher e conferir antes da entrega final |
| Publicação bloqueada por acesso, mas há peças independentes para revisar | Revisar as peças executáveis; encerrar turno somente quando restar o bloqueio, com demanda aberta |
| Usuário pede “pause os vídeos, continue os carrosséis” | Pausar somente vídeos e continuar carrosséis; não marcar a demanda concluída |
| Usuário cancela explicitamente uma frente | Marcar somente essa frente como retirada e continuar o restante autorizado |
| Todas as entregas foram verificadas ou retiradas explicitamente | Concluir a demanda e não inventar novas tarefas |

Em teste real controlado, a evidência de continuidade é a próxima ação executada e seu resultado. Uma atualização textual da fila, sozinha, não comprova que a etapa seguinte ocorreu.
