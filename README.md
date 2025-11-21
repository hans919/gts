# 🎓 Graduate Tracer System

A comprehensive web-based system for tracking and managing graduate information, employment status, and survey responses. Built with Laravel 11 and React 18 with authentic ShadCN UI design.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Laravel](https://img.shields.io/badge/Laravel-11-red.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#%EF%B8%8F-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Design System](#-design-system)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Graduate Management
- ✅ Add, edit, and delete graduate records
- ✅ Comprehensive graduate profiles (personal, academic, contact info)
- ✅ Advanced search and filtering
- ✅ Status tracking (employed, unemployed, further studies)
- ✅ Export capabilities

### 📊 Analytics Dashboard
- ✅ Real-time statistics
- ✅ Employment status visualization (pie charts)
- ✅ Salary distribution analysis (bar charts)
- ✅ Program-wise graduate distribution
- ✅ Interactive data visualizations with Recharts

### 📝 Survey System
- ✅ Create custom surveys with multiple question types
- ✅ Dynamic question builder
- ✅ Survey status management (draft, active, closed)
- ✅ Response tracking and analysis
- ✅ Survey templates

### 📈 Reports
- ✅ Employment reports
- ✅ Graduate statistics
- ✅ Survey analysis
- ✅ Export to PDF, Excel, CSV

### 🔐 Authentication & Security
- ✅ Secure login with Laravel Sanctum
- ✅ Role-based access control
- ✅ Token-based API authentication
- ✅ Protected routes

### 🎨 Modern UI/UX
- ✅ Authentic ShadCN UI design system
- ✅ Responsive layout (mobile, tablet, desktop)
- ✅ Dark mode support
- ✅ Professional typography (Inter font)
- ✅ Smooth animations and transitions
- ✅ Accessible components

---

## 🛠 Tech Stack

### Backend
- **Framework**: Laravel 11
- **Database**: SQLite (development) / MySQL (production)
- **Authentication**: Laravel Sanctum
- **API**: RESTful API
- **PHP Version**: 8.2+

### Frontend
- **Framework**: React 18
- **Language**: TypeScript 5.2
- **Build Tool**: Vite 5.0
- **UI Library**: ShadCN UI
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Routing**: React Router v6

---

## 📸 Screenshots

### Dashboard
*Real-time statistics and overview with authentic ShadCN UI*

### Graduate Management
*Comprehensive graduate listing with search, filters, and data table*

### Survey Builder
*Dynamic survey creation with multiple question types*

### Analytics
*Interactive charts and data visualization with Recharts*

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **PHP**: >= 8.2
- **Composer**: Latest version
- **Node.js**: >= 18.x
- **npm**: >= 9.x (or yarn/pnpm)
- **XAMPP/WAMP** (recommended for Windows) or **LAMP** (for Linux)
- **Git**: For version control

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/graduate-tracer-system.git
cd graduate-tracer-system
```

### 2. Backend Setup (Laravel)

```bash
# Navigate to Laravel directory
cd laravel

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Create SQLite database (or configure MySQL in .env)
touch database/database.sqlite

# Run migrations
php artisan migrate

# Seed database with sample data (optional)
php artisan db:seed

# Start Laravel development server
php artisan serve
```

The backend API will be available at: **http://127.0.0.1:8000**

### 3. Frontend Setup (React)

```bash
# Navigate to frontend directory
cd ../frontend

# Install Node dependencies
npm install

# Start Vite development server
npm run dev
```

The frontend will be available at: **http://localhost:5173**

---

## ⚙️ Configuration

### Backend Configuration

Edit `laravel/.env`:

```env
APP_NAME="Graduate Tracer System"
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

# Database Configuration (SQLite)
DB_CONNECTION=sqlite
# DB_DATABASE=/absolute/path/to/database.sqlite

# Or use MySQL
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=graduate_tracer
# DB_USERNAME=root
# DB_PASSWORD=

# Sanctum Configuration
SANCTUM_STATEFUL_DOMAINS=localhost:5173
SESSION_DOMAIN=localhost
```

### Frontend Configuration

Create `frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

---

## 👥 Usage

### Default Credentials

After seeding the database, use these credentials to log in:

**Admin Account:**
- Email: `admin@test.com`
- Password: `password123`

**Graduate Account:**
- Email: `graduate@test.com`
- Password: `password123`

### Common Tasks

#### Add a Graduate
1. Navigate to **Graduates** → **Add Graduate**
2. Fill in personal information (Student ID, Name, Email)
3. Fill in academic information (Program, Major, Degree Level, Graduation Year)
4. Add address information (optional)
5. Click **Add Graduate**

#### Create a Survey
1. Navigate to **Surveys** → **Create Survey**
2. Enter survey title and description
3. Add questions using the **Add Question** button
4. Configure question types (text, multiple choice, rating scale)
5. Set survey status (draft/active/closed)
6. Click **Create Survey**

#### View Analytics
1. Navigate to **Analytics** from the sidebar
2. View real-time statistics cards (Total Graduates, Employed, etc.)
3. Interact with pie and bar charts for detailed insights
4. Filter data by program, graduation year, etc.

#### Generate Reports
1. Navigate to **Reports**
2. Select report type (Employment, Graduate Stats, Survey Analysis)
3. Choose export format (PDF, Excel, CSV)
4. Click download button

---

## 📚 API Documentation

### Base URL
```
http://127.0.0.1:8000/api
```

### Authentication

#### Login
```http
POST /api/login
Content-Type: application/json

Request Body:
{
  "email": "admin@test.com",
  "password": "password123"
}

Response (200 OK):
{
  "token": "1|abc123...",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@test.com",
    "role": "admin"
  }
}
```

#### Logout
```http
POST /api/logout
Authorization: Bearer {token}

Response (200 OK):
{
  "message": "Logged out successfully"
}
```

### Graduates

#### List Graduates (with pagination and search)
```http
GET /api/graduates?page=1&search=john
Authorization: Bearer {token}

Response (200 OK):
{
  "data": [
    {
      "id": 1,
      "student_id": "2024-001",
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "program": "BS Computer Science",
      "graduation_year": 2024
    }
  ],
  "current_page": 1,
  "total": 50
}
```

#### Get Single Graduate
```http
GET /api/graduates/{id}
Authorization: Bearer {token}
```

#### Create Graduate
```http
POST /api/graduates
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "user_id": 1,
  "student_id": "2024-001",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "program": "Bachelor of Science in Computer Science",
  "major": "Software Engineering",
  "degree_level": "Bachelor",
  "graduation_year": 2024,
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "postal_code": "10001",
  "country": "USA"
}

Response (201 Created):
{
  "id": 1,
  "student_id": "2024-001",
  ...
}
```

#### Update Graduate
```http
PUT /api/graduates/{id}
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "first_name": "Jane",
  "email": "jane.doe@example.com"
}
```

#### Delete Graduate
```http
DELETE /api/graduates/{id}
Authorization: Bearer {token}

Response (200 OK):
{
  "message": "Graduate deleted successfully"
}
```

### Surveys

#### List Surveys
```http
GET /api/surveys
Authorization: Bearer {token}
```

#### Create Survey
```http
POST /api/surveys
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "title": "Employment Survey 2024",
  "description": "Annual graduate employment survey",
  "status": "active",
  "questions": [
    {
      "question_text": "Are you currently employed?",
      "question_type": "multiple_choice",
      "options": ["Yes", "No"],
      "required": true
    }
  ]
}
```

### Analytics

#### Dashboard Stats
```http
GET /api/analytics/dashboard
Authorization: Bearer {token}

Response (200 OK):
{
  "total_graduates": 150,
  "employed_count": 120,
  "unemployed_count": 30,
  "employment_rate": 80,
  "average_salary": 50000
}
```

---

## 📁 Project Structure

```
graduate-tracer-system/
├── laravel/                          # Backend (Laravel 11)
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       ├── AuthController.php
│   │   │       ├── GraduateController.php
│   │   │       ├── SurveyController.php
│   │   │       └── AnalyticsController.php
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── Graduate.php
│   │   │   ├── Survey.php
│   │   │   └── Employment.php
│   │   └── Providers/
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   └── database.sqlite
│   ├── routes/
│   │   ├── api.php              # API routes
│   │   └── web.php
│   ├── config/
│   ├── .env
│   └── composer.json
│
├── frontend/                         # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # ShadCN UI components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   └── ...
│   │   │   └── layout/
│   │   │       ├── MainLayout.tsx
│   │   │       └── Sidebar.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx        # Main dashboard
│   │   │   ├── Login.tsx            # Login page
│   │   │   ├── Analytics.tsx        # Charts & stats
│   │   │   ├── Reports.tsx          # Reports page
│   │   │   ├── Settings.tsx         # Settings
│   │   │   ├── graduates/
│   │   │   │   ├── GraduateList.tsx
│   │   │   │   ├── AddGraduate.tsx  # Separate add form
│   │   │   │   └── GraduateForm.tsx # Edit form
│   │   │   └── surveys/
│   │   │       ├── SurveyList.tsx
│   │   │       └── SurveyForm.tsx
│   │   ├── services/
│   │   │   └── api.ts           # Axios configuration
│   │   ├── lib/
│   │   │   └── utils.ts         # Utility functions
│   │   ├── App.tsx              # Main app component
│   │   ├── main.tsx             # Entry point
│   │   ├── index.css            # Global styles
│   │   └── vite-env.d.ts        # Vite type definitions
│   ├── public/
│   ├── .vscode/
│   │   └── settings.json        # VS Code settings
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── .env
│
├── docs/                             # Documentation
│   ├── PROBLEMS_FIXED.md
│   ├── VALIDATION_FIX.md
│   ├── LOGIN_UI_UPDATE.md
│   ├── GRADUATE_FORMS_SEPARATED.md
│   ├── SHADCN_AUTHENTIC_GUIDE.md
│   └── COMPLETE_IMPLEMENTATION.md
│
└── README.md                         # This file
```

---

## 🎨 Design System

### ShadCN UI Components Used
The project uses authentic ShadCN UI components with consistent design patterns:

- **Button** - Primary, outline, ghost, destructive variants
- **Card** - Container with header, content, footer sections
- **Input** - Text inputs with proper focus states
- **Label** - Form labels with proper association
- **Badge** - Status indicators with variants
- **Textarea** - Multi-line text input
- **Select** - Dropdown selections

### Typography System
```tsx
// Page Title
<h2 className="text-3xl font-bold tracking-tight">

// Card Title
<CardTitle className="text-sm font-medium">

// Large Values
<div className="text-2xl font-bold">

// Descriptions
<p className="text-muted-foreground">

// Helper Text
<p className="text-[0.8rem] text-muted-foreground">
```

### Layout Patterns

#### Page Container
```tsx
<div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
  <h2 className="text-3xl font-bold tracking-tight">Page Title</h2>
  <p className="text-muted-foreground">Description</p>
  {/* Content */}
</div>
```

#### Stat Card
```tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Label</CardTitle>
    <Icon className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">Value</div>
    <p className="text-xs text-muted-foreground">Change</p>
  </CardContent>
</Card>
```

#### Data Table
```tsx
<div className="rounded-md border">
  <table className="w-full caption-bottom text-sm">
    <thead className="[&_tr]:border-b">
      <tr className="border-b transition-colors hover:bg-muted/50">
        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          Column
        </th>
      </tr>
    </thead>
  </table>
</div>
```

### Color Scheme
All colors use CSS variables for theme support:
- `bg-background` - Main background
- `bg-primary` - Primary actions
- `text-foreground` - Main text
- `text-muted-foreground` - Secondary text
- `border-input` - Input borders
- `bg-destructive` - Error states

---

## 🔧 Development

### Backend Development

```bash
# Run migrations
php artisan migrate

# Refresh database with seeders
php artisan migrate:fresh --seed

# Create new controller
php artisan make:controller ExampleController

# Create new model with migration
php artisan make:model Example -m

# Create new seeder
php artisan make:seeder ExampleSeeder

# Run specific seeder
php artisan db:seed --class=ExampleSeeder

# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Frontend Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npx tsc --noEmit
```

### Adding New ShadCN Components

```bash
# Navigate to frontend directory
cd frontend

# Add a new component
npx shadcn-ui@latest add [component-name]

# Example: Add dialog component
npx shadcn-ui@latest add dialog
```

---

## 📦 Building for Production

### Backend Optimization

```bash
cd laravel

# Set environment to production
# Edit .env:
# APP_ENV=production
# APP_DEBUG=false

# Optimize configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Optimize autoloader
composer install --optimize-autoloader --no-dev
```

### Frontend Build

```bash
cd frontend

# Build for production
npm run build

# Output will be in frontend/dist/
```

### Deployment Checklist

#### Backend
- [ ] Set `APP_ENV=production` in `.env`
- [ ] Set `APP_DEBUG=false` in `.env`
- [ ] Update `APP_URL` to production URL
- [ ] Configure production database (MySQL recommended)
- [ ] Update `SANCTUM_STATEFUL_DOMAINS` for production domain
- [ ] Run migrations: `php artisan migrate --force`
- [ ] Run optimizations: `php artisan optimize`
- [ ] Set proper file permissions (755 for directories, 644 for files)
- [ ] Secure `.env` file (should not be web accessible)

#### Frontend
- [ ] Update `VITE_API_URL` to production API URL
- [ ] Build assets: `npm run build`
- [ ] Upload `dist/` contents to web server
- [ ] Configure web server (Apache/Nginx)
- [ ] Enable HTTPS
- [ ] Set up CDN (optional)

#### Server Configuration
- [ ] PHP 8.2+ installed
- [ ] Composer installed
- [ ] Required PHP extensions enabled
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Automated backups configured
- [ ] Monitoring setup

---

## 🧪 Testing

### Backend Tests
```bash
cd laravel

# Run all tests
php artisan test

# Run specific test
php artisan test --filter=GraduateControllerTest

# Run with coverage
php artisan test --coverage
```

### Frontend Tests
```bash
cd frontend

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style Guidelines

- **PHP**: Follow PSR-12 coding standard
- **TypeScript**: Use ESLint and Prettier
- **React**: Use functional components with hooks
- **Commits**: Use conventional commit messages

### Commit Message Format
```
type(scope): subject

body (optional)

footer (optional)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(graduates): add export to CSV functionality

- Added CSV export button
- Implemented data formatting
- Added download functionality

Closes #123
```

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/hans919)
- Email: delossantoshanschristian@sjcbi.edu.ph

---

## 🙏 Acknowledgments

- [Laravel](https://laravel.com/) - The PHP Framework for Web Artisans
- [React](https://react.dev/) - The library for web and native user interfaces
- [ShadCN UI](https://ui.shadcn.com/) - Beautifully designed components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [Recharts](https://recharts.org/) - Composable charting library
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

---

## 📞 Support

For support and questions:
- 📧 Email: delossantoshanschristian@sjcbi.edu.ph
- 🐛 Issues: [GitHub Issues](https://github.com/hans919/graduate-tracer-system/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/hans919/graduate-tracer-system/discussions)

---

## 🔄 Changelog

### Version 1.0.0 (November 21, 2025)
- ✨ Initial release
- ✅ Complete graduate management system
- ✅ Survey builder with dynamic questions
- ✅ Analytics dashboard with interactive charts
- ✅ Report generation (PDF, Excel, CSV)
- ✅ Authentic ShadCN UI design system
- ✅ Fully responsive layout
- ✅ RESTful API with Laravel Sanctum
- ✅ TypeScript for type safety
- ✅ Comprehensive documentation

---

## 🗺️ Roadmap

### Version 1.1.0
- [ ] Email notifications for surveys
- [ ] Advanced analytics with custom date ranges
- [ ] Bulk import from Excel/CSV
- [ ] Graduate profile pictures
- [ ] Enhanced search with filters

### Version 1.2.0
- [ ] Mobile app (React Native)
- [ ] Multi-language support (i18n)
- [ ] Advanced reporting with custom queries
- [ ] Integration with LinkedIn API
- [ ] Real-time updates with WebSockets

### Version 2.0.0
- [ ] Advanced user roles and permissions
- [ ] Audit logging and activity tracking
- [ ] Alumni networking features
- [ ] Job board integration
- [ ] Event management system

---

## 📚 Additional Documentation

- [API Documentation](docs/API.md)
- [Database Schema](docs/DATABASE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [ShadCN UI Guide](docs/SHADCN_AUTHENTIC_GUIDE.md)
- [Validation Fix Guide](docs/VALIDATION_FIX.md)
- [Problems Fixed](docs/PROBLEMS_FIXED.md)
- [Login UI Update](docs/LOGIN_UI_UPDATE.md)
- [Graduate Forms Separated](docs/GRADUATE_FORMS_SEPARATED.md)

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ and ☕**

[Report Bug](https://github.com/hans919/graduate-tracer-system/issues) · 
[Request Feature](https://github.com/hans919/graduate-tracer-system/issues) · 
[Documentation](docs/)

</div>
