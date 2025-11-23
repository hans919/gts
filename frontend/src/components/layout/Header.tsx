import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, User, LogOut, Settings, ChevronDown, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface HeaderProps {
  onMenuClick: () => void;
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export default function Header({ onMenuClick, user }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Clear session storage as well
    sessionStorage.clear();
    // Use replace to prevent back navigation
    navigate('/login', { replace: true });
    // Force reload to clear any cached state
    window.location.reload();
  };

  return (
    <>
    <header 
      className="border-b border-border sticky top-0 z-40 transition-colors duration-200"
      style={{ 
        backgroundColor: theme === 'dark' ? 'hsl(240 10% 3.9%)' : '#457507'
      }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden text-white hover:bg-white/10"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-white">SJCB Tracer System</h1>
            <p className="text-xs text-white/80 hidden sm:block">Track and manage alumni data</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-white hover:bg-white/10"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center" variant="destructive">
              3
            </Badge>
          </Button>

          {/* User Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 text-white hover:bg-white/10"
            >
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-white/80 capitalize">{user.role}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <ChevronDown className="h-4 w-4 text-white" />
            </Button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg border bg-popover p-1 shadow-md z-50">
                <div className="px-3 py-2 border-b">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
                </div>
                
                <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Button>
                
                <div className="my-1 h-px bg-border" />
                
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowDropdown(false);
                    setShowLogoutDialog(true);
                  }}
                  className="w-full justify-start gap-2 font-normal text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </header>
    
    {/* Logout Confirmation Dialog - Outside header to prevent unmounting */}
    <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout? You will need to sign in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
