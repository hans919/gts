# Graduate Tracer System - Setup Script
# Run this script in PowerShell after installing Node.js

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Graduate Tracer System - Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

# Check PHP
try {
    $phpVersion = php --version 2>$null
    if ($phpVersion) {
        Write-Host "[OK] PHP is installed" -ForegroundColor Green
    }
} catch {
    Write-Host "[ERROR] PHP is not installed. Please install PHP 8.2+" -ForegroundColor Red
    exit 1
}

# Check Composer
try {
    $composerVersion = composer --version 2>$null
    if ($composerVersion) {
        Write-Host "[OK] Composer is installed" -ForegroundColor Green
    }
} catch {
    Write-Host "[ERROR] Composer is not installed. Please install from getcomposer.org" -ForegroundColor Red
    exit 1
}

# Check Node.js
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "[OK] Node.js is installed - $nodeVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "[ERROR] Node.js is not installed. Please install from nodejs.org" -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/en/download/" -ForegroundColor Yellow
    exit 1
}

# Check npm
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Host "[OK] npm is installed - v$npmVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "[ERROR] npm is not installed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up Laravel Backend..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Set-Location "c:\xampp\htdocs\gts\laravel"

# Install Composer dependencies
Write-Host "Installing Composer dependencies..." -ForegroundColor Yellow
composer install

# Copy .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
}

# Generate application key
Write-Host "Generating application key..." -ForegroundColor Yellow
php artisan key:generate

# Create SQLite database
Write-Host "Setting up SQLite database..." -ForegroundColor Yellow
$dbPath = "database\database.sqlite"
if (-not (Test-Path $dbPath)) {
    New-Item -Path $dbPath -ItemType File -Force | Out-Null
    Write-Host "[OK] Database file created" -ForegroundColor Green
}

# Update .env for SQLite
Write-Host "Configuring database..." -ForegroundColor Yellow
$envContent = Get-Content ".env" -Raw
$envContent = $envContent -replace "DB_CONNECTION=.*", "DB_CONNECTION=sqlite"
$envContent = $envContent -replace "DB_DATABASE=.*", "DB_DATABASE=c:/xampp/htdocs/gts/laravel/database/database.sqlite"
Set-Content ".env" $envContent

# Install Laravel Sanctum
Write-Host "Installing Laravel Sanctum..." -ForegroundColor Yellow
composer require laravel/sanctum

# Run migrations
Write-Host "Running database migrations..." -ForegroundColor Yellow
php artisan migrate --force

Write-Host "[OK] Backend setup complete!" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up React Frontend..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Set-Location "c:\xampp\htdocs\gts\frontend"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing npm dependencies (this may take a few minutes)..." -ForegroundColor Yellow
    npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "[OK] Dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Start the Laravel backend:" -ForegroundColor White
Write-Host "   cd c:\xampp\htdocs\gts\laravel" -ForegroundColor Cyan
Write-Host "   php artisan serve" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. In a new terminal, start the React frontend:" -ForegroundColor White
Write-Host "   cd c:\xampp\htdocs\gts\frontend" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Access the application:" -ForegroundColor White
Write-Host "   Backend API: http://localhost:8000" -ForegroundColor Cyan
Write-Host "   Frontend:    http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Create an admin user:" -ForegroundColor White
Write-Host "   Use the /register endpoint or Laravel Tinker" -ForegroundColor Cyan
Write-Host ""
Write-Host "For more information, see:" -ForegroundColor Yellow
Write-Host "- README.md" -ForegroundColor Cyan
Write-Host "- INSTALLATION.md" -ForegroundColor Cyan
Write-Host "- PROJECT_SUMMARY.md" -ForegroundColor Cyan
Write-Host "- API_REFERENCE.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green
