<?php
/**
 * One-time migration script for Hostinger deployment
 * 
 * Upload this file to your public_html/api/ directory
 * Visit: https://yourdomain.com/api/migrate.php
 * 
 * ⚠️ DELETE THIS FILE AFTER RUNNING!
 */

// Load Laravel
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

echo "<h1>Running Migrations...</h1>";
echo "<pre>";

try {
    // Run migrations
    echo "\n🔄 Running database migrations...\n";
    $kernel->call('migrate', ['--force' => true]);
    echo "✅ Migrations completed!\n\n";
    
    // Run seeders
    echo "🔄 Running database seeders...\n";
    $kernel->call('db:seed', ['--force' => true]);
    echo "✅ Seeders completed!\n\n";
    
    // Create storage link
    echo "🔄 Creating storage link...\n";
    $kernel->call('storage:link');
    echo "✅ Storage link created!\n\n";
    
    // Clear and cache config
    echo "🔄 Optimizing application...\n";
    $kernel->call('config:cache');
    $kernel->call('route:cache');
    echo "✅ Optimization completed!\n\n";
    
    echo "========================================\n";
    echo "✅ ALL TASKS COMPLETED SUCCESSFULLY!\n";
    echo "========================================\n";
    echo "\n⚠️  IMPORTANT: DELETE THIS FILE NOW!\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "\nStack trace:\n";
    echo $e->getTraceAsString();
}

echo "</pre>";
echo "<br><br>";
echo "<p style='color: red; font-size: 18px; font-weight: bold;'>";
echo "⚠️ SECURITY WARNING: Delete this file immediately after running!";
echo "</p>";
?>
