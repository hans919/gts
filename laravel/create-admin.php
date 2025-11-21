<?php
// Create Admin User Script
// Visit this file once to create admin user, then DELETE IT!

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(
    Illuminate\Http\Request::capture()
);

use App\Models\User;

echo "<h2>Creating Admin User...</h2>";

try {
    // Check if admin exists
    $existing = User::where('email', 'admin@sjcb.edu.ph')->first();
    
    if ($existing) {
        echo "<p style='color: green;'>✓ Admin user already exists!</p>";
        echo "<p>Email: admin@sjcb.edu.ph</p>";
    } else {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@sjcb.edu.ph',
            'password' => bcrypt('admin123'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);
        
        echo "<p style='color: green;'>✓ Admin user created successfully!</p>";
        echo "<p>Email: admin@sjcb.edu.ph</p>";
        echo "<p>Password: admin123</p>";
    }
    
    echo "<hr>";
    echo "<h3 style='color: red;'>⚠️ SECURITY WARNING: Delete this file immediately after running!</h3>";
    echo "<p>Delete: /public_html/api/create-admin.php</p>";
    
} catch (Exception $e) {
    echo "<p style='color: red;'>✗ Error: " . $e->getMessage() . "</p>";
}
