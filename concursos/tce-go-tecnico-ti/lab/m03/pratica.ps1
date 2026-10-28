# Pratica de PowerShell: objetos no pipeline, filtros e saida estruturada.
# Testado no PowerShell 7 em Linux. Em Windows, troque Get-Process/Get-ChildItem por Get-Service, Get-LocalUser etc.
$ErrorActionPreference = 'Stop'
$pasta = Join-Path ([IO.Path]::GetTempPath()) ("lab-" + [guid]::NewGuid().ToString('N').Substring(0,6))
New-Item -ItemType Directory -Path $pasta | Out-Null

Write-Output "== 1. Verbo-Substantivo: descobrir comandos =="
Get-Command -Verb Get -Noun Execution* | Format-Table Name, CommandType -AutoSize | Out-String -Width 80
(Get-Command Set-ExecutionPolicy).Parameters.Keys | Where-Object { $_ -in 'ExecutionPolicy','Scope','Force' } | Sort-Object

Write-Output "`n== 2. Objetos, nao texto: criar arquivos e filtrar por propriedade =="
1..5 | ForEach-Object { Set-Content -Path (Join-Path $pasta "doc$_.txt") -Value ('x' * ($_ * 100)) }
Get-ChildItem $pasta |
    Where-Object Length -gt 250 |
    Sort-Object Length -Descending |
    Select-Object Name, Length |
    Format-Table -AutoSize | Out-String -Width 80

Write-Output "== 3. Agrupar e medir =="
Get-ChildItem $pasta | Measure-Object Length -Sum -Average -Maximum |
    Select-Object Count, Sum, Average, Maximum | Format-List | Out-String -Width 80

Write-Output "== 4. Saida estruturada (JSON) e tratamento de erro =="
Get-ChildItem $pasta | Select-Object -First 2 Name, Length | ConvertTo-Json
try { Get-Content (Join-Path $pasta 'nao-existe.txt') }
catch { "Erro capturado: " + $_.Exception.GetType().Name }

Write-Output "`n== 5. Funcao simples com parametro =="
function Get-TamanhoMB([string]$Caminho) { [math]::Round((Get-ChildItem $Caminho -Recurse | Measure-Object Length -Sum).Sum / 1MB, 4) }
"Tamanho da pasta de teste em MB: " + (Get-TamanhoMB $pasta)

Remove-Item $pasta -Recurse -Force
"(pasta temporária removida)"
