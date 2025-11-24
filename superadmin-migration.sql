-- SuperAdmin Migration SQL
-- Run this in Hostinger phpMyAdmin

-- 1. Add super_admin role to users table
ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'graduate', 'super_admin') DEFAULT 'graduate';

-- 2. Create SuperAdmin user
INSERT INTO users (name, email, password, role, email_verified_at, created_at, updated_at)
VALUES (
    'Super Administrator',
    'superadmin@sjcb.edu.ph',
    '$2y$10$Lq6mcduDqFA0Povf52vI8OnETkP2RNAl0wOr8u1YqKi1DSCqZto7m', -- Password: SuperAdmin@2025
    'super_admin',
    NOW(),
    NOW(),
    NOW()
)
ON DUPLICATE KEY UPDATE
    name = 'Super Administrator',
    password = '$2y$10$Lq6mcduDqFA0Povf52vI8OnETkP2RNAl0wOr8u1YqKi1DSCqZto7m',
    role = 'super_admin',
    email_verified_at = NOW(),
    updated_at = NOW();

-- 3. Add migration record (optional, to track migration)
INSERT INTO migrations (migration, batch) VALUES ('2025_11_24_111836_add_superadmin_role', 1);

-- ✅ Done! SuperAdmin user created
-- Email: superadmin@sjcb.edu.ph
-- Password: SuperAdmin@2025
-- ⚠️ CHANGE THIS PASSWORD IMMEDIATELY AFTER FIRST LOGIN!
