# 🚀 Hostinger Deployment Guide
## SJCB Graduate Tracer System Backend

**Your Configuration:**
- Frontend: https://sjcbgts.netlify.app
- Backend: https://lightsteelblue-locust-816886.hostingersite.com

---

## 📋 Step 1: Create MySQL Database in Hostinger

1. **Log in to Hostinger cPanel**
   - Go to: https://hpanel.hostinger.com
   - Login with your credentials

2. **Create MySQL Database**
   - In hPanel, go to **"Databases"** → **"MySQL Databases"**
   - Click **"Create new database"**
   - Database name: `gts_production` (or any name you prefer)
   - Click **"Create"**

3. **Create Database User**
   - Click **"Create new user"**
   - Username: `gts_user` (or any name you prefer)
   - Password: **Generate a strong password** (save it!)
   - Click **"Create"**

4. **Assign User to Database**
   - In "Add user to database" section
   - Select your user: `gts_user`
   - Select your database: `gts_production`
   - Click **"Add"**
   - Grant **"All privileges"**
   - Click **"Save"**

5. **Save These Credentials** (You'll need them in Step 3):
   ```
   DB_HOST=localhost
   DB_DATABASE=u123456789_gts_production  (with hosting prefix)
   DB_USERNAME=u123456789_gts_user        (with hosting prefix)
   DB_PASSWORD=your_generated_password
   ```

---

## 📦 Step 2: Prepare Laravel Files for Upload

### 2.1 Generate Application Key

Run this command in your local terminal:

```powershell
cd c:\xampp\htdocs\gts\laravel
php artisan key:generate --show
```

**Copy the output** (it looks like: `base64:xxxxxxxxxxxxx`)
You'll need this for the `.env` file.

### 2.2 Clear All Caches Locally

```powershell
cd c:\xampp\htdocs\gts\laravel
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

---

## 🌐 Step 3: Upload Files to Hostinger

### Option A: Using File Manager (Recommended for beginners)

1. **Access File Manager**
   - In hPanel, go to **"Files"** → **"File Manager"**
   - Navigate to `public_html`

2. **Create API Folder**
   - Click **"+ New Folder"**
   - Name it: `api`
   - Enter the `api` folder

3. **Upload Laravel Files**
   - Click **"Upload"**
   - Select ALL files from `c:\xampp\htdocs\gts\laravel\`
   - Upload and wait for completion
   
   **Important:** Upload the entire Laravel folder structure including:
   - ✅ app/
   - ✅ bootstrap/
   - ✅ config/
   - ✅ database/
   - ✅ public/
   - ✅ resources/
   - ✅ routes/
   - ✅ storage/
   - ✅ vendor/ (if exists, otherwise we'll install via composer)
   - ✅ .htaccess
   - ✅ artisan
   - ✅ composer.json
   - ✅ migrate.php

4. **Set Correct Public Directory**
   - Go back to hPanel
   - Go to **"Website"** → **"Advanced"** → **"PHP Configuration"**
   - Or go to **"Website Settings"**
   - Change document root from `public_html` to `public_html/api/public`
   - Save changes

### Option B: Using FTP (Alternative)

1. **Get FTP Credentials**
   - In hPanel, go to **"Files"** → **"FTP Accounts"**
   - Note your FTP credentials

2. **Connect with FileZilla**
   - Host: Your Hostinger FTP host
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21
   
3. **Upload Files**
   - Local site: `c:\xampp\htdocs\gts\laravel`
   - Remote site: `/public_html/api/`
   - Upload all files

---

## ⚙️ Step 4: Configure Environment File

### 4.1 Edit .env File

1. **In File Manager**, navigate to `/public_html/api/`
2. Find `.env.production` file
3. Right-click → **"Edit"**
4. Update these values:

```env
APP_KEY=base64:xxxxx  (paste the key from Step 2.1)

# Database credentials from Step 1
DB_HOST=localhost
DB_DATABASE=u123456789_gts_production
DB_USERNAME=u123456789_gts_user
DB_PASSWORD=your_database_password

# Make sure these are correct
APP_URL=https://lightsteelblue-locust-816886.hostingersite.com
SANCTUM_STATEFUL_DOMAINS=sjcbgts.netlify.app
```

5. **Save** the file
6. **Rename** `.env.production` to `.env`

---

## 🔧 Step 5: Run Migrations

### 5.1 Using the Migration Script

1. **Open your browser**
2. **Go to:** `https://lightsteelblue-locust-816886.hostingersite.com/api/migrate.php`
3. You should see success messages:
   ```
   ✓ Running migrations...
   ✓ Seeding database...
   ✓ Creating storage link...
   ✓ Caching configuration...
   ✓ Caching routes...
   
   Setup completed successfully!
   ```

4. **IMPORTANT:** Delete the migrate.php file after running:
   - Go back to File Manager
   - Find `/public_html/api/migrate.php`
   - Right-click → **"Delete"**

### 5.2 Alternative: Using Terminal (if available)

If Hostinger provides SSH access:

```bash
cd public_html/api
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
```

---

## 🔐 Step 6: Set Permissions

In File Manager, set these folder permissions:

1. **storage/** folder and all subfolders: `755`
2. **bootstrap/cache/** folder: `755`

To change permissions:
- Right-click folder → **"Permissions"** or **"Change Permissions"**
- Set to `755` (Read, Write, Execute for owner)

---

## ✅ Step 7: Test the API

### 7.1 Test Basic Connection

Open browser and visit:
```
https://lightsteelblue-locust-816886.hostingersite.com/api/
```

You should see a response (not an error page).

### 7.2 Test API Endpoints

Try these URLs:

1. **Health Check:**
   ```
   https://lightsteelblue-locust-816886.hostingersite.com/api/health
   ```
   Expected: `{"status":"ok"}`

2. **Test Database:**
   ```
   https://lightsteelblue-locust-816886.hostingersite.com/api/test
   ```

---

## 🌐 Step 8: Enable SSL Certificate

1. **In hPanel**, go to **"Website"** → **"SSL"**
2. Make sure SSL is **enabled** for your domain
3. Wait 5-10 minutes for certificate activation

---

## 🎯 Step 9: Update Netlify to Trigger Rebuild

Since we configured the environment variable, trigger a new build:

1. Go to: https://app.netlify.com/sites/sjcbgts/deploys
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for build to complete

---

## 🧪 Step 10: Final Testing

### 10.1 Test Login

1. Open your Netlify site: https://sjcbgts.netlify.app
2. Try to login with admin credentials:
   - Email: `admin@sjcb.edu.ph`
   - Password: `admin123`

### 10.2 Check Browser Console

- Press `F12` to open Developer Tools
- Go to **"Console"** tab
- Look for any errors

### 10.3 Check Network Tab

- In Developer Tools, go to **"Network"** tab
- Try to login
- Check if API calls are going to: `https://lightsteelblue-locust-816886.hostingersite.com/api/`

---

## 🐛 Troubleshooting

### Issue: "500 Internal Server Error"

**Solutions:**
1. Check `.env` file exists and has correct values
2. Check `APP_KEY` is set
3. Check database credentials are correct
4. Check file permissions (storage and bootstrap/cache)
5. Check error logs in File Manager: `/storage/logs/laravel.log`

### Issue: "CORS Error" in Browser Console

**Solutions:**
1. Make sure `config/cors.php` includes your Netlify domain
2. Clear Laravel cache:
   - Delete all files in `/bootstrap/cache/` (keep the folder)
   - Visit: `https://lightsteelblue-locust-816886.hostingersite.com/api/migrate.php` again

### Issue: "Database Connection Failed"

**Solutions:**
1. Double-check database credentials in `.env`
2. Make sure database user has all privileges
3. Make sure you're using the correct database prefix (e.g., `u123456789_`)

### Issue: "migrate.php not working"

**Solutions:**
1. Check PHP version in hPanel (should be PHP 8.1+)
2. Make sure `vendor/` folder was uploaded
3. If vendor missing, use SSH to run: `composer install --no-dev`

### Issue: Images/Files not uploading

**Solutions:**
1. Check `storage/app/public/` folder exists
2. Run `php artisan storage:link` via SSH or migrate.php
3. Check folder permissions are 755

---

## 📝 Important Notes

1. **Security:**
   - Never commit `.env` file to Git
   - Use strong database passwords
   - Keep `APP_DEBUG=false` in production
   - Delete `migrate.php` after first run

2. **Backups:**
   - Hostinger provides automatic backups
   - Export database regularly from phpMyAdmin
   - Keep a copy of your `.env` file locally

3. **Updates:**
   - To update code: Upload new files via FTP/File Manager
   - After updates: Clear cache (delete bootstrap/cache/*.php)
   - Run migrations if database changed

---

## ✅ Deployment Checklist

- [ ] Created MySQL database in Hostinger
- [ ] Uploaded all Laravel files to `/public_html/api/`
- [ ] Set document root to `/public_html/api/public`
- [ ] Configured `.env` file with correct values
- [ ] Generated and set APP_KEY
- [ ] Ran migrations via migrate.php
- [ ] Deleted migrate.php file
- [ ] Set correct folder permissions (755)
- [ ] Enabled SSL certificate
- [ ] Tested API endpoints
- [ ] Updated Netlify environment variable
- [ ] Triggered new Netlify deploy
- [ ] Tested login on live site

---

## 🎉 Success!

If everything works:
- ✅ Frontend: https://sjcbgts.netlify.app
- ✅ Backend: https://lightsteelblue-locust-816886.hostingersite.com/api
- ✅ Database: Connected and working
- ✅ CORS: Configured properly
- ✅ SSL: Enabled on both domains

**Your SJCB Graduate Tracer System is now LIVE!** 🚀

---

## 📞 Need Help?

Check the main `DEPLOYMENT_GUIDE.md` for more detailed troubleshooting.
