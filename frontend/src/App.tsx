import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from './components/ui/toaster';
import GraduateList from './pages/graduates/GraduateList';
import AddGraduate from './pages/graduates/AddGraduate';
import GraduateForm from './pages/graduates/GraduateForm';
import SurveyList from './pages/surveys/SurveyList';
import SurveyForm from './pages/surveys/SurveyForm';
import SurveyResponses from './pages/surveys/SurveyResponses';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

// Graduate Portal
import GraduateRegister from './pages/graduate-portal/GraduateRegister';
import ForgotPassword from './pages/graduate-portal/ForgotPassword';
import ResetPassword from './pages/graduate-portal/ResetPassword';
import GraduateDashboard from './pages/graduate-portal/GraduateDashboard';
import EmploymentSurvey from './pages/graduate-portal/EmploymentSurvey';
import CareerUpdates from './pages/graduate-portal/CareerUpdates';
import Notifications from './pages/graduate-portal/Notifications';
import SurveyHistory from './pages/graduate-portal/SurveyHistory';
import TakeSurvey from './pages/graduate-portal/TakeSurvey';
import PrivacySettings from './pages/graduate-portal/PrivacySettings';
import AlumniResources from './pages/graduate-portal/AlumniResources';
import FeedbackSupport from './pages/graduate-portal/FeedbackSupport';
import GraduateSettings from './pages/graduate-portal/GraduateSettings';
import ResumeBuilder from './pages/graduate-portal/ResumeBuilder';
import GraduatePortalLayout from './components/layout/GraduatePortalLayout';

// Admin Management Pages
import JobsManagement from './pages/admin/JobsManagement';
import CareerServicesManagement from './pages/admin/CareerServicesManagement';
import SupportTicketsManagement from './pages/admin/SupportTicketsManagement';
import EmploymentSurveysManagement from './pages/admin/EmploymentSurveysManagement';

// SuperAdmin Pages
import SuperAdminLayout from './pages/superadmin/SuperAdminLayout';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import UserManagement from './pages/superadmin/UserManagement';
import AdminManagement from './pages/superadmin/AdminManagement';
import SystemSettings from './pages/superadmin/SystemSettings';
import DatabaseManagement from './pages/superadmin/DatabaseManagement';

function App() {
  return (
    <>
    <Routes>
      {/* Default Route - Redirect to Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Unified Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<GraduateRegister />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><MainLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="graduates" element={<GraduateList />} />
        <Route path="graduates/new" element={<AddGraduate />} />
        <Route path="graduates/:id/edit" element={<GraduateForm />} />
        <Route path="surveys" element={<SurveyList />} />
        <Route path="surveys/new" element={<SurveyForm />} />
        <Route path="surveys/:id/edit" element={<SurveyForm />} />
        <Route path="surveys/:id/responses" element={<SurveyResponses />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="jobs" element={<JobsManagement />} />
        <Route path="career-services" element={<CareerServicesManagement />} />
        <Route path="support-tickets" element={<SupportTicketsManagement />} />
        <Route path="employment-surveys" element={<EmploymentSurveysManagement />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Super Admin Routes */}
      <Route path="/superadmin" element={<ProtectedRoute allowedRoles={['super_admin']}><SuperAdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/superadmin/dashboard" replace />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="admins" element={<AdminManagement />} />
        <Route path="database" element={<DatabaseManagement />} />
        <Route path="settings" element={<SystemSettings />} />
      </Route>

      {/* Graduate Portal Routes */}
      <Route path="/graduate/dashboard" element={<ProtectedRoute allowedRoles={['graduate']}><GraduatePortalLayout><GraduateDashboard /></GraduatePortalLayout></ProtectedRoute>} />
      <Route path="/graduate/survey" element={<ProtectedRoute allowedRoles={['graduate']}><GraduatePortalLayout><EmploymentSurvey /></GraduatePortalLayout></ProtectedRoute>} />
      <Route path="/graduate/career-updates" element={<ProtectedRoute allowedRoles={['graduate']}><GraduatePortalLayout><CareerUpdates /></GraduatePortalLayout></ProtectedRoute>} />
      <Route path="/graduate/notifications" element={<ProtectedRoute allowedRoles={['graduate']}><GraduatePortalLayout><Notifications /></GraduatePortalLayout></ProtectedRoute>} />
      <Route path="/graduate/survey-history" element={<ProtectedRoute allowedRoles={['graduate']}><GraduatePortalLayout><SurveyHistory /></GraduatePortalLayout></ProtectedRoute>} />
      <Route path="/graduate/take-survey/:id" element={<ProtectedRoute allowedRoles={['graduate']}><GraduatePortalLayout><TakeSurvey /></GraduatePortalLayout></ProtectedRoute>} />
      <Route path="/graduate/privacy" element={<ProtectedRoute allowedRoles={['graduate']}><GraduatePortalLayout><PrivacySettings /></GraduatePortalLayout></ProtectedRoute>} />
      <Route path="/graduate/resources" element={<ProtectedRoute allowedRoles={['graduate']}><GraduatePortalLayout><AlumniResources /></GraduatePortalLayout></ProtectedRoute>} />
      <Route path="/graduate/support" element={<ProtectedRoute allowedRoles={['graduate']}><GraduatePortalLayout><FeedbackSupport /></GraduatePortalLayout></ProtectedRoute>} />
      <Route path="/graduate/settings" element={<ProtectedRoute allowedRoles={['graduate']}><GraduatePortalLayout><GraduateSettings /></GraduatePortalLayout></ProtectedRoute>} />
      <Route path="/graduate/resume-builder" element={<ProtectedRoute allowedRoles={['graduate']}><GraduatePortalLayout><ResumeBuilder /></GraduatePortalLayout></ProtectedRoute>} />
    </Routes>
    <Toaster />
  </>
  );
}

export default App;
