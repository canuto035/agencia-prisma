# Produção de artes e carrosséis no Canva

Leia quando o usuário pedir Canva ou quando o Canva for a ferramenta escolhida para a arte final. Confira as ferramentas, skills, permissões e conexão expostas **nesta sessão**; o catálogo instalado não prova acesso a cada função, plano ou arquivo. Use todas as capacidades que contribuam para a entrega, sem acionar recursos sem finalidade. Revalide o contrato da ferramenta antes de executar: nomes, campos, limites e etapas de salvamento podem mudar.

## Preparar o trabalho

Confirme o cliente e `contexto/integracoes.md`, pasta de destino, kit de marca, design/template aprovado, ativos, texto final, canal, formato e quantidade. **Cada cliente tem seu próprio kit. Não existe kit padrão da agência, nem mesmo quando o Canva listar apenas um.** Use o ID ou nome do kit já vinculado a esse cliente; se faltar vínculo, procure correspondência inequívoca com o cliente e confirme a escolha antes da primeira aplicação. Não aplique o kit de outra marca. Compare o kit com DNA e decisões aprovadas. A lista de kits pode trazer apenas nome e miniatura: não invente valores de cor ou fontes que a API não expôs. Preserve original, peça aprovada e nomes de versão.

## Escolher capacidades por entrega

| Necessidade | Caminho no Canva quando disponível | Conferência |
|---|---|---|
| Arte nova sem template adequado | Criar design a partir do briefing com texto, formato e marca explícitos; usar o gerador de imagem apenas para ativos visuais necessários | Conferir texto real, hierarquia, marca e tamanho; geração não garante copy exata |
| Peça com identidade ou layout aprovado | Buscar template de marca **do kit deste cliente** ou copiar design correto; preencher campos apenas depois de conferir o esquema | Não confundir um template de outro cliente; manter elementos editáveis |
| Carrossel | Receber o mapa slide → função → texto → ativo da skill `carrosseis`; criar ou adaptar design com todas as páginas na ordem | Ler conteúdo e visualizar **cada** página; conferir número, sequência, texto e CTA |
| Fotos e ativos | Selecionar originais autorizados; tratar com `imagens-marketing`; importar/enviar ao Canva pela via disponível; remover fundo ou gerar imagem só quando necessário | Comparar pessoa, personagem, produto, logotipo e licença com o original |
| Arte achatada que precisa ser editável | Usar conversão de imagem em design com camadas quando o recurso e o arquivo forem compatíveis | Revisar texto, logo, camadas, recortes e fundo; foto realista ou arte complexa pode separar mal |
| Editar peça existente | Ler design, iniciar edição compatível, aplicar operações suportadas e salvar segundo o contrato da ferramenta | Verificar o design salvo; não alegar mudança que a API não conseguiu fazer |
| Combinar ou reorganizar páginas | Usar operação estrutural de páginas, quando disponível, com a confirmação exigida pela ferramenta | Conferir origem, ordem, total de páginas e integridade do design resultante |
| Produzir muitas variações | Usar criação em lote somente com template de marca com campos preenchíveis e dados validados; conferir se a saída disponível será um design com várias páginas ou designs individuais | Conferir conexões de texto/imagem, prévia quando disponível e cada resultado final; a opção multipágina não substitui o mapa narrativo de um carrossel |
| Adaptar canais | Preferir cópia ao redimensionar uma peça mestra aprovada, quando essa opção existir; recompor cada destino conforme necessário | Verificar recorte, rosto, texto, logo, CTA e dimensões de cada versão; conferir cota antes de repetir operações |
| Revisar e localizar | Ler páginas, miniaturas e conteúdo; aplicar conferência de marca/design; traduzir quando pedido | Marcar como não verificável o que a API não expõe; revisar texto e layout após traduzir |
| Comentários de revisão | Ler comentários, resolver os claros com edição e registrar os que dependem de decisão ou de edição manual | Confirmar estado real do design e dos comentários |

Não use criação em lote para substituir a narrativa de um carrossel comum. Não escolha apresentação apenas porque tem várias páginas: confirme que o formato final serve ao canal. Operações de inserir, reorganizar ou excluir páginas e edições de um design existente seguem as condições específicas da ferramenta Canva disponível. Não publique arquivos privados em um serviço público para contornar limitações de importação.

## Capacidades a descobrir na sessão

- **Identidade e base:** listar kits, buscar templates de marca, ler o design e sua pasta. Um template só serve quando pertence ao cliente; para campos preenchíveis, confira o esquema antes de usar preenchimento automático. Um kit listado sem valores de cor e fonte permite comparação visual, não verificação numérica inventada.
- **Criação:** criar design novo a partir de um briefing quando não houver base adequada; criar a partir de template ou copiar um design aprovado quando houver. Para série com dados, use preenchimento em lote somente com esquema compatível e dados conferidos. Faça uma amostra antes de ampliar.
- **Imagem:** gerar imagem avulsa, enviar ativo, remover fundo transparente ou converter arte achatada em camadas somente para a finalidade correspondente. Remover fundo não cria outro cenário; conversão em camadas não garante fidelidade de fotografia, texto ou logotipo. Tratamento de pessoa ou produto continua sujeito à conferência de `imagens-marketing`.
- **Edição e páginas:** em design existente, leia a skill `canva-edit-design` e siga a transação de edição, suas operações permitidas, prévia e regra de salvamento. Edição de texto e mídia não equivale a mudar a família da fonte ou redesenhar fundo quando a API não expuser essas funções. Para inserir, combinar, reordenar ou excluir páginas, use a rota estrutural disponível, com a confirmação exigida por ela; não tente simular isso em operações de texto.
- **Adaptação e revisão:** redimensione a cópia por destino e recomponha o que o recorte automático prejudicar. Leia páginas e conteúdo; use `canva-brand-check` para comparar com o kit e `canva-design-feedback` para hierarquia, texto e acessibilidade. Tradução e implementação de comentários só entram quando pedidas ou necessárias ao resultado. Organize na pasta certa quando essa for a fonte oficial.

