# Execução e recuperação no portal de anúncios

Leia para criar, alterar, publicar, pausar ou retomar entidades em Meta Ads ou Google Ads. Use navegador/conector disponível, respeitando o navegador solicitado pelo usuário. O comando define o estado desejado e o alcance; não exige aprovação repetida de ações já autorizadas.

## Preparar a alteração

1. Confirme cliente, conta e entidade por ID e contexto, não apenas nome ou aba selecionada. Identifique se o alvo é campanha, conjunto/grupo, anúncio, palavra-chave, público ou controle compartilhado.
2. Leia o estado atual e registre a alteração mínima: comando/mandato, antes, valor absoluto desejado, orçamento/período quando a ação gerar gasto e dependências. Um aumento de 20% sobre 100 tem destino 120; ao retomar, não calcule outros 20% sobre 120.
3. Confira seleção em lote, rascunhos de terceiros, padrões da conta, orçamentos compartilhados e regras automáticas. Não publique mudanças alheias nem amplie o alcance para cumprir uma tarefa isolada. Se outro operador mudou o estado desde a leitura, reconcilie antes de sobrescrever.
4. Use campos e controles realmente observados; confira unidade, moeda, fuso, datas e separador decimal. Antes de salvar, confronte a configuração com o estado desejado. APIs, se disponíveis, exigem versão e esquema atuais, acesso e validação próprios; instalação de SDK não comprova conexão.

## Confirmar ou recuperar

Depois de salvar, releia os valores persistidos e o estado da entidade. Distinga operação não executada, persistida, parcial ou incerta do estado de entrega: rascunho, em análise, habilitado/elegível, pausado ou entrega efetivamente observada. Confira níveis dependentes quando a conclusão depender deles. Habilitar campanha não comprova que seus anúncios estejam entregando.

Após timeout ou confirmação ambígua, não repita criação, publicação ou aumento de verba. Consulte IDs retornados, entidades existentes e histórico quando disponível. Se o estado desejado já existir, continue o próximo item. Em lote parcial, execute somente os itens comprovadamente restantes. Nome parecido sozinho não comprova duplicação nem identidade. Se não for possível distinguir sucesso de falha, registre resultado incerto e bloqueie apenas a repetição dependente.

Registre na ficha do cliente, proporcionalmente à ação: data/fuso, comando e autorização, conta/IDs, antes → desejado, resultado observado, evidência e próxima etapa. Retorne à coordenação após cada etapa; plano, rascunho e publicação não encerram um pedido que também inclua conferência.

## Pausa, retomada e contenção

Uma pausa explicitamente pedida exige identidade, acesso e confirmação da pausa; não depende de margem, briefing, novo teto ou teste de conversão. Prefira pausa reversível à exclusão quando o pedido for interromper entrega. A instrução de continuar uma análise não autoriza reativar anúncios.

Reativação pode gerar gasto: confira mandato vigente, período, saldo, destino, dependências e motivo da pausa. Restaure somente os objetos cobertos pelo pedido, preservando pausas intencionais de componentes inferiores. Diante de gasto indevido, contenha a exposição dentro do mandato de gestão e verifique a ação; se faltar acesso ou autorização para conter, informe o bloqueio sem alegar pausa. Pausar não desfaz gasto ocorrido nem garante atualização imediata dos relatórios.

Fontes para conferência atual: [histórico de alterações do Google Ads](https://support.google.com/google-ads/answer/2454137), [hierarquia de pausa e retomada](https://support.google.com/google-ads/answer/2404259?hl=en) e [atualização dos dados](https://support.google.com/google-ads/answer/2544985?hl=en). Na Meta, confirme os estados e limites efetivamente exibidos na conta.
