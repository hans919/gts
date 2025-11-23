<div align="center">

<img src="https://img.shields.io/badge/GTS-Graduate_Tracker-2563eb?style=for-the-badge" alt="GTS" height="60"/>

# 🎓 SJCB Graduate Tracking System

**Track alumni careers. Drive outcomes. Make data-driven decisions.**

A comprehensive web-based platform designed for educational institutions to efficiently manage graduate data, monitor employment outcomes, conduct surveys, and generate insightful analytics for continuous program improvement.

[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat-square&logo=laravel)](https://laravel.com)
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

The **Graduate Tracking System (GTS)** is a modern, full-stack web application that streamlines the process of tracking and analyzing graduate employment outcomes. Built for San Jose Community College, it provides a dual-interface platform serving both administrators and graduates.

### 🎯 System Purpose

<table>
<tr>
<td width="50%">

### 👨‍💼 For Administrators
<img src="https://img.shields.io/badge/-Graduate_Management-4CAF50?style=flat-square&logo=database&logoColor=white" />  
Complete CRUD operations for graduate records with advanced filtering and search

<img src="https://img.shields.io/badge/-Survey_Builder-2196F3?style=flat-square&logo=checkmarx&logoColor=white" />  
Create dynamic surveys with multiple question types and auto-distribution

<img src="https://img.shields.io/badge/-Analytics_Dashboard-FF9800?style=flat-square&logo=chartdotjs&logoColor=white" />  
Real-time insights into employment rates, salaries, and trends

<img src="https://img.shields.io/badge/-Resource_Management-9C27B0?style=flat-square&logo=briefcase&logoColor=white" />  
Post job opportunities, training programs, and career services

<img src="https://img.shields.io/badge/-Data_Export-F44336?style=flat-square&logo=microsoftexcel&logoColor=white" />  
Generate comprehensive reports in CSV and PDF formats

</td>
<td width="50%">

### 🎓 For Graduates
<img src="https://img.shields.io/badge/-Profile_Management-3F51B5?style=flat-square&logo=user&logoColor=white" />  
Update personal information and employment status with photo upload

<img src="https://img.shields.io/badge/-Survey_Participation-00BCD4?style=flat-square&logo=clipboard&logoColor=white" />  
Complete employment surveys and track submission history

<img src="https://img.shields.io/badge/-Career_Updates-8BC34A?style=flat-square&logo=trendingup&logoColor=white" />  
Log job changes, promotions, and career milestones

<img src="https://img.shields.io/badge/-Resource_Access-FF5722?style=flat-square&logo=compass&logoColor=white" />  
Browse job postings, training programs, and alumni services

<img src="https://img.shields.io/badge/-Notifications-FFC107?style=flat-square&logo=bell&logoColor=white" />  
Real-time updates on surveys, events, and opportunities

<img src="https://img.shields.io/badge/-Privacy_Control-607D8B?style=flat-square&logo=shield&logoColor=white" />  
Manage data sharing preferences and account settings

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
- **Job Board** - Browse curated job opportunities from employers
- **Resource Center** - Access training programs and career services
- **Privacy Dashboard** - Control data sharing and notification preferences

### <img src="https://img.shields.io/badge/-Modern_UI-A8E6CF?style=flat-square&logo=tailwindcss&logoColor=black" /> User Interface
- **Component Library** - Built with ShadCN UI for consistency and accessibility
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark Mode** - System-wide theme toggle with preference persistence
- **Icon System** - Lucide React icons throughout for visual clarity
- **Smooth Animations** - Framer Motion for delightful interactions

### <img src="https://img.shields.io/badge/-Security-FF6B9D?style=flat-square&logo=lock&logoColor=white" /> Security & Authentication
- **Token-Based Auth** - Laravel Sanctum SPA authentication
- **Role-Based Access** - Administrator and graduate permission levels
- **Password Security** - Bcrypt hashing with Laravel's encryption
- **CORS Protection** - Configured cross-origin resource sharing
- **Rate Limiting** - API throttling to prevent abuse
- **Session Management** - Secure session handling and automatic timeout

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
| [Graduate Portal Guide](GRADUATE_PORTAL_GUIDE.md) | User documentation |
| [Quick Start](QUICK_START.md) | Get running in 5 minutes |

---

## 🌐 API Highlights

```javascript
// Authentication
POST   /api/login
POST   /api/logout

// Graduates
GET    /api/graduates
POST   /api/graduates
PUT    /api/graduates/{id}
DELETE /api/graduates/{id}

// Surveys
GET    /api/surveys
POST   /api/surveys
GET    /api/surveys/{id}/responses

// Analytics
GET    /api/analytics/dashboard
GET    /api/analytics/employment-status
GET    /api/analytics/salary-distribution

// Graduate Portal
GET    /api/graduate/profile
PUT    /api/graduate/profile
POST   /api/graduate/profile-photo
GET    /api/graduate/notifications
POST   /api/graduate/submit-survey-response
```

**Full API docs:** [API_REFERENCE.md](API_REFERENCE.md)

---

## 📦 Project Structure

```
gts/
├── laravel/              # Backend API
│   ├── app/Http/Controllers/
│   ├── app/Models/
│   ├── database/migrations/
│   ├── routes/api.php
│   └── .env
├── frontend/             # React frontend
│   ├── src/
│   │   ├── pages/       # Admin & graduate pages
│   │   ├── components/  # ShadCN UI components
│   │   └── services/    # API service
│   ├── package.json
│   └── vite.config.ts
└── docs/                 # Documentation
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
<img src="https://img.shields.io/badge/-San_Jose_Community_College-2563EB?style=flat-square&logo=googlescholar&logoColor=white" />  
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

**Graduate Tracking System © 2025 - San Jose Community College**

</div>
