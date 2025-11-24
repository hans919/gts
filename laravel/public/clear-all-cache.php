<?php
/**
 * Force Clear All Caches
 * DELETE AFTER USE!
 */

header('Content-Type: text/plain');

echo "=== AGGRESSIVE CACHE CLEARING ===\n\n";

// 1. Clear Laravel caches
$commands = ['cache:clear', 'config:clear', 'route:clear', 'view:clear', 'optimize:clear'];
foreach ($commands as $cmd) {
    echo "Running: php artisan $cmd\n";
    $output = shell_exec("cd " . dirname(__DIR__) . " && php artisan $cmd 2>&1");
    echo "$output\n";
}

// 2. Delete all cache files manually
$cachePaths = [
    __DIR__ . '/../bootstrap/cache',
    __DIR__ . '/../storage/framework/cache',
    __DIR__ . '/../storage/framework/views',
];

foreach ($cachePaths as $path) {
    if (is_dir($path)) {
        $files = glob($path . '/*');
        foreach ($files as $file) {
            if (is_file($file) && basename($file) !== '.gitignore') {
                unlink($file);
                echo "Deleted: $file\n";
            }
        }
    }
}

// 3. Clear OPcache
if (function_exists('opcache_reset')) {
    opcache_reset();
    echo "\n✅ OPcache reset\n";
}

// 4. Clear APCu cache
if (function_exists('apcu_clear_cache')) {
    apcu_clear_cache();
    echo "✅ APCu cache cleared\n";
}

echo "\n=== DONE ===\n";
echo "Now try logging in again.\n";
echo "\n⚠️ DELETE THIS FILE: " . __FILE__;
?>
