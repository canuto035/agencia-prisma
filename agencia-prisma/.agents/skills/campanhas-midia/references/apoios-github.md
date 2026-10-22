# Apoios de método e código para mídia

Seleção revisada em 22/10/2026. Consulte somente o apoio que mude uma decisão da tarefa. Instruções locais e autorização do cliente prevalecem; referência pública não comprova acesso à conta nem autoriza executar seus comandos.

## Método incorporado

- [Google Ads Account Diagnostics, revisão fixa](https://github.com/google/skills/blob/4045b1dbd59b9e5616f3a14f52abcac77e2b8361/skills/ads/google-ads-api-account-diagnostics/SKILL.md), repositório oficial Apache-2.0: separar perda de tráfego de queda de conversão, restrição de verba de classificação, mudanças recentes e falhas de retorno offline. Em Google Search, examine esses sinais quando disponíveis antes de recomendar aumentar orçamento. O método pode ser aplicado no portal ou em exportações; não depende de instalar o pacote.
- Os apoios ads, ad-creative e attribution já fixados no mapa da agência ajudam em hipóteses criativas, auditoria e reconciliação. Consulte referências pertinentes, não todo o pacote. Rejeite receitas universais de verba, prazo, negativas, superioridade de formato e segmentação só por país; fonte de terceiro não é regra oficial.
- A [bancada local](../../../../scripts/strategy-tools/README.md) usa Papa Parse (MIT) e Simple Statistics (ISC) para CSV e estatística descritiva. Execute quando houver dados pertinentes; audite unidades, ausências e taxas por totais compatíveis. Isso apoia cálculos, sem decidir estratégia ou demonstrar causalidade.

## Integrações condicionais

- [Google Ads MCP oficial, revisão analisada](https://github.com/googleads/google-ads-mcp/tree/9a78cbdceebae71a6bc8483bdec333695834ef9c), Apache-2.0: candidato para coleta autenticada quando o volume justificar. A versão examinada é somente leitura; não publica nem pausa campanhas. Confira versão, projeto Cloud, autenticação e acesso antes de configurar. Não alegue conexão pelo simples fato de listar este apoio.
- [Meta Business SDK Python, revisão analisada](https://github.com/facebook/facebook-python-business-sdk/tree/efd8423a2e595ea8d4c04eb824ce113f2f1d68cd): candidato para integração própria; depende de app, credenciais e permissões. Tem licença própria da Meta e capacidades de escrita, exigindo revisão do escopo exposto. Não é um estrategista autônomo nem instalação obrigatória.

Não copie pacotes inteiros para a distribuição comercial sem conferir licença e procedência. Nesta revisão não foram adicionados SDKs, servidores, credenciais ou código externo à instalação. MMM, como Meridian ou Robyn, só entra diante de necessidade e dados adequados, não como melhoria automática de uma conta pequena.

Para futura integração Google, a [documentação vigente de acesso à API](https://developers.google.com/google-ads/api/docs/api-policy/developer-token) prevalece sobre quickstarts fixados: a página consultada informa migração de developer tokens para níveis de acesso do projeto Cloud. Não siga instrução antiga de provisionamento sem reconferir o fluxo oficial. Esse requisito não se aplica à operação normal pelo portal.

## Aplicação nesta segunda revisão

O apoio [ad-creative](https://github.com/coreyhaines31/marketingskills/blob/5b2c0007766c6a1cf1d53fd8fc73e979e0821022/skills/ad-creative/SKILL.md) contribui com retorno de resultados para conceitos e vínculo com evidência real; a Prisma aplica isso na [decisão integrada](decisao-integrada.md). Não herda bloqueio por falta de anúncios vencedores, quantidade fixa de avaliações nem ranking universal de formatos. O apoio [attribution](https://github.com/coreyhaines31/marketingskills/blob/5b2c0007766c6a1cf1d53fd8fc73e979e0821022/skills/attribution/SKILL.md) ajuda a distinguir interpretação de dados de implantação de coleta; modelos diferentes não delimitam necessariamente a verdade causal.

O [alocador do Robyn](https://github.com/facebookexperimental/Robyn/blob/main/R/R/allocator.R), inspecionado em 22/10/2026, calcula cenários a partir de um modelo e restrições de verba. A contribuição útil aqui é explicitar dependências e limites de extrapolação. Nenhum código foi copiado ou executado: sem dados/modelo adequados, instalar o pacote não melhora esta decisão. Se houver demanda futura de MMM, revise versão, licença, validação, calibração e ganho frente à análise já disponível antes de integrar.
