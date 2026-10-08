# LP de diagnóstico: pesquisa, antes e depois

Use quando o usuário pedir uma apresentação em formato de LP para explicar a análise da página/perfil e as melhorias. O produto é um relatório visual navegável para o cliente. Não aplique automaticamente uma página de captação, formulário, CRM, pixel ou oferta da agência a esse formato. Se a demanda também pedir redesenho comercial ou implantação, registre essa entrega separada e execute conforme o escopo autorizado.

## Entrada e contrato de entrega

Receba de `referencias-conteudo` a [pesquisa da página](../../referencias-conteudo/references/pesquisa-pagina-cliente.md): cliente, URL/canal, datas, objetivo, cobertura e amostra, evidências com IDs, capturas originais e limites. Confira briefing, DNA e decisões existentes. Uma fonte inacessível permanece inacessível; texto de busca ou placeholder não vira captura original.

Confirme formato, quantidade, destino, versão e critério de aceite. Se a URL real ainda não existe no pedido nem no contexto confirmado, entregue somente estrutura/demonstração identificada e mantenha pesquisa real e antes original pendentes. Use o [modelo de diagnóstico](../../../../modelos/diagnostico-pagina.md) para registrar essa diferença. Não declare que o cliente foi analisado a partir de um exemplo.

Separe três decisões:

- **Diagnóstico:** o que os dados e o acesso permitem afirmar.
- **Melhoria proposta:** copy, estrutura, hierarquia ou fluxo que poderá ser avaliado/implementado.
- **Estado da entrega:** estrutura escrita, HTML gerado, prévia inspecionada, implementado no site do cliente ou publicado. Marque somente o estado comprovado.

## Responsáveis e dependências

| Etapa | Responsável e contribuição necessária |
|---|---|
| Coleta e análise do antes | `referencias-conteudo`; `pesquisa-mercado`, `inteligencia-competitiva` ou `customer-research` apenas quando a decisão exigir mercado, comparação ou voz do público |
| Síntese e priorização | Coordenação com `paginas-conversao`; `metricas-marketing` quando houver dados reais |
| Texto e proposta de conteúdo | `copy-ofertas`; apoiadoras de formato para perfil social ou conteúdos específicos |
| Identidade e visual | `dna-marca`/`direcao-arte` quando houver decisão nova; `design-grafico` monta; `imagens-marketing` pesquisa/trata ativos quando necessário |
| LP da apresentação | `paginas-conversao` estrutura e implementa no formato/ferramenta disponível; devolve arquivo e evidência de conferência |
| Mensuração ou teste solicitado | `rastreamento-conversoes`, `metricas-marketing` e `ab-testing` conforme coleta, leitura ou experimento; não instalar automaticamente na LP do relatório |
| Revisão e proteção | `revisao-conteudo`; `governanca-ativos-lgpd` quando ativos, dados ou autorização produzirem risco material |

Passe o objetivo, fatos, limites, arquivos e critério de conclusão a cada etapa. Após o retorno, confira a saída e avance para a próxima dependência do pedido original. Selecionar ou listar especialistas não comprova que sua contribuição foi aplicada.

## Arquitetura da apresentação

Adapte a ordem à pergunta do cliente. Um percurso padrão útil é:

1. **Abertura:** cliente, página/perfil, data e objetivo; estado de demonstração ou diagnóstico real visível.
2. **Síntese:** principal obstáculo sustentado pela pesquisa, acertos e poucas prioridades; evite parecer negativo por padrão.
3. **Cobertura:** o que foi visto, em quais telas/períodos, tamanho da amostra e o que ficou de fora.
4. **Antes:** estado atual com trechos/capturas originais, fonte, data e IDs das evidências.
5. **Depois proposto:** comparação explicada com a mudança concreta, razão, hipótese e evidência de referência.
6. **Plano de melhorias:** prioridade, esforço, responsável, dependências, critério de verificação e dados pendentes.
7. **Conteúdo sugerido:** copy por trecho, bio, CTAs ou exemplos de pauta conforme o canal; proposta claramente identificada.
8. **Roteiro e próximo passo:** o que pode ser executado, o que exige definição, como validar e qual decisão se espera do cliente.
9. **Fontes e limites:** links, datas, condições e restrições de acesso relevantes.

Uma navegação por seções e âncoras ajuda a leitura. O CTA da apresentação pode levar às recomendações ou à decisão indicada; não deve enviar mensagem, cadastrar lead ou prometer contratação por padrão. Não invente preço, prazo, pacote, depoimento, escassez, KPI, resultado comercial ou garantia para preencher espaço visual.

## Antes/depois confiável

Cada comparação liga **evidência → antes original → depois proposto → mudança → hipótese/validação**. O texto atual é trecho literal ou síntese rotulada; a copy alternativa é proposta. Preserve o original mesmo que a apresentação mostre recorte ou versão com dados pessoais ocultos.

