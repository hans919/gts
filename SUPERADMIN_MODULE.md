# 🔐 SUPERADMIN MODULE - Graduate Tracking System

## 📋 Overview

The **Superadmin** module is the highest-level administrative access in the Graduate Tracking System. Currently, the system has a foundation for role-based access control with two primary roles: `admin` and `graduate`. This document outlines the current state and provides guidance for implementing a full **superadmin** role.

---

## 🎯 Current System State

### Existing Roles

The system currently supports two roles defined in the database:

| Role | Access Level | Capabilities |
|------|--------------|--------------|
| **admin** | High | Full access to admin panel, graduate management, analytics, resources |
| **graduate** | Standard | Self-service portal, profile management, surveys, resources |

**Location:** `laravel/database/migrations/2025_11_21_044921_add_role_to_users_table.php`

```php
$table->enum('role', ['admin', 'graduate'])->default('graduate')->after('email');
```

---

## 🚀 Superadmin Implementation Plan

### 1. Database Changes

#### Update User Role Migration

**File:** `laravel/database/migrations/[timestamp]_add_superadmin_role.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Modify the enum to include super_admin
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'graduate', 'super_admin') DEFAULT 'graduate'");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'graduate') DEFAULT 'graduate'");
    }
};
```

---

### 2. Model Updates

#### Update User Model

**File:** `laravel/app/Models/User.php`

Add the following method to the User model:

```php
/**
 * Check if user is a super admin
 */
public function isSuperAdmin(): bool
{
    return $this->role === 'super_admin';
}

/**
 * Check if user has admin privileges (admin or super_admin)
 */
public function hasAdminAccess(): bool
{
    return in_array($this->role, ['admin', 'super_admin']);
}
```

---

### 3. Middleware (Optional but Recommended)

#### Create SuperAdmin Middleware

**File:** `laravel/app/Http/Middleware/EnsureSuperAdmin.php`

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureSuperAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || $request->user()->role !== 'super_admin') {
            return response()->json(['message' => 'Access denied. Super admin privileges required.'], 403);
        }

        return $next($request);
    }
}
```

#### Register Middleware

**File:** `bootstrap/app.php`

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->alias([
        'super_admin' => \App\Http\Middleware\EnsureSuperAdmin::class,
    ]);
})
```

---

### 4. Create Superadmin Seeder

