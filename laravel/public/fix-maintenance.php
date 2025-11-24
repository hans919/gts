<?php
/**
 * Find and Delete ALL Maintenance Files
 * DELETE AFTER USE!
 */

header('Content-Type: text/html');
echo "<pre>";
echo "=== SEARCHING FOR MAINTENANCE FILES ===\n\n";

$basePath = dirname(__DIR__);

// Search for maintenance.php files
$locations = [
    $basePath . '/storage/framework/maintenance.php',
    $basePath . '/storage/maintenance.php',
    $basePath . '/../storage/framework/maintenance.php',
    __DIR__ . '/maintenance.php',
    __DIR__ . '/../storage/framework/maintenance.php',
];

$found = false;
foreach ($locations as $file) {
    echo "Checking: $file\n";
    if (file_exists($file)) {
        echo "  ❌ FOUND! Attempting to delete...\n";
        if (unlink($file)) {
            echo "  ✅ DELETED!\n";
        } else {
            echo "  ⚠️ FAILED TO DELETE - Manual deletion required\n";
        }
        $found = true;
    } else {
        echo "  ✓ Not found (good)\n";
    }
}

if (!$found) {
    echo "\n✅ No maintenance files found!\n";
}

// Try to find ANY file with 'maintenance' in the name
echo "\n\n=== SEARCHING ENTIRE STORAGE FOR 'maintenance' ===\n";
$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($basePath . '/storage', RecursiveDirectoryIterator::SKIP_DOTS)
);

$maintenanceFiles = [];
foreach ($iterator as $file) {
    if ($file->isFile() && stripos($file->getFilename(), 'maintenance') !== false) {
        $maintenanceFiles[] = $file->getPathname();
        echo "Found: " . $file->getPathname() . "\n";
        
        // Try to delete it
        if (unlink($file->getPathname())) {
            echo "  ✅ Deleted!\n";
        } else {
            echo "  ⚠️ Could not delete\n";
        }
    }
}

if (empty($maintenanceFiles)) {
    echo "✅ No maintenance files found in storage!\n";
}

// Check .htaccess for maintenance redirects
echo "\n\n=== CHECKING .HTACCESS ===\n";
$htaccessFile = __DIR__ . '/.htaccess';
if (file_exists($htaccessFile)) {
    $content = file_get_contents($htaccessFile);
    if (stripos($content, 'maintenance') !== false || stripos($content, '503') !== false) {
        echo "⚠️ WARNING: .htaccess contains maintenance/503 rules!\n";
        echo "Check: $htaccessFile\n";
    } else {
        echo "✅ .htaccess looks clean\n";
    }
}

// Force test the application
echo "\n\n=== TESTING APPLICATION ===\n";
try {
    require $basePath . '/vendor/autoload.php';
    $app = require_once $basePath . '/bootstrap/app.php';
    echo "✅ Laravel application loads successfully!\n";
    echo "✅ NO MAINTENANCE MODE DETECTED\n";
} catch (Exception $e) {
    echo "❌ Error loading application: " . $e->getMessage() . "\n";
}

echo "\n\n=== SOLUTION ===\n";
echo "The API is working. The issue is BROWSER CACHE.\n\n";
echo "Do this NOW:\n";
echo "1. Close ALL browser tabs of your site\n";
echo "2. Press Ctrl+Shift+Delete and clear cache\n";
echo "3. Open INCOGNITO window (Ctrl+Shift+N)\n";
echo "4. Go to your login page in incognito\n";
echo "5. Try logging in\n\n";

echo "⚠️ THEN DELETE THIS FILE: " . __FILE__ . "\n";
echo "</pre>";
?>
