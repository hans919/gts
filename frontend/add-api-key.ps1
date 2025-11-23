# Quick Add API Key Script
# Usage: .\add-api-key.ps1 gemini "your_api_key_here"

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet('gemini', 'groq', 'huggingface', 'cohere')]
    [string]$Provider,
    
    [Parameter(Mandatory=$true)]
    [string]$ApiKey
)

Write-Host ""
Write-Host "🔧 Adding $Provider API key..." -ForegroundColor Cyan
Write-Host ""

# Read current .env.local
$envContent = Get-Content .env.local

# Determine the variable name
$varName = switch ($Provider) {
    'gemini' { 'VITE_GEMINI_API_KEY' }
    'groq' { 'VITE_GROQ_API_KEY' }
    'huggingface' { 'VITE_HUGGINGFACE_API_KEY' }
    'cohere' { 'VITE_COHERE_API_KEY' }
}

# Check if key already exists
$existingKey = $envContent | Where-Object { $_ -like "$varName=*" }

if ($existingKey) {
    Write-Host "⚠️  Warning: $varName already exists in .env.local" -ForegroundColor Yellow
    $response = Read-Host "Do you want to replace it? (y/n)"
    if ($response -ne 'y') {
        Write-Host "❌ Cancelled" -ForegroundColor Red
        exit 0
    }
    
    # Remove old key
    $envContent = $envContent | Where-Object { $_ -notlike "$varName=*" }
}

# Find where to insert (after other API keys or before VITE_USE_AI)
$insertIndex = -1
for ($i = 0; $i -lt $envContent.Count; $i++) {
    if ($envContent[$i] -like "*VITE_USE_AI*") {
        $insertIndex = $i
        break
    }
}

if ($insertIndex -eq -1) {
    # Just add at the end
    $envContent += "$varName=$ApiKey"
} else {
    # Insert before VITE_USE_AI
    $newContent = @()
    for ($i = 0; $i -lt $envContent.Count; $i++) {
        if ($i -eq $insertIndex) {
            $newContent += "$varName=$ApiKey"
            $newContent += ""
        }
        $newContent += $envContent[$i]
    }
    $envContent = $newContent
}

# Write back to file
$envContent | Set-Content .env.local

Write-Host "✅ $Provider API key added successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Current configuration:" -ForegroundColor Yellow
Get-Content .env.local | Where-Object { $_ -like "*VITE_*" -and $_ -notlike "#*" }
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Enable AI by changing VITE_USE_AI to true:" -ForegroundColor White
Write-Host "   .\enable-ai.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Or manually edit .env.local and change:" -ForegroundColor White
Write-Host "   VITE_USE_AI=false → VITE_USE_AI=true" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Restart your dev server:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
