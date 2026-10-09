[CmdletBinding()]
param([Parameter(Mandatory)][string]$PastaTestes)
$ErrorActionPreference='Stop'
. (Join-Path $PSScriptRoot 'Prisma-Caminhos.ps1')
$root=Assert-PrismaPath (Join-Path $PastaTestes ('ativacao-'+[Guid]::NewGuid().ToString('N')))
New-Item -ItemType Directory -Path $root -Force | Out-Null
$activate=Join-Path $PSScriptRoot 'Ativar-Prisma-No-Projeto.ps1'
$utf8=[Text.UTF8Encoding]::new($false)
$checks=[Collections.Generic.List[string]]::new()
function Assert-Test([bool]$Condition,[string]$Name){if(-not $Condition){throw "Falhou: $Name"};$checks.Add($Name)}
function New-TestProject([string]$Name){$path=Join-Path $root $Name;New-Item -ItemType Directory -Path $path | Out-Null;return $path}
function Assert-Refused([string]$Project,[string]$Name){
    $refused=$false
    try{& $activate -Projeto $Project | Out-Null}catch{$refused=$true}
    Assert-Test $refused $Name
}

$empty=New-TestProject 'sem-instrucoes'
$preview=& $activate -Projeto $empty -Previa
Assert-Test ($preview.NecessitaMudanca -and -not(Test-Path -LiteralPath (Join-Path $empty 'AGENTS.md')) -and -not(Test-Path -LiteralPath (Join-Path $empty 'backups'))) 'Prévia não cria arquivo nem backup'
$first=& $activate -Projeto $empty
$file=Join-Path $empty 'AGENTS.md'
Assert-Test ($first.Alterado -and (Test-Path -LiteralPath $file)) 'Ativa projeto sem AGENTS'
Assert-Test ([regex]::Matches([IO.File]::ReadAllText($file),'<!-- PRISMA:BEGIN -->').Count -eq 1) 'Um único bloco'
$hash=(Get-FileHash -LiteralPath $file).Hash
$repeat=& $activate -Projeto $empty
Assert-Test (-not $repeat.Alterado -and (Get-FileHash -LiteralPath $file).Hash -eq $hash) 'Idempotência sem novo backup'
$removed=& $activate -Projeto $empty -Desativar
Assert-Test ($removed.Alterado -and [IO.File]::ReadAllText($file).Length -eq 0) 'Remove apenas o bloco recém-criado'

$existing=New-TestProject 'utf8-bom-crlf'
$original="# Projeto próprio`r`nCliente fictício. Preserve decisões aprovadas.`r`n"
$originalBytes=[byte[]](@(239,187,191)+$utf8.GetBytes($original))
$file=Join-Path $existing 'AGENTS.md'
[IO.File]::WriteAllBytes($file,$originalBytes)
$before=(Get-FileHash -LiteralPath $file).Hash
$result=& $activate -Projeto $existing
Assert-Test ((Get-FileHash -LiteralPath (Join-Path $result.Backup 'AGENTS.md')).Hash -eq $before) 'Backup fiel antes de editar'
Assert-Test ([IO.File]::ReadAllText($file).StartsWith($original,[StringComparison]::Ordinal)) 'Preserva instruções anteriores'
Assert-Test ([IO.File]::ReadAllBytes($file)[0] -eq 239) 'Preserva BOM UTF-8'
$hash=(Get-FileHash -LiteralPath $file).Hash
$repeat=& $activate -Projeto $existing
Assert-Test (-not $repeat.Alterado -and (Get-FileHash -LiteralPath $file).Hash -eq $hash) 'Idempotência com CRLF e BOM'
& $activate -Projeto $existing -Desativar | Out-Null
Assert-Test ((Get-FileHash -LiteralPath $file).Hash -eq $before) 'Desativação restaura bytes do texto anterior'

