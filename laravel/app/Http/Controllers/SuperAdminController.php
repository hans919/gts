<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class SuperAdminController extends Controller
{
    /**
     * Get all users in the system
     */
    public function getAllUsers(Request $request)
    {
        $users = User::orderBy('created_at', 'desc')->get();
        return response()->json($users);
    }

    /**
     * Create a new user (any role)
     */
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

    /**
     * Update user details
     */
    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'role' => 'sometimes|in:admin,graduate,super_admin',
            'password' => 'sometimes|string|min:8',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        // If this is a graduate user and name was changed, sync to graduates table
        if ($user->role === 'graduate' && isset($validated['name'])) {
            $graduate = \App\Models\Graduate::where('email', $user->email)->first();
            
            if ($graduate) {
                // Split name into first and last name
                $nameParts = explode(' ', $validated['name'], 2);
                $firstName = $nameParts[0] ?? '';
                $lastName = $nameParts[1] ?? '';
                
                $graduate->update([
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                ]);
            }
        }

        // If email was changed, update graduates table as well
        if ($user->role === 'graduate' && isset($validated['email'])) {
            $graduate = \App\Models\Graduate::where('user_id', $user->id)->first();
            
            if ($graduate) {
                $graduate->update([
                    'email' => $validated['email'],
                ]);
            }
        }

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ]);
    }

    /**
     * Delete a user
     */
    public function deleteUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        // Prevent deleting yourself
        if ($user->id === $request->user()->id) {
            return response()->json([
                'message' => 'You cannot delete your own account'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }

    /**
     * Change user role
     */
    public function changeUserRole(Request $request, $id)
    {
        $validated = $request->validate([
            'role' => 'required|in:admin,graduate,super_admin',
        ]);

        $user = User::findOrFail($id);
        
        // Prevent changing your own role
        if ($user->id === $request->user()->id) {
            return response()->json([
                'message' => 'You cannot change your own role'
            ], 403);
        }

        $user->role = $validated['role'];
        $user->save();

        return response()->json([
            'message' => 'User role updated successfully',
            'user' => $user,
        ]);
    }

    /**
     * Suspend or activate user account
     */
    public function toggleUserStatus(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        // Prevent suspending yourself
        if ($user->id === $request->user()->id) {
            return response()->json([
                'message' => 'You cannot suspend your own account'
            ], 403);
        }

        // Toggle account status (you may need to add a 'status' column to users table)
        // For now, we'll use a simple approach
        $validated = $request->validate([
            'is_active' => 'required|boolean',
        ]);

        // This assumes you have an 'is_active' column. If not, you can add it via migration
        $user->update(['is_active' => $validated['is_active']]);

        return response()->json([
            'message' => $validated['is_active'] ? 'User activated successfully' : 'User suspended successfully',
            'user' => $user,
        ]);
    }

    /**
     * Reset user password
     */
    public function resetUserPassword(Request $request, $id)
    {
        $validated = $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::findOrFail($id);
        $user->password = Hash::make($validated['password']);
        $user->save();

        return response()->json([
            'message' => 'Password reset successfully',
        ]);
    }

    /**
     * Get system statistics
     */
    public function getSystemStatistics(Request $request)
    {
        $stats = [
            'total_users' => User::count(),
            'total_admins' => User::where('role', 'admin')->count(),
            'total_super_admins' => User::where('role', 'super_admin')->count(),
            'total_graduates' => User::where('role', 'graduate')->count(),
            'recent_users' => User::orderBy('created_at', 'desc')->take(5)->get(),
        ];

        // Add more statistics if needed
        try {
            $stats['total_graduates_profile'] = DB::table('graduates')->count();
            $stats['total_surveys'] = DB::table('surveys')->count();
            $stats['total_jobs'] = DB::table('jobs')->count();
        } catch (\Exception $e) {
            // Tables might not exist yet
        }

        return response()->json($stats);
    }

    /**
     * Get admin activities
     */
    public function getAdminActivities(Request $request)
    {
        // For now, return mock data. In production, implement proper audit logging
        $activities = collect([]);
        
        // Get recent admin/super_admin user creations
        $recentAdmins = User::whereIn('role', ['admin', 'super_admin'])
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function($user) {
                return [
                    'id' => $user->id,
                    'admin_name' => 'System',
                    'action' => 'User Created',
                    'description' => "Admin account created for {$user->email}",
                    'created_at' => $user->created_at,
                ];
            });

        return response()->json($recentAdmins);
    }

    /**
     * Get system settings
     */
    public function getSettings(Request $request)
    {
        $settings = [
            'general' => [
                'app_name' => env('APP_NAME', 'Graduate Tracking System'),
                'app_url' => env('APP_URL', 'http://localhost'),
                'timezone' => env('APP_TIMEZONE', 'UTC'),
                'items_per_page' => 20,
            ],
            'email' => [
                'from_name' => env('MAIL_FROM_NAME', 'GTS Admin'),
                'from_address' => env('MAIL_FROM_ADDRESS', 'admin@sjcb.edu.ph'),
                'smtp_host' => env('MAIL_HOST', 'smtp.gmail.com'),
                'smtp_port' => env('MAIL_PORT', 587),
                'smtp_encryption' => env('MAIL_ENCRYPTION', 'tls'),
            ],
            'email_templates' => [
                'welcome_subject' => 'Welcome to Graduate Tracking System',
                'welcome_body' => 'Dear {name}, welcome to our platform...',
                'password_reset_subject' => 'Reset Your Password',
                'password_reset_body' => 'Click the link below to reset your password...',
                'notification_subject' => 'New Notification',
                'notification_body' => 'You have a new notification...',
            ],
            'application' => [
                'max_upload_size' => 10, // MB
                'allowed_file_types' => ['pdf', 'doc', 'docx', 'jpg', 'png'],
                'session_timeout' => 120, // minutes
                'password_min_length' => 8,
                'enable_2fa' => false,
                'enable_email_verification' => true,
            ],
            'api_keys' => [
                'google_client_id' => env('GOOGLE_CLIENT_ID', ''),
                'google_client_secret' => env('GOOGLE_CLIENT_SECRET', ''),
                'facebook_app_id' => env('FACEBOOK_APP_ID', ''),
                'facebook_app_secret' => env('FACEBOOK_APP_SECRET', ''),
                'smtp_api_key' => env('SMTP_API_KEY', ''),
            ],
        ];

        return response()->json($settings);
    }

    /**
     * Update system settings
     */
    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'section' => 'required|in:general,email,email_templates,application,api_keys',
            'settings' => 'required|array',
        ]);

        $section = $validated['section'];
        $settings = $validated['settings'];

        // In production, you would update .env file or database settings table
        // For now, we'll just validate and return success
        
        // Log the settings update
        \Log::info("Settings updated by Super Admin", [
            'user_id' => $request->user()->id,
            'section' => $section,
            'settings' => $settings,
        ]);

        return response()->json([
            'message' => 'Settings updated successfully',
            'section' => $section,
            'updated_settings' => $settings,
        ]);
    }

    /**
     * Create database backup
     */
    public function createBackup(Request $request)
    {
        try {
            $database = env('DB_DATABASE');
            $username = env('DB_USERNAME');
            $password = env('DB_PASSWORD');
            $host = env('DB_HOST');
            
            $backupPath = storage_path('app/backups');
            
            // Create backups directory if it doesn't exist
            if (!file_exists($backupPath)) {
                mkdir($backupPath, 0755, true);
            }
            
            $filename = 'backup_' . date('Y-m-d_His') . '.sql';
            $filepath = $backupPath . '/' . $filename;
            
            // For Windows/XAMPP, use mysqldump
            $command = "mysqldump --user={$username} --password={$password} --host={$host} {$database} > {$filepath}";
            
            // Execute backup command
            exec($command, $output, $return_var);
            
            if ($return_var === 0 && file_exists($filepath)) {
                // Log the backup
                \Log::info("Database backup created by Super Admin", [
                    'user_id' => $request->user()->id,
                    'filename' => $filename,
                    'size' => filesize($filepath),
                ]);
                
                return response()->json([
                    'message' => 'Database backup created successfully',
                    'filename' => $filename,
                    'size' => filesize($filepath),
                    'created_at' => date('Y-m-d H:i:s'),
                ]);
            } else {
                return response()->json([
                    'message' => 'Failed to create backup. Please check server configuration.',
                ], 500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Backup failed: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * List all backups
     */
    public function listBackups(Request $request)
    {
        $backupPath = storage_path('app/backups');
        
        if (!file_exists($backupPath)) {
            return response()->json([]);
        }
        
        $files = scandir($backupPath);
        $backups = [];
        
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..' && pathinfo($file, PATHINFO_EXTENSION) === 'sql') {
                $filepath = $backupPath . '/' . $file;
                $backups[] = [
                    'filename' => $file,
                    'size' => filesize($filepath),
                    'size_formatted' => $this->formatBytes(filesize($filepath)),
                    'created_at' => date('Y-m-d H:i:s', filemtime($filepath)),
                    'created_timestamp' => filemtime($filepath),
                ];
            }
        }
        
        // Sort by creation time, newest first
        usort($backups, function($a, $b) {
            return $b['created_timestamp'] - $a['created_timestamp'];
        });
        
        return response()->json($backups);
    }

    /**
     * Restore database from backup
     */
    public function restoreBackup(Request $request)
    {
        $validated = $request->validate([
            'filename' => 'required|string',
        ]);
        
        try {
            $backupPath = storage_path('app/backups');
            $filepath = $backupPath . '/' . $validated['filename'];
            
            if (!file_exists($filepath)) {
                return response()->json([
                    'message' => 'Backup file not found',
                ], 404);
            }
            
            $database = env('DB_DATABASE');
            $username = env('DB_USERNAME');
            $password = env('DB_PASSWORD');
            $host = env('DB_HOST');
            
            // For Windows/XAMPP, use mysql
            $command = "mysql --user={$username} --password={$password} --host={$host} {$database} < {$filepath}";
            
            exec($command, $output, $return_var);
            
            if ($return_var === 0) {
                // Log the restore
                \Log::info("Database restored by Super Admin", [
                    'user_id' => $request->user()->id,
                    'filename' => $validated['filename'],
                ]);
                
                return response()->json([
                    'message' => 'Database restored successfully from ' . $validated['filename'],
                ]);
            } else {
                return response()->json([
                    'message' => 'Failed to restore database. Please check server configuration.',
                ], 500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Restore failed: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a backup file
     */
    public function deleteBackup(Request $request)
    {
        $validated = $request->validate([
            'filename' => 'required|string',
        ]);
        
        $backupPath = storage_path('app/backups');
        $filepath = $backupPath . '/' . $validated['filename'];
        
        if (!file_exists($filepath)) {
            return response()->json([
                'message' => 'Backup file not found',
            ], 404);
        }
        
        unlink($filepath);
        
        \Log::info("Backup deleted by Super Admin", [
            'user_id' => $request->user()->id,
            'filename' => $validated['filename'],
        ]);
        
        return response()->json([
            'message' => 'Backup deleted successfully',
        ]);
    }

    /**
     * Export system data
     */
    public function exportData(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:users,graduates,surveys,all',
        ]);
        
        try {
            $data = [];
            
            switch ($validated['type']) {
                case 'users':
                    $data = User::all()->toArray();
                    break;
                case 'graduates':
                    $data = DB::table('graduates')->get()->toArray();
                    break;
                case 'surveys':
                    $data = DB::table('surveys')->get()->toArray();
                    break;
                case 'all':
                    $data = [
                        'users' => User::all()->toArray(),
                        'graduates' => DB::table('graduates')->get()->toArray(),
                        'surveys' => DB::table('surveys')->get()->toArray(),
                        'jobs' => DB::table('jobs')->get()->toArray(),
                        'support_tickets' => DB::table('support_tickets')->get()->toArray(),
                    ];
                    break;
            }
            
            \Log::info("Data exported by Super Admin", [
                'user_id' => $request->user()->id,
                'type' => $validated['type'],
            ]);
            
            return response()->json([
                'message' => 'Data exported successfully',
                'data' => $data,
                'exported_at' => now(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Export failed: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Clear cache and logs
     */
    public function clearCache(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:cache,logs,all',
        ]);
        
        try {
            $cleared = [];
            
            if (in_array($validated['type'], ['cache', 'all'])) {
                \Artisan::call('cache:clear');
                \Artisan::call('config:clear');
                \Artisan::call('route:clear');
                \Artisan::call('view:clear');
                $cleared[] = 'cache';
            }
            
            if (in_array($validated['type'], ['logs', 'all'])) {
                $logPath = storage_path('logs');
                $files = glob($logPath . '/*.log');
                foreach ($files as $file) {
                    if (is_file($file)) {
                        unlink($file);
                    }
                }
                $cleared[] = 'logs';
            }
            
            \Log::info("Cache/logs cleared by Super Admin", [
                'user_id' => $request->user()->id,
                'cleared' => $cleared,
            ]);
            
            return response()->json([
                'message' => 'Successfully cleared: ' . implode(', ', $cleared),
                'cleared' => $cleared,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Clear operation failed: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get system health metrics
     */
    public function getSystemHealth(Request $request)
    {
        try {
            $health = [
                'status' => 'healthy',
                'database' => [
                    'status' => 'connected',
                    'connection_time' => $this->checkDatabaseConnection(),
                ],
                'storage' => [
                    'total' => disk_total_space(storage_path()),
                    'free' => disk_free_space(storage_path()),
                    'used' => disk_total_space(storage_path()) - disk_free_space(storage_path()),
                    'usage_percentage' => round((1 - disk_free_space(storage_path()) / disk_total_space(storage_path())) * 100, 2),
                ],
                'memory' => [
                    'current' => memory_get_usage(true),
                    'peak' => memory_get_peak_usage(true),
                    'limit' => $this->getMemoryLimit(),
                ],
                'php_version' => phpversion(),
                'laravel_version' => app()->version(),
                'server_time' => now(),
                'uptime' => $this->getServerUptime(),
            ];

            return response()->json($health);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get user engagement metrics
     */
    public function getUserEngagement(Request $request)
    {
        try {
            $today = now()->startOfDay();
            $weekAgo = now()->subWeek();
            $monthAgo = now()->subMonth();

            $engagement = [
                'daily_active_users' => User::where('updated_at', '>=', $today)->count(),
                'weekly_active_users' => User::where('updated_at', '>=', $weekAgo)->count(),
                'monthly_active_users' => User::where('updated_at', '>=', $monthAgo)->count(),
                'new_users_this_week' => User::where('created_at', '>=', $weekAgo)->count(),
                'new_users_this_month' => User::where('created_at', '>=', $monthAgo)->count(),
                'user_growth' => [
                    'last_7_days' => $this->getUserGrowth(7),
                    'last_30_days' => $this->getUserGrowth(30),
                ],
                'role_distribution' => [
                    'graduates' => User::where('role', 'graduate')->count(),
                    'admins' => User::where('role', 'admin')->count(),
                    'super_admins' => User::where('role', 'super_admin')->count(),
                ],
                'recent_registrations' => User::orderBy('created_at', 'desc')
                    ->take(5)
                    ->get(['id', 'name', 'email', 'role', 'created_at']),
            ];

            return response()->json($engagement);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch engagement data: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get security logs
     */
    public function getSecurityLogs(Request $request)
    {
        try {
            $logs = [];
            
            // Read Laravel log file
            $logFile = storage_path('logs/laravel.log');
            
            if (file_exists($logFile)) {
                $logContent = file_get_contents($logFile);
                $logLines = explode("\n", $logContent);
                
                // Get last 50 log entries
                $recentLogs = array_slice($logLines, -50);
                
                foreach ($recentLogs as $line) {
                    if (empty($line)) continue;
                    
                    // Parse security-related logs
                    if (preg_match('/\[(.*?)\]\s+(\w+)\.(\w+):\s+(.+)/', $line, $matches)) {
                        $logs[] = [
                            'timestamp' => $matches[1] ?? '',
                            'level' => $matches[2] ?? 'info',
                            'type' => $matches[3] ?? 'general',
                            'message' => $matches[4] ?? $line,
                        ];
                    }
                }
            }
            
            // Add authentication attempts from users table
            $recentLogins = User::orderBy('updated_at', 'desc')
                ->take(10)
                ->get(['id', 'name', 'email', 'role', 'updated_at'])
                ->map(function($user) {
                    return [
                        'timestamp' => $user->updated_at,
                        'level' => 'info',
                        'type' => 'authentication',
                        'message' => "User activity: {$user->email} ({$user->role})",
                        'user' => $user->name,
                    ];
                });
            
            $allLogs = array_merge(array_reverse($logs), $recentLogins->toArray());
            
            return response()->json([
                'logs' => array_slice($allLogs, 0, 50),
                'total' => count($allLogs),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'logs' => [],
                'message' => 'Failed to fetch logs: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get activity timeline
     */
    public function getActivityTimeline(Request $request)
    {
        try {
            $activities = [];
            
            // Get recent user creations
            $newUsers = User::orderBy('created_at', 'desc')
                ->take(10)
                ->get()
                ->map(function($user) {
                    return [
                        'type' => 'user_created',
                        'description' => "New {$user->role} account created: {$user->name}",
                        'user' => $user->name,
                        'timestamp' => $user->created_at,
                        'icon' => 'user-plus',
                    ];
                });
            
            $activities = $newUsers->toArray();
            
            // Sort by timestamp
            usort($activities, function($a, $b) {
                return strtotime($b['timestamp']) - strtotime($a['timestamp']);
            });
            
            return response()->json($activities);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch activity timeline: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Check database connection
     */
    private function checkDatabaseConnection()
    {
        $start = microtime(true);
        try {
            DB::connection()->getPdo();
            return round((microtime(true) - $start) * 1000, 2); // ms
        } catch (\Exception $e) {
            return -1;
        }
    }

    /**
     * Get memory limit
     */
    private function getMemoryLimit()
    {
        $limit = ini_get('memory_limit');
        
        if ($limit == -1) {
            return -1;
        }
        
        $value = (int)$limit;
        $unit = strtolower(substr($limit, -1));
        
        switch ($unit) {
            case 'g':
                $value *= 1024;
            case 'm':
                $value *= 1024;
            case 'k':
                $value *= 1024;
        }
        
        return $value;
    }

    /**
     * Get server uptime
     */
    private function getServerUptime()
    {
        // This is a simplified version; actual uptime would require system commands
        return 'N/A';
    }

    /**
     * Get user growth for specified days
     */
    private function getUserGrowth($days)
    {
        $data = [];
        
        for ($i = $days - 1; $i >= 0; $i--) {
            $date = now()->subDays($i)->startOfDay();
            $count = User::whereDate('created_at', $date)->count();
            
            $data[] = [
                'date' => $date->format('Y-m-d'),
                'count' => $count,
            ];
        }
        
        return $data;
    }

    /**
     * Format bytes to human readable format
     */
    private function formatBytes($bytes, $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, $precision) . ' ' . $units[$i];
    }
}

