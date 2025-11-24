#!/bin/bash
# Deploy SuperAdmin Migration to Hostinger

echo "🚀 Deploying SuperAdmin Module to Hostinger..."

# Navigate to Laravel directory
cd /home/u439400789/domains/lightsteelblue-locust-816886.hostingersite.com/public_html

# Run migration
echo "📦 Running migration..."
php artisan migrate --force

# Run seeder
echo "👤 Creating SuperAdmin user..."
php artisan db:seed --class=SuperAdminSeeder --force

echo "✅ SuperAdmin deployment complete!"
echo ""
echo "SuperAdmin Credentials:"
echo "Email: superadmin@sjcb.edu.ph"
echo "Password: SuperAdmin@2025"
echo ""
echo "⚠️  IMPORTANT: Change the password immediately after first login!"
