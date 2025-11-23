# Complete AI Setup Guide - Run in Terminal

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  AI Chatbot Integration - Complete Guide" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This guide will help you integrate AI into your chatbot." -ForegroundColor White
Write-Host ""

Write-Host "STEP 1: Get a Free API Key" -ForegroundColor Yellow
Write-Host "===========================" -ForegroundColor Yellow
Write-Host ""
Write-Host "Choose ONE of these providers (or add multiple for redundancy):" -ForegroundColor White
Write-Host ""
Write-Host "  🌟 Google Gemini (RECOMMENDED)" -ForegroundColor Green
Write-Host "     • Easiest to set up" -ForegroundColor Gray
Write-Host "     • Free: 60 requests/minute" -ForegroundColor Gray
Write-Host "     • URL: https://makersuite.google.com/app/apikey" -ForegroundColor Cyan
Write-Host "     • Click 'Create API Key' and copy it" -ForegroundColor Gray
Write-Host ""
Write-Host "  ⚡ Groq (FASTEST)" -ForegroundColor Green
Write-Host "     • Super fast responses" -ForegroundColor Gray
Write-Host "     • Good free tier" -ForegroundColor Gray
Write-Host "     • URL: https://console.groq.com" -ForegroundColor Cyan
Write-Host "     • Sign up → API Keys → Create" -ForegroundColor Gray
Write-Host ""
Write-Host "  🤗 Hugging Face" -ForegroundColor Green
Write-Host "     • Open source models" -ForegroundColor Gray
Write-Host "     • Generous free tier" -ForegroundColor Gray
Write-Host "     • URL: https://huggingface.co/settings/tokens" -ForegroundColor Cyan
Write-Host ""

$response = Read-Host "`nDo you have an API key ready? (y/n)"
if ($response -ne 'y') {
    Write-Host "`n❌ Please get an API key first, then run this script again." -ForegroundColor Red
    Write-Host "   Recommended: Get Gemini key from https://makersuite.google.com/app/apikey" -ForegroundColor Yellow
    Write-Host ""
    exit 0
}

Write-Host ""
Write-Host "STEP 2: Add Your API Key" -ForegroundColor Yellow
Write-Host "========================" -ForegroundColor Yellow
Write-Host ""
Write-Host "Which provider did you choose?" -ForegroundColor White
Write-Host "  1. Google Gemini" -ForegroundColor Cyan
Write-Host "  2. Groq" -ForegroundColor Cyan
Write-Host "  3. Hugging Face" -ForegroundColor Cyan
Write-Host "  4. Cohere" -ForegroundColor Cyan
Write-Host ""

$providerChoice = Read-Host "Enter number (1-4)"

$provider = switch ($providerChoice) {
    '1' { 'gemini' }
    '2' { 'groq' }
    '3' { 'huggingface' }
    '4' { 'cohere' }
    default { 
        Write-Host "`n❌ Invalid choice" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
$apiKey = Read-Host "Paste your API key"

if ($apiKey -eq "") {
    Write-Host "`n❌ API key cannot be empty" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Adding $provider API key..." -ForegroundColor Cyan

# Run the add-api-key script
& ".\add-api-key.ps1" -Provider $provider -ApiKey $apiKey

Write-Host ""
Write-Host "STEP 3: Enable AI Features" -ForegroundColor Yellow
Write-Host "===========================" -ForegroundColor Yellow
Write-Host ""

$enableResponse = Read-Host "Do you want to enable AI now? (y/n)"
if ($enableResponse -eq 'y') {
    & ".\enable-ai.ps1"
} else {
    Write-Host ""
    Write-Host "⏸️  AI features not enabled yet." -ForegroundColor Yellow
    Write-Host "   Run this when ready: .\enable-ai.ps1" -ForegroundColor Cyan
    Write-Host ""
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  ✅ Setup Complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "What's next?" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Start/restart your dev server:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Test the chatbot:" -ForegroundColor White
Write-Host "   • Try: 'How do I submit a survey?' (rule-based)" -ForegroundColor Gray
Write-Host "   • Try: 'What is quantum physics?' (AI-powered)" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Check browser console for AI status" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Yellow
Write-Host "   • Quick Start: src/components/graduate/chatbot/QUICKSTART_AI.md" -ForegroundColor Gray
Write-Host "   • Full Guide:  src/components/graduate/chatbot/AI_INTEGRATION_GUIDE.md" -ForegroundColor Gray
Write-Host ""
Write-Host "🎉 Enjoy your AI-powered chatbot!" -ForegroundColor Green
Write-Host ""
