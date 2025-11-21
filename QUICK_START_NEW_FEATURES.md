# Quick Start Guide - Graduate Portal New Features

## 🚀 Getting Started

### Prerequisites
- XAMPP with Apache and MySQL running
- Node.js installed
- Laravel backend already set up
- Frontend development environment ready

### Step 1: Start Backend Server
```powershell
cd c:\xampp\htdocs\gts\laravel
php artisan serve
```
Backend will run at: **http://127.0.0.1:8000**

### Step 2: Start Frontend Development Server
```powershell
cd c:\xampp\htdocs\gts\frontend
npm run dev
```
Frontend will run at: **http://localhost:5173**

### Step 3: Login as Graduate
1. Navigate to: http://localhost:5173/login
2. Use test credentials:
   - **Email**: `graduate@test.com`
   - **Password**: `password123`
3. You'll be redirected to: `/graduate/dashboard`

---

## 📱 New Features Overview

### 1. Notifications & Reminders
**URL**: `/graduate/notifications`

**Access from Dashboard**: Click "Notifications" card

**Features**:
- View all notifications
- Filter by type (Survey, Announcement, Event, Reminder)
- Mark as read/unread
- Delete notifications
- Priority badges (High, Medium, Low)
- Click action buttons to navigate to related pages

---

### 2. Survey History & Status
**URL**: `/graduate/survey-history`

**Access from Dashboard**: Click "Survey History" card

**Features**:
- View statistics (Total, Completed, Pending, Completion Rate)
- See pending surveys with due dates
- Review completed surveys
- Track completion progress

---

### 3. Privacy & Data Settings
**URL**: `/graduate/privacy`

**Access from Dashboard**: Click "Privacy Settings" card

**Features**:
- **Data Sharing**:
  - Toggle employment data sharing
  - Control contact info visibility
  - Enable/disable employer access
  - Alumni network participation
  
- **Notifications**:
  - Job alerts on/off
  - Event notifications
  - Survey reminders
  
- **Profile Visibility**:
  - Public (anyone)
  - Alumni Only (verified alumni)
  - Private (you + admins only)
  
- **Data Management**:
  - Download all your data (JSON export)
  - Delete account (with confirmation)

---

### 4. Alumni Resources
**URL**: `/graduate/resources`

**Access from Dashboard**: Click "Alumni Resources" card

**Features**:
- **Job Board**:
  - Browse job postings
  - Search by keywords
  - Filter by type (Full-time, Part-time, Contract, Internship)
  - Bookmark jobs
  - Apply via external links
  
- **Career Services**:
  - Career counseling
  - Resume review
  - Interview prep
  - Contact details
  
- **Training Programs**:
  - Professional development courses
  - View duration and schedule
  - Register for programs

---

### 5. Feedback & Support
**URL**: `/graduate/support`

**Access from Dashboard**: Click "Support & Feedback" card

**Features**:
- **Submit Tickets**:
  - Choose category (Technical, Account, Survey, Feedback, Feature, Other)
  - Set priority (Low, Medium, High)
  - Add description
  - Attach files (optional)
  
- **Track Tickets**:
  - View all your tickets
  - See status (Open, In Progress, Resolved, Closed)
  - Read admin responses
  
- **Quick Contact**:
  - Support email and phone
  - Office hours

---

## 🎨 Navigation Flow

### From Dashboard
```
Graduate Dashboard
├── Employment Survey
├── Career Updates
├── Notifications          ← NEW
├── Survey History         ← NEW
├── Privacy Settings       ← NEW
├── Alumni Resources       ← NEW
└── Support & Feedback     ← NEW
```

### Direct URLs
- Dashboard: `/graduate/dashboard`
- Notifications: `/graduate/notifications`
- Survey History: `/graduate/survey-history`
- Privacy: `/graduate/privacy`
- Resources: `/graduate/resources`
- Support: `/graduate/support`

---

## 🔧 Testing Features

### Notifications
1. Go to `/graduate/notifications`
2. See mock notifications (survey reminders, announcements)
3. Try filtering by type
4. Mark notifications as read
5. Delete a notification

### Survey History
1. Go to `/graduate/survey-history`
2. View statistics dashboard
3. Check pending surveys
4. Review completed surveys

### Privacy Settings
1. Go to `/graduate/privacy`
2. Toggle various privacy switches
3. Change profile visibility
4. Click "Save Changes"
5. Try "Download My Data"
6. (Optional) Test "Delete Account" with careful confirmation

