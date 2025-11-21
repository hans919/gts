# 🚀 Graduate Portal - Quick Start

## What's New?

A complete **Graduate Self-Service Portal** has been added to your system! Graduates can now:
- ✅ Register and create their own accounts
- ✅ Login to their personal dashboard
- ✅ Update their profile information
- ✅ Complete employment tracer surveys
- ✅ Log career updates (promotions, job changes, etc.)

## 🔗 Access Points

### For Graduates
- **Registration**: http://localhost:5173/graduate/register
- **Login**: http://localhost:5173/graduate/login
- **Dashboard**: http://localhost:5173/graduate/dashboard

### For Administrators
- **Admin Login**: http://localhost:5173/login (existing)
- Link to graduate portal is available on the admin login page

## 📄 Pages Created

### Authentication (7 files)
1. `GraduateLogin.tsx` - Login page
2. `GraduateRegister.tsx` - Registration with validation
3. `ForgotPassword.tsx` - Password reset request
4. `ResetPassword.tsx` - Password reset confirmation
5. `GraduateDashboard.tsx` - Main dashboard with profile editing
6. `EmploymentSurvey.tsx` - Comprehensive employment survey
7. `CareerUpdates.tsx` - Career status tracking

## 🎨 UI Components

All pages use **official shadcn/ui** components:
- Button, Input, Label, Textarea
- Card, Badge
- Form validation & error handling
- Responsive design (mobile, tablet, desktop)

## 🛣️ Routes Added to App.tsx

```typescript
// Graduate Portal Routes
/graduate/login              → Login
/graduate/register           → Register
/graduate/forgot-password    → Forgot Password
/graduate/reset-password     → Reset Password
/graduate/dashboard          → Dashboard (protected)
/graduate/survey            → Employment Survey (protected)
/graduate/career-updates    → Career Updates (protected)
```

## 🔐 Authentication

### Token Storage
- Graduate tokens: `graduate_token` and `graduate_user` in localStorage
- Admin tokens: `token` and `user` in localStorage (unchanged)

## ⚙️ Backend Requirements

You'll need to create these Laravel API endpoints:

### Authentication
```
POST /api/graduate/register
POST /api/graduate/login
POST /api/graduate/forgot-password
POST /api/graduate/reset-password
```

### Profile
```
GET  /api/graduate/profile
PUT  /api/graduate/profile
```

### Surveys
```
GET  /api/graduate/surveys
POST /api/graduate/surveys
```

### Career Updates
```
GET    /api/graduate/career-updates
POST   /api/graduate/career-updates
PUT    /api/graduate/career-updates/{id}
DELETE /api/graduate/career-updates/{id}
```

## 📊 Database Tables Needed

### employment_surveys
```sql
- id
- graduate_id (FK to graduates)
- employment_status
- company_name
- job_title
- industry
- job_type
- start_date
- monthly_salary
- salary_currency
- job_location_city
- job_location_country
- is_related_to_course
- job_finding_duration_months
- job_finding_method
- skills_acquired_in_college
- additional_trainings
- job_satisfaction
- career_goals
- further_education_plans
- comments
- created_at
- updated_at
```

### career_updates
```sql
- id
- graduate_id (FK to graduates)
- update_type
- company_name
- job_title
- description
- effective_date
- created_at
- updated_at
```

## 🧪 Test It Out

### Quick Test Flow
1. **Start the frontend**: `npm run dev` in `frontend/` folder
2. **Start the backend**: `php artisan serve` in `laravel/` folder
3. **Open browser**: http://localhost:5173/graduate/register
4. **Register** a test graduate account
5. **Login** with the credentials
6. **Explore** the dashboard, survey, and career updates

## 📖 Documentation

Full documentation available in:
- `GRADUATE_PORTAL_GUIDE.md` - Complete implementation guide
- `API_REFERENCE.md` - API endpoints (to be updated)

## 🎯 Features Highlights

### Graduate Registration
- Student ID validation
- Password strength requirements
- Email verification (placeholder)
- Form validation with TypeScript

### Graduate Dashboard
- Profile overview with avatar
- Editable profile sections
- Quick action cards
- Responsive layout

### Employment Survey
- Conditional fields based on employment status
- Comprehensive career tracking
- Survey history display
- Multiple employment statuses supported

### Career Updates
- Timeline view of career progression
- Multiple update types (promotion, new job, etc.)
- Color-coded badges
- Add/edit/delete functionality

## 🚀 Next Steps

1. **Backend Implementation**
   - Create Laravel API controllers
   - Set up database migrations
   - Configure authentication guards
   - Add email notifications

2. **Testing**
   - Test all authentication flows
   - Verify form validations
   - Check responsive design
   - Cross-browser testing

3. **Deployment**
   - Configure production API URLs
   - Set up email service
   - Enable HTTPS
   - Configure CORS

## 💡 Tips

- All forms have built-in validation
- Error messages are user-friendly
- Loading states show during API calls
- Responsive design works on all devices
- Icons from Lucide React enhance UX

## 🐛 Common Issues

**Issue**: Can't login
- **Solution**: Ensure backend API is running and CORS is configured

**Issue**: Forms not submitting
- **Solution**: Check browser console for API errors

**Issue**: Pages not found
- **Solution**: Restart the Vite dev server (`npm run dev`)

## 📞 Support

For questions or issues:
1. Check `GRADUATE_PORTAL_GUIDE.md` for detailed documentation
2. Review browser console for errors
3. Verify API endpoints are working

---

**Graduate Portal v1.0**  
*Built with React, TypeScript, and shadcn/ui*
