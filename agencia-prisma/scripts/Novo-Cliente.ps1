[CmdletBinding()]
param([Parameter(Mandatory)][string]$Identificador,[string]$NomeExibicao,[string]$ProjetoRaiz=(Split-Path -Parent $PSScriptRoot))
$ErrorActionPreference='Stop'
. (Join-Path $PSScriptRoot 'Prisma-Caminhos.ps1')
$client=Get-PrismaClientPath $ProjetoRaiz $Identificador
$models=@{'briefing.md'='briefing-cliente.md';'dossie.md'='dossie-cliente.md';'plano-90-dias.md'='plano-90-dias.md';'registro-aprovacao.md'='registro-aprovacao.md';'aprendizados.md'='aprendizados.md';'orcamento-higgsfield.md'='orcamento-higgsfield.md';'plano-mensuracao.md'='plano-mensuracao.md';'fila-publicacao.md'='fila-publicacao.md';'atendimento-reputacao.md'='atendimento-reputacao.md';'rentabilidade-cliente.md'='rentabilidade-cliente.md';'governanca-ativos-lgpd.md'='governanca-ativos-lgpd.md';'inteligencia-competitiva.md'='inteligencia-competitiva.md';'integracoes.md'='integracoes-cliente.md'}
foreach ($name in $models.Values) {
    $source=Assert-PrismaPath (Join-Path $ProjetoRaiz "modelos/$name")
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) {throw "Modelo ausente: $name"}
}
$folders=@('contexto','fontes','imagens/originais','imagens/referencias','imagens/tratadas','conteudos/rascunhos','conteudos/aprovados','campanhas','publicacoes','atendimento','mensuracao','financeiro','governanca','inteligencia','relatorios')
foreach ($relative in $folders) {$null=Assert-PrismaPath (Join-Path $client $relative)}
foreach ($name in $models.Keys) {$null=Assert-PrismaPath (Join-Path $client "contexto/$name")}
$readme=Assert-PrismaPath (Join-Path $client 'LEIA-ME.md')
foreach ($relative in $folders) {New-Item -ItemType Directory -Path (Join-Path $client $relative) -Force | Out-Null}
$created=0
foreach ($name in $models.Keys) {
    $dest=Join-Path $client "contexto/$name"
    if (-not (Test-Path -LiteralPath $dest)) {Copy-Item -LiteralPath (Join-Path $ProjetoRaiz ('modelos/'+$models[$name])) -Destination $dest; $created++}
}
if (-not (Test-Path -LiteralPath $readme)) {
    $title=if($NomeExibicao){$NomeExibicao}else{$Identificador}
    @("# $title",'',"Identificador: $Identificador",'', 'Contexto, decisões, integrações, governança, inteligência, mensuração, publicação, atendimento, rentabilidade e orçamento do Higgsfield ficam em contexto/. Informe os links e peça a entrega normalmente.') | Set-Content -LiteralPath $readme -Encoding utf8
}
[pscustomobject]@{Cliente=$Identificador;Pasta=$client;ModelosCriados=$created;Estado='Arquivos anteriores preservados'}
