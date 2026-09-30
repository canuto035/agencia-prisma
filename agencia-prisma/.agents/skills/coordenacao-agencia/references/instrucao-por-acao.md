# Instrução específica por ação

Use quando uma especialidade for produzir conteúdo novo ou enviar uma instrução livre a uma ferramenta de texto, imagem, vídeo, design ou análise. A skill mantém o método estável; **a instrução da ação é montada na hora** para o cliente, item e ferramenta atuais. Não apresente um modelo preenchível como se já tivesse sido enviado ou executado. Ações determinísticas, como consultar um arquivo, redimensionar para dimensões confirmadas ou calcular uma métrica, usam parâmetros e validação, sem inventar um prompt longo.

O `default_prompt` em `agents/openai.yaml` é só um ponto de entrada da especialidade, não o prompt final da tarefa. Respeite primeiro a quantidade, o formato e o estágio pedidos pelo usuário: um roteiro não exige três ganchos; um carrossel textual não exige arte; uma auditoria não autoriza produção ou publicação. Compile a ação com o contexto do cliente e registre o que foi realmente executado.

## Compilar a ação

1. Identifique o resultado observável: cliente, item/versão, objetivo, público, canal, quantidade, formato, destino e critério de aceite. Recupere apenas o briefing, DNA, kit, ativos e decisões pertinentes. Registre fatos confirmados, hipóteses e dados ausentes sem misturá-los.
2. Defina a contribuição de cada especialidade: conteúdo e prova; narrativa; direção visual; imagem; montagem; mídia; revisão. O repasse para a próxima etapa inclui o artefato real e sua versão, não só um resumo do pedido.
   Quando uma referência externa pertinente tiver sido consultada pela coordenação, incorpore **somente o princípio escolhido e sua consequência para esta peça**. Não cole a skill externa inteira no prompt nem transforme repertório em alegação sobre o cliente.
3. Construa a instrução **específica para o campo ou ferramenta real**. Inclua ação desejada, conteúdo obrigatório, referências com papel explícito e arquivo/ID/versão da referência principal, elementos a preservar, mudanças permitidas, restrições da marca, formato e critério de rejeição. Em imagem, escolha conscientemente entre correção da foto, edição localizada e cena nova; não trate esses pedidos como equivalentes. A prioridade é: identidade e produto comprovados > kit aprovado do cliente > estilo de referência > preferência estética provisória. Use campos estruturados da ferramenta quando existirem; não esconda parâmetros obrigatórios num texto genérico. Só use exemplos ou termos de estilo que ajudam aquela tarefa.
4. Para lote, compartilhe apenas as regras estáveis da marca. Dê a cada item ID, situação, mensagem, ativo e objetivo próprios. Em teste controlado, altere somente a variável escolhida; em exploração criativa, varie ângulo, cena ou prova de propósito. Não envie o mesmo prompt para todos os itens trocando só um adjetivo.
5. Antes de executar, confira se o texto não contém cliente errado, kit alheio, alegação sem prova, identidade descaracterizada, preço inventado, parâmetro não aceito ou gasto fora do teto. Se o usuário indicou um comando com barra, resolva-o na ferramenta; se não existir, trate como referência de estilo, não como comando executado.
6. Execute, observe a saída real e compare lado a lado com a referência principal e o destino final. Marque a saída como aceita ou rejeitada com um defeito concreto; altere uma causa por tentativa e preserve as demais invariantes. Em ferramenta paga, consulte estado e custo antes de repetir. Se a falha for texto, logo ou rótulo exato, prefira composição/edição com o ativo original e tipografia editável em vez de regenerações sucessivas. Resultado visual, vídeo, texto ou design precisa de revisão própria; um prompt bem escrito não prova qualidade.
   Confira também se o princípio aproveitado da referência produziu a melhoria esperada. Se a saída piorar ou contrariar o DNA, volte à decisão local e registre a rejeição; a referência não tem prioridade sobre o cliente.
7. Devolva à coordenação a versão aceita, a evidência de conferência, o custo real quando houver, a decisão pendente e a próxima etapa. Uma resposta de ferramenta ou especialidade não encerra o pedido por si só; a coordenação reavalia a fila original e ativa a próxima contribuição necessária.

## Enfoque por área

| Área | A instrução individual precisa destacar |
|---|---|
| Pesquisa, briefing, DNA e inteligência | Pergunta concreta, amostra, fontes, data, distinção entre fato e inferência e decisão a apoiar |
| Copy, Reels, Stories, carrossel, SEO | Público em situação real, promessa sustentada, tom do cliente, progressão, formato, CTA e texto exato quando necessário |
| Imagem, ensaio, vídeo e Higgsfield | Referência principal de identidade, referência de estilo separada, invariantes de pessoa/produto, cena ou movimento, duração/proporção e custo permitido |
| Canva e design | Kit **do cliente**, texto final, mapa de páginas, ativos autorizados, hierarquia, editabilidade e saída a conferir |
| Mídia, funil, testes e métricas | Objetivo, evento, hipótese, variável, dados com período/fonte, orçamento e regra de leitura |
| Atendimento, publicação, operação e governança | Conta e destinatário certos, estado inicial, escopo autorizado, fatos verificados, ação exata e prova de conclusão |

## Registro proporcional

Para geração paga, peça de campanha, lote ou resultado que possa precisar de reprodução, preencha [o registro de prompt](../../../../modelos/registro-prompt-acao.md) junto ao trabalho do cliente: ID, versão, ferramenta/modelo, referências, instrução realmente enviada, parâmetros, custo, arquivo/job, avaliação e motivo da revisão. Não grave credenciais ou dados pessoais desnecessários. Para uma correção simples, bastam a alteração e o arquivo final no histórico existente. Não acumule prompts não executados como se fossem entregas.
