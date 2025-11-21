# 🚀 Deployment Guide - Netlify + Hostinger

Complete guide to deploy the SJCB Graduate Tracer System with Netlify (frontend) and Hostinger (backend).

---

## 📋 Prerequisites

### Accounts Needed
- ✅ [Netlify Account](https://app.netlify.com/signup) (Free tier)
- ✅ [Hostinger Account](https://www.hostinger.com/) (Free/Shared hosting)
- ✅ [GitHub Account](https://github.com/) (for code repository)

### Tools Required
- ✅ Git installed locally
- ✅ FileZilla or FTP client
- ✅ Access to Hostinger cPanel

---

## 🎯 Deployment Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Application                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Frontend (React)          Backend (Laravel)                 │
│  ↓                         ↓                                 │
│  Netlify                   Hostinger                         │
│  - Static files            - PHP/MySQL                       │
│  - Auto deploy             - cPanel                          │
│  - Free SSL                - Free domain                     │
│  - CDN                     - Database                        │
│                                                               │
│  https://yourapp.netlify.app → https://yourdomain.com/api   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Part 1: Backend Deployment (Hostinger)

### Step 1: Prepare Laravel for Production

#### 1.1 Update Environment Variables

Edit `laravel/.env` for production:

```env
APP_NAME="SJCB Graduate Tracer System"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Database (Hostinger provides these)
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

# CORS - Allow Netlify domain
SANCTUM_STATEFUL_DOMAINS=yourapp.netlify.app
SESSION_DOMAIN=yourdomain.com
```

#### 1.2 Update CORS Configuration

Edit `laravel/config/cors.php`:

```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'https://yourapp.netlify.app', // Your Netlify URL
        'http://localhost:5173', // Local development
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

#### 1.3 Optimize Laravel

Run these commands locally:

```bash
cd laravel

# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Install production dependencies
composer install --optimize-autoloader --no-dev
```

### Step 2: Upload to Hostinger via cPanel

#### 2.1 Access cPanel
1. Log in to Hostinger
2. Go to **Hosting** → **Manage**
3. Click **cPanel**

#### 2.2 Create Database
1. In cPanel, go to **MySQL Databases**
2. Create new database (e.g., `u123456_gts`)
3. Create new user with strong password
4. Add user to database with **ALL PRIVILEGES**
5. Save credentials for `.env` file

#### 2.3 Upload Files via File Manager

**Option A: Using cPanel File Manager**

1. Go to **File Manager** in cPanel
2. Navigate to `public_html`
3. Upload your Laravel files:
   - Create folder `api` inside `public_html`
   - Upload all Laravel files to `public_html/api/`
   - **Important**: Upload `public/` contents to `public_html/api/` (not in a subfolder)

**File Structure on Hostinger:**
```
public_html/
└── api/
    ├── app/
    ├── bootstrap/
    ├── config/
    ├── database/
    ├── routes/
    ├── storage/
    ├── vendor/
    ├── .env
    ├── artisan
    ├── composer.json
    ├── index.php (from public folder)
    ├── .htaccess (from public folder)
    └── robots.txt
```

**Option B: Using FTP (FileZilla)**

1. Get FTP credentials from Hostinger cPanel
2. Connect via FileZilla
3. Upload files to `public_html/api/`

#### 2.4 Configure .htaccess for Laravel

Create/update `public_html/api/.htaccess`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Redirect to index.php
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>

# Prevent directory listing
Options -Indexes

# Set PHP version (if needed)
<IfModule mod_php8.c>
    php_value upload_max_filesize 10M
    php_value post_max_size 10M
    php_value max_execution_time 300
</IfModule>
```

#### 2.5 Update .env on Server

1. In File Manager, navigate to `public_html/api/`
2. Right-click `.env` → Edit
3. Update with Hostinger database credentials
4. Change `APP_ENV=production` and `APP_DEBUG=false`
5. Update `APP_URL` to your domain

#### 2.6 Set Permissions

In cPanel File Manager, set these permissions:
- `storage/` folder: **755** (recursive)
- `bootstrap/cache/` folder: **755** (recursive)

Or via Terminal (if available):
```bash
chmod -R 755 storage
chmod -R 755 bootstrap/cache
```

#### 2.7 Run Migrations

**Option A: Using Terminal (if available)**
```bash
cd public_html/api
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
```

**Option B: Using PHP Script**

Create `public_html/api/migrate.php`:

```php
<?php
// Run this once, then delete this file!
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->call('migrate', ['--force' => true]);
$kernel->call('db:seed', ['--force' => true]);
$kernel->call('storage:link');
echo "Migration completed!";
```

Visit: `https://yourdomain.com/api/migrate.php`
**Delete this file after use!**

#### 2.8 Test Backend API

Visit: `https://yourdomain.com/api/`

You should see a JSON response or Laravel welcome page.

Test API endpoint: `https://yourdomain.com/api/login`

---

## 🌐 Part 2: Frontend Deployment (Netlify)

### Step 1: Prepare React for Production

#### 1.1 Update Environment Variables

Create `frontend/.env.production`:

```env
VITE_API_URL=https://yourdomain.com/api
```

#### 1.2 Update API Base URL

Edit `frontend/src/services/api.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

export default api;
```

Update all `axios` calls in your components to use the production URL:

```typescript
// Replace hardcoded URLs like:
axios.get('http://127.0.0.1:8000/api/graduates')

// With:
axios.get(`${import.meta.env.VITE_API_URL}/graduates`)
```

#### 1.3 Build for Production

```bash
cd frontend
npm install
npm run build
```

This creates a `dist/` folder with optimized files.

### Step 2: Deploy to Netlify

#### Method 1: Deploy via Netlify UI (Recommended)

1. **Push to GitHub**
   ```bash
   cd c:\xampp\htdocs\gts
   git add .
   git commit -m "Prepare for production deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Click **Add new site** → **Import an existing project**
   - Choose **GitHub** and authorize
   - Select your `gts` repository

3. **Configure Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
   - **Environment variables**:
     - Key: `VITE_API_URL`
     - Value: `https://yourdomain.com/api`

4. **Deploy**
   - Click **Deploy site**
   - Wait for build to complete (2-3 minutes)
   - Your site will be live at `https://random-name.netlify.app`

5. **Custom Domain (Optional)**
   - Go to **Site settings** → **Domain management**
   - Click **Add custom domain**
   - Follow instructions to configure DNS

#### Method 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Navigate to frontend folder
cd frontend

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist

# Follow prompts and confirm deployment
```

### Step 3: Configure Netlify Settings

#### 3.1 Create netlify.toml

Create `frontend/netlify.toml`:

```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

#### 3.2 Configure Redirects

Create `frontend/public/_redirects`:

```
/*    /index.html   200
```

This ensures React Router works correctly.

---

## 🔒 Part 3: Security & SSL Configuration

### Backend (Hostinger)

1. **Enable SSL Certificate**
   - In cPanel → **SSL/TLS Status**
   - Enable **AutoSSL** for your domain
   - Wait 5-10 minutes for activation

2. **Force HTTPS**

Update `public_html/api/.htaccess`:

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Rest of Laravel rules...
```

### Frontend (Netlify)

- SSL is automatic on Netlify
- Free Let's Encrypt certificate
- Auto-renewal

---

## 🧪 Part 4: Testing Your Deployment

### Test Backend API

```bash
# Test health check
curl https://yourdomain.com/api

# Test login endpoint
curl -X POST https://yourdomain.com/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}'
```

### Test Frontend

1. Visit: `https://yourapp.netlify.app`
2. Try to login with admin credentials
3. Check browser console for errors
4. Test all features:
   - Login/Logout
   - Graduate management
   - Survey creation
   - Notifications
   - Profile upload

### Common Issues & Solutions

#### CORS Errors

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
1. Check `laravel/config/cors.php` includes your Netlify URL
2. Verify `SANCTUM_STATEFUL_DOMAINS` in `.env`
3. Clear Laravel cache: `php artisan config:cache`

#### 404 Errors on Refresh

**Error**: Page not found when refreshing on non-root routes

**Solution**:
- Ensure `_redirects` file exists in `frontend/public/`
- Verify `netlify.toml` has redirect rules

#### Database Connection Failed

**Error**: `SQLSTATE[HY000] [1045] Access denied`

**Solution**:
1. Check database credentials in `.env`
2. Verify user has correct privileges in cPanel
3. Check DB host (usually `localhost` on Hostinger)

#### 500 Internal Server Error

**Solution**:
1. Enable debug temporarily: `APP_DEBUG=true`
2. Check Laravel logs: `storage/logs/laravel.log`
3. Verify file permissions (755 for folders, 644 for files)
4. Check `.htaccess` exists in root

#### Storage/Public Files Not Accessible

**Solution**:
```bash
# Create symlink
php artisan storage:link

# Or manually create link in cPanel File Manager
```

---

## 🔄 Part 5: Continuous Deployment

### Auto-Deploy on Git Push (Netlify)

Netlify automatically rebuilds when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Netlify automatically detects and deploys
```

### Update Backend (Hostinger)

**Option 1: Manual FTP Upload**
1. Make changes locally
2. Upload changed files via FTP

**Option 2: Git Deployment (Advanced)**
1. Set up Git in cPanel
2. Add remote: `git remote add production ssh://user@host/path`
3. Push: `git push production main`

---

## 📊 Part 6: Monitoring & Maintenance

### Netlify Monitoring

- View build logs: **Site → Deploys**
- Check analytics: **Site → Analytics**
- Monitor errors: **Site → Logs**

### Hostinger Monitoring

- Check error logs: **cPanel → Errors**
- Monitor bandwidth: **cPanel → Metrics**
- Database size: **cPanel → MySQL Databases**

### Regular Maintenance

#### Weekly Tasks
- [ ] Check error logs
- [ ] Monitor disk space
- [ ] Review analytics

#### Monthly Tasks
- [ ] Update Laravel dependencies
- [ ] Update npm packages
- [ ] Database backup
- [ ] Security audit

#### Backup Strategy

**Backend (Hostinger)**:
```bash
# Database backup (via cPanel)
# 1. Go to phpMyAdmin
# 2. Select database → Export → Go

# Files backup
# Download via FTP or cPanel Backup feature
```

**Frontend (Netlify)**:
- Automatically backed up in Git
- Download from Netlify: **Site → Deploys → [Version] → Download**

---

## 📝 Part 7: Environment Variables Checklist

### Backend (.env)

```env
✅ APP_ENV=production
✅ APP_DEBUG=false
✅ APP_URL=https://yourdomain.com
✅ DB_* (all database credentials)
✅ SANCTUM_STATEFUL_DOMAINS=yourapp.netlify.app
✅ SESSION_DOMAIN=yourdomain.com
```

### Frontend (.env.production)

```env
✅ VITE_API_URL=https://yourdomain.com/api
```

---

## 🎉 Part 8: Post-Deployment

### Update README with Live URLs

```markdown
## 🌐 Live Demo

- **Frontend**: https://yourapp.netlify.app
- **Backend API**: https://yourdomain.com/api
- **Admin Login**: admin@test.com / password123
```

### Share with Team

- Send URLs to stakeholders
- Update documentation
- Create user guides

### Monitor First 24 Hours

- Check for errors
- Monitor performance
- Gather user feedback

---

## 🆘 Support & Resources

### Documentation
- [Netlify Docs](https://docs.netlify.com/)
- [Hostinger Tutorials](https://www.hostinger.com/tutorials/)
- [Laravel Deployment](https://laravel.com/docs/deployment)

### Community Support
- [Netlify Community](https://answers.netlify.com/)
- [Laravel Forum](https://laracasts.com/discuss)
- [Stack Overflow](https://stackoverflow.com/)

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Backend tested locally
- [ ] Frontend tested locally
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] CORS configured correctly
- [ ] Code pushed to GitHub

### Backend Deployment
- [ ] Files uploaded to Hostinger
- [ ] Database created and configured
- [ ] .env file updated
- [ ] Migrations run
- [ ] Storage symlink created
- [ ] SSL certificate enabled
- [ ] API endpoints tested

### Frontend Deployment
- [ ] Build successful
- [ ] Deployed to Netlify
- [ ] Environment variables set
- [ ] Redirects configured
- [ ] SSL enabled
- [ ] All routes working

### Post-Deployment
- [ ] Full application tested
- [ ] CORS working correctly
- [ ] Login/authentication working
- [ ] File uploads working
- [ ] Notifications working
- [ ] Mobile responsive
- [ ] Performance optimized

---

## 🎯 Success Criteria

Your deployment is successful when:
- ✅ Frontend loads at Netlify URL
- ✅ Backend API responds at Hostinger URL
- ✅ Admin can login
- ✅ Graduates can login
- ✅ CRUD operations work
- ✅ File uploads work
- ✅ Notifications appear
- ✅ No CORS errors
- ✅ SSL certificates active
- ✅ Mobile responsive

---

**Congratulations! Your SJCB Graduate Tracer System is now live! 🎊**

For additional help, refer to the troubleshooting section or contact support.
