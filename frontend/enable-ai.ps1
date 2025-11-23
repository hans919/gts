# Enable AI Features Script

Write-Host ""
Write-Host "🤖 Enabling AI features..." -ForegroundColor Cyan
Write-Host ""

# Read current .env.local
$envContent = Get-Content .env.local

# Check if any API keys are configured
$hasKey = $false
$providers = @('VITE_GEMINI_API_KEY', 'VITE_GROQ_API_KEY', 'VITE_HUGGINGFACE_API_KEY', 'VITE_COHERE_API_KEY')

foreach ($provider in $providers) {
    if ($envContent | Where-Object { $_ -like "$provider=*" -and $_ -notlike "#*" }) {
        $hasKey = $true
        break
    }
}

if (!$hasKey) {
    Write-Host "❌ Error: No API keys found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please add at least one API key first:" -ForegroundColor Yellow
    Write-Host "  .\add-api-key.ps1 gemini 'your_api_key_here'" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Or manually edit .env.local and add your key" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

# Replace VITE_USE_AI=false with VITE_USE_AI=true
$newContent = $envContent | ForEach-Object {
    if ($_ -like "VITE_USE_AI=true") {
        "VITE_USE_AI=true"
    } else {
        $_
    }
}

# Write back
$newContent | Set-Content .env.local

Write-Host "✅ AI features enabled!" -ForegroundColor Green
Write-Host ""
Write-Host "Current configuration:" -ForegroundColor Yellow
Get-Content .env.local | Where-Object { $_ -like "*VITE_*" -and $_ -notlike "#*" }
Write-Host ""
Write-Host "🚀 Next step:" -ForegroundColor Cyan
Write-Host "   Restart your dev server: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "   Your chatbot will now use AI for:" -ForegroundColor Yellow
Write-Host "   • Unknown questions (confidence < 50%)" -ForegroundColor Gray
Write-Host "   • Enhancing rule-based responses" -ForegroundColor Gray
Write-Host "   • Natural conversation flow" -ForegroundColor Gray
Write-Host ""
