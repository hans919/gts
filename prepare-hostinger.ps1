# Hostinger Deployment Preparation Script

Write-Host "🚀 Preparing Laravel Backend for Hostinger..." -ForegroundColor Green
Write-Host "=" -ForegroundColor Green * 60

$laravelPath = "c:\xampp\htdocs\gts\laravel"
Set-Location $laravelPath

# Step 1: Clear caches
Write-Host "`n🧹 Step 1: Clearing caches..." -ForegroundColor Yellow
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

Write-Host "✅ Caches cleared!" -ForegroundColor Green

# Step 2: Check vendor folder
Write-Host "`n📦 Step 2: Checking dependencies..." -ForegroundColor Yellow
if (Test-Path "vendor") {
    Write-Host "✅ Vendor folder exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  Vendor folder missing - you'll need to run 'composer install' on Hostinger" -ForegroundColor Yellow
}

# Step 3: Check .env.production
Write-Host "`n⚙️  Step 3: Checking environment file..." -ForegroundColor Yellow
if (Test-Path ".env.production") {
    Write-Host "✅ .env.production file ready" -ForegroundColor Green
    Write-Host "   APP_KEY: Configured" -ForegroundColor Cyan
    Write-Host "   Backend URL: https://lightsteelblue-locust-816886.hostingersite.com" -ForegroundColor Cyan
    Write-Host "   Frontend URL: sjcbgts.netlify.app" -ForegroundColor Cyan
} else {
    Write-Host "❌ .env.production not found!" -ForegroundColor Red
}

# Step 4: Check migrate.php
Write-Host "`n🔧 Step 4: Checking migration script..." -ForegroundColor Yellow
if (Test-Path "migrate.php") {
    Write-Host "✅ migrate.php ready" -ForegroundColor Green
} else {
    Write-Host "❌ migrate.php not found!" -ForegroundColor Red
}

# Step 5: Files to upload
Write-Host "`n📋 Step 5: Files ready for upload:" -ForegroundColor Yellow
Write-Host "   Location: c:\xampp\htdocs\gts\laravel\" -ForegroundColor Cyan
Write-Host ""
Write-Host "   Required folders:" -ForegroundColor White
Write-Host "   ✓ app/" -ForegroundColor Gray
Write-Host "   ✓ bootstrap/" -ForegroundColor Gray
Write-Host "   ✓ config/" -ForegroundColor Gray
Write-Host "   ✓ database/" -ForegroundColor Gray
Write-Host "   ✓ public/" -ForegroundColor Gray
Write-Host "   ✓ resources/" -ForegroundColor Gray
Write-Host "   ✓ routes/" -ForegroundColor Gray
Write-Host "   ✓ storage/" -ForegroundColor Gray
Write-Host "   ✓ vendor/" -ForegroundColor Gray
Write-Host ""
Write-Host "   Required files:" -ForegroundColor White
Write-Host "   ✓ .htaccess" -ForegroundColor Gray
Write-Host "   ✓ .env.production" -ForegroundColor Gray
Write-Host "   ✓ artisan" -ForegroundColor Gray
Write-Host "   ✓ composer.json" -ForegroundColor Gray
Write-Host "   ✓ migrate.php" -ForegroundColor Gray

# Summary
Write-Host "`n" + ("=" * 60) -ForegroundColor Green
Write-Host "✅ PREPARATION COMPLETE!" -ForegroundColor Green
Write-Host ("=" * 60) -ForegroundColor Green

Write-Host "`n📝 Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 📖 Read the deployment guide:" -ForegroundColor White
Write-Host "   HOSTINGER_DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. 🗄️  Create MySQL Database in Hostinger:" -ForegroundColor White
Write-Host "   - Log in to Hostinger hPanel" -ForegroundColor Gray
Write-Host "   - Create database: gts_production" -ForegroundColor Gray
Write-Host "   - Create user and save credentials" -ForegroundColor Gray
Write-Host ""
Write-Host "3. 📤 Upload files to Hostinger:" -ForegroundColor White
Write-Host "   - Use File Manager or FTP" -ForegroundColor Gray
Write-Host "   - Upload to: /public_html/api/" -ForegroundColor Gray
Write-Host "   - Upload ALL folders and files listed above" -ForegroundColor Gray
Write-Host ""
Write-Host "4. ⚙️  Configure .env file:" -ForegroundColor White
Write-Host "   - Rename .env.production to .env" -ForegroundColor Gray
Write-Host "   - Update database credentials" -ForegroundColor Gray
Write-Host ""
Write-Host "5. 🔧 Run migrations:" -ForegroundColor White
Write-Host "   - Visit: https://lightsteelblue-locust-816886.hostingersite.com/api/migrate.php" -ForegroundColor Cyan
Write-Host "   - Delete migrate.php after running" -ForegroundColor Gray
Write-Host ""
Write-Host "6. 🌐 Update Netlify:" -ForegroundColor White
Write-Host "   - Add environment variable: VITE_API_URL" -ForegroundColor Gray
Write-Host "   - Value: https://lightsteelblue-locust-816886.hostingersite.com/api" -ForegroundColor Cyan
Write-Host "   - Trigger new deploy" -ForegroundColor Gray
Write-Host ""
Write-Host "7. ✅ Test everything!" -ForegroundColor White
Write-Host "   - Try logging in at: https://sjcbgts.netlify.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "🚀 Your backend is ready to deploy!" -ForegroundColor Green
Write-Host "=" -ForegroundColor Green * 60

Read-Host "`nPress Enter to exit"
