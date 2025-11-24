<?php
/**
 * Emergency Maintenance Mode Disabler
 * Access this file via: https://your-domain.com/api/disable-maintenance.php
 * DELETE THIS FILE AFTER USE!
 */

// Security: Change this to a random secret
define('SECRET_KEY', 'disable-maintenance-now-' . date('Ymd'));

// Check secret parameter
if (!isset($_GET['secret']) || $_GET['secret'] !== SECRET_KEY) {
    die('Access Denied. Use: ?secret=' . SECRET_KEY);
}

// Path to maintenance file
$maintenanceFile = __DIR__ . '/../storage/framework/maintenance.php';

// Delete maintenance file if it exists
if (file_exists($maintenanceFile)) {
    if (unlink($maintenanceFile)) {
        echo "✅ SUCCESS: Maintenance mode disabled!<br>";
        echo "Maintenance file deleted: $maintenanceFile<br><br>";
    } else {
        echo "❌ ERROR: Could not delete maintenance file.<br>";
        echo "Please delete manually: $maintenanceFile<br><br>";
    }
} else {
    echo "ℹ️ INFO: No maintenance file found.<br>";
    echo "System is already online.<br><br>";
}

// Clear OPcache if enabled
if (function_exists('opcache_reset')) {
    opcache_reset();
    echo "✅ OPcache cleared<br>";
}

// Clear file cache
$cacheFiles = [
    __DIR__ . '/../bootstrap/cache/config.php',
    __DIR__ . '/../bootstrap/cache/routes.php',
    __DIR__ . '/../bootstrap/cache/events.php',
    __DIR__ . '/../bootstrap/cache/packages.php',
    __DIR__ . '/../bootstrap/cache/services.php',
];

foreach ($cacheFiles as $file) {
    if (file_exists($file)) {
        unlink($file);
        echo "✅ Deleted cache file: " . basename($file) . "<br>";
    }
}

echo "<br><hr><br>";
echo "<strong>Your site should now be accessible!</strong><br>";
echo "<strong style='color: red;'>⚠️ IMPORTANT: Delete this file now for security!</strong><br>";
echo "<code>Delete: " . __FILE__ . "</code>";
?>
