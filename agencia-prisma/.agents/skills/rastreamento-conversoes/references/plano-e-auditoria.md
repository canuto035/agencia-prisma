# Plano e auditoria de mensuração

## Cadeia mínima

Origem → campanha/UTM → página → ação → evento → plataforma → CRM → venda → receita.

Para cada evento, registre nome, descrição, gatilho exato, parâmetros, plataforma de destino, deduplicação, consentimento, responsável e evidência. Um teste completo confirma o evento na origem, no depurador ou diagnóstico e no relatório ou sistema receptor.

## Estados

- planejado: existe apenas no documento;
- configurado: regra criada, ainda sem publicação;
- publicado: alteração ativa, ainda sem teste completo;
- validado: teste observado com parâmetros corretos;
- degradado: funciona parcialmente ou com diagnóstico;
- bloqueado: falta acesso, consentimento, desenvolvimento ou decisão.

## Auditoria

Confira domínios, IDs, versões, tags duplicadas, UTMs, eventos recomendados, moeda e valor, cross-domain, consentimento, exclusão de tráfego interno, conversões primárias, CAPI/servidor, deduplicação, importação offline e ligação com o CRM. Registre o que foi realmente acessado.
