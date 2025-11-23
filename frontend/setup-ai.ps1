# AI Chatbot Setup Script
# Run this script to complete the AI integration

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   AI Chatbot Integration Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the correct directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: Please run this script from the frontend directory" -ForegroundColor Red
    Write-Host "   cd c:\xampp\htdocs\gts\frontend" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Frontend directory confirmed" -ForegroundColor Green
Write-Host ""

# Check if .env.local exists
if (!(Test-Path ".env.local")) {
    Write-Host "❌ Error: .env.local file not found" -ForegroundColor Red
    exit 1
}

Write-Host "✅ .env.local file found" -ForegroundColor Green
Write-Host ""

# Display current configuration
Write-Host "Current AI Configuration:" -ForegroundColor Yellow
Write-Host "------------------------" -ForegroundColor Yellow
$envContent = Get-Content .env.local
$envContent | Where-Object { $_ -like "*AI*" -or $_ -like "*VITE_USE_AI*" } | ForEach-Object {
    if ($_ -notlike "#*") {
        Write-Host $_ -ForegroundColor White
    }
}
Write-Host ""

# Check for API keys
$hasGemini = (Select-String -Path .env.local -Pattern "^VITE_GEMINI_API_KEY=" -Quiet)
$hasGroq = (Select-String -Path .env.local -Pattern "^VITE_GROQ_API_KEY=" -Quiet)
$hasHuggingFace = (Select-String -Path .env.local -Pattern "^VITE_HUGGINGFACE_API_KEY=" -Quiet)
$hasCohere = (Select-String -Path .env.local -Pattern "^VITE_COHERE_API_KEY=" -Quiet)
$aiEnabled = (Select-String -Path .env.local -Pattern "^VITE_USE_AI=true" -Quiet)

Write-Host "API Keys Status:" -ForegroundColor Yellow
Write-Host "---------------" -ForegroundColor Yellow
if ($hasGemini) {
    Write-Host "✅ Gemini API Key: Configured" -ForegroundColor Green
} else {
    Write-Host "❌ Gemini API Key: Not configured" -ForegroundColor Red
}

if ($hasGroq) {
    Write-Host "✅ Groq API Key: Configured" -ForegroundColor Green
} else {
    Write-Host "⚪ Groq API Key: Not configured (optional)" -ForegroundColor Gray
}

if ($hasHuggingFace) {
    Write-Host "✅ HuggingFace API Key: Configured" -ForegroundColor Green
} else {
    Write-Host "⚪ HuggingFace API Key: Not configured (optional)" -ForegroundColor Gray
}

if ($hasCohere) {
    Write-Host "✅ Cohere API Key: Configured" -ForegroundColor Green
} else {
    Write-Host "⚪ Cohere API Key: Not configured (optional)" -ForegroundColor Gray
}

Write-Host ""

if ($aiEnabled) {
    Write-Host "✅ AI Features: ENABLED" -ForegroundColor Green
} else {
    Write-Host "⚠️  AI Features: DISABLED" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

# Provide instructions based on configuration
if (!$hasGemini -and !$hasGroq -and !$hasHuggingFace -and !$hasCohere) {
    Write-Host ""
    Write-Host "📋 NEXT STEPS:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Get a FREE API key from one of these providers:" -ForegroundColor White
    Write-Host ""
    Write-Host "   Option A: Google Gemini (Recommended - Easiest!)" -ForegroundColor Cyan
    Write-Host "   URL: https://makersuite.google.com/app/apikey" -ForegroundColor White
    Write-Host "   Free tier: 60 requests/minute" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   Option B: Groq (Fastest responses)" -ForegroundColor Cyan
    Write-Host "   URL: https://console.groq.com" -ForegroundColor White
    Write-Host "   Free tier: Good limits" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Add your API key to .env.local:" -ForegroundColor White
    Write-Host "   Open .env.local and uncomment the line for your provider" -ForegroundColor Gray
    Write-Host "   Replace 'your_key_here' with your actual API key" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Enable AI:" -ForegroundColor White
    Write-Host "   Change VITE_USE_AI=false to VITE_USE_AI=true" -ForegroundColor Gray
    Write-Host ""
    Write-Host "4. Restart dev server:" -ForegroundColor White
    Write-Host "   npm run dev" -ForegroundColor Cyan
    Write-Host ""
} elseif (!$aiEnabled) {
    Write-Host ""
    Write-Host "📋 NEXT STEP:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "✅ You have API keys configured!" -ForegroundColor Green
    Write-Host ""
    Write-Host "To enable AI features:" -ForegroundColor White
    Write-Host "1. Open .env.local" -ForegroundColor Gray
    Write-Host "2. Change: VITE_USE_AI=false" -ForegroundColor Red
    Write-Host "   To:     VITE_USE_AI=true" -ForegroundColor Green
    Write-Host ""
    Write-Host "3. Restart dev server:" -ForegroundColor White
    Write-Host "   npm run dev" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "✅ AI INTEGRATION COMPLETE!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your chatbot is now AI-enhanced!" -ForegroundColor White
    Write-Host ""
    Write-Host "Test it:" -ForegroundColor Yellow
    Write-Host "1. Start/restart your dev server: npm run dev" -ForegroundColor Gray
    Write-Host "2. Open the chatbot" -ForegroundColor Gray
    Write-Host "3. Try: 'What is the Graduate Tracer System?'" -ForegroundColor Gray
    Write-Host "4. Try: 'Tell me about quantum physics' (tests AI fallback)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Check browser console for AI status messages!" -ForegroundColor Cyan
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Yellow
Write-Host "   - Quick Start: src/components/graduate/chatbot/QUICKSTART_AI.md" -ForegroundColor White
Write-Host "   - Full Guide:  src/components/graduate/chatbot/AI_INTEGRATION_GUIDE.md" -ForegroundColor White
Write-Host "   - Examples:    src/components/graduate/chatbot/AI_EXAMPLES.tsx" -ForegroundColor White
Write-Host ""