**File:** `laravel/database/seeders/SuperAdminSeeder.php`

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        // Create Super Admin User
        $superAdmin = User::updateOrCreate(
            ['email' => 'superadmin@sjcb.edu.ph'],
            [
                'name' => 'Super Administrator',
                'email' => 'superadmin@sjcb.edu.ph',
                'password' => Hash::make('SuperAdmin@2025'),
                'role' => 'super_admin',
                'email_verified_at' => now(),
            ]
        );

        echo "✅ Super Admin user created: superadmin@sjcb.edu.ph\n";
        echo "⚠️  Default Password: SuperAdmin@2025 (CHANGE IMMEDIATELY!)\n";
    }
}
```

**Run the seeder:**
```powershell
cd c:\xampp\htdocs\gts\laravel
php artisan db:seed --class=SuperAdminSeeder
```

---

### 5. API Routes for Superadmin

**File:** `laravel/routes/api.php`

Add superadmin-specific routes:

```php
// Super Admin exclusive routes
Route::middleware(['auth:sanctum', 'super_admin'])->prefix('superadmin')->group(function () {
    // User Management
    Route::get('/users', [SuperAdminController::class, 'getAllUsers']);
    Route::post('/users', [SuperAdminController::class, 'createUser']);
    Route::put('/users/{id}', [SuperAdminController::class, 'updateUser']);
    Route::delete('/users/{id}', [SuperAdminController::class, 'deleteUser']);
    Route::put('/users/{id}/role', [SuperAdminController::class, 'changeUserRole']);
    Route::put('/users/{id}/suspend', [SuperAdminController::class, 'suspendUser']);
    
    // Admin Management
    Route::get('/admins', [SuperAdminController::class, 'getAllAdmins']);
    Route::post('/admins', [SuperAdminController::class, 'createAdmin']);
    Route::delete('/admins/{id}', [SuperAdminController::class, 'deleteAdmin']);
    
    // System Configuration
    Route::get('/settings', [SuperAdminController::class, 'getSettings']);
    Route::put('/settings', [SuperAdminController::class, 'updateSettings']);
    
    // System Logs & Audit
    Route::get('/audit-logs', [SuperAdminController::class, 'getAuditLogs']);
    Route::get('/activity-logs', [SuperAdminController::class, 'getActivityLogs']);
    
    // Database Management
    Route::post('/backup', [SuperAdminController::class, 'createBackup']);
    Route::get('/backups', [SuperAdminController::class, 'listBackups']);
    Route::post('/restore', [SuperAdminController::class, 'restoreBackup']);
    
    // System Statistics
    Route::get('/statistics', [SuperAdminController::class, 'getSystemStatistics']);
});
```

---

### 6. SuperAdmin Controller

**File:** `laravel/app/Http/Controllers/SuperAdminController.php`

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class SuperAdminController extends Controller
{
    // Get all users in the system
    public function getAllUsers(Request $request)
    {
        $users = User::orderBy('created_at', 'desc')->get();
        return response()->json($users);
    }

    // Create a new user (any role)
    public function createUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,graduate,super_admin',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'email_verified_at' => now(),
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
        ], 201);
    }

    // Update user details
    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'role' => 'sometimes|in:admin,graduate,super_admin',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ]);
    }

    // Delete a user
    public function deleteUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        // Prevent deleting yourself
        if ($user->id === $request->user()->id) {
            return response()->json(['message' => 'You cannot delete your own account'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    // Change user role
    public function changeUserRole(Request $request, $id)
    {
        $validated = $request->validate([
            'role' => 'required|in:admin,graduate,super_admin',
        ]);

        $user = User::findOrFail($id);
        $user->role = $validated['role'];
        $user->save();

        return response()->json([
            'message' => 'User role updated successfully',
            'user' => $user,
        ]);
    }

    // Get all admins
    public function getAllAdmins(Request $request)
    {
        $admins = User::whereIn('role', ['admin', 'super_admin'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($admins);
    }

    // Create admin user
    public function createAdmin(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        $admin = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        return response()->json([
            'message' => 'Admin created successfully',
            'user' => $admin,
        ], 201);
    }

    // Get system statistics
    public function getSystemStatistics(Request $request)
    {
        $stats = [
            'total_users' => User::count(),
            'total_admins' => User::where('role', 'admin')->count(),
            'total_super_admins' => User::where('role', 'super_admin')->count(),
            'total_graduates' => User::where('role', 'graduate')->count(),
            'total_graduates_profile' => DB::table('graduates')->count(),
            'total_surveys' => DB::table('surveys')->count(),
            'total_jobs' => DB::table('jobs')->count(),
            'total_support_tickets' => DB::table('support_tickets')->count(),
            'pending_tickets' => DB::table('support_tickets')->where('status', 'open')->count(),
        ];

        return response()->json($stats);
    }
}
```

---

### 7. Frontend Integration

#### Update TypeScript Types

**File:** `frontend/src/types/auth.types.ts`

```typescript
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'graduate' | 'super_admin';
  created_at: string;
  updated_at: string;
}
```

#### Update Protected Routes

**File:** `frontend/src/App.tsx`

```tsx
// Super Admin Routes
<Route path="/superadmin" element={<ProtectedRoute allowedRoles={['super_admin']}><SuperAdminLayout /></ProtectedRoute>}>
  <Route index element={<Navigate to="/superadmin/dashboard" replace />} />
  <Route path="dashboard" element={<SuperAdminDashboard />} />
  <Route path="users" element={<UserManagement />} />
  <Route path="admins" element={<AdminManagement />} />
  <Route path="settings" element={<SystemSettings />} />
  <Route path="logs" element={<AuditLogs />} />
  <Route path="backups" element={<BackupManagement />} />
</Route>
```

---

## 🎛️ Superadmin Capabilities

### Full Access Control
- ✅ Create, read, update, delete ALL users
- ✅ Promote/demote users between roles
- ✅ Suspend or activate user accounts
- ✅ Reset user passwords
- ✅ View audit logs and activity history

### Admin Management
- ✅ Create and manage admin accounts
- ✅ Assign admin privileges
- ✅ Monitor admin activities
- ✅ Remove admin access

### System Configuration
- ✅ Modify system settings
- ✅ Configure email templates
- ✅ Update application constants
- ✅ Manage API keys and integrations

