# Script to kill process using a specific port
param(
    [Parameter(Mandatory=$false)]
    [int]$Port = 50051
)

Write-Host "Searching for process using port $Port..." -ForegroundColor Cyan

# Find the process using the port
$connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue

if ($connection) {
    $processId = $connection.OwningProcess
    $process = Get-Process -Id $processId -ErrorAction SilentlyContinue

    if ($process) {
        Write-Host "Found process: $($process.ProcessName) (PID: $processId)" -ForegroundColor Yellow
        Write-Host "Killing process..." -ForegroundColor Red

        Stop-Process -Id $processId -Force
        Start-Sleep -Seconds 1

        Write-Host "Process killed successfully!" -ForegroundColor Green
    } else {
        Write-Host "Could not find process with PID: $processId" -ForegroundColor Red
    }
} else {
    Write-Host "Port $Port is free (no process using it)" -ForegroundColor Green
}

