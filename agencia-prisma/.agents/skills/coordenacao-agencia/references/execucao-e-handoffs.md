# Encaminhamento e comprovação de execução

Leia em trabalhos com várias etapas, repasses entre especialidades ou retomada de entregas incompletas. Uma correção pontual pode ser resolvida e conferida diretamente.

## Planejar pelo resultado

Separe o que foi pedido do que já está pronto: texto, arte, editável, vídeo, publicação, coleta e análise são resultados diferentes. Consulte o contexto aprovado sem reabrir decisões resolvidas. Escolha um responsável principal por entrega e apenas os apoios que executem uma transformação ou verificação necessária.

Para cada etapa necessária, registre de modo compacto:
- resultado e critério observável de aceite;
- skill responsável, entradas e arquivos exatos;
- dependências anteriores e destino da saída;
- ferramenta disponível quando houver execução externa;
- estado: pendente, em execução, produzido, precisa corrigir, verificado, bloqueado, pausado pelo usuário ou retirado pelo usuário; evidência e motivo real;
- autorização vigente para a ação e, se houver processo ativo, ferramenta, identificador real, último estado e forma de acompanhar.

No início de trabalho complexo ou com várias entregas dependentes, registre a demanda em `contexto/entregas-em-andamento.md` do cliente; se não houver, crie-o a partir do [modelo de controle](../../../../modelos/controle-de-entregas.md). Use também o controle se um trabalho inicialmente curto cruzar mensagens ou ficar bloqueado. Registre a raiz das instruções/método, a raiz do projeto, o cliente, o destino oficial, o pedido original, as correções e o escopo das autorizações. Mantenha uma seção com identificador estável e único por demanda e preserve as demais seções: duas campanhas do mesmo cliente não são uma fila única. Atualize quando estado, evidência ou próximo responsável mudar, incluindo dependências e versões de entrada afetadas. Para tarefa curta concluída na conversa, mantenha a fila internamente. Use `contexto/decisoes.md` apenas para decisões que afetem trabalhos futuros; não grave simulações na pasta de clientes.

## Executar e conferir o repasse

Leia o SKILL.md das especialidades selecionadas antes de aplicá-las. A descrição serve para escolher, mas não substitui as instruções. Leia referências somente conforme a etapa. O responsável devolve o artefato, o que conferiu e pendências; o próximo confere se a entrada existe e está na versão correta. Quando uma skill diz que seu trabalho está “pronto”, isso valida apenas a etapa dela; a coordenação ainda confere o pedido completo e as dependências seguintes.

Exemplo: carrossel final → narrativa por slide → imagens necessárias → montagem → inspeção de todos os slides → exportação conferida. Se texto, fotos ou direção já estiverem aprovados, reutilize-os; não gere substitutos só para preencher uma etapa.

Apoiadoras podem indicar dependências, mas a coordenação decide se elas pertencem ao pedido. Resolva conflitos e retrabalho no ponto de origem. Evite ciclos em que skills se chamam mutuamente sem nova necessidade. Paralelize apenas frentes independentes quando autorizado; edição e revisão do mesmo arquivo têm dependência.

Se houver falha, registre o estado real, avance nas partes independentes e retome do ponto pendente. Não substitua silenciosamente arquivo final por roteiro, geração por prompt ou integração por plano. Em ação externa incerta, confira o estado antes de repetir para evitar publicação, envio ou gasto duplicado. Se uma correção mudar texto, oferta, imagem ou versão de entrada já usada adiante, volte as saídas dependentes a `precisa corrigir` quando houver erro ou a `produzido` quando precisarem de nova conferência; refaça só o trecho afetado e preserve o que continua válido.

## Gatilhos de retomada durante a tarefa

Em uma demanda com etapas dependentes, devolva o controle à coordenação depois de: resultado de ferramenta ou subagente, artefato intermediário concluído, revisão que peça correção, falha ou bloqueio resolvido, nova informação do usuário ou mudança de escopo. Não espere apenas a revisão final. Uma consulta ou microação que não muda o estado do trabalho não exige nova varredura completa.

