[CmdletBinding()]
param([Parameter(Mandatory)][string]$Cliente,[string]$ProjetoRaiz=(Split-Path -Parent $PSScriptRoot))
$ErrorActionPreference='Stop'
. (Join-Path $PSScriptRoot 'Prisma-Caminhos.ps1')
$client=Get-PrismaClientPath $ProjetoRaiz $Cliente
if (-not (Test-Path -LiteralPath $client -PathType Container)) {throw 'Cliente não encontrado.'}
$images=@('.jpg','.jpeg','.png','.webp','.gif','.svg','.heic','.heif','.avif','.tif','.tiff')
$videos=@('.mp4','.mov','.mkv','.webm')
$audio=@('.mp3','.wav','.m4a','.ogg')
$docs=@('.pdf','.docx','.pptx','.xlsx','.csv')
$files=@(Get-PrismaFiles $client | Where-Object {$_.Name -notlike 'inventario-ativos-*' -and $_.Name -ne 'inventario-ativos.csv' -and $_.Extension.ToLowerInvariant() -in ($images+$videos+$audio+$docs)} | Sort-Object FullName)
$items=@(foreach ($file in $files) {
    $ext=$file.Extension.ToLowerInvariant()
    $category=if($ext -in $images){'imagem'}elseif($ext -in $videos){'video'}elseif($ext -in $audio){'audio'}else{'documento'}
    [pscustomobject]@{
        arquivo=$file.FullName.Substring($client.Length).TrimStart('\','/')
        categoria=$category
        extensao=$ext
        tamanho_bytes=$file.Length
        modificado_utc=$file.LastWriteTimeUtc.ToString('o')
        sha256=(Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash
        inspecao_visual='nao realizada pelo inventario'
        direitos_uso='nao verificados pelo inventario'
    }
})
$context=Assert-PrismaPath (Join-Path $client 'contexto')
New-Item -ItemType Directory -Path $context -Force | Out-Null
$id=(Get-Date -Format 'yyyyMMdd-HHmmss')+'-'+[Guid]::NewGuid().ToString('N').Substring(0,8)
$out=Join-Path $context "inventario-ativos-$id.csv"
if($items.Count){$items | Export-Csv -LiteralPath $out -NoTypeInformation -Encoding utf8}
else{'"arquivo","categoria","extensao","tamanho_bytes","modificado_utc","sha256","inspecao_visual","direitos_uso"' | Set-Content -LiteralPath $out -Encoding utf8}
[pscustomobject]@{Cliente=$Cliente;Ativos=$items.Count;Inventario=$out;GruposDuplicados=@($items | Group-Object sha256 | Where-Object Count -gt 1).Count}
