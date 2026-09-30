---
name: publicacao-distribuicao
description: "Adapte, programe, publique ou confira conteúdos nos canais e registre o estado real de cada peça."
---

# Publicação e Distribuição

## Objetivo

Leve ativos aprovados aos canais certos, no formato certo e no momento certo, com conferência antes e depois da publicação. Use `revisao-conteudo` para conferir a versão do canal. Acione a skill produtora apenas se faltar adaptação, `planejamento-editorial` se precisar organizar o calendário, `rastreamento-conversoes` para links e eventos medidos, `metricas-marketing` para acompanhamento solicitado e `governanca-ativos-lgpd` para requisitos materiais de direitos, pessoas ou dados. Consulte [checklist por estado](references/checklist-publicacao.md).

## Entrada automática

Ative para publicar, programar, agendar, subir, distribuir, adaptar por canal, configurar legenda/capa, atualizar calendário ou verificar se algo ficou no ar. O usuário não precisa nomear esta skill.

Localize cliente, canal, conta, peça aprovada, versão final, data, fuso, objetivo, CTA, destino, acessibilidade, marcações e autorização existente. Use `contexto/fila-publicacao.md`. A criação do conteúdo não autoriza publicação; um pedido explícito para publicar ou agendar autoriza esse escopo.

## Fluxo

1. Confirme a versão aprovada e preserve o arquivo original.
2. Confira e adapte somente quando necessário dimensões, duração, compressão, capa, título, legenda, hashtags, texto alternativo, legendas de vídeo, links e parâmetros de rastreamento.
   Use Canva para adaptação visual e Google Drive para o arquivo oficial quando essas integrações estiverem registradas para o cliente; confirme pasta, kit e versão.
3. Faça a checagem prévia: marca, fatos, direitos, dados pessoais, CTA, destino, datas, estoque, preço e restrições do canal.
4. Registre canal, conta, fuso, data, responsável, versão e estado.
5. Quando houver acesso e autorização, use a integração ou navegador adequado. Evite publicar simultaneamente em lote antes de validar uma peça representativa.
6. Após a ação, confira visualização, áudio, corte, legenda, link e horário. Salve URL, ID ou captura quando disponível.
7. Atualize o estado como programado ou publicado somente após confirmação real. Em falha, preserve o rascunho, registre a mensagem e evite duplicar a publicação.
8. Registre identificador e data; encaminhe a `metricas-marketing` e `rastreamento-conversoes` quando houver acompanhamento ou coleta no escopo.

## Operação contínua

Uma aba aberta não cria monitoramento. Se o usuário pedir acompanhamento recorrente, use uma automação compatível com regras, frequência e política de notificações. Sessões expiradas, desafios de segurança e mudanças do canal exigem nova verificação.

Não altere orçamento, impulsione, aceite termos, conecte contas ou exclua publicação sem autorização correspondente. Não prometa alcance ou aprovação automática da plataforma.

## Inteligência ampliada

Quando o gatilho da demanda corresponder, a coordenação consulta automaticamente os apoios de `operacao/mapa-inteligencia-github.json`; carregue somente os complementos necessários e mantenha esta skill, o contexto aprovado e as instruções do usuário como autoridade.

- Use pré-voo por canal: versão aprovada, proporção, duração, capa, legenda, links, marcações, acessibilidade, direitos, data, fuso e destino. Gere um identificador por publicação para impedir duplicidade em reenvios.
- Após publicar, verifique o estado no canal e registre URL, horário, conta, versão e eventuais diferenças. Prepare correção, retirada ou republicação com critério explícito, preservando a evidência do que ocorreu.

## Formato padrão de entrega

Entregue fila atualizada, arquivos e versões usados, canais, datas, estados reais, URLs ou IDs confirmados, adaptações, verificações, falhas e próximo marco de medição.

Considere concluído quando cada item estiver no estado solicitado e verificável: pronto para aprovação, aprovado, programado, publicado ou bloqueado com motivo e ação necessária.
