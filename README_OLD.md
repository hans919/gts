<div align="center">

# 🎓 Graduate Tracking System

### A comprehensive web-based platform for tracking and managing graduate information, employment status, and survey responses

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Laravel](https://img.shields.io/badge/Laravel-12.0-FF2D20?logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

[Features](#-features) • [Demo](#-screenshots) • [Installation](#-installation) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

The Graduate Tracking System (GTS) is a modern, full-stack web application designed for educational institutions to effectively track alumni career progression, collect employment data, and analyze graduate outcomes. The system features a dual-portal architecture with separate interfaces for administrators and graduates, providing comprehensive tools for data management, survey creation, and analytics reporting.

Built with enterprise-grade technologies including Laravel 12 and React 18, the system offers real-time notifications, dynamic survey capabilities, interactive analytics dashboards, and a fully responsive user interface powered by ShadCN UI components.

---

## ✨ Features

### 🎯 Administrative Portal

<table>
<tr>
<td width="50%">

**Graduate Management**
- Complete CRUD operations for graduate records
- Advanced search and filtering capabilities
- Bulk import/export functionality
- Comprehensive profile management
- Academic records tracking

</td>
<td width="50%">

**Survey Administration**
- Dynamic survey builder with 5+ question types
- Custom survey targeting (by year, program)
- Real-time response monitoring
- Survey analytics and reporting
- Draft, active, and archived survey states

</td>
</tr>
<tr>
<td>

**Resource Management**
- Job postings and opportunities
- Career services coordination
- Training program management
- Support ticket system
- Automated notifications

</td>
<td>

**Analytics & Reporting**
- Interactive dashboard with live statistics
- Employment status visualization
- Salary distribution analysis
- Program outcome tracking
- Exportable reports (CSV, PDF)

</td>
</tr>
</table>

### 👨‍🎓 Graduate Self-Service Portal

<table>
<tr>
<td width="50%">

**Profile Management**
- Personal information updates
- Profile photo upload (2MB max)
- Secure password management
- Academic record viewing
- Address information maintenance

</td>
<td width="50%">

**Career Tracking**
- Employment status updates
- Job history logging
- Career progression tracking
- Skills and certifications
- Resume/CV upload

</td>
</tr>
<tr>
<td>

**Survey Participation**
- View available surveys
- Submit survey responses
- Track completion history
- Anonymous response options
- Survey reminders

</td>
<td>

**Resources & Support**
- Browse job opportunities
- Access career services
- Training program enrollment
- Submit support tickets
- Alumni networking

</td>
</tr>
</table>

### 🔐 Security & Authentication

- **Token-based Authentication**: Laravel Sanctum for secure API access
- **Role-based Access Control**: Granular permissions for admin and graduate roles
- **Password Security**: Bcrypt hashing with configurable strength
- **Session Management**: Secure token handling and automatic expiration
- **CORS Protection**: Configurable cross-origin resource sharing
- **API Rate Limiting**: Prevent abuse with throttling mechanisms

### 🔔 Real-time Notification System

- Auto-generated notifications for surveys, jobs, and events
- Badge indicators for unread notifications
- 10-second auto-refresh polling
- Mark as read/unread functionality
- Category-based filtering
- Timestamp and priority indicators

### 📊 Advanced Analytics

- **Dashboard Metrics**: Real-time KPIs and statistics
- **Interactive Charts**: Bar charts, pie charts, line graphs (Recharts)
- **Employment Analytics**: Status distribution and trends
- **Salary Insights**: Compensation analysis by program/year
- **Industry Distribution**: Graduate placement by sector
- **Trend Analysis**: Historical data visualization

---

## 🛠 Technology Stack

<div align="center">

### Backend Architecture

</div>

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | Laravel | 12.0 | PHP web application framework |
| **Language** | PHP | 8.2+ | Server-side programming |
| **Authentication** | Laravel Sanctum | 4.2 | API token authentication |
| **Database** | SQLite/MySQL | Latest | Data persistence layer |
| **ORM** | Eloquent | Built-in | Database abstraction |
| **API Style** | RESTful | - | API architecture pattern |
| **Package Manager** | Composer | 2.x | Dependency management |

<div align="center">

### Frontend Architecture

</div>

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | React | 18.2 | UI component library |
| **Language** | TypeScript | 5.2 | Type-safe JavaScript |
| **Build Tool** | Vite | 5.0 | Fast development & build tooling |
| **UI Components** | ShadCN UI | Latest | Pre-built React components |
| **CSS Framework** | Tailwind CSS | 3.3 | Utility-first styling |
| **State Management** | TanStack Query | 5.12 | Server state management |
| **Routing** | React Router | 6.20 | Client-side routing |
| **HTTP Client** | Axios | 1.6 | API communication |
| **Charts** | Recharts | 2.15 | Data visualization |
| **Forms** | React Hook Form | 7.48 | Form validation & handling |
| **Icons** | Lucide React | 0.294 | Icon system |
| **Validation** | Zod | 3.22 | Schema validation |

<div align="center">

### Development Tools

</div>

| Tool | Purpose |
|------|---------|
| ESLint | Code linting and style enforcement |
| Prettier | Code formatting |
| TypeScript Compiler | Type checking |
| Vite Dev Server | Hot module replacement |
| Laravel Artisan | CLI tool for Laravel |
| Composer Scripts | Task automation |

---

## 📸 Screenshots

> **Note**: Add screenshots of your application here to showcase the user interface and features.

<details>
<summary><b>View Screenshots</b></summary>

### Admin Dashboard
*Interactive analytics dashboard with real-time statistics and data visualization*

```
[Add screenshot: dashboard.png]
- Key metrics display
- Interactive charts
- Recent activity feed
```

### Graduate Management
*Comprehensive graduate records with search, filtering, and bulk operations*

```
[Add screenshot: graduates-list.png]
- Data table with pagination
- Advanced search functionality
- Quick actions menu
```

### Survey Builder
*Dynamic survey creation interface with multiple question types*

```
[Add screenshot: survey-builder.png]
- Drag-and-drop question builder
- Question type selector
- Survey preview
```

### Graduate Portal
*Self-service portal for graduates with profile management and survey access*

```
[Add screenshot: graduate-portal.png]
- Profile overview
- Notification center
- Available surveys
```

</details>

---

## 📦 Prerequisites

Ensure your development environment meets the following requirements:

### Required Software

| Software | Minimum Version | Recommended | Download |
|----------|----------------|-------------|----------|
| PHP | 8.2 | 8.3 | [php.net](https://www.php.net/downloads) |
| Composer | 2.0 | Latest | [getcomposer.org](https://getcomposer.org) |
| Node.js | 18.x | 20.x LTS | [nodejs.org](https://nodejs.org) |
| npm | 9.x | 10.x | Included with Node.js |

### PHP Extensions

Ensure the following PHP extensions are enabled:

```ini
extension=pdo_sqlite (or pdo_mysql)
extension=mbstring
extension=openssl
extension=fileinfo
extension=tokenizer
extension=json
extension=bcmath
```

### Optional Tools

- **XAMPP** or **WAMP** (for Windows development)
- **Git** (for version control)
- **MySQL** (for production database)
- **VS Code** (recommended IDE)

---

## 🚀 Installation

Follow these steps to set up the Graduate Tracking System on your local machine.

### Quick Start

```bash
# Clone the repository
git clone https://github.com/hans919/gts.git
cd gts

# Option 1: Use automated setup script (Windows)
.\setup.ps1

# Option 2: Manual setup (see detailed instructions below)
```

### Detailed Installation

<details>
<summary><b>Step 1: Clone the Repository</b></summary>

```bash
# HTTPS
git clone https://github.com/hans919/gts.git

# SSH (if configured)
git clone git@github.com:hans919/gts.git

# Navigate to project directory
cd gts
```

</details>

<details>
<summary><b>Step 2: Backend Setup (Laravel)</b></summary>

```bash
# Navigate to Laravel directory
cd laravel

# Install PHP dependencies
composer install

# Copy environment configuration
cp .env.example .env

# For Windows PowerShell:
# Copy-Item .env.example .env

# Generate application key
php artisan key:generate

# Configure your database in .env file
# For SQLite (recommended for development):
# DB_CONNECTION=sqlite
# DB_DATABASE=c:/xampp/htdocs/gts/laravel/database/database.sqlite

# Create SQLite database file
touch database/database.sqlite
# For Windows PowerShell:
# New-Item -Path "database\database.sqlite" -ItemType File -Force

# Run database migrations
php artisan migrate

# (Optional) Seed database with sample data
php artisan db:seed

# Start Laravel development server
php artisan serve
```

✅ **Backend API**: http://127.0.0.1:8000

</details>

<details>
<summary><b>Step 3: Frontend Setup (React + TypeScript)</b></summary>

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install Node.js dependencies
npm install

# Create environment file
cp .env.example .env
# For Windows PowerShell:
# Copy-Item .env.example .env

# Update .env with your API URL
# VITE_API_URL=http://127.0.0.1:8000/api

# Start Vite development server
npm run dev
```

✅ **Frontend**: http://localhost:5173

</details>

<details>
<summary><b>Step 4: Verify Installation</b></summary>

1. **Check Backend**: Visit http://127.0.0.1:8000/api/health (if health endpoint exists)
2. **Check Frontend**: Visit http://localhost:5173
3. **Test Login**: Use default credentials (if seeded):
   - Admin: `admin@test.com` / `password123`
   - Graduate: `graduate@test.com` / `password123`

</details>

### Docker Installation (Alternative)

```bash
# Build and run with Docker Compose
docker-compose up -d

# Run migrations
docker-compose exec app php artisan migrate

# Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:8000
```

### Troubleshooting

<details>
<summary><b>Common Installation Issues</b></summary>

**Issue: Composer install fails**
```bash
# Clear composer cache
composer clear-cache

# Update composer
composer self-update

# Try again
composer install
```

**Issue: npm install fails**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Try again
npm install
```

**Issue: Database connection error**
- Verify database credentials in `.env`
- Ensure database file exists (for SQLite)
- Check MySQL service is running (for MySQL)

**Issue: Port already in use**
```bash
# Change Laravel port
php artisan serve --port=8001

# Change Vite port (vite.config.ts)
server: { port: 5174 }
```

</details>

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

## 📚 Documentation

Comprehensive documentation is available to help you get started and make the most of the system:

| Document | Description |
|----------|-------------|
| [API Reference](API_REFERENCE.md) | Complete API endpoint documentation |
| [Architecture Guide](ARCHITECTURE.md) | System architecture and design patterns |
| [Installation Guide](INSTALLATION.md) | Detailed installation instructions |
| [Deployment Guide](DEPLOYMENT_GUIDE.md) | Production deployment procedures |
| [Quick Start Guide](QUICK_START.md) | Get up and running in 5 minutes |
| [Frontend Setup](FRONTEND_SETUP.md) | Frontend-specific configuration |
| [Graduate Portal Guide](GRADUATE_PORTAL_GUIDE.md) | Graduate user documentation |

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork the Repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/gts.git
   cd gts
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make Your Changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable

5. **Commit Your Changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Provide a clear description
   - Reference any related issues
   - Wait for review

### Coding Standards

- **PHP**: Follow [PSR-12](https://www.php-fig.org/psr/psr-12/) coding standard
- **TypeScript/React**: Use ESLint and Prettier configurations
- **Commits**: Follow [Conventional Commits](https://www.conventionalcommits.org/)

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Example**:
```
feat(surveys): add export to CSV functionality

- Implemented CSV export button in survey list
- Added data formatting utilities
- Included download functionality

Closes #123
```

### Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

---

## 👨‍💻 Authors & Contributors

### Lead Developer

**Hans Christian Delos Santos**
- 🎓 Student, San Jose Community College
- 💼 GitHub: [@hans919](https://github.com/hans919)
- 📧 Email: delossantoshanschristian@sjcbi.edu.ph

### Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/hans919/gts/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=hans919/gts" />
</a>

---

## 🙏 Acknowledgments

This project leverages several outstanding open-source technologies:

### Core Technologies
- **[Laravel](https://laravel.com/)** - The PHP Framework for Web Artisans
- **[React](https://react.dev/)** - A JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript with syntax for types

### UI & Styling
- **[ShadCN UI](https://ui.shadcn.com/)** - Beautifully designed components built with Radix UI
- **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework
- **[Lucide Icons](https://lucide.dev/)** - Beautiful & consistent icon toolkit
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components

### Development Tools
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **[Recharts](https://recharts.org/)** - Composable charting library
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization
- **[React Hook Form](https://react-hook-form.com/)** - Performant form validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Special Thanks
- San Jose Community College for project support
- The open-source community for continuous inspiration

---

## 📞 Support & Contact

Need help? We're here to assist you:

### GitHub
- 🐛 **Bug Reports**: [Open an Issue](https://github.com/hans919/gts/issues/new?template=bug_report.md)
- 💡 **Feature Requests**: [Request a Feature](https://github.com/hans919/gts/issues/new?template=feature_request.md)
- 💬 **Discussions**: [Join the Discussion](https://github.com/hans919/gts/discussions)
- 📖 **Wiki**: [Documentation Wiki](https://github.com/hans919/gts/wiki)

### Email Support
- 📧 **General Inquiries**: delossantoshanschristian@sjcbi.edu.ph
- 🔒 **Security Issues**: Please report privately via email

### Community
- 💼 **LinkedIn**: [Connect with us](#)
- 🐦 **Twitter**: [@yourusername](#)
- 📺 **YouTube**: [Tutorial Videos](#)

---

## 🗺️ Roadmap

Our vision for the future of the Graduate Tracking System:

### 📋 Planned Features

<details>
<summary><b>Version 1.1.0 - Enhanced Communication</b> (Q1 2026)</summary>

- [ ] Email notification system (SMTP integration)
- [ ] SMS notifications for critical updates
- [ ] In-app messaging between admins and graduates
- [ ] Scheduled survey reminders
- [ ] Newsletter management system
- [ ] Email templates customization

</details>

<details>
<summary><b>Version 1.2.0 - Advanced Analytics</b> (Q2 2026)</summary>

- [ ] Custom date range analytics
- [ ] Advanced data filtering and segmentation
- [ ] Automated report generation
- [ ] Export to Excel, CSV, and PDF
- [ ] Predictive analytics with ML
- [ ] Comparative analysis tools
- [ ] Data visualization enhancements

</details>

<details>
<summary><b>Version 1.3.0 - Integration & Import</b> (Q3 2026)</summary>

- [ ] Bulk import from Excel/CSV
- [ ] Integration with LinkedIn API
- [ ] Google Workspace integration
- [ ] Microsoft 365 integration
- [ ] API webhooks for third-party services
- [ ] Single Sign-On (SSO) support
- [ ] LDAP/Active Directory integration

</details>

<details>
<summary><b>Version 2.0.0 - Mobile & Real-time</b> (Q4 2026)</summary>

- [ ] Native mobile apps (iOS & Android)
- [ ] Progressive Web App (PWA) support
- [ ] Real-time updates with WebSockets
- [ ] Push notifications for mobile
- [ ] Offline mode capabilities
- [ ] Mobile-optimized surveys
- [ ] Biometric authentication

</details>

<details>
<summary><b>Version 2.1.0 - Community Features</b> (Q1 2027)</summary>

- [ ] Alumni directory with networking
- [ ] Event calendar and RSVP system
- [ ] Discussion forums and groups
- [ ] Mentorship program management
- [ ] Job board with application tracking
- [ ] Alumni success stories
- [ ] Video testimonials

</details>

<details>
<summary><b>Version 3.0.0 - Enterprise Edition</b> (Q2 2027)</summary>

- [ ] Multi-tenancy support
- [ ] Advanced role-based permissions
- [ ] Audit logging and compliance
- [ ] Two-factor authentication (2FA)
- [ ] AI-powered insights and recommendations
- [ ] Custom branding per institution
- [ ] White-label solution
- [ ] Enterprise SLA support

</details>

### 🎯 Long-term Vision

- Become the leading alumni tracking solution for educational institutions
- Support 10,000+ concurrent users
- Multi-language support (10+ languages)
- Advanced AI/ML for career prediction and matching
- Blockchain integration for credential verification
- Global alumni network platform

---

## 📊 Project Stats

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/hans919/gts)
![GitHub contributors](https://img.shields.io/github/contributors/hans919/gts)
![GitHub stars](https://img.shields.io/github/stars/hans919/gts?style=social)
![GitHub forks](https://img.shields.io/github/forks/hans919/gts?style=social)
![GitHub issues](https://img.shields.io/github/issues/hans919/gts)
![GitHub pull requests](https://img.shields.io/github/issues-pr/hans919/gts)
![GitHub last commit](https://img.shields.io/github/last-commit/hans919/gts)
![GitHub license](https://img.shields.io/github/license/hans919/gts)

</div>

---

## 🔄 Changelog

### [1.0.0] - 2025-11-22

#### 🎉 Initial Release

**Core Features**
- ✅ Dual-portal architecture (Admin + Graduate)
- ✅ Complete graduate management system
- ✅ Dynamic survey builder with 5 question types
- ✅ Real-time notification system
- ✅ Interactive analytics dashboard
- ✅ Profile management with photo upload
- ✅ Secure authentication with Laravel Sanctum

**Technical Implementation**
- ✅ Laravel 12 backend with RESTful API
- ✅ React 18 + TypeScript frontend
- ✅ ShadCN UI component library
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Database migrations and seeders
- ✅ Comprehensive API documentation

**Components**
- ✅ 8+ database tables
- ✅ 20+ API endpoints
- ✅ 15+ React pages
- ✅ 30+ UI components
- ✅ Role-based access control

**Documentation**
- ✅ Installation guide
- ✅ API reference
- ✅ Architecture documentation
- ✅ User manuals
- ✅ Deployment guides

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

```
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

**You are free to:**
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Private use

**Under the conditions:**
- 📄 License and copyright notice must be included
- ⚠️ Software is provided "as is", without warranty

---

## 🌟 Show Your Support

If you find this project useful, please consider:

<div align="center">

### ⭐ Star this repository

[![GitHub stars](https://img.shields.io/github/stars/hans919/gts?style=social)](https://github.com/hans919/gts/stargazers)

**Help us reach 100 stars!**

</div>

### Other Ways to Support

- 🐛 [Report bugs](https://github.com/hans919/gts/issues/new?template=bug_report.md)
- 💡 [Suggest features](https://github.com/hans919/gts/issues/new?template=feature_request.md)
- 📝 [Improve documentation](https://github.com/hans919/gts/blob/main/CONTRIBUTING.md)
- 🔀 [Submit pull requests](https://github.com/hans919/gts/pulls)
- 💬 [Share with others](https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20Graduate%20Tracking%20System!&url=https://github.com/hans919/gts)

---

<div align="center">

## 🎓 Built for Educational Excellence

**Made with ❤️, ☕, and countless hours of coding**

### Quick Links

[🏠 Home](https://github.com/hans919/gts) · 
[📚 Documentation](DOCS.md) · 
[🐛 Report Bug](https://github.com/hans919/gts/issues) · 
[💡 Request Feature](https://github.com/hans919/gts/issues) · 
[💬 Discussions](https://github.com/hans919/gts/discussions)

---

<sub>Graduate Tracking System © 2025 by Hans Christian Delos Santos</sub>

<sub>Licensed under MIT License • Built with Laravel & React</sub>

[![Built with Laravel](https://img.shields.io/badge/Built%20with-Laravel-FF2D20?logo=laravel)](https://laravel.com)
[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?logo=react)](https://react.dev)
[![Built with TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6?logo=typescript)](https://typescriptlang.org)

</div>
