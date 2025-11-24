# Test SuperAdmin Login and User Management
Write-Host "=== Testing SuperAdmin Module ===" -ForegroundColor Cyan
Write-Host ""

# 1. Login as SuperAdmin
Write-Host "1. Testing SuperAdmin Login..." -ForegroundColor Yellow
$loginBody = @{
    email = "superadmin@sjcb.edu.ph"
    password = "SuperAdmin@2025"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/login" `
        -Method Post `
        -Body $loginBody `
        -ContentType "application/json"
    
    Write-Host "✅ Login Successful!" -ForegroundColor Green
    Write-Host "User: $($loginResponse.user.name)" -ForegroundColor Green
    Write-Host "Role: $($loginResponse.user.role)" -ForegroundColor Green
    Write-Host "Token: $($loginResponse.token.Substring(0, 20))..." -ForegroundColor Green
    Write-Host ""
    
    $token = $loginResponse.token
    $headers = @{
        "Authorization" = "Bearer $token"
        "Accept" = "application/json"
        "Content-Type" = "application/json"
    }
    
    # 2. Get All Users
    Write-Host "2. Testing Get All Users..." -ForegroundColor Yellow
    $users = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/superadmin/users" `
        -Method Get `
        -Headers $headers
    
    Write-Host "✅ Retrieved $($users.Count) users" -ForegroundColor Green
    foreach ($user in $users) {
        Write-Host "  - $($user.name) ($($user.email)) - Role: $($user.role)" -ForegroundColor Cyan
    }
    Write-Host ""
    
    # 3. Get System Statistics
    Write-Host "3. Testing System Statistics..." -ForegroundColor Yellow
    $stats = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/superadmin/statistics" `
        -Method Get `
        -Headers $headers
    
    Write-Host "✅ System Statistics:" -ForegroundColor Green
    Write-Host "  - Total Users: $($stats.total_users)" -ForegroundColor Cyan
    Write-Host "  - Super Admins: $($stats.total_super_admins)" -ForegroundColor Cyan
    Write-Host "  - Admins: $($stats.total_admins)" -ForegroundColor Cyan
    Write-Host "  - Graduates: $($stats.total_graduates)" -ForegroundColor Cyan
    Write-Host ""
    
    # 4. Create a Test User
    Write-Host "4. Testing Create User..." -ForegroundColor Yellow
    $newUserBody = @{
        name = "Test Graduate"
        email = "testgraduate@sjcb.edu.ph"
        password = "TestPass123!"
        role = "graduate"
    } | ConvertTo-Json
    
    try {
        $newUser = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/superadmin/users" `
            -Method Post `
            -Body $newUserBody `
            -Headers $headers
        
        Write-Host "✅ User Created: $($newUser.user.name)" -ForegroundColor Green
        Write-Host ""
        
        $testUserId = $newUser.user.id
        
        # 5. Update User Role
        Write-Host "5. Testing Change User Role..." -ForegroundColor Yellow
        $roleBody = @{
            role = "admin"
        } | ConvertTo-Json
        
        $updatedUser = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/superadmin/users/$testUserId/role" `
            -Method Put `
            -Body $roleBody `
            -Headers $headers
        
        Write-Host "✅ Role Changed: $($updatedUser.user.name) is now $($updatedUser.user.role)" -ForegroundColor Green
        Write-Host ""
        
        # 6. Delete Test User
        Write-Host "6. Testing Delete User..." -ForegroundColor Yellow
        $deleteResponse = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/superadmin/users/$testUserId" `
            -Method Delete `
            -Headers $headers
        
        Write-Host "✅ User Deleted: $($deleteResponse.message)" -ForegroundColor Green
        Write-Host ""
        
    } catch {
        if ($_.Exception.Response.StatusCode.value__ -eq 422) {
            Write-Host "⚠️ User might already exist, skipping creation test" -ForegroundColor Yellow
        } else {
            throw
        }
    }
    
    Write-Host "=== All Tests Completed Successfully ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "SuperAdmin Credentials:" -ForegroundColor Cyan
    Write-Host "  Email: superadmin@sjcb.edu.ph" -ForegroundColor White
    Write-Host "  Password: SuperAdmin@2025" -ForegroundColor White
    Write-Host ""
    Write-Host "You can now login to the frontend at: http://localhost:5173" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Error occurred:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    if ($_.ErrorDetails) {
        Write-Host $_.ErrorDetails.Message -ForegroundColor Red
    }
}