Essas são rotas, não etapas obrigatórias em toda peça. Se uma skill ou ferramenta tiver pré-condição específica, como confirmação de template, esquema, revisão de prévia ou aprovação para salvar, cumpra-a no momento da ação. Não confunda rascunho de edição com design salvo. Quando a ferramenta não oferecer exportação nesta sessão, entregue link/ID editável e indique que o arquivo de publicação ainda falta; use outra via de exportação apenas se estiver disponível e puder ser verificada.

Para logo novo ou redesenho pedido no Canva, leia também [logos e aplicações](logos-e-aplicacoes.md). Um link de design ou PNG não é automaticamente um arquivo mestre vetorial; confira os formatos de exportação realmente disponíveis antes de prometer o kit de marca final.

## Contratos atuais de geração e recuperação

Confira a descrição da ferramenta em cada sessão. Na revisão de 02/11/2026:

- `create-design` cria uma página/layout editável, mas não aplica kit nem template de marca. Para geração com kit, cores, fontes, logo ou template da marca solicitados, use a exceção de marca indicada no contrato: `prepare-design-generation`, quando disponível, ou a geração legada compatível. Descrever o kit no briefing não comprova aplicação. Para editar um design existente, use o fluxo de edição.
- Se a saída pedida for explicitamente uma imagem avulsa, use a rota de imagem do Canva, mesmo que contenha texto ou composição de infográfico. Em `generate-image`, preserve o texto do usuário sem acrescentar estilo, iluminação ou câmera não pedidos; só reformule quando houver pedido de refinamento. A análise interna e a revisão continuam específicas do cliente, sem encher um campo que exige texto literal.
- Quando o widget de geração acompanhar o job, deixe o widget consultar o estado; não duplique o polling. Sem widget, siga a ferramenta de consulta correspondente, o intervalo retornado e, quando exigido, o token de continuação mais recente. Falha sem job criado não tem ID para consultar. Aceite do job não comprova arte pronta nem inspeção visual.

### Créditos e falhas

A atualização oficial de 28/10/2026 das REST APIs passou a retornar `402` para cota de créditos esgotada, com `credit_quota_exceeded` (usuário) ou `app_credit_quota_exceeded` (aplicativo), nas operações indicadas pelo serviço. Não trate esses códigos como limite temporário de requisições nem repita a geração em loop. O conector pode expor códigos diferentes: em `create-design`, `quota_exceeded` interrompe a tentativa e `quota_cooldown` exige aguardar o período informado antes de tentar de novo. Leia código, mensagem e contrato; não diagnostique só pelo HTTP. Um `429` de limite de requisições segue a política de espera do serviço, sem ser confundido automaticamente com falta de créditos.

Registre o bloqueio, preserve o trabalho e continue texto ou revisão independentes. Não compre créditos, troque de conta ou acione outra ferramenta paga para contornar o bloqueio sem autorização correspondente. A ausência de `quota_usage` nas respostas afetadas não significa geração gratuita nem saldo disponível; registre consumo como desconhecido quando não houver evidência. Antes de repetir uma submissão cuja confirmação se perdeu, consulte o job existente quando o contrato permitir.

Fonte: [changelog oficial das APIs do Canva](https://www.canva.dev/docs/apps/rest-apis/changelog/). Essas regras de API não comprovam que todas as capacidades estejam expostas no conector; prevalece o contrato atual da ferramenta usada.

## Fechar a entrega

Depois de criar ou editar, obtenha link/ID, número de páginas, miniaturas e conteúdo quando acessíveis. Revise cada página em escala de celular e compare com o mapa de slides ou briefing. Faça checagem de marca com o kit **quando os dados necessários forem visíveis**; se a revisão for apenas visual, diga isso. Corrija divergências que a ferramenta suporta e registre as que exigem edição no editor.

Após importar foto tratada ou produto, compare a peça no Canva com o arquivo selecionado e, depois da exportação, compare de novo. Corrija corte, deslocamento, compressão, perda de nitidez ou alteração perceptível de pele e cores reais; preserve texto, logo e CTA como elementos editáveis quando a ferramenta permitir. Para PDF acessível, confira contraste, ordem de leitura e texto alternativo quando essas opções estiverem disponíveis na conta e no formato.

Se houver capacidade real de exportação, abra e confira os arquivos finais; salve-os no destino do cliente. Se a sessão só permitir design editável no Canva, entregue o link como design editável e não declare PNG/PDF exportado. Registre versão, ativo de origem, páginas, formatos, inspeção e qualquer consumo de recurso ou limite que a ferramenta informar. Recursos de IA e redimensionamento podem consumir cotas; confira antes de repetir gerações.

Fontes para revalidar recursos mutáveis: [kits de marca](https://www.canva.com/help/brand-kit/), [criação em lote](https://www.canva.com/help/bulk-create/), [redimensionamento](https://www.canva.com/help/resize/), [camadas editáveis](https://www.canva.com/en_gb/help/editable-magic-layers-variantb/) e [PDF acessível](https://www.canva.com/en_in/help/create-accessible-pdfs/). A disponibilidade efetiva depende da conta e da ferramenta exposta na sessão.
