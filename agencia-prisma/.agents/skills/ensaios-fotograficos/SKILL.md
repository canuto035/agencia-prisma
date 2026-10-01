---
name: ensaios-fotograficos
description: "Produza séries fotográficas realistas de pessoas ou produtos em cenários, preservando identidade e características originais."
---

# Ensaios fotográficos

## Papel no projeto

Crie séries de imagens com linguagem fotográfica coerente para campanhas, conteúdo, catálogo, marca pessoal e apresentação de produtos. Trabalhe em conjunto com `imagens-marketing` para organizar e inspecionar as referências, com `direcao-arte` quando precisar definir ou revisar a estética e com `design-grafico` quando as fotografias forem aplicadas em peças. Use `revisao-conteudo` na conferência final da entrega.

Em ensaio novo de campanha, leia [criação humana e distintiva](../coordenacao-agencia/references/criacao-humana-distintiva.md): cada cena precisa mostrar uma faceta da ideia ou uma prova diferente. Uma troca de fundo sem mudança de função não justifica outra fotografia.

Esta skill cria novas fotografias ou composições a partir das referências. Para corrigir luz, cor, ruído e nitidez sem criar um novo ensaio, use `imagens-marketing`.

## Inspeção obrigatória das referências

Antes de gerar, localize e abra cada imagem selecionada. Classifique seu papel:

- referência principal de identidade;
- ângulo complementar do rosto, corpo, personagem ou produto;
- referência de roupa, pose ou styling;
- referência de cenário, luz ou composição;
- ativo que deve ser inserido ou preservado exatamente.

Não trate uma referência de estilo como identidade. Se houver várias pessoas ou produtos, identifique-os de forma inequívoca. Quando o material não mostrar com clareza uma característica essencial, não a invente como se fosse fiel; preserve o que está comprovado e informe a limitação.

Leia [o protocolo de fidelidade](references/protocolo-fidelidade.md) em qualquer ensaio com pessoa, personagem, mascote ou produto identificável. Leia [os modos de ensaio](references/modos-de-ensaio.md) para escolher cobertura, cenários e variedade.

## Atalhos internos de estilo

Leia [a biblioteca de atalhos](references/atalhos-de-estilo.md) quando o usuário empregar uma palavra com barra, citar um estilo fotográfico ou deixar a estética em aberto. Reconheça atalhos como `/cinematic`, `/editorial`, `/studio`, `/lifestyle`, `/luxury`, `/documentary`, `/portrait`, `/product`, `/hero`, `/packshot` e `/macro` como presets internos de prompt.

Esses nomes servem como vocabulário interno de estilo quando o pedido não indicar uma ferramenta com comandos próprios. Se o usuário pedir Higgsfield com um token de barra, resolva primeiro a entrada na skill Higgsfield; se ela não existir, use o termo apenas como orientação visual. Traduza o estilo em luz, composição, lente aparente, textura, cor e acabamento. Se nenhum atalho for informado, selecione automaticamente o estilo adequado ao briefing. A fidelidade do modelo, personagem ou produto sempre prevalece sobre o preset.

## Briefing do ensaio

Determine finalidade, público, quantidade, proporções, pessoa ou produto principal, cenários, figurino, poses, atmosfera, nível de formalidade e restrições. Consulte briefing, DNA e direção de arte existentes. Se a quantidade não vier no pedido, defina apenas as cenas necessárias ao uso pretendido e declare a suposição antes de ampliar a série.

Antes da geração, monte um plano curto para cada fotografia: função, cenário, ação ou pose, enquadramento, lente aparente, luz, paleta, fundo e espaço necessário para texto. Varie cenário e composição sem perder a unidade do ensaio. Não use mudanças aleatórias apenas para aumentar a quantidade.

## Fidelidade de pessoas e personagens

Trate as imagens enviadas como fonte de identidade. Preserve formato e proporções do rosto, olhos, sobrancelhas, nariz, boca, mandíbula, orelhas, tom e textura de pele, idade aparente, cabelo, linha do cabelo, anatomia, proporções corporais, tatuagens, cicatrizes, sinais e outros traços distintivos visíveis.

Para personagens ilustrados, preserve silhueta, rosto, paleta, cabelo, roupa característica, acessórios, emblemas e linguagem de desenho que os torna reconhecíveis. Para mascotes, preserve espécie, proporções, materiais e elementos de marca.

Pose, expressão, roupa ou cenário podem mudar quando o briefing pedir, sem alterar a identidade. Uma referência estética pode orientar luz, cor e fotografia, mas não pode substituir o rosto, o corpo ou o desenho do personagem. Não rejuvenesça, emagreça, altere etnia, mude traços ou aplique embelezamento facial sem pedido explícito.

Use a mesma referência principal e a mesma descrição de identidade em toda a série. Em cada prompt e correção, repita as características que não podem mudar. Não prometa fidelidade absoluta: compare cada resultado ao original e rejeite os que descaracterizarem o sujeito.

## Fidelidade de produtos

Preserve geometria, proporções, cores, materiais, acabamento, tampa, embalagem, logotipo, rótulo, texto legível, detalhes de fabricação e escala relativa. Não invente variantes, selos, ingredientes, funções ou acessórios.

Quando a aparência exata do produto for essencial, prefira editar ou compor usando a foto real do produto em vez de regenerá-lo completamente. Textos pequenos e logotipos exigem inspeção ampliada; se a geração os deformar, mantenha o produto original e altere apenas cenário, iluminação ou composição.

O cenário deve respeitar física e uso plausíveis: apoio, contato, sombras, reflexos, líquidos, gravidade e perspectiva. Para alimentos, cosméticos e objetos brilhantes, confira textura, bordas, transparência e reflexos.

