import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  UserCog,
  Database
} from 'lucide-react';
import { useState } from 'react';

export default function SuperAdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/superadmin/dashboard', icon: BarChart3, label: 'Dashboard' },
    { to: '/superadmin/users', icon: Users, label: 'User Management' },
    { to: '/superadmin/admins', icon: UserCog, label: 'Admin Management' },
    { to: '/superadmin/database', icon: Database, label: 'Database' },
    { to: '/superadmin/settings', icon: Settings, label: 'System Settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-red-600 to-red-800 text-white transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-red-700">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8" />
              <div>
                <h1 className="font-bold text-lg">SuperAdmin</h1>
                <p className="text-xs text-red-200">GTS Control Panel</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-green-700"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <item.icon className="h-5 w-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-green-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-green-700 flex items-center justify-center">
              <Shield className="h-5 w-5" />
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="font-medium text-sm">{user?.name}</p>
                <p className="text-xs text-green-200">{user?.email}</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-white hover:bg-green-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {sidebarOpen && 'Logout'}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
