Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "     Starting Enterprise CRM System      " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

Write-Host "Checking if Docker is running..."
docker info > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Docker is not running." -ForegroundColor Red
    Write-Host "Please start Docker Desktop and run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host "Starting Databases and Kafka via Docker Compose..." -ForegroundColor Green
docker-compose up -d

Write-Host "Waiting 15 seconds for infrastructure to initialize..."
Start-Sleep -Seconds 15

$services = @(
    "discovery-server", 
    "api-gateway", 
    "auth-service", 
    "customer-service", 
    "notification-service", 
    "ticket-service"
)

foreach ($service in $services) {
    Write-Host "Starting $service in a new terminal window..." -ForegroundColor Yellow
    
    # Start each spring boot service in its own terminal
    Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "cd Backend/$service; .\mvnw spring-boot:run"
    
    if ($service -eq "discovery-server") {
        Write-Host "Waiting 20 seconds for Eureka Discovery Server to finish starting before launching other services..."
        Start-Sleep -Seconds 20
    }
}

Write-Host "Starting React Frontend (Vite) in a new terminal window..." -ForegroundColor Yellow
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "cd Frontend/frontend-dashboard; npm install; npm run dev"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "All components have been launched!" -ForegroundColor Green
Write-Host " - Docker infrastructure is running in the background."
Write-Host " - Each backend service opened in a new PowerShell window."
Write-Host " - The frontend opened in a new PowerShell window."
Write-Host "Please check each window for its respective startup logs." -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
