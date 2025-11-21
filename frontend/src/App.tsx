import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import GraduateList from './pages/graduates/GraduateList';
import AddGraduate from './pages/graduates/AddGraduate';
import GraduateForm from './pages/graduates/GraduateForm';
import SurveyList from './pages/surveys/SurveyList';
import SurveyForm from './pages/surveys/SurveyForm';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="graduates" element={<GraduateList />} />
        <Route path="graduates/new" element={<AddGraduate />} />
        <Route path="graduates/:id/edit" element={<GraduateForm />} />
        <Route path="surveys" element={<SurveyList />} />
        <Route path="surveys/new" element={<SurveyForm />} />
        <Route path="surveys/:id/edit" element={<SurveyForm />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
