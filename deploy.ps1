# Quick Deployment Script

Write-Host "🚀 SJCB Graduate Tracer System - Production Deployment" -ForegroundColor Green
Write-Host "=" -ForegroundColor Green * 60

# Step 1: Frontend Build
Write-Host "`n📦 Step 1: Building Frontend..." -ForegroundColor Yellow
Set-Location "c:\xampp\htdocs\gts\frontend"

Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

Write-Host "Building production bundle..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend build successful!" -ForegroundColor Green
    Write-Host "📂 Build output location: frontend/dist/" -ForegroundColor Cyan
} else {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    exit 1
}

# Step 2: Backend Optimization
Write-Host "`n⚙️  Step 2: Optimizing Backend..." -ForegroundColor Yellow
Set-Location "c:\xampp\htdocs\gts\laravel"

Write-Host "Clearing caches..." -ForegroundColor Cyan
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

Write-Host "Optimizing for production..." -ForegroundColor Cyan
php artisan config:cache
php artisan route:cache
php artisan view:cache

Write-Host "✅ Backend optimization complete!" -ForegroundColor Green

# Step 3: Show Instructions
Write-Host "`n📋 Next Steps:" -ForegroundColor Yellow
Write-Host "=" -ForegroundColor Yellow * 60

Write-Host "`n🌐 FRONTEND DEPLOYMENT (Netlify):" -ForegroundColor Cyan
Write-Host "1. Go to https://app.netlify.com/" -ForegroundColor White
Write-Host "2. Click 'Add new site' → 'Import an existing project'" -ForegroundColor White
Write-Host "3. Connect your GitHub repository" -ForegroundColor White
Write-Host "4. Configure build settings:" -ForegroundColor White
Write-Host "   - Base directory: frontend" -ForegroundColor Gray
Write-Host "   - Build command: npm run build" -ForegroundColor Gray
Write-Host "   - Publish directory: frontend/dist" -ForegroundColor Gray
Write-Host "5. Add environment variable:" -ForegroundColor White
Write-Host "   - VITE_API_URL = https://yourdomain.com/api" -ForegroundColor Gray
Write-Host "6. Click 'Deploy site'" -ForegroundColor White

Write-Host "`n🖥️  BACKEND DEPLOYMENT (Hostinger):" -ForegroundColor Cyan
Write-Host "1. Log in to Hostinger cPanel" -ForegroundColor White
Write-Host "2. Create MySQL database and user" -ForegroundColor White
Write-Host "3. Upload Laravel files to public_html/api/" -ForegroundColor White
Write-Host "4. Edit .env file with database credentials" -ForegroundColor White
Write-Host "5. Visit https://yourdomain.com/api/migrate.php" -ForegroundColor White
Write-Host "6. Delete migrate.php after running" -ForegroundColor White

Write-Host "`n📚 For detailed instructions, see:" -ForegroundColor Yellow
Write-Host "   DEPLOYMENT_GUIDE.md" -ForegroundColor Gray

Write-Host "`n✅ Preparation Complete!" -ForegroundColor Green
Write-Host "Your files are ready for deployment." -ForegroundColor Green
Write-Host "=" -ForegroundColor Green * 60

Read-Host "`nPress Enter to exit"