$override=New-TestProject 'override'
$normal=Join-Path $override 'AGENTS.md'
$effective=Join-Path $override 'AGENTS.override.md'
[IO.File]::WriteAllText($normal,'Instrução normal intacta.',$utf8)
[IO.File]::WriteAllText($effective,'Instrução efetiva própria.',$utf8)
$normalHash=(Get-FileHash -LiteralPath $normal).Hash
$effectiveHash=(Get-FileHash -LiteralPath $effective).Hash
$result=& $activate -Projeto $override
Assert-Test ($result.Instrucoes -eq $effective -and (Get-FileHash -LiteralPath $normal).Hash -eq $normalHash) 'Usa override e preserva AGENTS normal'
& $activate -Projeto $override -Desativar | Out-Null
Assert-Test ((Get-FileHash -LiteralPath $effective).Hash -eq $effectiveHash) 'Remove bloco do override sem mexer nas instruções'

foreach($case in @(
    @{Name='incompleto';Text="Antes`n<!-- PRISMA:BEGIN -->`nSem fechamento"},
    @{Name='duplicado';Text="<!-- PRISMA:BEGIN -->`na`n<!-- PRISMA:END -->`n<!-- PRISMA:BEGIN -->`nb`n<!-- PRISMA:END -->`n"},
    @{Name='fora-ordem';Text="<!-- PRISMA:END -->`n<!-- PRISMA:BEGIN -->`n"}
)){
    $project=New-TestProject $case.Name
    $file=Join-Path $project 'AGENTS.md'
    [IO.File]::WriteAllText($file,$case.Text,$utf8)
    $hash=(Get-FileHash -LiteralPath $file).Hash
    Assert-Refused $project ('Recusa bloco '+$case.Name)
    Assert-Test ((Get-FileHash -LiteralPath $file).Hash -eq $hash -and -not(Test-Path -LiteralPath (Join-Path $project 'backups'))) ('Recusa sem editar '+$case.Name)
}

$native=New-TestProject 'base-nativa'
New-Item -ItemType Directory -Path (Join-Path $native '.agents/skills/coordenacao-agencia') -Force | Out-Null
[IO.File]::WriteAllText((Join-Path $native '.agents/skills/coordenacao-agencia/SKILL.md'),"---`nname: coordenacao-agencia`n---`nSkill fictícia.",$utf8)
$file=Join-Path $native 'AGENTS.md'
[IO.File]::WriteAllText($file,"# Operação automática — Agência Prisma`nEm todo pedido de marketing deste projeto, leia ``.agents/skills/coordenacao-agencia/SKILL.md``.",$utf8)
$hash=(Get-FileHash -LiteralPath $file).Hash
$result=& $activate -Projeto $native
Assert-Test (-not $result.Alterado -and (Get-FileHash -LiteralPath $file).Hash -eq $hash) 'Dispensa coordenação local nativa'

$legacy=New-TestProject 'vestigio-local'
New-Item -ItemType Directory -Path (Join-Path $legacy '.agents/skills/coordenacao-agencia') -Force | Out-Null
[IO.File]::WriteAllText((Join-Path $legacy '.agents/skills/coordenacao-agencia/SKILL.md'),'Arquivo legado vazio.',$utf8)
[IO.File]::WriteAllText((Join-Path $legacy 'AGENTS.md'),'<!-- Exemplo antigo: .agents/skills/coordenacao-agencia/SKILL.md -->',$utf8)
$result=& $activate -Projeto $legacy
Assert-Test $result.Alterado 'Vestígio local não dispensa ativação'

$otherEncoding=New-TestProject 'utf16'
$file=Join-Path $otherEncoding 'AGENTS.md'
[IO.File]::WriteAllText($file,'Texto que deve ficar intacto.',[Text.Encoding]::Unicode)
$hash=(Get-FileHash -LiteralPath $file).Hash
Assert-Refused $otherEncoding 'Recusa UTF-16 sem conversão silenciosa'
Assert-Test ((Get-FileHash -LiteralPath $file).Hash -eq $hash) 'Preserva arquivo de codificação não suportada'
Assert-Refused (Split-Path -Parent $PSScriptRoot) 'Não altera instalação ou base de manutenção'

[pscustomobject]@{Resultado='testes de ativação passaram';Verificacoes=$checks.Count;Pasta=$root;Escopo='preservação de instruções, backup, idempotência, override, desativação e recusas; não comprova comportamento de toda sessão'}
