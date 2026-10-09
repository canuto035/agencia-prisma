[CmdletBinding()]
param([Parameter(Mandatory)][string]$Destino,[string]$ProjetoRaiz=(Split-Path -Parent $PSScriptRoot))
$ErrorActionPreference='Stop'
. (Join-Path $PSScriptRoot 'Prisma-Caminhos.ps1')
$source=(Assert-PrismaPath $ProjetoRaiz).TrimEnd('\','/')
$target=(Assert-PrismaPath $Destino).TrimEnd('\','/')
if($target -eq $source -or $target.StartsWith($source+[IO.Path]::DirectorySeparatorChar,[StringComparison]::OrdinalIgnoreCase)){throw 'O novo projeto precisa ficar fora da base de origem.'}
if(Test-Path -LiteralPath $target){
    if(-not(Test-Path -LiteralPath $target -PathType Container) -or @(Get-ChildItem -LiteralPath $target -Force).Count){throw 'Use uma pasta nova ou vazia. Arquivos existentes não serão substituídos.'}
}
& (Join-Path $PSScriptRoot 'Verificar-Projeto.ps1') -ProjetoRaiz $source | Out-Null
$files=@(foreach($relative in @('.agents','.codex','agents','modelos','scripts')){Get-PrismaFiles (Join-Path $source $relative)})
$files+=@(foreach($relative in @('operacao/catalogo.json','operacao/higgsfield.json','operacao/integracoes-agencia.json','operacao/mapa-inteligencia-github.json','SKILL.md','AGENTS.md','COMECE-AQUI.md','MAPA-DA-AGENCIA.md','DECISOES-DO-GESTOR.md')){Get-Item -LiteralPath (Join-Path $source $relative)})
foreach($file in $files){$null=Assert-PrismaPath $file.FullName}
New-Item -ItemType Directory -Path $target -Force | Out-Null
foreach($file in $files){
    $relative=$file.FullName.Substring($source.Length).TrimStart('\','/')
    $dest=Join-Path $target $relative
    New-Item -ItemType Directory -Path (Split-Path -Parent $dest) -Force | Out-Null
    Copy-Item -LiteralPath $file.FullName -Destination $dest
    if((Get-FileHash -LiteralPath $file.FullName).Hash -ne (Get-FileHash -LiteralPath $dest).Hash){throw "Cópia divergente: $relative"}
}
New-Item -ItemType Directory -Path (Join-Path $target 'clientes') -Force | Out-Null
& (Join-Path $target 'scripts/Verificar-Projeto.ps1') -ProjetoRaiz $target | Out-Null
[pscustomobject]@{Projeto=$target;Arquivos=$files.Count;Estado='Base copiada sem clientes. Abra esta pasta como projeto no Codex; no primeiro pedido a coordenação verificará a conexão e o orçamento do Higgsfield.'}

