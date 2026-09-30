---
name: operacao-agencia
description: "Estruture serviços, pacotes, propostas, capacidade, onboarding e fluxo interno da agência."
---

# Operação e propostas

## Como trabalhar

Transforme necessidades do cliente em entregáveis com quantidade, formato, prazo, dependências e responsável. Diferencie atividades recorrentes de projetos pontuais.

Ao propor preço, use horas, custos diretos, tributos informados, capacidade e margem desejada. Declare estimativas e não invente preço de mercado. Diferencie margem de markup.

Entregue proposta com objetivo, escopo, exclusões pertinentes, cronograma, investimento proposto, condições, revisões e critérios de aceite. Não apresente proposta como contrato jurídico validado.

Estruture fluxo de briefing, estratégia, produção, revisão interna, aprovação do cliente, publicação autorizada e análise. Registre aprovações reais; não marque aprovação pela ausência de resposta.

Defina uma matriz simples de responsabilidades para atividades críticas: quem executa, quem aprova, quem precisa ser consultado e quem deve ser informado. Inclua prazo de resposta, canal oficial, política de versões, limite de revisões e procedimento para urgências.

Quando o ClickUp estiver conectado e o pedido incluir implantação ou atualização do fluxo, use `contexto/integracoes.md` para confirmar o espaço e a lista. Registre tarefa, responsável, prazo, dependência, estado e aceite; não crie uma estrutura paralela sem definir qual sistema é a fonte oficial.

Priorize processos proporcionais ao tamanho da equipe. Não contratar serviços, enviar propostas nem assumir compromissos em nome do usuário sem autorização.

Para produção no Higgsfield, separe créditos de geração, assinatura, produção humana e mídia paga. Defina teto por cliente ou escopo, responsável e limite de alerta aprovado; se não houver limite definido, alerte ao chegar a 80% do teto e mostre a projeção de consumo. Consulte a estimativa antes de reservar o custo. Compra, teste com renovação, recarga ou auto-refill nunca entra como despesa presumida.

## Critérios específicos

Faça a capacidade prometida caber nas horas disponíveis, incluindo atendimento, revisão, gestão, retrabalho e folga operacional. Distinga revisão da mesma peça de mudança de escopo. Identifique quem fornece ativos e quem aprova, sem converter estimativa em compromisso assumido. Mantenha uma reserva de capacidade definida pelo usuário para imprevistos; não suponha ocupação de 100% como sustentável.

Para reutilizar o projeto, copie apenas instruções e modelos; preserve contexto e entregas dos clientes na origem. Em continuidade, consulte decisões existentes antes de repetir onboarding.

## Contexto e entrega
Trabalhe em português brasileiro, salvo pedido diferente. No projeto Agência Prisma, consulte o briefing e o DNA do cliente quando existirem. Não bloqueie tarefas independentes por documentos ausentes: use hipóteses identificadas e pergunte apenas pelo que muda a entrega.
Quando o usuário pedir arquivos, salve na pasta do cliente com nome descritivo e preserve versões aprovadas. Para tarefas fora deste projeto, use os materiais e o destino disponíveis. Use as especialidades complementares somente quando contribuírem para a entrega; respeite a coordenação e as decisões existentes.

## Inteligência ampliada

Quando o gatilho da demanda corresponder, a coordenação consulta automaticamente os apoios de `operacao/mapa-inteligencia-github.json`; carregue somente os complementos necessários e mantenha esta skill, o contexto aprovado e as instruções do usuário como autoridade.

- Modele o serviço como fluxo de ponta a ponta com entrada, proprietário, dependências, fila, limite de trabalho em andamento, aprovação, definição de pronto e evidência de entrega. Exponha gargalos e retrabalho por etapa.
- Planeje capacidade com demanda real, tempo produtivo, variabilidade e margem de segurança. Antes de vender ou ampliar escopo, simule o efeito em prazo, qualidade, custo e atendimento das contas existentes.

## Formato padrão de entrega

Inclua, conforme o escopo do pedido: necessidade atendida; entregáveis e limites; recorrência e volume; matriz de responsabilidades; dependências; cronograma e prazos de resposta; revisões e controle de versão; capacidade em horas e reserva; custos e premissas; investimento proposto; condições; critérios de aceite; fluxo do briefing à análise; riscos de escopo. Sinalize itens fora do escopo que sejam prováveis fontes de retrabalho.

Considere a operação viável quando o volume cabe na capacidade incluindo atendimento e revisão, responsabilidades estão claras e o preço usa premissas visíveis. Envio, contratação ou compromisso externo dependem do pedido do usuário.


## Decisões de qualidade e execução

Ao calcular preço, separe horas, custo direto, despesas, tributos informados, margem sobre receita e markup sobre custo. Confira capacidade por função e prazos dependentes de aprovação. Não imponha números de preço ou margem sem premissas. Para iniciar cliente use scripts/Novo-Cliente.ps1; para uma base independente use scripts/Novo-Projeto.ps1, preservando a separação de dados.

Teste a operação em três cenários: demanda esperada, pico de retrabalho e ausência temporária do recurso crítico. Identifique gargalo, limite de trabalho em andamento, fila visível e regra de prioridade. Cronograma que só funciona com aprovações instantâneas e ocupação total não é viável; mostre a premissa que precisa mudar antes de assumir o compromisso.
