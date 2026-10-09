[CmdletBinding()]
param(
    [Parameter(Mandatory)][string]$Destino,
    [string]$ProjetoRaiz=(Split-Path -Parent $PSScriptRoot),
    [switch]$Aplicar
)
$ErrorActionPreference='Stop'
. (Join-Path $PSScriptRoot 'Prisma-Caminhos.ps1')

$source=(Assert-PrismaPath $ProjetoRaiz).TrimEnd('\','/')
$target=(Assert-PrismaPath $Destino).TrimEnd('\','/')
$comparison=[StringComparison]::OrdinalIgnoreCase
if($source.Equals($target,$comparison) -or
   $source.StartsWith($target+[IO.Path]::DirectorySeparatorChar,$comparison) -or
   $target.StartsWith($source+[IO.Path]::DirectorySeparatorChar,$comparison)){
    throw 'Origem e destino precisam ser pastas independentes.'
}
if(-not(Test-Path -LiteralPath $target -PathType Container)){throw 'A pasta de destino existente não foi encontrada.'}
foreach($relative in @('AGENTS.md','.agents/skills/coordenacao-agencia/SKILL.md')){
    if(-not(Test-Path -LiteralPath (Join-Path $target $relative) -PathType Leaf)){
        throw "O destino não parece ser uma cópia da Agência Prisma: $relative"
    }
}
$targetEntry=Get-Content -LiteralPath (Join-Path $target 'AGENTS.md') -Raw -Encoding utf8
if($targetEntry -notmatch 'Agência Prisma'){throw 'O destino não foi identificado como Agência Prisma.'}
$targetCatalog=Join-Path $target 'operacao/catalogo.json'
if(Test-Path -LiteralPath $targetCatalog -PathType Leaf){
    $catalog=Get-Content -LiteralPath $targetCatalog -Raw -Encoding utf8 | ConvertFrom-Json
    if($catalog.coordenador -ne 'coordenacao-agencia'){throw 'Coordenador do destino não corresponde à Agência Prisma.'}
}
& (Join-Path $source 'scripts/Verificar-Projeto.ps1') -ProjetoRaiz $source | Out-Null

# Um override próprio tem precedência sobre AGENTS.md; preserve-o, mas confira a entrada efetiva.
$anchorPreview=$null
if((Test-Path -LiteralPath (Join-Path $target 'AGENTS.override.md')) -and
   $target -notmatch '(^|[\\/])\.(codex|agents)[\\/]skills([\\/]|$)'){
    $anchorPreview=& (Join-Path $source 'scripts/Ativar-Prisma-No-Projeto.ps1') -Projeto $target -Previa
}

$sourceSkills=@(Get-ChildItem -LiteralPath (Join-Path $source '.agents/skills') -Directory | Select-Object -ExpandProperty Name)
$extraSkills=@(Get-ChildItem -LiteralPath (Join-Path $target '.agents/skills') -Directory | Where-Object Name -NotIn $sourceSkills | Select-Object -ExpandProperty Name)
if($extraSkills.Count){throw "O destino tem skills adicionais que exigem revisão manual: $($extraSkills -join ', ')"}

# Copia só a base distribuível. Dados de clientes, backups e arquivos locais extras ficam intactos.
$files=@(foreach($relative in @('.agents','.codex','agents','modelos','scripts')){Get-PrismaFiles (Join-Path $source $relative)})
$files+=@(foreach($relative in @('operacao/catalogo.json','operacao/higgsfield.json','operacao/integracoes-agencia.json','operacao/mapa-inteligencia-github.json','SKILL.md','AGENTS.md','COMECE-AQUI.md','MAPA-DA-AGENCIA.md','DECISOES-DO-GESTOR.md')){Get-Item -LiteralPath (Join-Path $source $relative)})
$changes=@(foreach($file in $files){
    $relative=$file.FullName.Substring($source.Length).TrimStart('\','/')
    $destination=Assert-PrismaPath (Join-Path $target $relative)
    if(Test-Path -LiteralPath $destination -PathType Container){throw "Destino é uma pasta: $relative"}
    $status='novo'
    if(Test-Path -LiteralPath $destination -PathType Leaf){
        $status=if($relative.StartsWith('.codex'+[IO.Path]::DirectorySeparatorChar,[StringComparison]::OrdinalIgnoreCase)){'local'}
                elseif((Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash -eq
                   (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash){'igual'}else{'alterado'}
    }
    [pscustomobject]@{Arquivo=$relative;Estado=$status;Origem=$file.FullName;Destino=$destination}
})
$pending=@($changes | Where-Object Estado -In @('novo','alterado'))
if(-not $Aplicar){
    [pscustomobject]@{
        Estado='prévia; nada foi alterado'
        Destino=$target
        Iguais=@($changes | Where-Object Estado -eq 'igual').Count
        Alterados=@($changes | Where-Object Estado -eq 'alterado').Count
        Novos=@($changes | Where-Object Estado -eq 'novo').Count
        ConfiguracoesLocaisPreservadas=@($changes | Where-Object Estado -eq 'local').Count
        EntradaEfetiva=$anchorPreview
        ProximaAcao='Revise a lista; depois execute com -Aplicar. Clientes não serão alterados; configuração .codex existente será preservada.'
        Arquivos=$pending | Select-Object Arquivo,Estado
    }
    return
}

$backupRoot=Get-PrismaBackupRoot -ProjetoRaiz $target
$backup=Assert-PrismaPath (Join-Path $backupRoot ('atualizacao-'+(Get-Date -Format 'yyyyMMdd-HHmmss')+'-'+[Guid]::NewGuid().ToString('N').Substring(0,8)))
New-Item -ItemType Directory -Path $backup -Force | Out-Null
foreach($item in @($pending | Where-Object Estado -eq 'alterado')){
    $saved=Assert-PrismaPath (Join-Path $backup $item.Arquivo)
    New-Item -ItemType Directory -Path (Split-Path -Parent $saved) -Force | Out-Null
    Copy-Item -LiteralPath $item.Destino -Destination $saved -Force
    if((Get-FileHash -LiteralPath $item.Destino -Algorithm SHA256).Hash -ne
       (Get-FileHash -LiteralPath $saved -Algorithm SHA256).Hash){throw "Backup divergente: $($item.Arquivo)"}
}
$pending | Select-Object Arquivo,Estado | Export-Csv -LiteralPath (Join-Path $backup 'alteracoes.csv') -NoTypeInformation -Encoding utf8
foreach($item in $pending){
    New-Item -ItemType Directory -Path (Split-Path -Parent $item.Destino) -Force | Out-Null
    Copy-Item -LiteralPath $item.Origem -Destination $item.Destino -Force
    if((Get-FileHash -LiteralPath $item.Origem -Algorithm SHA256).Hash -ne
       (Get-FileHash -LiteralPath $item.Destino -Algorithm SHA256).Hash){throw "Cópia divergente: $($item.Arquivo)"}
}
$anchorResult=$null
if($anchorPreview.NecessitaMudanca){
    $anchorResult=& (Join-Path $source 'scripts/Ativar-Prisma-No-Projeto.ps1') -Projeto $target
}
& (Join-Path $target 'scripts/Verificar-Projeto.ps1') -ProjetoRaiz $target | Out-Null
[pscustomobject]@{
    Estado='atualizado e validado'
    Destino=$target
    Alterados=@($pending | Where-Object Estado -eq 'alterado').Count
    Novos=@($pending | Where-Object Estado -eq 'novo').Count
    Backup=$backup
    EntradaEfetiva=$anchorResult
    Preservados='clientes, backups, arquivos extras e configuração .codex local'
}