### Database Operations
- ✅ Create database backups
- ✅ Restore from backups
- ✅ Export system data
- ✅ Clear cache and logs

### Analytics & Monitoring
- ✅ View comprehensive system statistics
- ✅ Monitor system health
- ✅ Track user engagement
- ✅ Review security logs

---

## 🔒 Security Considerations

### 1. **Limited Superadmin Accounts**
   - Only create 1-2 superadmin accounts
   - Use strong, unique passwords
   - Enable 2FA (future enhancement)

### 2. **Audit Logging**
   - Log all superadmin actions
   - Track login attempts
   - Monitor privilege changes

### 3. **Password Requirements**
   - Minimum 12 characters
   - Include uppercase, lowercase, numbers, symbols
   - Force password change on first login

### 4. **Access Restrictions**
   - IP whitelist for superadmin access (optional)
   - Rate limiting on authentication endpoints
   - Session timeout after inactivity

---

## 📦 Quick Setup Commands

### 1. Create Migration
```powershell
cd c:\xampp\htdocs\gts\laravel
php artisan make:migration add_superadmin_role
```

### 2. Create Middleware
```powershell
php artisan make:middleware EnsureSuperAdmin
```

### 3. Create Controller
```powershell
php artisan make:controller SuperAdminController
```

### 4. Create Seeder
```powershell
php artisan make:seeder SuperAdminSeeder
```

### 5. Run Migration and Seeder
```powershell
php artisan migrate
php artisan db:seed --class=SuperAdminSeeder
```

---

## 🧪 Testing Superadmin Access

### Test Login
```powershell
# Login as superadmin
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/login" -Method Post -Body '{"email":"superadmin@sjcb.edu.ph","password":"SuperAdmin@2025"}' -ContentType "application/json"
```

### Test Protected Route
```powershell
# Get all users (superadmin only)
$token = "YOUR_SUPERADMIN_TOKEN"
$headers = @{
    "Authorization" = "Bearer $token"
    "Accept" = "application/json"
}
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/superadmin/users" -Method Get -Headers $headers
```

---

## 📊 Default Credentials (After Setup)

| Role | Email | Password | Access |
|------|-------|----------|--------|
| **Super Admin** | superadmin@sjcb.edu.ph | SuperAdmin@2025 | Full system access |
| **Admin** | admin@test.com | password123 | Admin panel |
| **Graduate** | graduate@test.com | password123 | Graduate portal |

⚠️ **IMPORTANT:** Change default passwords immediately after first login!

---

## 📝 File Structure

```
laravel/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── SuperAdminController.php       # NEW
│   │   └── Middleware/
│   │       └── EnsureSuperAdmin.php            # NEW
│   └── Models/
│       └── User.php                            # UPDATED
├── database/
│   ├── migrations/
│   │   └── [timestamp]_add_superadmin_role.php # NEW
│   └── seeders/
│       └── SuperAdminSeeder.php                # NEW
└── routes/
    └── api.php                                 # UPDATED

frontend/
└── src/
    ├── types/
    │   └── auth.types.ts                       # UPDATED
    ├── pages/
    │   └── superadmin/                         # NEW
    │       ├── SuperAdminDashboard.tsx
    │       ├── UserManagement.tsx
    │       ├── AdminManagement.tsx
    │       └── SystemSettings.tsx
    └── App.tsx                                 # UPDATED
```

---

## 🚀 Next Steps

1. ✅ Review this implementation plan
2. ⏳ Run database migration to add `super_admin` role
3. ⏳ Update User model with superadmin methods
4. ⏳ Create SuperAdminController
5. ⏳ Add middleware for superadmin protection
6. ⏳ Create superadmin seeder
7. ⏳ Update frontend types and routes
8. ⏳ Build superadmin dashboard UI
9. ⏳ Test all superadmin functionality
10. ⏳ Deploy to production

---

## 📞 Support

For questions or issues with superadmin implementation:
- 📧 Email: admin@sjcb.edu.ph
- 📄 Documentation: See `DOCS.md` and `API_REFERENCE.md`
- 🔧 Troubleshooting: Check `laravel/storage/logs/laravel.log`

---

**Last Updated:** November 24, 2025  
**Version:** 1.0.0  
**Author:** GTS Development Team
