# Simple SuperAdmin Test
$loginBody = '{"email":"superadmin@sjcb.edu.ph","password":"SuperAdmin@2025"}'

Write-Host "Testing login..." -ForegroundColor Yellow
$response = Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/login" -Method Post -Body $loginBody -ContentType "application/json"
$loginData = $response.Content | ConvertFrom-Json

Write-Host "Login Response:" -ForegroundColor Green
$loginData | ConvertTo-Json -Depth 3

if ($loginData.user) {
    Write-Host "`n✅ SuperAdmin Login Successful!" -ForegroundColor Green
    Write-Host "User: $($loginData.user.name)" -ForegroundColor Cyan
    Write-Host "Email: $($loginData.user.email)" -ForegroundColor Cyan
    Write-Host "Role: $($loginData.user.role)" -ForegroundColor Cyan
    
    # Test getting users
    Write-Host "`nTesting Get All Users..." -ForegroundColor Yellow
    $token = $loginData.token
    $headers = @{
        "Authorization" = "Bearer $token"
        "Accept" = "application/json"
    }
    
    try {
        $usersResponse = Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/superadmin/users" -Method Get -Headers $headers
        $users = $usersResponse.Content | ConvertFrom-Json
        Write-Host "✅ Retrieved $($users.Count) users" -ForegroundColor Green
        $users | ForEach-Object {
            Write-Host "  - $($_.name) ($($_.email)) - $($_.role)" -ForegroundColor Cyan
        }
    } catch {
        Write-Host "Error: $_" -ForegroundColor Red
    }
}