Use rótulos visíveis “Antes observado” e “Depois proposto”. Se o depois estiver implementado numa prévia, identifique onde e quando; isso não o torna publicado no domínio do cliente. Se houver dados posteriores reais, descreva período, fonte, definição e desenho da comparação; alteração visual não prova causalidade sobre leads ou vendas.

Imagens são opcionais. Quando disponíveis, compare o mesmo trecho, escala e largura de tela; cite diferenças materiais se os recortes não forem equivalentes. Acrescente legenda e texto alternativo. Não recrie o antes com geração de imagem, HTML fictício ou layout semelhante. Sem captura, use o trecho textual acessado e declare o limite; sem original acessível, deixe a comparação pendente. Uma proposta visual genérica permanece demonstração.

Não avalie toda a conta a partir de uma capa ou todo o site a partir de uma dobra. Para Instagram, compare bio com bio, post com post ou sequência com sequência; antes de Reel depende do vídeo/trecho realmente observado. Para site, inclua propostas no celular quando o achado depender desse contexto.

## Gerar o arquivo local

Para o formato estático, use o [JSON de exemplo](../../../../modelos/relatorio-cliente.example.json) e o [renderer local](../../../../scripts/client-report/render-report.mjs). Leia o esquema e a documentação atuais antes de preencher. Copie o exemplo para a pasta do cliente ou para destino explicitamente pedido, preserve versões e substitua exemplos somente por dados verificados ou propostas rotuladas.

Os blocos do relatório incluem identificação/data, síntese e objetivo, cobertura, evidências, melhorias, comparações, sugestões de conteúdo, roteiro e próximo passo. Preencha os campos e vínculos de IDs conforme o exemplo real; não invente chaves nem atribua capacidade de pesquisa ao renderer. Imagens locais de antes/depois, quando usadas, devem vir da coleta e da proposta identificadas; PNG, JPG ou WebP são incorporados ao HTML pelo renderer.

Na raiz do projeto, a interface do renderer é:

```text
node scripts/client-report/render-report.mjs <relatorio.json> <saida.html>
```

Use caminhos explícitos do relatório e da saída. O comando transforma o JSON em HTML; não visita sites, coleta screenshots, verifica fatos ou publica. Confira os arquivos, os vínculos de evidência e a saída; erro de entrada deve ser resolvido antes de apresentar o HTML. Se o runtime não estiver disponível, escolha ferramenta equivalente que consiga produzir e verificar o formato pedido e registre o limite real.

O relatório do cliente fica em `clientes/<identificador>/` ou no destino pedido, com dados/fonte separados de assets e HTML final. Exemplo geral e testes da base ficam fora do histórico oficial do cliente. Não grave informação privada na base, nem acrescente serviços externos, scripts de terceiros ou rastreamento sem necessidade e autorização correspondente.

## Conferência final

Inspecione o HTML/prévia de verdade em **desktop e celular**, com dimensões registradas. Confira primeira tela, cada comparação, textos longos, imagens, navegação e rodapé. Se uma largura não puder ser conferida, declare a pendência. Estrutura HTML válida ou inspeção do código não substitui a revisão visual.

Verifique se não há transbordamento horizontal, texto ilegível, corte de legenda, imagens deformadas ou botões sem destino. Confira teclado/foco, títulos, contraste, textos alternativos e links. Chame a avaliação de acessibilidade de preliminar quando limitada; não declare certificação ou conformidade completa por esses checks.

Confira ainda:

- Cada achado e comparação possui evidência acessada, fonte/data e limite compatível.
- Antes original e depois proposto são distinguíveis inclusive em celular e na impressão, se esta fizer parte da entrega.
- Provas, métricas, números e condições comerciais têm fonte; hipóteses não foram promovidas a fatos.
- O exemplo/demonstração não passa por diagnóstico real e todos os arquivos citados existem.
- Prioridades correspondem ao objetivo, com responsáveis, dependências e próximo passo executável.
- Identidade e ativos do cliente foram preservados; conteúdo foi revisado e dados pessoais desnecessários foram removidos da apresentação.

Uma LP local conferida está pronta para avaliação do cliente. Publicação, envio, implementação no site e teste de ganho são etapas com evidências próprias e só entram no escopo autorizado. Se a apresentação está pronta, mas falta pesquisa real, informe ambos os estados em vez de concluir a demanda inteira.

## Fontes de método

Consultadas em 08/10/2026:

- [CRO no complemento fixado da agência](https://github.com/coreyhaines31/marketingskills/blob/5b2c0007766c6a1cf1d53fd8fc73e979e0821022/skills/cro/SKILL.md): clareza, hierarquia de CTA, prova e esforço orientam perguntas e prioridades. A adaptação local exige evidência e trata ganhos como hipótese.
- [web.dev — Responsive web design basics](https://web.dev/articles/responsive-web-design-basics): layout deve se adaptar ao conteúdo e à largura; conferência em duas telas não é apenas reduzir uma imagem.
- [W3C WAI — Easy Checks](https://www.w3.org/WAI/test-evaluate/preliminary/): a verificação inicial de teclado, contraste, texto e formulário tem alcance limitado e não substitui avaliação completa.
