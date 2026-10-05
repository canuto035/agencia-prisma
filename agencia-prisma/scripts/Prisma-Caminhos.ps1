function Assert-PrismaPath {
    param([Parameter(Mandatory)][string]$Path)
    $full = [IO.Path]::GetFullPath($Path)
    $cursor = $full
    while ($cursor) {
        if (Test-Path -LiteralPath $cursor) {
            $item = Get-Item -LiteralPath $cursor -Force
            if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw "Use uma pasta física, sem link de sistema: $cursor" }
        }
        $parent = Split-Path -Parent $cursor
        if ($parent -eq $cursor) { break }
        $cursor = $parent
    }
    return $full
}
function Get-PrismaClientPath {
    param([string]$ProjetoRaiz, [string]$Identificador)
    if ($Identificador -notmatch '^[a-z0-9][a-z0-9-]{0,79}$' -or $Identificador -match '^(con|prn|aux|nul|com[1-9]|lpt[1-9])$') {
        throw 'Use até 80 letras minúsculas, números e hífens; nomes reservados do Windows não são aceitos.'
    }
    $base = Assert-PrismaPath $ProjetoRaiz
    if (-not (Test-Path -LiteralPath $base -PathType Container)) { throw 'Base do projeto ausente.' }
    return (Assert-PrismaPath (Join-Path $base "clientes/$Identificador"))
}
function Get-PrismaFiles {
    param([string]$Path)
    $base = Assert-PrismaPath $Path
    $items = @(Get-ChildItem -LiteralPath $base -Recurse -Force -ErrorAction Stop)
    $files = [Collections.Generic.List[object]]::new()
    foreach ($item in $items) {
        # Dependencias instaladas localmente sao reconstruidas pelo lockfile, nunca distribuidas.
        if ($item.FullName -match '(^|[\\/])node_modules([\\/]|$)') { continue }
        if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw "Link encontrado: $($item.FullName)" }
        if (-not $item.PSIsContainer) { $files.Add($item) }
    }
    return @($files)
}
