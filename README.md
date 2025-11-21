# 🎓 SJCB Graduate Tracer System

A comprehensive web-based system for tracking and managing graduate information, employment status, and survey responses with dual-portal architecture. Built with Laravel 11 and React 18 with authentic ShadCN UI design.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Laravel](https://img.shields.io/badge/Laravel-11-red.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)

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

### 🎯 Admin Portal
- ✅ **Graduate Management**: Add, edit, delete graduate records with comprehensive profiles
- ✅ **Dynamic Survey System**: Create custom surveys with multiple question types (text, textarea, radio, checkbox, select)
- ✅ **Real-time Analytics**: Interactive dashboard with charts showing graduate statistics
- ✅ **Resource Management**: Jobs, career services, training programs, and support tickets
- ✅ **Survey Response Viewer**: View and analyze graduate survey submissions
- ✅ **Notification System**: Auto-create notifications when posting jobs, surveys, and resources

### 👨‍🎓 Graduate Self-Service Portal
- ✅ **Profile Management**: Edit personal, academic, and address information
- ✅ **Profile Photo Upload**: Upload and manage profile pictures (2MB max, JPG/PNG/GIF)
- ✅ **Change Password**: Secure password change functionality
- ✅ **Employment Survey**: Submit and update employment status
- ✅ **Career Updates**: Log job changes and career progression
- ✅ **Survey History**: View completed surveys (employment + admin-created)
- ✅ **Take Surveys**: Respond to admin-created surveys with dynamic question types
- ✅ **Real-time Notifications**: Auto-refresh notification bell (10-second polling)
- ✅ **Alumni Resources**: Browse jobs, career services, and training programs
- ✅ **Support & Feedback**: Submit support tickets directly from portal
- ✅ **Privacy Settings**: Manage data privacy and account preferences

### 📊 Analytics & Reporting
- ✅ Real-time dashboard statistics (total graduates, active surveys, employment rate)
- ✅ Bar chart: Graduates by graduation year (using Recharts)
- ✅ Pie chart: Employment status distribution with color coding
- ✅ Recent graduates display with avatars
- ✅ Export capabilities for reports

### 🔐 Authentication & Security
- ✅ Unified login system (admin + graduate roles)
- ✅ Laravel Sanctum token-based authentication
- ✅ Role-based access control (RBAC)
- ✅ Protected API routes
- ✅ Secure password hashing
- ✅ Token expiration and refresh

### 🔔 Real-time Notification System
- ✅ Auto-create notifications when admin posts surveys, jobs, services, training
- ✅ Notification bell icon with unread count badge
- ✅ Dropdown modal with notification list
- ✅ Auto-refresh every 10 seconds (no manual refresh needed)
- ✅ Mark as read and delete functionality
- ✅ Color-coded notification types (survey: blue, job: purple, event: green)
- ✅ Timestamp display
- ✅ Click outside to close

### 🎨 Modern UI/UX
- ✅ Authentic ShadCN UI design system
- ✅ Custom green header (#457507) for both admin and graduate portals
- ✅ Responsive layout (mobile, tablet, desktop)
- ✅ Professional typography (Inter font)
- ✅ Smooth animations and transitions
- ✅ Accessible components
- ✅ Gradient backgrounds and modern card designs

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
- Access: Full system access including graduate management, surveys, analytics, and resources

**Graduate Account:**
- Register via `/register` or use seeded account
- Email: `graduate@test.com`
- Password: `password123`
- Access: Self-service portal with profile management, surveys, and resources

### Common Tasks

#### Admin Portal

**Add a Graduate**
1. Navigate to **Graduates** → **Add Graduate**
2. Fill in personal information (Student ID, Name, Email, Phone)
3. Fill in academic information (Program, Major, Degree Level, Graduation Year)
4. Add address information (Street, City, State, Country, Postal Code)
5. Click **Add Graduate**

**Create a Dynamic Survey**
1. Navigate to **Surveys** → **Create Survey**
2. Enter survey title and description
3. Add questions using the **Add Question** button
4. Configure question types:
   - **Text**: Short answer
   - **Textarea**: Long answer
   - **Radio**: Single choice (add options, press Enter for multiple)
   - **Checkbox**: Multiple choice
   - **Select**: Dropdown selection
5. Set survey status (draft/active/closed)
6. Optionally target specific graduation years or programs
7. Click **Create Survey**
8. Notifications automatically sent to graduates when status is "active"

**View Survey Responses**
1. Navigate to **Surveys**
2. Click **View Responses** on any survey
3. See statistics: Total responses, questions count, completion rate
4. View individual graduate responses with their names and emails
5. Export data using the Export button

**Manage Resources**
1. Navigate to **Jobs**, **Career Services**, or **Support Tickets**
2. Click **Add New** to create resources
3. Notifications automatically sent to all graduates
4. Edit or delete resources as needed

**View Analytics**
1. Navigate to **Dashboard** from the sidebar
2. View statistics: Total Graduates, Active Surveys, Employment Rate, Survey Responses
3. Interact with bar chart (graduates by year) and pie chart (employment status)
4. View recent graduates with their programs and graduation years

#### Graduate Portal

**Update Profile**
1. Log in to graduate portal at `/graduate/dashboard`
2. Click profile dropdown → **Edit Profile**
3. Edit personal, academic, or address information
4. Click **Save Changes**

**Upload Profile Photo**
1. Click profile dropdown → **Settings**
2. Click camera icon or **Upload Photo** button
3. Select image (max 2MB, JPG/PNG/GIF)
4. Click **Upload Photo**
5. Photo appears in header after page reload

**Change Password**
1. Click profile dropdown → **Settings**
2. Scroll to **Change Password** section
3. Enter current password
4. Enter new password (min 8 characters)
5. Confirm new password
6. Click **Change Password**

**Take a Survey**
1. Click notification bell icon or navigate to **Survey History**
2. Click **Take Survey** on active surveys
3. Answer all required questions
4. Click **Submit Survey**

**Submit Career Update**
1. Navigate to **Career Updates** from quick actions
2. Fill in job information (title, company, status, salary)
3. Click **Submit**

**Access Alumni Resources**
1. Navigate to **Alumni Resources**
2. Browse available jobs, career services, and training programs
3. Bookmark jobs for later reference

**Submit Support Ticket**
1. Navigate to **Support & Feedback**
2. Select priority level
3. Enter subject and description
4. Click **Submit Ticket**

**View Notifications**
1. Check notification bell icon (red badge shows unread count)
2. Click bell to open dropdown modal
3. Notifications auto-refresh every 10 seconds
4. Click **Mark as Read** or **Delete** on individual notifications

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

#### Create Survey with Dynamic Questions
```http
POST /api/surveys
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "title": "Graduate Feedback Survey 2024",
  "description": "Annual graduate feedback survey",
  "status": "active",
  "target_graduation_year": 2024,
  "target_program": "BS Computer Science",
  "questions": [
    {
      "question_text": "Are you currently employed?",
      "question_type": "radio",
      "options": ["Yes", "No"],
      "required": true
    },
    {
      "question_text": "What is your current job title?",
      "question_type": "text",
      "required": false
    },
    {
      "question_text": "Rate your satisfaction with the program",
      "question_type": "select",
      "options": ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"],
      "required": true
    }
  ]
}

Response (201 Created):
{
  "id": 1,
  "title": "Graduate Feedback Survey 2024",
  "status": "active",
  "created_at": "2025-11-21T12:00:00Z"
}
```

#### Get Survey Responses
```http
GET /api/surveys/{id}/responses
Authorization: Bearer {token}

Response (200 OK):
{
  "survey": {
    "id": 1,
    "title": "Graduate Feedback Survey 2024"
  },
  "responses": [
    {
      "id": 1,
      "graduate_id": 5,
      "graduate_name": "John Doe",
      "graduate_email": "john@example.com",
      "submitted_at": "2025-11-21T14:30:00Z",
      "answers": [
        {
          "question": "Are you currently employed?",
          "answer": "Yes"
        }
      ]
    }
  ]
}
```

#### Submit Survey Response (Graduate Portal)
```http
POST /api/graduate/submit-survey-response
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "survey_id": 1,
  "responses": [
    {
      "question_id": 1,
      "answer": "Yes"
    },
    {
      "question_id": 2,
      "answer": "Software Engineer"
    }
  ]
}
```

### Graduate Portal Endpoints

#### Get Profile
```http
GET /api/graduate/profile
Authorization: Bearer {token}

Response (200 OK):
{
  "id": 2,
  "student_id": "2024-001",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "profile_photo": "profile-photos/xyz.jpg",
  ...
}
```

#### Update Profile
```http
PUT /api/graduate/profile
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "phone": "+1234567890",
  "address": "123 New St",
  "city": "New York"
}
```

#### Upload Profile Photo
```http
POST /api/graduate/profile-photo
Authorization: Bearer {token}
Content-Type: multipart/form-data

Request Body:
profile_photo: [file]

Response (200 OK):
{
  "message": "Profile photo uploaded successfully",
  "profile_photo": "profile-photos/abc123.jpg"
}
```

#### Change Password
```http
PUT /api/graduate/change-password
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "current_password": "oldpassword",
  "new_password": "newpassword123",
  "new_password_confirmation": "newpassword123"
}

Response (200 OK):
{
  "message": "Password changed successfully"
}
```

#### Get Notifications
```http
GET /api/graduate/notifications
Authorization: Bearer {token}

Response (200 OK):
[
  {
    "id": 1,
    "title": "New Survey Available",
    "message": "Graduate Feedback Survey 2024 is now available",
    "type": "survey",
    "read": false,
    "created_at": "2025-11-21T12:00:00Z"
  }
]
```

#### Mark Notification as Read
```http
PUT /api/graduate/notifications/{id}/read
Authorization: Bearer {token}
```

#### Delete Notification
```http
DELETE /api/graduate/notifications/{id}
Authorization: Bearer {token}
```

#### Get Survey History
```http
GET /api/graduate/survey-history
Authorization: Bearer {token}

Response (200 OK):
{
  "employment_surveys": [...],
  "other_surveys": [...]
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
  "total_surveys": 10,
  "active_surveys": 3,
  "total_responses": 85,
  "employment_stats": [
    {"employment_status": "employed", "count": 120},
    {"employment_status": "unemployed", "count": 30}
  ],
  "recent_graduates": [...]
}
```

#### Graduates by Year
```http
GET /api/analytics/graduates-by-year
Authorization: Bearer {token}

Response (200 OK):
[
  {"graduation_year": "2024", "count": 50},
  {"graduation_year": "2023", "count": 60}
]
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
│   │   │   ├── Dashboard.tsx        # Admin dashboard with charts
│   │   │   ├── Login.tsx            # Unified login page
│   │   │   ├── Analytics.tsx        # Charts & stats
│   │   │   ├── Reports.tsx          # Reports page
│   │   │   ├── Settings.tsx         # Admin settings
│   │   │   ├── graduates/
│   │   │   │   ├── GraduateList.tsx
│   │   │   │   ├── AddGraduate.tsx  # Separate add form
│   │   │   │   └── GraduateForm.tsx # Edit form
│   │   │   ├── surveys/
│   │   │   │   ├── SurveyList.tsx
│   │   │   │   ├── SurveyForm.tsx
│   │   │   │   └── SurveyResponses.tsx  # View responses
│   │   │   ├── admin/
│   │   │   │   ├── JobsManagement.tsx
│   │   │   │   ├── CareerServicesManagement.tsx
│   │   │   │   └── SupportTicketsManagement.tsx
│   │   │   └── graduate-portal/
│   │   │       ├── GraduateDashboard.tsx
│   │   │       ├── GraduateRegister.tsx
│   │   │       ├── GraduateSettings.tsx
│   │   │       ├── EmploymentSurvey.tsx
│   │   │       ├── CareerUpdates.tsx
│   │   │       ├── SurveyHistory.tsx
│   │   │       ├── TakeSurvey.tsx
│   │   │       ├── Notifications.tsx
│   │   │       ├── PrivacySettings.tsx
│   │   │       ├── AlumniResources.tsx
│   │   │       ├── FeedbackSupport.tsx
│   │   │       ├── ForgotPassword.tsx
│   │   │       └── ResetPassword.tsx
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
- GitHub: [@hans919](https://github.com/hans919)
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
- ✨ Initial release with dual-portal architecture
- ✅ **Admin Portal**: Complete graduate management system
- ✅ **Graduate Portal**: Self-service portal with 10+ pages
- ✅ **Dynamic Survey System**: Create surveys with 5 question types (text, textarea, radio, checkbox, select)
- ✅ **Survey Response Viewer**: Admin can view all graduate submissions
- ✅ **Real-time Notifications**: Auto-refresh every 10 seconds, auto-create on admin actions
- ✅ **Profile Photo Upload**: Graduates can upload profile pictures (2MB max)
- ✅ **Password Management**: Secure password change functionality
- ✅ **Analytics Dashboard**: Interactive charts with Recharts (bar + pie charts)
- ✅ **Resource Management**: Jobs, career services, training programs, support tickets
- ✅ **Notification System**: Bell icon with dropdown modal, mark as read, delete
- ✅ **Custom Green Header**: #457507 color for both portals
- ✅ **Authentic ShadCN UI**: Fully responsive with modern design
- ✅ **RESTful API**: Laravel Sanctum authentication with 20+ endpoints
- ✅ **TypeScript**: Complete type safety
- ✅ **8 Database Tables**: Users, graduates, surveys, questions, responses, notifications, jobs, etc.
- ✅ **Comprehensive Documentation**: Setup guides, API docs, troubleshooting

---

## 🗺️ Roadmap

### Version 1.1.0
- [ ] Email notifications for surveys (SMTP integration)
- [ ] Advanced analytics with custom date ranges
- [ ] Bulk import from Excel/CSV
- [ ] Enhanced search with multiple filters
- [ ] Push notifications (Web Push API)
- [ ] Export survey responses to Excel/PDF
- [ ] Admin dashboard customization

### Version 1.2.0
- [ ] Mobile app (React Native)
- [ ] Multi-language support (i18n)
- [ ] Advanced reporting with custom queries
- [ ] Integration with LinkedIn API
- [ ] Real-time updates with WebSockets (replace polling)
- [ ] Alumni directory with networking features
- [ ] Event calendar and RSVP system

### Version 2.0.0
- [ ] Advanced user roles and permissions (multiple admin levels)
- [ ] Audit logging and activity tracking
- [ ] Job board integration with application tracking
- [ ] Video testimonials from graduates
- [ ] AI-powered analytics and insights
- [ ] Mobile app notifications
- [ ] Two-factor authentication (2FA)

---

## 📚 Additional Documentation

- [Complete Implementation Guide](COMPLETE_IMPLEMENTATION.md) - Full feature documentation
- [ShadCN UI Guide](SHADCN_AUTHENTIC_GUIDE.md) - UI component usage
- [Validation Fix Guide](VALIDATION_FIX.md) - Form validation patterns
- [Login UI Update](LOGIN_UI_UPDATE.md) - Authentication system
- [Graduate Forms Separated](GRADUATE_FORMS_SEPARATED.md) - Form architecture
- [Problems Fixed](PROBLEMS_FIXED.md) - Troubleshooting guide
- [API Reference](API_REFERENCE.md) - Complete API documentation
- [Architecture](ARCHITECTURE.md) - System architecture overview
- [Installation](INSTALLATION.md) - Detailed installation guide
- [Quick Start](QUICK_START.md) - Get started in 5 minutes

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ and ☕**

[Report Bug](https://github.com/hans919/graduate-tracer-system/issues) · 
[Request Feature](https://github.com/hans919/graduate-tracer-system/issues) · 
[Documentation](docs/)

</div>
