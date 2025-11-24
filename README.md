<div align="center">

<img src="https://img.shields.io/badge/GTS-Graduate_Tracker-2563eb?style=for-the-badge" alt="GTS" height="60"/>

# 🎓 SJCB Graduate Tracking System

**Track alumni careers. Drive outcomes. Make data-driven decisions.**

A comprehensive web-based platform designed for educational institutions to efficiently manage graduate data, monitor employment outcomes, conduct surveys, and generate insightful analytics for continuous program improvement.

[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=flat-square&logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://mysql.com)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[Quick Start](#-quick-start) · [Features](#-features) · [Documentation](#-documentation) · [Tech Stack](#-tech-stack)

</div>

---

## 📋 Overview

The **Graduate Tracking System (GTS)** is a modern, full-stack web application that streamlines the process of tracking and analyzing graduate employment outcomes. Built for Saint Joseph College of Baggao, it provides a triple-interface platform serving administrators, graduates, and super administrators with comprehensive features for institutional assessment and alumni engagement.

### 🎯 System Purpose

<table>
<tr>
<td width="33%">

### 👨‍💼 For Administrators
<img src="https://img.shields.io/badge/-Graduate_Management-4CAF50?style=flat-square&logo=database&logoColor=white" />  
Complete CRUD operations for graduate records with advanced filtering and search

<img src="https://img.shields.io/badge/-Survey_Builder-2196F3?style=flat-square&logo=checkmarx&logoColor=white" />  
Create dynamic surveys with multiple question types and auto-distribution

<img src="https://img.shields.io/badge/-Analytics_Dashboard-FF9800?style=flat-square&logo=chartdotjs&logoColor=white" />  
Real-time insights into employment rates, salaries, and trends

<img src="https://img.shields.io/badge/-Resource_Management-9C27B0?style=flat-square&logo=briefcase&logoColor=white" />  
Manage job postings, training programs, career services, and support tickets

<img src="https://img.shields.io/badge/-Data_Export-F44336?style=flat-square&logo=microsoftexcel&logoColor=white" />  
Generate comprehensive reports in CSV and PDF formats

<img src="https://img.shields.io/badge/-Dark_Mode-1E1E1E?style=flat-square&logo=moon&logoColor=white" />  
Toggle between light and dark themes for comfortable viewing

</td>
<td width="34%">

### 🎓 For Graduates
<img src="https://img.shields.io/badge/-Profile_Management-3F51B5?style=flat-square&logo=user&logoColor=white" />  
Update personal information and employment status with photo upload

<img src="https://img.shields.io/badge/-Employment_Survey-00BCD4?style=flat-square&logo=clipboard&logoColor=white" />  
Complete employment surveys and track submission history

<img src="https://img.shields.io/badge/-Career_Updates-8BC34A?style=flat-square&logo=trendingup&logoColor=white" />  
Log job changes, promotions, and career milestones

<img src="https://img.shields.io/badge/-Alumni_Resources-FF5722?style=flat-square&logo=compass&logoColor=white" />  
Browse job postings, training programs, and career services

<img src="https://img.shields.io/badge/-Notifications-FFC107?style=flat-square&logo=bell&logoColor=white" />  
Real-time updates on surveys, events, and opportunities

<img src="https://img.shields.io/badge/-Privacy_Control-607D8B?style=flat-square&logo=shield&logoColor=white" />  
Manage data sharing preferences and account settings

<img src="https://img.shields.io/badge/-AI_Assistant-9D4EDD?style=flat-square&logo=openai&logoColor=white" />  
24/7 intelligent chatbot powered by AI for instant support

<img src="https://img.shields.io/badge/-Resume_Builder-E91E63?style=flat-square&logo=document&logoColor=white" />  
Create professional resumes with Oxford template and PDF export

</td>
<td width="33%">

### 🔐 For Super Administrators
<img src="https://img.shields.io/badge/-User_Management-DC143C?style=flat-square&logo=users&logoColor=white" />  
Complete control over all user accounts, roles, and permissions

<img src="https://img.shields.io/badge/-Admin_Oversight-FF6347?style=flat-square&logo=eye&logoColor=white" />  
Monitor admin activities and system usage patterns

<img src="https://img.shields.io/badge/-System_Statistics-32CD32?style=flat-square&logo=graph&logoColor=white" />  
Comprehensive system-wide analytics and metrics

<img src="https://img.shields.io/badge/-Database_Management-4169E1?style=flat-square&logo=database&logoColor=white" />  
Backup, restore, export, and database maintenance tools

<img src="https://img.shields.io/badge/-Security_Monitoring-8B0000?style=flat-square&logo=shield&logoColor=white" />  
Security logs, access control, and threat monitoring

<img src="https://img.shields.io/badge/-System_Settings-696969?style=flat-square&logo=settings&logoColor=white" />  
Configure system-wide settings and preferences

</td>
</tr>
</table>

---

## ⚡ Quick Start

```bash
# Clone & navigate
git clone https://github.com/hans919/gts.git
cd gts

# Automated setup (Windows)
.\setup.ps1

# Or manual setup:
# Backend
cd laravel && composer install && cp .env.example .env && php artisan key:generate && php artisan migrate && php artisan serve

# Frontend (new terminal)
cd frontend && npm install && npm run dev
```

**Access Points:**  
<img src="https://img.shields.io/badge/-Frontend-61DAFB?style=flat-square&logo=react&logoColor=black" /> `http://localhost:5173`  
<img src="https://img.shields.io/badge/-Backend-FF2D20?style=flat-square&logo=laravel&logoColor=white" /> `http://127.0.0.1:8000`

**Default Credentials:**  
<img src="https://img.shields.io/badge/-Admin_Login-000000?style=flat-square&logo=gmail&logoColor=white" /> `admin@test.com` / `password123`

---

## ✨ Key Features

### <img src="https://img.shields.io/badge/-Analytics_Dashboard-FF6B6B?style=flat-square&logo=graphql&logoColor=white" /> Analytics Dashboard
- **Live Employment Tracking** - Real-time employment status monitoring across all graduates
- **Salary Insights** - Distribution charts showing salary ranges by industry and position
- **Trend Analysis** - Year-over-year graduate outcome comparisons
- **Interactive Charts** - Powered by Recharts for dynamic data visualization
- **Exportable Reports** - Download analytics in PDF and CSV formats

### <img src="https://img.shields.io/badge/-Survey_System-4ECDC4?style=flat-square&logo=wpforms&logoColor=white" /> Dynamic Survey Management
- **Flexible Question Types** - Text, radio, checkbox, select dropdown, and textarea options
- **Automated Distribution** - Auto-send notifications to target graduate groups
- **Response Tracking** - Monitor completion rates and individual responses
- **Custom Templates** - Save and reuse survey templates for efficiency
- **Analytics Integration** - Survey responses feed directly into analytics dashboard

### <img src="https://img.shields.io/badge/-Notifications-FFE66D?style=flat-square&logo=notifications&logoColor=black" /> Real-Time Notification System
- **Auto-Refresh** - Background polling every 10 seconds for instant updates
- **Smart Routing** - Clickable notifications navigate to relevant pages
- **Action Controls** - Mark as read, delete, or archive notifications
- **Badge Counters** - Unread notification count visible in header
- **Type-Based Categorization** - Surveys, jobs, events, and general announcements

### <img src="https://img.shields.io/badge/-Graduate_Portal-95E1D3?style=flat-square&logo=passport&logoColor=black" /> Graduate Self-Service Portal
- **Profile Editor** - Update contact info, employment status, and upload photos
- **Employment Survey** - Submit detailed employment information and career progress
- **Career Timeline** - Track job changes, promotions, and milestones
- **Survey History** - View all completed and pending surveys with statistics
- **Alumni Resources** - Browse job postings, career services, and training programs
- **Privacy Dashboard** - Control data sharing and notification preferences
- **Data Export** - Download all personal data in JSON format
- **Feedback System** - Submit support tickets and contact administrators

### <img src="https://img.shields.io/badge/-AI_Chatbot-9D4EDD?style=flat-square&logo=openai&logoColor=white" /> Intelligent AI Assistant
- **Multi-Provider Support** - Groq (Llama 3.1), Google Gemini, HuggingFace, and Cohere
- **Hybrid Intelligence** - Rule-based responses with AI enhancement fallback
- **Contextual Understanding** - Maintains conversation context for natural interactions
- **11 Intent Categories** - Survey, Job, Profile, Career, Support, Notifications, Privacy, Training, Dashboard, Alumni, and General
- **Quick Actions** - Instant navigation to surveys, jobs, and profile updates
- **24/7 Availability** - Always-on support for graduate inquiries
- **Free Tier Integration** - 100% free AI APIs with generous usage limits
- **Debug Console** - Real-time testing and monitoring tools

### <img src="https://img.shields.io/badge/-Resume_Builder-E91E63?style=flat-square&logo=document&logoColor=white" /> Professional Resume Builder
- **Oxford Template** - Professional, ATS-friendly resume design
- **Live Preview** - Real-time preview as you type
- **Multiple Sections** - Personal info, summary, work history, skills, education
- **PDF Export** - High-quality PDF download for applications
- **Image Export** - PNG format for quick sharing
- **Save Progress** - LocalStorage auto-save functionality
- **Print Optimized** - A4 format perfect for printing

### <img src="https://img.shields.io/badge/-Admin_Resources-A8E6CF?style=flat-square&logo=briefcase&logoColor=black" /> Admin Resource Management
- **Job Postings** - Create and manage job opportunities for graduates
- **Career Services** - Advertise counseling, resume help, and career guidance
- **Training Programs** - Post available training and certification programs
- **Support Tickets** - Manage graduate inquiries and technical support requests
- **Employment Surveys** - View and manage graduate employment submissions

### <img src="https://img.shields.io/badge/-Super_Admin-DC143C?style=flat-square&logo=shield&logoColor=white" /> Super Administrator Module
- **User Management** - Create, update, delete users; change roles and permissions
- **Admin Activities** - Monitor all admin actions and system modifications
- **System Statistics** - Real-time metrics on users, graduates, surveys, and engagement
- **Database Tools** - Backup, restore, export data, and database maintenance
- **Security Monitoring** - Access logs, security events, and threat detection
- **System Settings** - Configure application-wide settings and preferences
- **Cache Management** - Clear system cache and optimize performance

### <img src="https://img.shields.io/badge/-Modern_UI-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" /> User Interface
- **Component Library** - Built with ShadCN UI for consistency and accessibility
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark Mode** - System-wide theme toggle with preference persistence (Admin Portal)
- **Icon System** - Lucide React icons throughout for visual clarity
- **Smooth Animations** - Framer Motion for delightful interactions
- **Toast Notifications** - Non-intrusive success/error messages

### <img src="https://img.shields.io/badge/-Security-FF6B9D?style=flat-square&logo=lock&logoColor=white" /> Security & Authentication
- **Token-Based Auth** - Laravel Sanctum SPA authentication
- **Role-Based Access** - Three-tier system: Super Admin, Admin, Graduate
- **Password Security** - Bcrypt hashing with Laravel's encryption
- **CORS Protection** - Configured cross-origin resource sharing
- **Rate Limiting** - API throttling to prevent abuse
- **Session Management** - Secure session handling and automatic timeout
- **Middleware Protection** - Route-level authorization checks

---

## 🛠 Tech Stack

<table>
<tr>
<td>

### <img src="https://img.shields.io/badge/-Backend-FF2D20?style=flat-square&logo=laravel&logoColor=white" />
- **Framework:** Laravel 12
- **Language:** PHP 8.2+
- **Database:** MySQL 8.0 / SQLite
- **Authentication:** Laravel Sanctum
- **API:** RESTful Architecture
- **ORM:** Eloquent

</td>
<td>

### <img src="https://img.shields.io/badge/-Frontend-61DAFB?style=flat-square&logo=react&logoColor=black" />
- **Framework:** React 18
- **Language:** TypeScript 5
- **Build Tool:** Vite 5
- **State:** React Hooks + Context API
- **Routing:** React Router v6
- **HTTP Client:** Axios

</td>
</tr>
<tr>
<td>

### <img src="https://img.shields.io/badge/-UI_&_Styling-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
- **Component Library:** ShadCN UI
- **CSS Framework:** Tailwind CSS 3
- **Icons:** Lucide React
- **Charts:** Recharts
- **Forms:** React Hook Form
- **Validation:** Zod Schema

</td>
<td>

### <img src="https://img.shields.io/badge/-AI_&_Integrations-9D4EDD?style=flat-square&logo=openai&logoColor=white" />
- **AI Providers:** Groq (Llama 3.1), Gemini
- **Fallback System:** Multi-provider support
- **Context Manager:** Conversation memory
- **Rate Limiting:** Built-in throttling
- **Free Tier:** 100% free AI APIs

</td>
</tr>
<tr>
<td>

### <img src="https://img.shields.io/badge/-DevOps_&_Tools-4285F4?style=flat-square&logo=googlecloud&logoColor=white" />
- **Version Control:** Git & GitHub
- **Package Manager:** Composer, npm
- **Development:** XAMPP / Laravel Serve
- **Deployment:** Hostinger, cPanel
- **Environment:** .env Configuration

</td>
</tr>
</table>

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [Installation Guide](INSTALLATION.md) | Detailed setup instructions |
| [API Reference](API_REFERENCE.md) | Complete API documentation |
| [Deployment Guide](DEPLOYMENT_GUIDE.md) | Production deployment steps |
| [Graduate Portal Guide](GRADUATE_PORTAL_GUIDE.md) | Graduate user documentation |
| [AI Setup Guide](AI_SETUP_GUIDE.md) | Chatbot AI integration guide |
| [Resume Builder Guide](RESUME_BUILDER_GUIDE.md) | Resume builder features |
| [Dark Mode Guide](DARK_MODE_GUIDE.md) | Dark theme implementation |
| [Super Admin Module](SUPERADMIN_MODULE.md) | Super admin documentation |
| [Quick Start](QUICK_START.md) | Get running in 5 minutes |
| [Architecture](ARCHITECTURE.md) | System architecture overview |

---

## 🌐 API Highlights

```javascript
// Authentication
POST   /api/login
POST   /api/register
POST   /api/logout
POST   /api/forgot-password
POST   /api/reset-password

// Graduates Management (Admin)
GET    /api/graduates
POST   /api/graduates
PUT    /api/graduates/{id}
DELETE /api/graduates/{id}
GET    /api/graduates/export
GET    /api/graduates/{id}/employments
GET    /api/graduates/{id}/survey-responses

// Surveys Management (Admin)
GET    /api/surveys
POST   /api/surveys
PUT    /api/surveys/{id}
DELETE /api/surveys/{id}
GET    /api/surveys/{id}/responses
POST   /api/surveys/{id}/duplicate

// Survey Responses
GET    /api/survey-responses
POST   /api/survey-responses
PUT    /api/survey-responses/{id}
DELETE /api/survey-responses/{id}
POST   /api/survey-responses/{id}/submit

// Employment Management
GET    /api/employments
POST   /api/employments
PUT    /api/employments/{id}
DELETE /api/employments/{id}

// Analytics Dashboard
GET    /api/analytics/dashboard
GET    /api/analytics/employment-status
GET    /api/analytics/job-relevance
GET    /api/analytics/salary-distribution
GET    /api/analytics/industry-distribution
GET    /api/analytics/program-outcomes
GET    /api/analytics/survey-completion
GET    /api/analytics/graduates-by-year

// Admin Resource Management
GET    /api/admin/jobs
POST   /api/admin/jobs
PUT    /api/admin/jobs/{id}
DELETE /api/admin/jobs/{id}
GET    /api/admin/career-services
POST   /api/admin/career-services
PUT    /api/admin/career-services/{id}
DELETE /api/admin/career-services/{id}
GET    /api/admin/training-programs
POST   /api/admin/training-programs
PUT    /api/admin/training-programs/{id}
DELETE /api/admin/training-programs/{id}
GET    /api/admin/support-tickets
PUT    /api/admin/support-tickets/{id}
DELETE /api/admin/support-tickets/{id}
GET    /api/admin/employment-surveys
DELETE /api/admin/employment-surveys/{id}

// Graduate Portal
GET    /api/graduate/profile
PUT    /api/graduate/profile
POST   /api/graduate/profile-photo
PUT    /api/graduate/change-password
GET    /api/graduate/surveys
POST   /api/graduate/surveys
GET    /api/graduate/career-updates
POST   /api/graduate/career-updates
GET    /api/graduate/notifications
PUT    /api/graduate/notifications/{id}/read
DELETE /api/graduate/notifications/{id}
GET    /api/graduate/survey-history
GET    /api/graduate/privacy-settings
PUT    /api/graduate/privacy-settings
GET    /api/graduate/export-data
DELETE /api/graduate/account
GET    /api/graduate/jobs
POST   /api/graduate/jobs/{id}/bookmark
GET    /api/graduate/career-services
GET    /api/graduate/training-programs
GET    /api/graduate/support-tickets
POST   /api/graduate/support-tickets
POST   /api/graduate/submit-survey-response

// Super Admin Module
GET    /api/superadmin/users
POST   /api/superadmin/users
PUT    /api/superadmin/users/{id}
DELETE /api/superadmin/users/{id}
PUT    /api/superadmin/users/{id}/role
PUT    /api/superadmin/users/{id}/status
PUT    /api/superadmin/users/{id}/reset-password
GET    /api/superadmin/admin-activities
GET    /api/superadmin/statistics
GET    /api/superadmin/system-health
GET    /api/superadmin/user-engagement
GET    /api/superadmin/security-logs
GET    /api/superadmin/activity-timeline
GET    /api/superadmin/settings
PUT    /api/superadmin/settings
POST   /api/superadmin/backup
GET    /api/superadmin/backups
POST   /api/superadmin/restore
DELETE /api/superadmin/backups/{filename}
POST   /api/superadmin/export
POST   /api/superadmin/clear-cache
```

**AI Configuration:**
```env
# Enable AI chatbot features
VITE_USE_AI=true

# Add at least one provider (all free!)
VITE_GROQ_API_KEY=gsk_xxxxx              # Recommended - Ultra fast
VITE_GEMINI_API_KEY=AIzaSyxxxxx          # Google's Gemini
VITE_HUGGINGFACE_API_KEY=hf_xxxxx        # Open source models
VITE_COHERE_API_KEY=xxxxx                # Cohere AI

# Get free API keys:
# Groq: https://console.groq.com (Fastest, Llama 3.1)
# Gemini: https://makersuite.google.com/app/apikey
# HuggingFace: https://huggingface.co/settings/tokens
# Cohere: https://dashboard.cohere.com/api-keys
```

**Full API docs:** [API_REFERENCE.md](API_REFERENCE.md)  
**AI Setup:** [AI_SETUP_GUIDE.md](AI_SETUP_GUIDE.md)

---

## 📦 Project Structure

```
gts/
├── laravel/                  # Backend API (Laravel 11)
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       ├── AuthController.php              # Authentication
│   │   │       ├── GraduateController.php          # Graduate CRUD
│   │   │       ├── SurveyController.php            # Survey management
│   │   │       ├── SurveyResponseController.php    # Survey responses
│   │   │       ├── EmploymentController.php        # Employment data
│   │   │       ├── AnalyticsController.php         # Analytics & reports
│   │   │       ├── GraduateProfileController.php   # Graduate portal
│   │   │       ├── AdminResourcesController.php    # Admin resources
│   │   │       └── SuperAdminController.php        # Super admin
│   │   └── Models/
│   │       ├── User.php                            # User model
│   │       ├── Graduate.php                        # Graduate model
│   │       ├── Survey.php                          # Survey model
│   │       ├── SurveyResponse.php                  # Response model
│   │       └── Employment.php                      # Employment model
│   ├── database/
│   │   ├── migrations/                             # Database migrations
│   │   └── seeders/                                # Database seeders
│   ├── routes/
│   │   └── api.php                                 # API routes (100+ endpoints)
│   └── .env                                        # Backend environment
│
├── frontend/                 # React Frontend (TypeScript)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx                       # Admin dashboard
│   │   │   ├── Analytics.tsx                       # Analytics page
│   │   │   ├── Reports.tsx                         # Reports page
│   │   │   ├── Settings.tsx                        # Settings page
│   │   │   ├── Login.tsx                           # Unified login
│   │   │   ├── graduates/                          # Graduate pages
│   │   │   │   ├── GraduateList.tsx
│   │   │   │   ├── GraduateForm.tsx
│   │   │   │   └── AddGraduate.tsx
│   │   │   ├── surveys/                            # Survey pages
│   │   │   │   ├── SurveyList.tsx
│   │   │   │   ├── SurveyForm.tsx
│   │   │   │   └── SurveyResponses.tsx
│   │   │   ├── admin/                              # Admin resource mgmt
│   │   │   │   ├── JobsManagement.tsx
│   │   │   │   ├── CareerServicesManagement.tsx
│   │   │   │   ├── SupportTicketsManagement.tsx
│   │   │   │   └── EmploymentSurveysManagement.tsx
│   │   │   ├── graduate-portal/                    # Graduate portal
│   │   │   │   ├── GraduateDashboard.tsx
│   │   │   │   ├── GraduateRegister.tsx
│   │   │   │   ├── EmploymentSurvey.tsx
│   │   │   │   ├── CareerUpdates.tsx
│   │   │   │   ├── Notifications.tsx
│   │   │   │   ├── SurveyHistory.tsx
│   │   │   │   ├── TakeSurvey.tsx
│   │   │   │   ├── PrivacySettings.tsx
│   │   │   │   ├── AlumniResources.tsx
│   │   │   │   ├── FeedbackSupport.tsx
│   │   │   │   ├── GraduateSettings.tsx
│   │   │   │   ├── ResumeBuilder.tsx
│   │   │   │   └── ForgotPassword.tsx
│   │   │   └── superadmin/                         # Super admin
│   │   │       ├── SuperAdminDashboard.tsx
│   │   │       ├── UserManagement.tsx
│   │   │       ├── AdminManagement.tsx
│   │   │       ├── DatabaseManagement.tsx
│   │   │       └── SystemSettings.tsx
│   │   ├── components/
│   │   │   ├── layout/                             # Layout components
│   │   │   │   ├── MainLayout.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── GraduatePortalLayout.tsx
│   │   │   ├── graduate/                           # Graduate components
│   │   │   │   ├── GraduatePortalHeader.tsx
│   │   │   │   ├── ChatBot.tsx
│   │   │   │   └── chatbot/                        # AI Chatbot
│   │   │   │       ├── chatbotService.ts
│   │   │   │       ├── intentDetector.ts
│   │   │   │       ├── knowledgeBase.ts
│   │   │   │       ├── conversationManager.ts
│   │   │   │       ├── aiProviders.ts
│   │   │   │       ├── aiEnhancedService.ts
│   │   │   │       ├── types.ts
│   │   │   │       └── debugger.ts
│   │   │   ├── resume/                             # Resume builder
│   │   │   │   └── OxfordResumeTemplate.tsx
│   │   │   ├── ui/                                 # ShadCN UI components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── toast.tsx
│   │   │   │   └── ... (20+ components)
│   │   │   └── ProtectedRoute.tsx                  # Route protection
│   │   ├── services/                               # API services
│   │   │   ├── api.ts                              # Axios instance
│   │   │   ├── auth.service.ts                     # Auth API
│   │   │   ├── graduate.service.ts                 # Graduate API
│   │   │   ├── survey.service.ts                   # Survey API
│   │   │   └── analytics.service.ts                # Analytics API
│   │   ├── types/                                  # TypeScript types
│   │   │   ├── auth.types.ts
│   │   │   ├── graduate.types.ts
│   │   │   ├── survey.types.ts
│   │   │   └── analytics.types.ts
│   │   ├── contexts/                               # React contexts
│   │   │   ├── AuthContext.tsx                     # Auth state
│   │   │   └── ThemeContext.tsx                    # Dark mode
│   │   ├── hooks/                                  # Custom hooks
│   │   │   └── use-toast.ts
│   │   ├── App.tsx                                 # Main app
│   │   └── main.tsx                                # Entry point
│   ├── package.json                                # Dependencies
│   ├── vite.config.ts                              # Vite config
│   ├── tailwind.config.js                          # Tailwind config
│   └── .env                                        # Frontend environment
│
└── docs/                     # Documentation
    ├── README.md                                   # This file
    ├── INSTALLATION.md
    ├── API_REFERENCE.md
    ├── DEPLOYMENT_GUIDE.md
    ├── AI_SETUP_GUIDE.md
    ├── RESUME_BUILDER_GUIDE.md
    ├── DARK_MODE_GUIDE.md
    ├── SUPERADMIN_MODULE.md
    └── ARCHITECTURE.md
```

---

## 🚀 Deployment

### Quick Deploy (Hostinger/cPanel)

1. **Backend**: Upload `laravel/` to `public_html/api/`
2. **Frontend**: Build (`npm run build`) → Upload `dist/` to `public_html/`
3. **Database**: Create MySQL DB, update `.env`, run migrations
4. **Environment**: Set production variables in `.env`

Detailed guide: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 🤝 Contributing

Contributions welcome! Please follow:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

**Commit format:** `type(scope): subject` (e.g., `feat(surveys): add export`)

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file.

**TL;DR:** Free to use, modify, and distribute. No warranty provided.

---

## 👨‍💻 Author

**Hans Christian Delos Santos**  
<img src="https://img.shields.io/badge/-Saint_Joseph_College_of_Baggao-2563EB?style=flat-square&logo=googlescholar&logoColor=white" />  
<img src="https://img.shields.io/badge/-Email-EA4335?style=flat-square&logo=gmail&logoColor=white" /> delossantoshanschristian@sjcbi.edu.ph  
<img src="https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github&logoColor=white" /> [@hans919](https://github.com/hans919)

---

## 🌟 Support

<img src="https://img.shields.io/badge/-Star_this_repo-FFD700?style=flat-square&logo=github&logoColor=black" /> If you find this project useful!

- <img src="https://img.shields.io/badge/-Report_Bug-DC143C?style=flat-square&logo=bugcrowd&logoColor=white" /> [Submit an Issue](https://github.com/hans919/gts/issues)
- <img src="https://img.shields.io/badge/-Request_Feature-32CD32?style=flat-square&logo=rocket&logoColor=white" /> [Feature Request](https://github.com/hans919/gts/issues)
- <img src="https://img.shields.io/badge/-Discussions-9370DB?style=flat-square&logo=discourse&logoColor=white" /> [Community Forum](https://github.com/hans919/gts/discussions)

---

<div align="center">

**Built for Educational Excellence**

[![Laravel](https://img.shields.io/badge/Built_with-Laravel-FF2D20?style=flat-square&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/Built_with-React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/Built_with-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Built_with-TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![MySQL](https://img.shields.io/badge/Built_with-MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://mysql.com)

**Graduate Tracking System © 2025 - Saint Joseph College of Baggao**

</div>
