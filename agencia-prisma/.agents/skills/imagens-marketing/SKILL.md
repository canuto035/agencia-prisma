---
name: imagens-marketing
description: "Pesquise, gere ou trate imagens de marketing sem descaracterizar pessoas, personagens, produtos ou marcas."
---

# Imagens para marketing

## Entrada e seleção

Ative esta especialidade ao receber pedidos de tratamento, criação ou pesquisa de imagens, ou na produção de artes de carrossel que usem fotos. Consulte a pasta indicada pelo usuário e o DNA disponível. Diferencie cada arquivo como foto a editar, referência de estilo, logotipo ou ativo de composição. Se essa distinção for ambígua e mudar a edição, esclareça-a antes de alterar a foto.

Liste os arquivos pertinentes e inspecione visualmente cada foto selecionada e suas referências antes de editar. Não analise toda a máquina. Se o usuário pedir um lote, processe o lote definido e informe eventuais arquivos ilegíveis; se pedir uma peça, selecione apenas os ativos necessários. Consulte o registro de tratamento para não reeditar arquivos já entregues sem necessidade.

Leia [o fluxo de arquivos e conferência](references/fluxo-imagens.md) quando houver fotos locais, downloads ou entrega de arquivos. As pastas sugeridas são uma convenção, não uma dependência: preserve a organização existente e respeite o destino indicado.

Quando o Google Drive for a fonte oficial, confirme cliente e pasta em `contexto/integracoes.md`, preserve IDs e versões e registre o destino do resultado. Use `governanca-ativos-lgpd` quando licença, autorização de pessoa, personagem, produto ou dado pessoal afetar o uso.

## Tratamento padrão solicitado pelo usuário

Valorize as cores e a qualidade percebida de cada foto: corrija exposição e balanço de branco, recupere contraste com moderação, fortaleça cores seletivamente, reduza ruído e melhore nitidez quando necessário. Use o estilo das referências e o DNA para orientar a intensidade. Não aplique saturação máxima ou o mesmo ajuste a todas as fotos. Se a foto já estiver adequada, preserve o que funciona.

Mantenha pele natural, textura, identidade, proporções, cor real de produtos, logotipos e textos. Não altere rosto, corpo, embalagem, cenário ou objetos como consequência implícita de “melhorar a qualidade”. Recorte para o formato pedido sem cortar informação essencial. Mudanças criativas de fundo ou composição entram quando solicitadas.

Explique limitações relevantes de origem: ampliar pixels não recupera com certeza detalhes ausentes. Em fotos muito desfocadas ou pequenas, não apresente detalhes reconstruídos por IA como recuperação fiel. Não use tratamento para falsificar evidência de resultado ou antes/depois de um serviço.

## Preservação obrigatória de pessoas e personagens

Sempre que a entrada mostrar uma pessoa, mascote ou personagem, trate a imagem original como referência principal de identidade em todas as edições e novas composições que o representem. Preserve formato do rosto, olhos, nariz, boca, tom de pele, idade aparente, cabelo, marcas distintivas, anatomia, proporções e, para personagens ilustrados, traços e elementos de design que os identificam. No tratamento fotográfico, mantenha também expressão, pose, roupas e acessórios originais.

Referências de estilo orientam iluminação, cor e acabamento; nunca substituem a identidade pelo rosto, corpo ou desenho de outra referência. Melhorar qualidade não autoriza rejuvenescer, afinar o rosto ou corpo, alisar excessivamente a pele, mudar traços ou aplicar embelezamento que descaracterize o sujeito. Mudanças de cena solicitadas devem manter as características originais do personagem.

Inclua explicitamente essas características a preservar em cada pedido à ferramenta e em cada tentativa de correção. Compare o resultado com o original, especialmente rosto, cabelo, marcas e proporções. Se houver descaracterização, não entregue a versão como final aprovada: corrija de forma direcionada e confira novamente. Se não conseguir preservar a identidade, mantenha o original e informe a limitação, sem garantir fidelidade absoluta da geração por IA.

## Ferramenta de criação e edição

Use a ferramenta integrada image_gen para criar e editar imagens quando disponível e siga a skill imagegen instalada. Para arquivos locais, visualize primeiro e passe as referências conforme a interface atual da ferramenta; identifique explicitamente o alvo e as referências. Não substitua a edição por código de processamento de imagem salvo pedido explícito do usuário. Operações de inventário, cópia e conferência de arquivo podem usar ferramentas locais.

Escolha o recurso pelo tipo de mudança. Correção ou edição de foto fornecida mantém a foto como alvo e usa edição de imagem; não a recrie do zero. Para um ativo novo destinado especificamente ao Canva, a geração de imagem do Canva pode ser usada quando disponível e adequada, mas a montagem da arte continua em `design-grafico`. Remoção de fundo serve para recorte transparente, não para trocar cenário; edição localizada ou cena nova exigem a ferramenta correspondente. Verifique o papel e o formato aceitos para cada referência antes da chamada. Recurso disponível não obriga uso se alterar identidade ou consumir cota sem benefício para a peça.

Quando o Higgsfield estiver conectado e contribuir para a entrega, trabalhe com `../higgsfield-producao/SKILL.md`. Compare adequação, fidelidade, parâmetros e custo antes de escolhê-lo em lugar de outra ferramenta disponível. A conexão não autoriza gasto: estime e respeite o teto do cliente. Em referências, use apenas papéis aceitos pelo modelo e confira a identidade após a geração.

