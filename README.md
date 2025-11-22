<div align="center">

<img src="https://img.shields.io/badge/GTS-Graduate_Tracker-2563eb?style=for-the-badge" alt="GTS" height="60"/>

# SJCB Graduate Tracking System

**Track alumni careers. Drive outcomes. Make data-driven decisions.**

Modern platform for educational institutions to manage graduate data, track employment, and analyze career outcomes.

[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat-square&logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[Quick Start](#-quick-start) · [Features](#-features) · [Docs](#-documentation) · [Demo](#-demo)

</div>

---

## 🎯 What It Does

<table>
<tr>
<td width="50%">

### For Administrators
✅ Manage graduate records with advanced search  
✅ Create custom surveys with 5+ question types  
✅ View real-time analytics & employment trends  
✅ Post jobs, resources, and training programs  
✅ Export reports (CSV, PDF)  

</td>
<td width="50%">

### For Graduates
✅ Update profile & employment status  
✅ Complete surveys & track history  
✅ Browse job opportunities & resources  
✅ Receive real-time notifications  
✅ Manage privacy settings  

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

**Access:**  
🔹 Frontend: `http://localhost:5173`  
🔹 Backend: `http://127.0.0.1:8000`

**Default Login:**  
📧 `admin@test.com` / 🔑 `password123`

---

## ✨ Features

### 📊 Analytics Dashboard
- Live employment rate tracking
- Salary distribution charts
- Graduate trends by year
- Interactive visualizations (Recharts)

### 📝 Dynamic Survey System
- Multiple question types (text, radio, checkbox, select, textarea)
- Auto-notifications to graduates
- Response tracking & analytics
- Export capabilities

### 🔔 Real-Time Notifications
- Auto-refresh every 10 seconds
- Clickable notifications (route to relevant pages)
- Mark as read/delete functionality
- Badge indicators for unread count

### 🎨 Modern UI
- ShadCN UI components
- Tailwind CSS styling
- Fully responsive (mobile, tablet, desktop)
- Dark mode support
- Smooth animations

### 🔐 Security
- Laravel Sanctum authentication
- Role-based access control
- Bcrypt password hashing
- CORS protection
- API rate limiting

---

## 🛠 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Backend** | Laravel 12, PHP 8.2+, MySQL/SQLite |
| **Frontend** | React 18, TypeScript, Vite 5 |
| **UI** | ShadCN UI, Tailwind CSS, Lucide Icons |
| **Charts** | Recharts |
| **Auth** | Laravel Sanctum |
| **Forms** | React Hook Form, Zod |

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
🎓 San Jose Community College  
📧 delossantoshanschristian@sjcbi.edu.ph  
💼 [@hans919](https://github.com/hans919)

---

## 🌟 Support

⭐ Star this repo if you find it useful!

- 🐛 [Report Bug](https://github.com/hans919/gts/issues)
- 💡 [Request Feature](https://github.com/hans919/gts/issues)
- 💬 [Discussions](https://github.com/hans919/gts/discussions)

---

<div align="center">

**Built with ❤️ for Educational Excellence**

[![Laravel](https://img.shields.io/badge/Built_with-Laravel-FF2D20?style=flat-square&logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/Built_with-React-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/Built_with-TypeScript-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)

Graduate Tracking System © 2025

</div>
