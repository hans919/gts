<?php
// Check Admin User Script
// Visit this file to verify admin exists, then DELETE IT!

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(
    Illuminate\Http\Request::capture()
);

use App\Models\User;

echo "<h2>Checking Database Connection...</h2>";

try {
    // Test database connection
    $users = User::count();
    echo "<p style='color: green;'>✓ Database connected!</p>";
    echo "<p>Total users: " . $users . "</p>";
    
    echo "<hr>";
    echo "<h2>Checking Admin User...</h2>";
    
    // Check if admin exists
    $admin = User::where('email', 'admin@sjcb.edu.ph')->first();
    
    if ($admin) {
        echo "<p style='color: green;'>✓ Admin user exists!</p>";
        echo "<p>Name: " . $admin->name . "</p>";
        echo "<p>Email: " . $admin->email . "</p>";
        echo "<p>Role: " . ($admin->role ?? 'not set') . "</p>";
    } else {
        echo "<p style='color: red;'>✗ Admin user NOT found!</p>";
        echo "<p>Creating admin user now...</p>";
        
        // Create admin
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@sjcb.edu.ph',
            'password' => bcrypt('admin123'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);
        
        echo "<p style='color: green;'>✓ Admin user created!</p>";
        echo "<p>Email: admin@sjcb.edu.ph</p>";
        echo "<p>Password: admin123</p>";
    }
    
    echo "<hr>";
    echo "<h2>All Users in Database:</h2>";
    $allUsers = User::all(['name', 'email', 'role']);
    echo "<table border='1' cellpadding='10'>";
    echo "<tr><th>Name</th><th>Email</th><th>Role</th></tr>";
    foreach ($allUsers as $user) {
        echo "<tr>";
        echo "<td>" . $user->name . "</td>";
        echo "<td>" . $user->email . "</td>";
        echo "<td>" . ($user->role ?? 'none') . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    
    echo "<hr>";
    echo "<h3 style='color: red;'>⚠️ SECURITY WARNING: Delete this file immediately!</h3>";
    echo "<p>Delete: /public_html/api/check-admin.php</p>";
    
} catch (Exception $e) {
    echo "<p style='color: red;'>✗ Error: " . $e->getMessage() . "</p>";
    echo "<p>Check your .env database credentials!</p>";
}
