# generate-certs.ps1 - Generate self-signed certificates for gRPC mTLS (Windows)

$ErrorActionPreference = "Stop"

$CertsDir = ".\certs"
$DaysValid = 365

Write-Host "🔐 Generating gRPC mTLS certificates..." -ForegroundColor Cyan

# Create certs directory
if (-not (Test-Path $CertsDir)) {
    New-Item -ItemType Directory -Path $CertsDir | Out-Null
}

Push-Location $CertsDir

try {
    # 1. Generate CA (Certificate Authority)
    Write-Host "1️⃣ Generating CA..." -ForegroundColor Yellow
    openssl genrsa -out ca-key.pem 4096
    openssl req -new -x509 -days $DaysValid -key ca-key.pem -out ca-cert.pem `
        -subj "/C=US/ST=State/L=City/O=Organization/CN=NotificationServiceCA"

    # 2. Generate Server Certificate
    Write-Host "2️⃣ Generating Server Certificate..." -ForegroundColor Yellow
    openssl genrsa -out server-key.pem 4096
    openssl req -new -key server-key.pem -out server-csr.pem `
        -subj "/C=US/ST=State/L=City/O=Organization/CN=notification-service"
    openssl x509 -req -days $DaysValid -in server-csr.pem `
        -CA ca-cert.pem -CAkey ca-key.pem -set_serial 01 -out server-cert.pem

    # 3. Generate Client Certificate
    Write-Host "3️⃣ Generating Client Certificate..." -ForegroundColor Yellow
    openssl genrsa -out client-key.pem 4096
    openssl req -new -key client-key.pem -out client-csr.pem `
        -subj "/C=US/ST=State/L=City/O=Organization/CN=api-gateway"
    openssl x509 -req -days $DaysValid -in client-csr.pem `
        -CA ca-cert.pem -CAkey ca-key.pem -set_serial 02 -out client-cert.pem

    # Cleanup CSR files
    Remove-Item -Path "server-csr.pem", "client-csr.pem" -ErrorAction SilentlyContinue

    Write-Host "`n✅ Certificates generated successfully!" -ForegroundColor Green
    Write-Host "📁 Location: $CertsDir" -ForegroundColor Green
    Write-Host "`nGenerated files:" -ForegroundColor Cyan
    Get-ChildItem -Filter *.pem | Format-Table Name, Length, LastWriteTime

} finally {
    Pop-Location
}

