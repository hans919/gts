# Graduate Tracer System - API Test Script
# This script tests the Laravel API endpoints

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Graduate Tracer System - API Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://127.0.0.1:8000/api"

# Test 1: Register a new user
Write-Host "Test 1: Register new user..." -ForegroundColor Yellow
try {
    $registerBody = @{
        name = "Test User"
        email = "testuser@example.com"
        password = "password123"
        password_confirmation = "password123"
        role = "graduate"
    } | ConvertTo-Json

    $registerResponse = Invoke-RestMethod -Uri "$baseUrl/register" -Method Post -Body $registerBody -ContentType "application/json"
    
    Write-Host "[SUCCESS] User registered successfully!" -ForegroundColor Green
    Write-Host "User: $($registerResponse.user.name)" -ForegroundColor White
    Write-Host "Email: $($registerResponse.user.email)" -ForegroundColor White
    Write-Host "Token: $($registerResponse.token.Substring(0, 20))..." -ForegroundColor White
    
    $token = $registerResponse.token
    
} catch {
    $errorDetail = $_.Exception.Response
    if ($errorDetail) {
        $reader = New-Object System.IO.StreamReader($errorDetail.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "[ERROR] Registration failed: $responseBody" -ForegroundColor Red
    } else {
        Write-Host "[ERROR] Registration failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""

# Test 2: Login with admin user
Write-Host "Test 2: Login with admin user..." -ForegroundColor Yellow
try {
    $loginBody = @{
        email = "admin@test.com"
        password = "password123"
    } | ConvertTo-Json

    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/login" -Method Post -Body $loginBody -ContentType "application/json"
    
    Write-Host "[SUCCESS] Login successful!" -ForegroundColor Green
    Write-Host "User: $($loginResponse.user.name)" -ForegroundColor White
    Write-Host "Role: $($loginResponse.user.role)" -ForegroundColor White
    Write-Host "Token: $($loginResponse.token.Substring(0, 20))..." -ForegroundColor White
    
    $adminToken = $loginResponse.token
    
} catch {
    $errorDetail = $_.Exception.Response
    if ($errorDetail) {
        $reader = New-Object System.IO.StreamReader($errorDetail.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "[ERROR] Login failed: $responseBody" -ForegroundColor Red
    } else {
        Write-Host "[ERROR] Login failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""

# Test 3: Get user info (requires authentication)
if ($adminToken) {
    Write-Host "Test 3: Get current user info..." -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $adminToken"
            "Accept" = "application/json"
        }

        $userResponse = Invoke-RestMethod -Uri "$baseUrl/user" -Method Get -Headers $headers
        
        Write-Host "[SUCCESS] User info retrieved!" -ForegroundColor Green
        Write-Host "Name: $($userResponse.name)" -ForegroundColor White
        Write-Host "Email: $($userResponse.email)" -ForegroundColor White
        Write-Host "Role: $($userResponse.role)" -ForegroundColor White
        
    } catch {
        Write-Host "[ERROR] Failed to get user info: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
}

# Test 4: Get graduates list (requires authentication)
if ($adminToken) {
    Write-Host "Test 4: Get graduates list..." -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $adminToken"
            "Accept" = "application/json"
        }

        $graduatesResponse = Invoke-RestMethod -Uri "$baseUrl/graduates" -Method Get -Headers $headers
        
        Write-Host "[SUCCESS] Graduates list retrieved!" -ForegroundColor Green
        Write-Host "Total graduates: $($graduatesResponse.total)" -ForegroundColor White
        Write-Host "Current page: $($graduatesResponse.current_page)" -ForegroundColor White
        
    } catch {
        Write-Host "[ERROR] Failed to get graduates: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
}

# Test 5: Get surveys list (requires authentication)
if ($adminToken) {
    Write-Host "Test 5: Get surveys list..." -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $adminToken"
            "Accept" = "application/json"
        }

        $surveysResponse = Invoke-RestMethod -Uri "$baseUrl/surveys" -Method Get -Headers $headers
        
        Write-Host "[SUCCESS] Surveys list retrieved!" -ForegroundColor Green
        Write-Host "Total surveys: $($surveysResponse.total)" -ForegroundColor White
        
    } catch {
        Write-Host "[ERROR] Failed to get surveys: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
}

# Test 6: Get analytics dashboard (requires authentication)
if ($adminToken) {
    Write-Host "Test 6: Get analytics dashboard..." -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $adminToken"
            "Accept" = "application/json"
        }

        $analyticsResponse = Invoke-RestMethod -Uri "$baseUrl/analytics/dashboard" -Method Get -Headers $headers
        
        Write-Host "[SUCCESS] Analytics retrieved!" -ForegroundColor Green
        Write-Host "Total Graduates: $($analyticsResponse.total_graduates)" -ForegroundColor White
        Write-Host "Total Surveys: $($analyticsResponse.total_surveys)" -ForegroundColor White
        Write-Host "Active Surveys: $($analyticsResponse.active_surveys)" -ForegroundColor White
        
    } catch {
        Write-Host "[ERROR] Failed to get analytics: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "API Testing Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Available Test Credentials:" -ForegroundColor Yellow
Write-Host "Admin - Email: admin@test.com | Password: password123" -ForegroundColor White
Write-Host "Graduate - Email: graduate@test.com | Password: password123" -ForegroundColor White
Write-Host ""
Write-Host "Backend Server: http://127.0.0.1:8000" -ForegroundColor Cyan
Write-Host "API Base URL: http://127.0.0.1:8000/api" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Keep the Laravel server running (php artisan serve)" -ForegroundColor White
Write-Host "2. Install Node.js from: https://nodejs.org/" -ForegroundColor White
Write-Host "3. Set up the React frontend" -ForegroundColor White
Write-Host "4. Access API documentation in API_REFERENCE.md" -ForegroundColor White
