[CmdletBinding()]
param([Parameter(Mandatory)][string]$Projeto,[switch]$Desativar,[switch]$Previa)
$ErrorActionPreference='Stop'
. (Join-Path $PSScriptRoot 'Prisma-Caminhos.ps1')

$target=(Assert-PrismaPath $Projeto).TrimEnd('\','/')
$method=(Assert-PrismaPath (Split-Path -Parent $PSScriptRoot)).TrimEnd('\','/')
$comparison=[StringComparison]::OrdinalIgnoreCase
if(-not(Test-Path -LiteralPath $target -PathType Container)){throw 'Informe a raiz existente do projeto em uso.'}
if($target.Equals([IO.Path]::GetPathRoot($target).TrimEnd('\','/'),$comparison) -or
   $target.Equals($method,$comparison) -or $target.StartsWith($method+[IO.Path]::DirectorySeparatorChar,$comparison) -or
   $target -match '(^|[\\/])\.(codex|agents)[\\/]skills([\\/]|$)'){
    throw 'A ativação é para um projeto de trabalho, fora da instalação da skill e da base de manutenção.'
}

# O Codex dá precedência ao override no mesmo diretório. Não crie outro arquivo que seria ignorado.
$relative=if(Test-Path -LiteralPath (Join-Path $target 'AGENTS.override.md')){'AGENTS.override.md'}else{'AGENTS.md'}
$file=Assert-PrismaPath (Join-Path $target $relative)
if(Test-Path -LiteralPath $file -PathType Container){throw 'O arquivo de instruções é uma pasta.'}
$existed=Test-Path -LiteralPath $file -PathType Leaf
$bytes=[byte[]]@()
if($existed){$bytes=[IO.File]::ReadAllBytes($file)}
if($bytes.Length -ge 2 -and (($bytes[0] -eq 255 -and $bytes[1] -eq 254) -or ($bytes[0] -eq 254 -and $bytes[1] -eq 255))){
    throw 'As instruções precisam estar em UTF-8. Nenhum arquivo foi alterado.'
}
$bom=$bytes.Length -ge 3 -and $bytes[0] -eq 239 -and $bytes[1] -eq 187 -and $bytes[2] -eq 191
$offset=if($bom){3}else{0}
$encoding=[Text.UTF8Encoding]::new($false,$true)
$content=$encoding.GetString($bytes,$offset,$bytes.Length-$offset)
$begin='<!-- PRISMA:BEGIN -->'
$end='<!-- PRISMA:END -->'
$begins=[regex]::Matches($content,[regex]::Escape($begin)).Count
$ends=[regex]::Matches($content,[regex]::Escape($end)).Count
if($begins -ne $ends -or $begins -gt 1){throw 'Bloco Prisma incompleto ou duplicado. Preserve as instruções e revise-o antes de ativar.'}
$pattern='(?:\r?\n)?(?m:^'+[regex]::Escape($begin)+'\r?$)\r?\n.*?(?m:^'+[regex]::Escape($end)+'\r?$)(?:\r?\n)?'
$existing=[regex]::Match($content,$pattern,[Text.RegularExpressions.RegexOptions]::Singleline)
if($begins -and -not $existing.Success){throw 'Delimitadores Prisma fora da ordem ou de linhas próprias. Nenhum arquivo foi alterado.'}

$localCoordinator=Join-Path $target '.agents/skills/coordenacao-agencia/SKILL.md'
$native=$false
if(Test-Path -LiteralPath $localCoordinator -PathType Leaf){
    $null=Assert-PrismaPath $localCoordinator
    $localBody=Get-Content -LiteralPath $localCoordinator -Raw -Encoding utf8
    # Um vestígio ou caminho citado em comentário não prova que a base já coordene o projeto.
    $native=$content -match '(?m)^# Operação automática — Agência Prisma\r?$' -and
            $content -match '(?m)^Em todo pedido de marketing deste projeto, leia `\.agents/skills/coordenacao-agencia/SKILL\.md`' -and
            $localBody -match '(?m)^name:\s*coordenacao-agencia\r?$'
}
if(-not $Desativar -and -not $begins -and $native){
    return [pscustomobject]@{Estado='coordenação nativa já configurada';Projeto=$target;Instrucoes=$file;Alterado=$false}
}
if($Desativar -and -not $existing.Success){
    return [pscustomobject]@{Estado='sem bloco Prisma para remover';Projeto=$target;Instrucoes=$file;Alterado=$false}
}

$newline=if($content.Contains("`r`n")){"`r`n"}else{"`n"}
$lines=@(
    $begin,
    '## Agência Prisma neste projeto',
    '',
    'A Prisma é o método de coordenação dos pedidos de marketing deste projeto. Nos pedidos seguintes, ajustes e status, use-a sem exigir nova menção à skill. Outros assuntos seguem as instruções próprias do projeto.',
    'Localize agencia-prisma no catálogo de skills da sessão, leia o SKILL.md no caminho disponível e a coordenação .agents/skills/coordenacao-agencia/SKILL.md relativa àquela instalação. Se o projeto tiver sua própria base Prisma, use a coordenação local. Se a base não estiver disponível, informe a limitação e avance somente no que for independente.',
    'A identidade, os dados e as decisões de cada cliente ficam no projeto de trabalho ou no destino indicado, nunca na instalação compartilhada. Preserve instruções do projeto, autorizações já dadas e a separação de clientes.',
    'Depois de cada resultado relevante, a coordenação confere a evidência, atualiza a fila da demanda e executa a próxima etapa autorizada. Status e correções não encerram a entrega. Concluir uma etapa não conclui o pedido; bloqueio mantém a demanda aberta. Não espere outro comando enquanto houver trabalho executável nem declare subagentes ou jobs ativos sem conferir.',
    'Ao retomar ou compactar a conversa, preserve o método Prisma, projeto/cliente/destino, pedido e correções, autorizações, artefatos e versões, dependências e próxima ação; confira contexto/entregas-em-andamento.md do cliente quando existir. Pausa ou cancelamento explícitos valem para o escopo indicado.',
    'Quando todo o pedido estiver verificado, encerre essa demanda e mantenha o método disponível para o próximo pedido de marketing. Não invente novas tarefas, não assuma publicação ou gasto e não prometa execução com a conversa fechada.',
    $end
)
$block=$newline+($lines -join $newline)+$newline
if($Desativar){$updated=$content.Remove($existing.Index,$existing.Length)}
elseif($existing.Success){$updated=$content.Remove($existing.Index,$existing.Length).Insert($existing.Index,$block)}
else{$updated=$content+$block}
if($updated -ceq $content){
    return [pscustomobject]@{Estado='Prisma já ativada';Projeto=$target;Instrucoes=$file;Alterado=$false}
}
if($Previa){
    return [pscustomobject]@{Estado='prévia; nenhuma instrução alterada';Projeto=$target;Instrucoes=$file;Alterado=$false;NecessitaMudanca=$true;Acao=if($Desativar){'remover apenas o bloco Prisma'}else{'ancorar a coordenação preservando o texto existente'}}
}

$backup=Assert-PrismaPath (Join-Path $target ('backups/prisma-ativacao-'+(Get-Date -Format 'yyyyMMdd-HHmmss')+'-'+[Guid]::NewGuid().ToString('N').Substring(0,8)))
New-Item -ItemType Directory -Path $backup -Force | Out-Null
if($existed){
    $saved=Join-Path $backup $relative
    Copy-Item -LiteralPath $file -Destination $saved
    if((Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash -ne (Get-FileHash -LiteralPath $saved -Algorithm SHA256).Hash){throw 'Backup das instruções divergente.'}
}else{[IO.File]::WriteAllText((Join-Path $backup 'arquivo-original-ausente.txt'),$relative,$encoding)}

$outputBytes=$encoding.GetBytes($updated)
if($bom){$outputBytes=[byte[]](@(239,187,191)+$outputBytes)}
# Recusa mudança concorrente no arquivo desde a leitura, antes de aplicar o bloco.
if($existed){
    if([Convert]::ToBase64String([IO.File]::ReadAllBytes($file)) -cne [Convert]::ToBase64String($bytes)){throw 'As instruções mudaram durante a ativação; refaça a leitura.'}
}elseif(Test-Path -LiteralPath $file){throw 'As instruções foram criadas durante a ativação; refaça a leitura.'}
[IO.File]::WriteAllBytes($file,$outputBytes)
if([Convert]::ToBase64String([IO.File]::ReadAllBytes($file)) -cne [Convert]::ToBase64String($outputBytes)){throw 'Não foi possível conferir as instruções aplicadas.'}
[pscustomobject]@{Estado=if($Desativar){'bloco Prisma removido'}else{'Prisma ativada para os pedidos deste projeto'};Projeto=$target;Instrucoes=$file;Alterado=$true;Backup=$backup}