### Alumni Resources
1. Go to `/graduate/resources`
2. Browse job postings
3. Search for specific jobs
4. Filter by job type
5. Bookmark a job
6. Switch to "Career Services" tab
7. Switch to "Training" tab
8. Click external links

### Support & Feedback
1. Go to `/graduate/support`
2. Click "New Ticket"
3. Fill out the form
4. Attach a file (optional)
5. Submit ticket
6. View your tickets list
7. Check ticket status and admin responses

---

## 📊 API Endpoints

All endpoints require authentication token in header:
```
Authorization: Bearer {token}
```

### Notifications
- `GET /api/graduate/notifications` - Fetch notifications
- `PUT /api/graduate/notifications/{id}/read` - Mark as read
- `DELETE /api/graduate/notifications/{id}` - Delete

### Survey History
- `GET /api/graduate/survey-history` - Get stats and history

### Privacy Settings
- `GET /api/graduate/privacy-settings` - Fetch settings
- `PUT /api/graduate/privacy-settings` - Update settings
- `GET /api/graduate/export-data` - Export data
- `DELETE /api/graduate/account` - Delete account

### Alumni Resources
- `GET /api/graduate/jobs` - Fetch jobs
- `POST /api/graduate/jobs/{id}/bookmark` - Toggle bookmark
- `GET /api/graduate/career-services` - Fetch services
- `GET /api/graduate/training-programs` - Fetch training

### Support
- `GET /api/graduate/support-tickets` - Fetch tickets
- `POST /api/graduate/support-tickets` - Create ticket

---

## 🐛 Troubleshooting

### Frontend not loading?
1. Check if Vite server is running: `npm run dev`
2. Check for TypeScript errors in console
3. Clear browser cache and reload

### API requests failing?
1. Verify Laravel server is running: `php artisan serve`
2. Check XAMPP MySQL is running
3. Verify token is stored in localStorage
4. Check browser console for errors

### Not seeing data?
- Current implementation uses **mock data** for demonstration
- See `GRADUATE_PORTAL_FEATURES.md` for production database setup
- All features work with mock data for testing

### Login issues?
1. Clear localStorage: `localStorage.clear()`
2. Try test credentials: `graduate@test.com` / `password123`
3. Verify you're using `/login` (not `/graduate/login`)

---

## 📝 Development Notes

### Mock Data
All new features use mock data currently. This allows:
- Immediate testing without database setup
- Demonstration of UI/UX
- Easy modification for different scenarios

### Production Ready
To deploy to production:
1. Create database tables (see `GRADUATE_PORTAL_FEATURES.md`)
2. Update controller methods to use database queries
3. Implement file upload handling
4. Add email notifications
5. Set up real-time notification system

### Code Quality
- ✅ Zero TypeScript compilation errors
- ✅ All imports optimized
- ✅ Consistent code style
- ✅ shadcn/ui components throughout
- ✅ Responsive design (mobile-friendly)
- ✅ Role-based access control
- ✅ Proper error handling

---

## 🎯 Next Steps

1. **Test all features** using this guide
2. **Review code** in the new page files
3. **Customize** mock data for your needs
4. **Set up database** for production (see documentation)
5. **Add admin features** to manage resources
6. **Implement notifications** system
7. **Add analytics** tracking

---

## 📚 Documentation

- **Full Feature Documentation**: `GRADUATE_PORTAL_FEATURES.md`
- **Project Summary**: `PROJECT_SUMMARY.md`
- **API Reference**: `API_REFERENCE.md`
- **Installation Guide**: `INSTALLATION.md`

---

## 💡 Tips

- Use browser DevTools to inspect API calls
- Check Network tab for request/response details
- Use React DevTools to debug component state
- Check Laravel logs: `laravel/storage/logs/laravel.log`
- Use `console.log()` for frontend debugging

---

## ✅ Feature Checklist

Test each feature and check off:

- [ ] Login as graduate successfully
- [ ] Navigate to dashboard
- [ ] Access Notifications page
- [ ] Filter and manage notifications
- [ ] View Survey History
- [ ] Update Privacy Settings
- [ ] Browse Alumni Resources (all 3 tabs)
- [ ] Submit a support ticket
- [ ] Navigate between all pages
- [ ] Logout and login again

---

**Happy Testing!** 🎉

For issues or questions, check the documentation files or submit a support ticket in the app!
