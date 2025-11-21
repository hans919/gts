# Graduate Tracer System - Installation & Deployment Guide

## Quick Start Summary

This project consists of two main parts:
1. **Laravel Backend** (API) - Located in `/laravel`
2. **React Frontend** (UI) - Located in `/frontend`

## Prerequisites Installation

### 1. Install Node.js (Required for Frontend)
- Download from: https://nodejs.org/
- Recommended version: v18.x or higher
- Verify installation: `node --version` and `npm --version`

### 2. Install Composer (Required for Laravel)
- Download from: https://getcomposer.org/
- Verify installation: `composer --version`

### 3. Install PHP 8.2+
- For Windows: Install via XAMPP or download from php.net
- Verify installation: `php --version`

## Backend Setup (Laravel)

```powershell
# Navigate to Laravel directory
cd c:\xampp\htdocs\gts\laravel

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env file
# Either use MySQL or SQLite

# For SQLite (easier for development):
# DB_CONNECTION=sqlite
# DB_DATABASE=c:/xampp/htdocs/gts/laravel/database/database.sqlite

# Create SQLite database file
New-Item -Path "database\database.sqlite" -ItemType File -Force

# Run migrations
php artisan migrate

# Install Laravel Sanctum (for API authentication)
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate

# Start development server
php artisan serve
```

Backend will run at: **http://localhost:8000**

## Frontend Setup (React + TypeScript)

```powershell
# Navigate to project root
cd c:\xampp\htdocs\gts

# Create React app with Vite (if not created)
npm create vite@latest frontend -- --template react-ts

# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Install additional packages
npm install react-router-dom axios @tanstack/react-query react-hook-form @hookform/resolvers zod lucide-react recharts date-fns class-variance-authority clsx tailwind-merge

# Install Radix UI components
npm install @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tabs @radix-ui/react-toast

# Install dev dependencies
npm install -D @types/node tailwindcss postcss autoprefixer tailwindcss-animate

# Initialize Tailwind CSS
npx tailwindcss init -p

# Setup ShadcnUI
npx shadcn-ui@latest init

# Install ShadcnUI components
npx shadcn-ui@latest add button card input label table dialog dropdown-menu form select textarea toast tabs badge avatar separator checkbox radio-group alert

# Start development server
npm run dev
```

Frontend will run at: **http://localhost:5173**

## Quick Test Commands

### Test Backend API
```powershell
# Test API health
curl http://localhost:8000/api/user

# Test registration
curl -X POST http://localhost:8000/api/register -H "Content-Type: application/json" -d '{\"name\":\"Admin User\",\"email\":\"admin@example.com\",\"password\":\"password123\",\"password_confirmation\":\"password123\",\"role\":\"admin\"}'
```

### Create Default Admin User (Optional)
Create a seeder or use Laravel Tinker:
```powershell
php artisan tinker
```

Then run:
```php
\App\Models\User::create(['name' => 'Admin', 'email' => 'admin@test.com', 'password' => bcrypt('password123'), 'role' => 'admin']);
```

## Project Structure Overview

```
gts/
├── laravel/                    # Backend API
│   ├── app/
│   │   ├── Http/Controllers/  # API Controllers
│   │   └── Models/            # Database Models
│   ├── database/
│   │   └── migrations/        # Database migrations
│   ├── routes/
│   │   └── api.php           # API routes
│   └── .env                   # Backend config
│
├── frontend/                  # Frontend React App
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main app component
│   ├── package.json
│   └── .env                  # Frontend config
│
├── README.md                 # Main documentation
└── FRONTEND_SETUP.md        # Frontend setup guide
```

## Common Issues & Solutions

### Issue: "npm: command not found"
**Solution**: Install Node.js from nodejs.org

### Issue: "composer: command not found"
**Solution**: Install Composer from getcomposer.org

### Issue: "SQLSTATE[HY000] [1049] Unknown database"
**Solution**: Create the database or use SQLite:
```powershell
# For MySQL
mysql -u root -p
CREATE DATABASE graduate_tracer;

# For SQLite (easier)
New-Item -Path "database\database.sqlite" -ItemType File
```

### Issue: "419 CSRF token mismatch"
**Solution**: Add to Laravel `.env`:
```
SESSION_DRIVER=cookie
SANCTUM_STATEFUL_DOMAINS=localhost:5173
```

### Issue: "CORS policy" error
**Solution**: Update `config/cors.php` in Laravel:
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:5173'],
'supports_credentials' => true,
```

## Next Steps After Installation

1. **Configure CORS** in Laravel (`config/cors.php`)
2. **Create sample data** using seeders or manually
3. **Test authentication** flow
4. **Build frontend components** following the structure
5. **Test API endpoints** with the frontend

## Running Both Servers Simultaneously

Open two terminal windows:

**Terminal 1 - Backend:**
```powershell
cd c:\xampp\htdocs\gts\laravel
php artisan serve
```

**Terminal 2 - Frontend:**
```powershell
cd c:\xampp\htdocs\gts\frontend
npm run dev
```

## Production Deployment

### Backend (Laravel)
```bash
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Frontend (React)
```bash
npm run build
# Deploy the 'dist' folder to your web server
```

## Support & Documentation

- Laravel: https://laravel.com/docs
- React: https://react.dev
- ShadcnUI: https://ui.shadcn.com
- TanStack Query: https://tanstack.com/query/latest

## Database Schema Reference

See `README.md` for complete database schema details.

## API Endpoints Reference

See `README.md` for complete API endpoints documentation.
