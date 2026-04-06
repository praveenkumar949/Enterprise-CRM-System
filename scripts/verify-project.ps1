# Full stack verification: Docker infra + Maven tests + frontend lint/build
# Run from repo root:  .\scripts\verify-project.ps1
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host "=== Docker: starting databases + Kafka + Zookeeper ===" -ForegroundColor Cyan
docker info > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Docker is not running. Start Docker Desktop and retry." -ForegroundColor Red
    exit 1
}
docker compose up -d auth-db customer-db ticket-db notification-db zookeeper kafka
Start-Sleep -Seconds 5

$services = @(
    "discovery-server",
    "api-gateway",
    "auth-service",
    "customer-service",
    "ticket-service",
    "notification-service"
)

foreach ($svc in $services) {
    Write-Host "=== mvn test: $svc ===" -ForegroundColor Cyan
    Push-Location (Join-Path $Root $svc)
    try {
        .\mvnw.cmd -q test
        if ($LASTEXITCODE -ne 0) { throw "Maven test failed for $svc" }
    } finally {
        Pop-Location
    }
}

Write-Host "=== frontend: lint + build ===" -ForegroundColor Cyan
Push-Location (Join-Path $Root "frontend-dashboard")
try {
    npm run lint
    if ($LASTEXITCODE -ne 0) { throw "npm lint failed" }
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "npm build failed" }
} finally {
    Pop-Location
}

Write-Host "=== All checks passed ===" -ForegroundColor Green
