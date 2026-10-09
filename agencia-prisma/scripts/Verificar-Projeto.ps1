[CmdletBinding()]
param([string]$ProjetoRaiz=(Split-Path -Parent $PSScriptRoot),[int]$QuantidadeEsperada=0)
$ErrorActionPreference='Stop'
. (Join-Path $PSScriptRoot 'Prisma-Caminhos.ps1')
$base=Assert-PrismaPath $ProjetoRaiz
$manifest=Get-Content -LiteralPath (Join-Path $base 'operacao/catalogo.json') -Raw -Encoding utf8 | ConvertFrom-Json
$names=@($manifest.skills | ForEach-Object nome)
if(-not $QuantidadeEsperada){$QuantidadeEsperada=$names.Count}
$errors=[Collections.Generic.List[string]]::new()
$dirs=@(Get-ChildItem -LiteralPath (Join-Path $base '.agents/skills') -Directory)
if($dirs.Count -ne $QuantidadeEsperada){$errors.Add("Esperadas $QuantidadeEsperada skills; encontradas $($dirs.Count).")}
foreach($name in $names){if($name -notin $dirs.Name){$errors.Add("Skill do catálogo ausente: $name")}}
if($names.Count -ne (@($names | Sort-Object -Unique)).Count){$errors.Add('Há nomes duplicados no catálogo.')}
if(@($manifest.skills | Where-Object {$_.automatica -ne $true}).Count){$errors.Add('Toda skill deve manter seleção automática.')}
if($manifest.coordenador -ne 'coordenacao-agencia'){$errors.Add('Coordenador do catálogo divergente.')}
$descriptions=@($manifest.skills | ForEach-Object descricao)
if($descriptions.Count -ne (@($descriptions | Sort-Object -Unique)).Count){$errors.Add('Há descrições duplicadas no catálogo.')}
foreach($item in $manifest.skills){if($item.descricao.Length -gt 150){$errors.Add("Descrição longa demais para descoberta concisa: $($item.nome)")}}
foreach($dir in $dirs){
    $name=$dir.Name
    if($name -notin $names){$errors.Add("Skill fora do catálogo: $name")}
    $skill=Join-Path $dir.FullName 'SKILL.md'
    $ui=Join-Path $dir.FullName 'agents/openai.yaml'
    if(-not(Test-Path -LiteralPath $skill) -or -not(Test-Path -LiteralPath $ui)){$errors.Add("Arquivos obrigatórios ausentes: $name");continue}
    $body=Get-Content -LiteralPath $skill -Raw -Encoding utf8
    $yaml=Get-Content -LiteralPath $ui -Raw -Encoding utf8
    if($body -notmatch ('(?m)^name:\s*'+[regex]::Escape($name)+'\r?$')){$errors.Add("Nome interno divergente: $name")}
    if($body -notmatch '(?m)^description:\s*\S'){$errors.Add("Descrição ausente: $name")}
    if($yaml -notmatch 'allow_implicit_invocation:\s*true'){$errors.Add("Seleção automática ausente: $name")}
    if($yaml -notmatch [regex]::Escape('$'+$name)){$errors.Add("Prompt sem nome da skill: $name")}
    if($body -notmatch '## Formato padrão de entrega' -or $body -notmatch 'Considere '){$errors.Add("Entrega/conclusão ausente: $name")}
    if($body -cmatch '(?m)(^|\s)(TODO|TBD)(\s|:|$)' -or $body -match '(?i)preencher aqui|placeholder'){$errors.Add("Marcador inacabado: $name")}
    if($body -match '(?m)^license:\s*(.+)$' -and -not(Test-Path -LiteralPath (Join-Path $dir.FullName 'LICENSE'))){$errors.Add("Licença declarada sem arquivo: $name")}
    foreach($file in @(Get-PrismaFiles $dir.FullName | Where-Object Extension -eq '.md')){
        $text=Get-Content -LiteralPath $file.FullName -Raw -Encoding utf8
        foreach($match in [regex]::Matches($text,'\]\(([^)]+)\)')){
            $link=$match.Groups[1].Value
            if($link -match '^[a-z]+://' -or $link.StartsWith('#')){continue}
            $link=$link.Split('#')[0]
            if(-not(Test-Path -LiteralPath (Join-Path $file.DirectoryName $link))){$errors.Add("Referência ausente em ${name}: $link")}
        }
    }
}
foreach($file in @('SKILL.md','agents/openai.yaml','AGENTS.md','COMECE-AQUI.md','.codex/config.toml','operacao/catalogo.json','operacao/higgsfield.json','operacao/integracoes-agencia.json','operacao/mapa-inteligencia-github.json','modelos/orcamento-higgsfield.md','modelos/plano-mensuracao.md','modelos/fila-publicacao.md','modelos/atendimento-reputacao.md','modelos/rentabilidade-cliente.md','modelos/governanca-ativos-lgpd.md','modelos/inteligencia-competitiva.md','modelos/integracoes-cliente.md','scripts/Ativar-Prisma-No-Projeto.ps1','scripts/Ativar-Prisma-No-Projeto.Tests.ps1','.agents/skills/coordenacao-agencia/references/continuidade.md','.agents/skills/coordenacao-agencia/references/cenarios-ativacao.md','.agents/skills/coordenacao-agencia/references/protocolo-decisao.md','.agents/skills/coordenacao-agencia/references/matriz-ativacao.md','.agents/skills/higgsfield-producao/references/ferramentas-e-orcamento.md','.agents/skills/governanca-ativos-lgpd/references/controles-minimos.md','.agents/skills/inteligencia-competitiva/references/metodo-observacao.md')){
    if(-not(Test-Path -LiteralPath (Join-Path $base $file))){$errors.Add("Arquivo da base ausente: $file")}
}
$entry=Get-Content -LiteralPath (Join-Path $base 'AGENTS.md') -Raw -Encoding utf8
$globalEntryPath=Join-Path $base 'SKILL.md'
if(Test-Path -LiteralPath $globalEntryPath -PathType Leaf){
    $globalEntry=Get-Content -LiteralPath $globalEntryPath -Raw -Encoding utf8
    if($globalEntry -notmatch '(?m)^name:\s*agencia-prisma\r?$' -or $globalEntry -notmatch '(?m)^description:\s*\S'){$errors.Add('Metadados da entrada global ausentes ou divergentes.')}
    foreach($link in [regex]::Matches($globalEntry,'\]\(([^)]+)\)')){
        $relative=$link.Groups[1].Value.Split('#')[0]
        if($relative -and $relative -notmatch '^[a-z]+://' -and -not(Test-Path -LiteralPath (Join-Path $base $relative))){$errors.Add("Referência ausente na entrada global: $relative")}
    }
}
$globalUiPath=Join-Path $base 'agents/openai.yaml'
if(Test-Path -LiteralPath $globalUiPath -PathType Leaf){
    $globalUi=Get-Content -LiteralPath $globalUiPath -Raw -Encoding utf8
    if($globalUi -notmatch 'allow_implicit_invocation:\s*true' -or $globalUi -notmatch [regex]::Escape('$agencia-prisma')){$errors.Add('Entrada global sem seleção implícita ou prompt com nome da skill.')}
}
$override=Join-Path $base 'AGENTS.override.md'
if(Test-Path -LiteralPath $override -PathType Leaf){
    $null=Assert-PrismaPath $override
    $effective=Get-Content -LiteralPath $override -Raw -Encoding utf8
    $beginCount=[regex]::Matches($effective,'<!-- PRISMA:BEGIN -->').Count
    $endCount=[regex]::Matches($effective,'<!-- PRISMA:END -->').Count
    $anchor=[regex]::Match($effective,'(?ms)^<!-- PRISMA:BEGIN -->\r?$.*?^<!-- PRISMA:END -->\r?$')
    $native=$effective -match '(?m)^# Operação automática — Agência Prisma\r?$' -and $effective -match '(?m)^Em todo pedido de marketing deste projeto, leia `\.agents/skills/coordenacao-agencia/SKILL\.md`'
    if($beginCount -ne $endCount -or $beginCount -gt 1 -or ($beginCount -and -not $anchor.Success)){$errors.Add('Bloco Prisma inválido na entrada efetiva AGENTS.override.md.')}
    if(-not $native -and -not($anchor.Success -and $anchor.Value.Contains('agencia-prisma') -and $anchor.Value.Contains('.agents/skills/coordenacao-agencia/SKILL.md'))){$errors.Add('AGENTS.override.md tem precedência e não encaminha à coordenação. Preserve o texto e aplique Ativar-Prisma-No-Projeto.ps1 à raiz do projeto.')}
}
if($entry -notmatch '\.agents/skills/coordenacao-agencia/SKILL.md'){$errors.Add('Entrada da coordenação ausente.')}
if($entry -notmatch 'protocolo-decisao\.md'){$errors.Add('Protocolo de decisão não está ligado à entrada do projeto.')}
if($entry -notmatch 'matriz-ativacao\.md'){$errors.Add('Matriz de ativação não está ligada à entrada do projeto.')}
foreach($name in $names){if($entry -notmatch [regex]::Escape($name)){$errors.Add("Rota ausente: $name")}}
$coord=Get-Content -LiteralPath (Join-Path $base '.agents/skills/coordenacao-agencia/SKILL.md') -Raw -Encoding utf8
$coordUi=Get-Content -LiteralPath (Join-Path $base '.agents/skills/coordenacao-agencia/agents/openai.yaml') -Raw -Encoding utf8
$matrix=Get-Content -LiteralPath (Join-Path $base '.agents/skills/coordenacao-agencia/references/matriz-ativacao.md') -Raw -Encoding utf8
$capabilities=Get-Content -LiteralPath (Join-Path $base '.agents/skills/coordenacao-agencia/references/capacidades.md') -Raw -Encoding utf8
if($coord -notmatch 'matriz-ativacao\.md'){$errors.Add('Coordenação não carrega a matriz de ativação.')}
if($coordUi -notmatch 'matriz de ativa'){$errors.Add('Prompt padrão da coordenação não pede a matriz de ativação.')}
foreach($name in $names){if($matrix -notmatch ('(?<![A-Za-z0-9-])'+[regex]::Escape($name)+'(?![A-Za-z0-9-])')){$errors.Add("Skill ausente na matriz de ativação: $name")}}
# Plugins são opcionais e variam por sessão; o validador não atesta instalação nem execução.
$handoff=Join-Path $base '.agents/skills/coordenacao-agencia/references/execucao-e-handoffs.md'
if(-not(Test-Path -LiteralPath $handoff)){$errors.Add('Protocolo de encaminhamento ausente.')}
if($coord -notmatch 'execucao-e-handoffs\.md'){$errors.Add('Coordenação não carrega o protocolo de encaminhamento.')}
if($entry -notmatch 'gatilhos de retomada' -or $coord -notmatch 'gatilhos de retomada'){$errors.Add('Gatilho de retomada ausente na entrada ou na coordenação.')}
$handoffText=Get-Content -LiteralPath $handoff -Raw -Encoding utf8
if($handoffText -notmatch '## Gatilhos de retomada durante a tarefa' -or $handoffText -notmatch 'próximo responsável'){$errors.Add('Protocolo de retomada incompleto.')}
if($coordUi -notmatch 'confira a evid\\u00eancia e acione a pr\\u00f3xima etapa'){$errors.Add('Prompt padrão da coordenação não retoma a próxima etapa.')}
if($entry -notmatch 'Cada nova mensagem' -or $coord -notmatch 'Antes de qualquer resposta final'){$errors.Add('Retomada entre mensagens ou conferência final ausente.')}
if($handoffText -notmatch 'entregas-em-andamento\.md' -or -not(Test-Path -LiteralPath (Join-Path $base 'modelos/controle-de-entregas.md'))){$errors.Add('Registro persistente de entregas ausente.')}
else{
    $ledgerModel=Get-Content -LiteralPath (Join-Path $base 'modelos/controle-de-entregas.md') -Raw -Encoding utf8
    if($ledgerModel -notmatch '## DEMANDA-' -or $ledgerModel -notmatch 'mantém a demanda aberta'){$errors.Add('Modelo de andamento não separa demandas ou trata bloqueio como conclusão.')}
}
if($handoffText -notmatch 'saídas dependentes' -or $handoffText -notmatch 'identificador estável.*por demanda'){$errors.Add('Protocolo não cobre invalidação de dependências ou demandas simultâneas.')}
foreach($item in $manifest.skills){
    $skillPath=Join-Path $base ('.agents/skills/'+$item.nome+'/SKILL.md')
    if(-not(Test-Path -LiteralPath $skillPath)){continue}
    $skillText=Get-Content -LiteralPath $skillPath -Raw -Encoding utf8
    # Descrições do projeto usam string JSON compatível com YAML entre aspas.
    $descMatch=[regex]::Match($skillText,'(?m)^description:\s*(".*")\r?$')
    if($descMatch.Success){
        try{$desc=$descMatch.Groups[1].Value | ConvertFrom-Json
            if($desc -cne $item.descricao){$errors.Add("Descrição do catálogo divergente: $($item.nome)")}
        }catch{$errors.Add("Descrição inválida: $($item.nome)")}
    }else{$errors.Add("Descrição fora do formato verificável: $($item.nome)")}
}
# Detecta caminhos locais quebrados mesmo quando estão em código inline, sem confundir plugins opcionais.
foreach($file in @(Get-PrismaFiles (Join-Path $base '.agents/skills') | Where-Object Extension -eq '.md')){
    $skillText=Get-Content -LiteralPath $file.FullName -Raw -Encoding utf8
    foreach($match in [regex]::Matches($skillText,'(?<![\w/-])\.\./([a-z0-9-]+)/SKILL\.md')){
        $targetName=$match.Groups[1].Value
        if($targetName -notin $names){$errors.Add("Encaminhamento para skill local inexistente: $targetName em $($file.FullName)")}
    }
}
$intelMap=Get-Content -LiteralPath (Join-Path $base 'operacao/mapa-inteligencia-github.json') -Raw -Encoding utf8 | ConvertFrom-Json
$routeNames=@($intelMap.roteamento.PSObject.Properties.Name)
foreach($name in $names){if($name -notin $routeNames){$errors.Add("Rota GitHub ausente: $name")}}
foreach($route in $routeNames){if($route -notin $names){$errors.Add("Rota GitHub sem skill local: $route")}}
$available=@($intelMap.complementos_disponiveis.nome | Sort-Object -Unique)
$referenced=@($intelMap.roteamento.PSObject.Properties.Value.complementos | ForEach-Object {$_} | Sort-Object -Unique)
foreach($name in $referenced){if($name -notin $available){$errors.Add("Complemento GitHub desconhecido: $name")}}
foreach($name in $available){if($name -notin $referenced){$errors.Add("Complemento GitHub sem rota: $name")}}
$higgsConfig=Get-Content -LiteralPath (Join-Path $base 'operacao/higgsfield.json') -Raw -Encoding utf8 | ConvertFrom-Json
if($higgsConfig.verificar_ao_iniciar_projeto -ne $true){$errors.Add('Verificação inicial do Higgsfield desativada.')}
if($higgsConfig.orcamento.estimar_antes_de_gerar -ne $true){$errors.Add('Estimativa obrigatória do Higgsfield desativada.')}
if($higgsConfig.orcamento.permitir_compra_ou_recarga_automatica -ne $false){$errors.Add('Compra ou recarga automática do Higgsfield não pode ficar habilitada.')}
$higgsUi=Get-Content -LiteralPath (Join-Path $base '.agents/skills/higgsfield-producao/agents/openai.yaml') -Raw -Encoding utf8
if($higgsUi -notmatch '(?ms)dependencies:.*value:\s*"higgsfield"'){$errors.Add('Dependência Higgsfield ausente na skill de produção.')}
$integrationConfig=Get-Content -LiteralPath (Join-Path $base 'operacao/integracoes-agencia.json') -Raw -Encoding utf8 | ConvertFrom-Json
if($integrationConfig.selecao -ne 'automatica_pelo_coordenador'){$errors.Add('Seleção automática das integrações operacionais ausente.')}
if($integrationConfig.armazenar_credenciais -ne $false){$errors.Add('Credenciais não podem ser armazenadas no projeto.')}
# A bancada visual é distribuída como código e dependências fixadas, sem node_modules.
$designTools=Join-Path $base 'scripts/design-tools'
foreach($relative in @('design-check.mjs','package.json','package-lock.json','README.md')){
    if(-not(Test-Path -LiteralPath (Join-Path $designTools $relative) -PathType Leaf)){$errors.Add("Bancada de design ausente: $relative")}
}
if(Test-Path -LiteralPath (Join-Path $designTools 'package.json') -PathType Leaf){
    $designPackage=Get-Content -LiteralPath (Join-Path $designTools 'package.json') -Raw -Encoding utf8 | ConvertFrom-Json
    foreach($dependency in @('sharp','colorjs.io','svgo')){
        if(-not $designPackage.dependencies.PSObject.Properties[$dependency]){$errors.Add("Dependência visual ausente: $dependency")}
    }
}
if($coord -notmatch 'bancada-codigo-aberto\.md' -or $coord -notmatch 'pesquisa-e-reconstrucao\.md'){$errors.Add('Coordenação não ativa os novos fluxos de design.')}
$strategyTools=Join-Path $base 'scripts/strategy-tools'
foreach($relative in @('strategy-data.mjs','package.json','package-lock.json','README.md')){
    if(-not(Test-Path -LiteralPath (Join-Path $strategyTools $relative) -PathType Leaf)){$errors.Add("Bancada estratégica ausente: $relative")}
}
if(Test-Path -LiteralPath (Join-Path $strategyTools 'package.json') -PathType Leaf){
    $strategyPackage=Get-Content -LiteralPath (Join-Path $strategyTools 'package.json') -Raw -Encoding utf8 | ConvertFrom-Json
    foreach($dependency in @('papaparse','simple-statistics')){
        if(-not $strategyPackage.dependencies.PSObject.Properties[$dependency]){$errors.Add("Dependência estratégica ausente: $dependency")}
    }
}
if($coord -notmatch 'bancada-dados-estrategicos\.md' -or $coord -notmatch 'obstáculo de negócio'){$errors.Add('Coordenação não encaminha a estratégia baseada em diagnóstico.')}
$reportFiles=@('modelos/diagnostico-pagina.md','modelos/relatorio-cliente.example.json','scripts/client-report/render-report.mjs','scripts/client-report/render-report.test.mjs','scripts/client-report/README.md','.agents/skills/coordenacao-agencia/references/diagnostico-apresentacao.md','.agents/skills/referencias-conteudo/references/pesquisa-pagina-cliente.md','.agents/skills/paginas-conversao/references/lp-diagnostico-antes-depois.md')
foreach($relative in $reportFiles){if(-not(Test-Path -LiteralPath (Join-Path $base $relative) -PathType Leaf)){$errors.Add("Fluxo de diagnóstico ausente: $relative")}}
if($coord -notmatch 'diagnostico-apresentacao\.md' -or $matrix -notmatch 'diagnostico-apresentacao\.md'){$errors.Add('Rota da apresentação de diagnóstico não está ligada à coordenação/matriz.')}
if(Test-Path -LiteralPath (Join-Path $base 'modelos/relatorio-cliente.example.json')){
    try{$sample=Get-Content -Raw -Encoding utf8 (Join-Path $base 'modelos/relatorio-cliente.example.json') | ConvertFrom-Json
        if($sample.demo -ne $true){$errors.Add('Exemplo de relatório precisa permanecer fictício.')}
    }catch{$errors.Add('JSON de exemplo do relatório inválido.')}
}
# Estados salvos de integrações são históricos. Confirme disponibilidade e conexão na sessão real.
foreach($script in @(Get-ChildItem -LiteralPath (Join-Path $base 'scripts') -File -Filter '*.ps1')){
    $tokens=$null; $parseErrors=$null
    $null=[Management.Automation.Language.Parser]::ParseFile($script.FullName,[ref]$tokens,[ref]$parseErrors)
    foreach($e in $parseErrors){$errors.Add("$($script.Name): $($e.Message)")}
}
if($errors.Count){throw ($errors -join [Environment]::NewLine)}
[pscustomobject]@{Skills=$dirs.Count;Catalogo='conferido';Selecao='implícita habilitada; uso não testado';Entrada='arquivos de entrada conferidos; não comprova retenção na sessão';Referencias='conferidas';Licencas='conferidas';Scripts='sintaxe válida';Resultado='Estrutura válida; não comprova carregamento em chats antigos, acesso a contas ou resultado com clientes reais'}