## Realismo fotográfico

Busque aparência de fotografia profissional natural: luz com origem coerente, sombras proporcionais, textura real de pele e materiais, pequenas assimetrias, tecidos com caimento plausível, profundidade de campo compatível e composição com intenção. Defina câmera e lente apenas quando ajudarem o resultado; não use jargão fotográfico decorativo.

Evite pele de plástico, olhos excessivamente brilhantes, dentes uniformes, desfoque artificial, nitidez exagerada, mãos ou dedos deformados, membros extras, cabelo fundido ao fundo, acessórios duplicados, padrões quebrados, textos sem sentido, logotipos distorcidos, reflexos impossíveis, objetos flutuantes e acabamento excessivamente perfeito.

Não acrescente assinatura, marca d’água, texto ou identidade visual dentro da fotografia, salvo pedido explícito. Quando a imagem receber texto em uma peça, deixe espaço negativo e encaminhe a composição para `design-grafico`.

## Geração e iteração

Use a ferramenta integrada `image_gen` e siga a skill instalada de geração de imagens. Para cada ensaio, visualize primeiro os arquivos locais e identifique no prompt o papel de cada referência. Use edição quando a prioridade for preservar o sujeito e mudar cenário, luz, roupa ou composição.

Se o Higgsfield estiver conectado e for adequado à série, use também `../higgsfield-producao/SKILL.md` para selecionar modelo, confirmar papéis das referências e estimar o custo. Gere uma imagem de controle antes do lote e só amplie se a identidade passar na comparação e o saldo couber no teto aprovado.

Para produto com texto, rótulo ou embalagem que precisa permanecer exato, use o produto original como base de edição/composição quando a ferramenta permitir; se o resultado alterar detalhes essenciais, rejeite-o. Fotografia nova de cenário não autoriza inventar uma variante do produto. Gere cada fotografia distinta em uma chamada própria, com prompt específico para a cena. Não use múltiplas variações genéricas como substituto de cenas planejadas. Preserve as invariantes de identidade e produto em todas as chamadas.

Inspecione o resultado após cada geração. Se houver falha de identidade, anatomia, produto ou realismo, faça uma correção direcionada mantendo todas as demais invariantes. Após duas correções sem fidelidade suficiente para uma cena, não apresente aquela imagem como final; preserve as versões válidas e informe o limite encontrado.

Salve os finais escolhidos na pasta do cliente, sem sobrescrever originais. Use nomes que indiquem ensaio, cenário e versão. Registre quais referências e prompts finais foram usados.

## Conferência da série

Compare cada imagem ao material original e depois compare a série entre si. Verifique:

- identidade e idade aparentes consistentes;
- cabelo, traços, anatomia e marcas distintivas;
- produto, logotipo, embalagem e cor corretos;
- mãos, dentes, olhos, orelhas e bordas naturais;
- luz, sombra, perspectiva e reflexos possíveis;
- variedade real de cenas sem perda de unidade;
- ausência de artefatos, textos involuntários e estética artificial;
- proporção, resolução e espaço de composição adequados ao uso.

Uma imagem bonita que não represente corretamente o sujeito ou o produto deve ser rejeitada.

Selecione as fotos finais também pelo destino: uma imagem fiel pode falhar como capa, anúncio ou página se o recorte eliminar o sujeito ou não houver espaço para mensagem. Entregue ao design a cena e versão escolhidas, áreas protegidas e recortes viáveis; não deixe que a montagem descaracterize uma foto aprovada.

## Inteligência ampliada

Quando o gatilho da demanda corresponder, a coordenação consulta automaticamente os apoios de `operacao/mapa-inteligencia-github.json`; carregue somente os complementos necessários e mantenha esta skill, o contexto aprovado e as instruções do usuário como autoridade.

- Crie travas explícitas de identidade antes da geração: rosto, proporções, idade aparente, cabelo, pele, marcas, embalagem, logotipo, materiais e detalhes que não podem mudar. Diferencie variação de pose e cenário de alteração de identidade.
- Planeje uma matriz de cobertura com planos, ângulos, ações, cenários e usos finais. Compare a série como conjunto, rejeitando anatomia, textura, reflexos, texto, continuidade ou aparência artificial antes de ampliar a produção.

## Formato padrão de entrega

Inclua, conforme o escopo do pedido: objetivo do ensaio; referências usadas e papel de cada uma; conceito; atalhos ou estilos interpretados; plano de cenas; prompts finais; arquivos gerados; relação cena → arquivo; resultado da conferência de identidade, produto e realismo; versões rejeitadas ou limitações relevantes; formatos e dimensões conferidos; possibilidades de aplicação em design.

Considere o ensaio pronto quando todas as imagens finais foram abertas e verificadas, o sujeito ou produto permanece reconhecível e consistente, cada cena cumpre uma função diferente e nenhum resultado com descaracterização ou artefato conhecido foi incluído como final.

## Decisões de qualidade e execução

Planeje continuidade entre cenas: mesma referência principal, traços invariáveis, figurino e produto coerentes. Inspecione a primeira imagem útil antes de ampliar a série, corrigindo a causa de eventual desvio. Não crie uma aprovação adicional obrigatória para continuar um ensaio já autorizado. Se a ferramenta não permitir identidade suficientemente fiel, explique o limite por cena e mantenha o material válido.

Crie uma ficha visual curta das invariantes antes da primeira geração e use-a sem alterações em toda a série. Varie uma dimensão principal por cena — ação, enquadramento, cenário ou luz — mantendo as demais controladas quando a continuidade importar. Compare original e resultado lado a lado no rosto, silhueta, mãos, produto e detalhes de marca; qualidade estética nunca compensa perda de identidade.
