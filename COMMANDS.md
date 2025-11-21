# Common Commands Reference

## Laravel Backend Commands

### Development
```powershell
# Start development server
php artisan serve

# Start on specific port
php artisan serve --port=8080

# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Fresh migration (WARNING: deletes all data)
php artisan migrate:fresh

# Run seeders
php artisan db:seed

# Fresh migration with seeders
php artisan migrate:fresh --seed
```

### Database
```powershell
# Create new migration
php artisan make:migration create_table_name

# Create model with migration
php artisan make:model ModelName -m

# Create model with migration, controller, and seeder
php artisan make:model ModelName -mcrs

# Database tinker (interactive console)
php artisan tinker
```

### Controllers & Resources
```powershell
# Create controller
php artisan make:controller ControllerName

# Create API resource controller
php artisan make:controller ControllerName --api

# Create resource
php artisan make:resource ResourceName
```

### Cache & Optimization
```powershell
# Clear application cache
php artisan cache:clear

# Clear config cache
php artisan config:clear

# Clear route cache
php artisan route:clear

# Clear view cache
php artisan view:clear

# Optimize for production
php artisan optimize

# Cache config (production)
php artisan config:cache

# Cache routes (production)
php artisan route:cache
```

### Laravel Sanctum
```powershell
# Install Sanctum
composer require laravel/sanctum

# Publish Sanctum config
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Run Sanctum migrations
php artisan migrate
```

### Other Useful Commands
```powershell
# List all routes
php artisan route:list

# Create seeder
php artisan make:seeder SeederName

# Create factory
php artisan make:factory FactoryName

# Run tests
php artisan test

# Generate app key
php artisan key:generate
```

## React Frontend Commands

### Development
```powershell
# Start development server
npm run dev

# Start on specific port
npm run dev -- --port 3000

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Package Management
```powershell
# Install all dependencies
npm install

# Install specific package
npm install package-name

# Install dev dependency
npm install --save-dev package-name

# Uninstall package
npm uninstall package-name

# Update packages
npm update

# Check outdated packages
npm outdated

# Clean install (removes node_modules first)
Remove-Item -Recurse -Force node_modules
npm install
```

### ShadcnUI Commands
```powershell
# Initialize ShadcnUI
npx shadcn-ui@latest init

# Add component
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input

# Add multiple components
npx shadcn-ui@latest add button card input label table
```

### TypeScript
```powershell
# Type check
npx tsc --noEmit

# Watch mode for type checking
npx tsc --noEmit --watch
```

## Git Commands

### Basic Operations
```powershell
# Initialize repository
git init

# Check status
git status

# Add files
git add .
git add filename

# Commit changes
git commit -m "Commit message"

# Push to remote
git push origin main

# Pull from remote
git pull origin main

# Clone repository
git clone repository-url
```

### Branches
```powershell
# Create new branch
git checkout -b branch-name

# Switch branch
git checkout branch-name

# List branches
git branch

# Delete branch
git branch -d branch-name

# Merge branch
git merge branch-name
```

## Database Commands

### MySQL
```powershell
# Connect to MySQL
mysql -u root -p

# Create database
CREATE DATABASE graduate_tracer;

# Show databases
SHOW DATABASES;

# Use database
USE graduate_tracer;

# Show tables
SHOW TABLES;

# Exit
exit;
```

### SQLite
```powershell
# Create database file
New-Item -Path "database.sqlite" -ItemType File

# Connect to SQLite database
sqlite3 database.sqlite

# Show tables
.tables

# Show schema
.schema

# Exit
.quit
```

## Composer Commands

```powershell
# Install dependencies
composer install

# Install for production (no dev dependencies)
composer install --no-dev

# Update dependencies
composer update

# Add package
composer require package/name

# Add dev package
composer require --dev package/name

# Remove package
composer remove package/name

# Dump autoload
composer dump-autoload

# Show installed packages
composer show

# Check for outdated packages
composer outdated
```

## Windows PowerShell Utilities

### File Operations
```powershell
# Create file
New-Item -Path "filename.txt" -ItemType File

# Create directory
New-Item -Path "dirname" -ItemType Directory

# Copy file
Copy-Item "source.txt" "destination.txt"

# Move file
Move-Item "source.txt" "destination.txt"

# Delete file
Remove-Item "filename.txt"

# Delete directory recursively
Remove-Item -Recurse -Force "dirname"
```

### Navigation
```powershell
# Change directory
cd path\to\directory

# Go to parent directory
cd ..

# List files
ls
dir
Get-ChildItem

# Show current directory
pwd
```

### Process Management
```powershell
# Find process by port
netstat -ano | findstr :8000

# Kill process by PID
taskkill /PID process_id /F

# Stop all node processes
taskkill /F /IM node.exe
```

## Quick Setup Commands

### First Time Setup
```powershell
# Run the automated setup script
.\setup.ps1

# Or manually:
cd c:\xampp\htdocs\gts\laravel
composer install
php artisan key:generate
php artisan migrate
php artisan serve

# In new terminal:
cd c:\xampp\htdocs\gts\frontend
npm install
npm run dev
```

### Daily Development
```powershell
# Terminal 1 - Backend
cd c:\xampp\htdocs\gts\laravel
php artisan serve

# Terminal 2 - Frontend
cd c:\xampp\htdocs\gts\frontend
npm run dev
```

### Reset Everything
```powershell
# Reset Laravel
cd c:\xampp\htdocs\gts\laravel
php artisan migrate:fresh
php artisan cache:clear

# Reset Frontend
cd c:\xampp\htdocs\gts\frontend
Remove-Item -Recurse -Force node_modules
npm install
```

## Testing API with cURL

```powershell
# Register user
curl -X POST http://localhost:8000/api/register `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Admin\",\"email\":\"admin@test.com\",\"password\":\"password\",\"password_confirmation\":\"password\",\"role\":\"admin\"}'

# Login
curl -X POST http://localhost:8000/api/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"admin@test.com\",\"password\":\"password\"}'

# Get graduates (replace TOKEN with actual token)
curl -X GET http://localhost:8000/api/graduates `
  -H "Authorization: Bearer TOKEN"
```

## Environment Variables

### Laravel (.env)
```env
APP_NAME="Graduate Tracer System"
APP_URL=http://localhost:8000
DB_CONNECTION=sqlite
DB_DATABASE=c:/xampp/htdocs/gts/laravel/database/database.sqlite
SANCTUM_STATEFUL_DOMAINS=localhost:5173
```

### React (.env)
```env
VITE_API_URL=http://localhost:8000/api
```

## Troubleshooting Commands

### Clear all caches
```powershell
cd c:\xampp\htdocs\gts\laravel
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
composer dump-autoload
```

### Fix permission issues (Windows)
```powershell
# Give write permissions to storage and bootstrap/cache
icacls "storage" /grant Users:F /t
icacls "bootstrap\cache" /grant Users:F /t
```

### Check PHP modules
```powershell
php -m
```

### Check Laravel version
```powershell
php artisan --version
```

### Check Node/npm versions
```powershell
node --version
npm --version
```

## Production Build

### Backend
```powershell
cd c:\xampp\htdocs\gts\laravel
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
```

### Frontend
```powershell
cd c:\xampp\htdocs\gts\frontend
npm run build
# Deploy 'dist' folder to web server
```