Separe três pedidos: correção da foto existente, mudança criativa localizada e criação de uma cena nova. Na correção, conserve geometria, expressão, roupa, texto e fundo salvo instrução diferente. Em cena nova, use as referências de identidade apenas para o sujeito indicado e não para copiar a pessoa ou marca de uma referência de estilo. No pedido de edição, especifique o que mudar e o que preservar. Para criação, defina objetivo, assunto, composição, proporção e relação com a marca; use referências como orientação, sem reproduzir automaticamente seus textos, marcas ou pessoas. Prefira fotos e ilustrações sem texto quando o carrossel for receber tipografia editável na montagem.

Para cada final destinado ao projeto, copie o resultado selecionado para a pasta do cliente e associe original, referência, versão e uso; um arquivo só no histórico da ferramenta não é entrega persistente. Em lote, planeje um objetivo por imagem e faça uma chamada por ativo distinto conforme a skill de ferramenta. Se a ferramenta estiver indisponível, informe a limitação e conclua pesquisa, seleção e instruções possíveis; não declare uma imagem produzida. Não migre silenciosamente para API paga ou instale ferramentas. Salve o resultado real retornado pela ferramenta na pasta do cliente, preservando versões. Não prometa formato editável, resolução ou fidelidade que não foram conferidos.

Antes do repasse ao design, confira se a imagem selecionada sustenta o recorte e o tamanho finais sem interpolação apresentada como detalhe real. Registre área que não pode ser cortada, espaço disponível para texto, dimensões efetivas, restrições de cor e identidade, e a versão exata escolhida. Uma imagem boa isoladamente pode não servir ao layout ou ao posicionamento solicitado.

## Pesquisa e download

Quando o usuário pedir Google Imagens, use Google pelo navegador disponível; se não houver acesso, informe a limitação antes de usar outro mecanismo. Para pesquisa genérica, use a busca disponível. Pesquise assunto, formato e uso pretendido, priorizando ativos do cliente e fontes com licença compatível.

Abra a página de origem: resultado de busca e filtro de licença não comprovam autorização de uso. Registre autor quando disponível, página, URL do arquivo, licença ou termos consultados, data e atribuição exigida. Baixe apenas pela opção autorizada da fonte ou URL de arquivo verificada; confira se o download é uma imagem utilizável e não uma página HTML ou miniatura de baixa resolução.

Não contorne login, pagamento, bloqueios ou restrições de download e não remova marcas d’água. Se a licença estiver indefinida, mantenha o link como referência e procure alternativa para a peça. Não compre licenças sem autorização. Nunca use download para contornar restrições de exibição da ferramenta. Diferencie imagem obtida de terceiro, imagem fornecida pelo cliente e imagem gerada.

## Conferência e entrega

Compare original e resultado visualmente: cores sem estouro, pele e produtos fiéis, sombras e luzes preservadas, ausência de halos e textura artificial, textos/logos corretos e recorte adequado. Se houver alteração indevida, faça uma correção direcionada; se persistir, informe o defeito e não rotule a versão como pronta.

Entregue os arquivos tratados ou gerados, uma prévia quando possível e um resumo dos ajustes. Para lote, relacione cada original ao resultado e informe pendências. Passe os ativos selecionados e a origem à skill de carrosséis ou direção de arte quando fizerem parte do pedido. A existência de arquivos na pasta não autoriza monitoramento contínuo: a leitura acontece durante uma tarefa iniciada pelo usuário.

## Inteligência ampliada

Quando o gatilho da demanda corresponder, a coordenação consulta automaticamente os apoios de `operacao/mapa-inteligencia-github.json`; carregue somente os complementos necessários e mantenha esta skill, o contexto aprovado e as instruções do usuário como autoridade.

- Escolha a rota pelo requisito: tratamento preserva fotografia, edição altera parte controlada, geração cria cena nova, ferramenta de design garante precisão gráfica e banco de imagens resolve velocidade com licença verificável.
- Defina travas de fidelidade e compare original, prévia e exportação. Rejeite mudanças indevidas em rosto, corpo, produto, marca, texto, textura ou cor; valide também dimensões, perfil de cor, transparência, compressão e uso final.

## Formato padrão de entrega

Inclua, conforme o escopo do pedido: inventário e papel de cada imagem; plano de tratamento ou criação; referências efetivamente usadas; relação original → versão final; ajustes realizados; dimensões e formato conferidos; checagem de identidade; origem e licença de imagens de terceiros; defeitos ou limitações; arquivos finais.

Considere uma imagem pronta somente após abrir e comparar o resultado com o original. Para pessoas, mascotes e personagens, confira rosto, traços, cabelo, pele, anatomia, roupa, acessórios, expressão e marcas distintivas. Se houver descaracterização, corrija ou mantenha o original como versão segura.

## Integração com design gráfico

Esta skill prepara os ativos raster; use `design-grafico` para integrá-los ao layout final com texto, marca e CTA.

## Integração com ensaios fotográficos

Para criar uma série de novas fotografias com o mesmo modelo, personagem ou produto em diferentes cenários, trabalhe em conjunto com `ensaios-fotograficos`. Esta skill organiza e inspeciona as referências, preserva os originais e ajuda a conferir a fidelidade; ensaios-fotograficos planeja e gera a série.


## Decisões de qualidade e execução

Inventário de extensão, tamanho ou hash não é inspeção visual nem prova de licença. Abra os arquivos necessários e preserve a relação original, referência e resultado. Registre os fatos verificados sobre identidade e acabamento; versões rejeitadas não entram na pasta de finais. Consulte ferramentas presentes na sessão antes de prometer download, geração ou formato.

Aplique correções de modo não destrutivo e na ordem da causa: exposição e cor, contraste, ruído, nitidez, recorte e acabamento. Compare antes e depois na mesma escala; uma versão que parece melhor apenas por estar mais saturada, mais nítida ou menor não passou no teste. Em lote, derive uma intenção comum, mas ajuste cada arquivo conforme luz, pele e produto reais.
