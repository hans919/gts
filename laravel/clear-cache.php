<?php
// Clear Configuration Cache
// Visit this file once to clear cache, then DELETE IT!

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

echo "<h2>Clearing Configuration Cache...</h2>";

try {
    // Clear config cache
    $configPath = __DIR__.'/bootstrap/cache/config.php';
    if (file_exists($configPath)) {
        unlink($configPath);
        echo "<p style='color: green;'>✓ Config cache cleared!</p>";
    } else {
        echo "<p style='color: orange;'>⚠ No config cache found (already clear)</p>";
    }
    
    // Clear route cache
    $routePath = __DIR__.'/bootstrap/cache/routes-v7.php';
    if (file_exists($routePath)) {
        unlink($routePath);
        echo "<p style='color: green;'>✓ Route cache cleared!</p>";
    } else {
        echo "<p style='color: orange;'>⚠ No route cache found (already clear)</p>";
    }
    
    echo "<hr>";
    echo "<h3>✓ Cache cleared successfully!</h3>";
    echo "<p>CORS settings should now be active.</p>";
    echo "<hr>";
    echo "<h3 style='color: red;'>⚠️ SECURITY WARNING: Delete this file immediately!</h3>";
    echo "<p>Delete: /public_html/api/clear-cache.php</p>";
    
} catch (Exception $e) {
    echo "<p style='color: red;'>✗ Error: " . $e->getMessage() . "</p>";
}