Uma nova mensagem sobre a mesma demanda também aciona a coordenação, sem exigir nova menção à Prisma. Use o contexto da conversa e o identificador da demanda; leia o andamento persistido quando existir, mas confirme o estado nos arquivos ou serviços reais antes de continuar. Um item `em execução` herdado de outra conversa não prova que haja processo ativo: confira a execução e volte-o a `pendente` ou `produzido` conforme a evidência. “Continua” retoma do primeiro item executável da demanda identificada; responda a um pedido de status brevemente em comentário e prossiga, pois ele não cancela o restante. Se o registro faltar após interrupção, reconstrua a fila mínima a partir do pedido e dos artefatos observados, sem inventar conclusão. Quando um comando altera só um arquivo de várias entregas, essa alteração é a saída da etapa, não o fim do pedido.

Em cada retomada, faça uma passagem curta:

1. Confira a saída real e sua versão contra o critério da etapa; marque `produzido` se faltar inspeção, `verificado` se passou, `precisa corrigir` se falhou ou `bloqueado` com causa real, sem tratar uma resposta do especialista como prova automática.
2. Compare a fila restante com **todas as entregas do pedido original e correções posteriores**. Reavalie na matriz só as dimensões afetadas; não reabra decisões aprovadas sem motivo.
3. Nomeie a próxima transformação ou conferência, a especialidade responsável, entrada concreta e condição de término. Leia a skill se ainda não foi carregada nesta execução e acione-a agora se a dependência está pronta; se não, avance em outra frente independente.
4. Se a próxima etapa depende de subagente ou job assíncrono real, registre ferramenta, identificador, último estado observado e forma de acompanhar; acompanhe, recolha o resultado e confira-o antes do novo repasse. Enquanto espera, avance em frentes independentes. Submissão ou estado incerto exige consulta antes de repetir. Se subagentes não estiverem disponíveis, aplique as skills sequencialmente na mesma sessão. Nenhum agente permanece trabalhando fora de uma tarefa ativa só por estar listado no projeto.

Para trabalho que atravessa conversas, registre uma linha compacta por entrega dentro da seção da demanda: `resultado pedido | estado | último artefato e versão | próximo responsável e ação | bloqueio real`. Ao retomar, leia a seção correta e continue do primeiro item executável; não reinicie o briefing, não misture demandas e não sobrescreva o trabalho paralelo. Um status antigo não substitui a verificação da saída atual.

## Decisão de continuidade

Após cada passagem e antes de encerrar o turno, reconcilie todas as entregas pedidas com artefatos e verificações reais e aplique:

| Situação verificada | Próxima ação |
|---|---|
| O usuário pediu pausa ou cancelamento | Aplique primeiro somente ao escopo indicado, registre a pausa ou retirada e os efeitos de operações já iniciadas; reavalie a fila pelas situações seguintes |
| Há item autorizado e executável | Execute agora a próxima transformação ou conferência; adie a resposta final |
| Há subagente ou job ativo necessário à entrega | Acompanhe, recolha e confira o resultado; avance nas frentes independentes e retorne à decisão |
| Todos os itens estão `verificado` ou `retirado pelo usuário` | Atualize o controle e conclua a demanda; retirada exige manifestação explícita |
| Resta bloqueio real e nenhuma ação independente possível | Encerre o turno com o que está pronto, causa, dado/acesso necessário e ponto de retomada; mantenha a demanda aberta |

Pause somente por pedido explícito; um status, uma dúvida ou um bloqueio parcial não pausa a demanda inteira. Se restarem somente itens pausados, encerre o turno com a pausa registrada e a demanda aberta. Ao retomar uma frente pausada, confira sua evidência e autorização atuais. `Produzido`, `planejado` e `encaminhado` ainda precisam de conferência ou execução; bloqueio encerra um turno, não conclui a demanda. Não crie etapas artificiais após a conclusão, nem monitoramento contínuo ou trabalho em segundo plano por essa regra.

## Confirmar uso real

Diferencie:
- selecionada: instrução pertinente escolhida;
- consultada: instrução ou complemento lido;
- aplicada: contribuição observável incorporada;
- verificada: critério de aceite conferido com evidência.

Em tarefas complexas, mantenha um resumo de contribuição: especialidade → decisão/arquivo/checagem. Para GitHub, registre a fonte e o efeito quando material; se não acessou, não diga que consultou. Uma rota dispensada não é erro quando a entrega não precisa dela.

Antes de fechar, reconcilie pedido, etapas e arquivos; revise a matriz para omissões. Confira também o que NÃO pertence ao escopo: criar não implica publicar, analisar não implica alterar verba, corrigir não implica redesenhar identidade. Comunique resultado e pendências ao usuário em linguagem comum, sem obrigá-lo a operar a equipe.
