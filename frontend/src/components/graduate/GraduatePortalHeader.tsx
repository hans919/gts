import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Bell, ChevronDown, Moon, Sun, CheckCircle, Trash2, Settings, LogOut, Edit } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
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
import axios from 'axios';

interface GraduateProfile {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  program: string;
  major: string;
  degree_level: string;
  graduation_year: string;
  graduation_date: string;
  current_status: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  profile_photo?: string;
  profile_photo_url?: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
}

interface GraduatePortalHeaderProps {
  title: string;
  subtitle: string;
  profile?: GraduateProfile | null;
  onProfileUpdate?: () => void;
}

export default function GraduatePortalHeader({ title, subtitle, profile: externalProfile, onProfileUpdate }: GraduatePortalHeaderProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [profile, setProfile] = useState<GraduateProfile | null>(externalProfile || null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!externalProfile) {
      fetchProfile();
    }
    fetchNotifications();

    // Auto-refresh notifications every 10 seconds
    const notificationInterval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => {
      clearInterval(notificationInterval);
    };
  }, []);

  useEffect(() => {
    if (externalProfile) {
      setProfile(externalProfile);
    }
  }, [externalProfile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    if (showNotifications || showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showProfileDropdown]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token || !userStr) {
        navigate('/login');
        return;
      }

      const user = JSON.parse(userStr);
      if (user.role !== 'graduate') {
        navigate('/dashboard');
        return;
      }

      const response = await axios.get('https://lightsteelblue-locust-816886.hostingersite.com/api/graduate/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const profileData = response.data;
      if (profileData.profile_photo_url) {
        profileData.profile_photo_url = profileData.profile_photo_url.replace('http://', 'https://');
      }

      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://lightsteelblue-locust-816886.hostingersite.com/api/graduate/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(response.data);
      const unread = response.data.filter((n: any) => !n.read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://lightsteelblue-locust-816886.hostingersite.com/api/graduate/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const deleteNotification = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://lightsteelblue-locust-816886.hostingersite.com/api/graduate/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'survey': return 'bg-green-100 text-green-800';
      case 'event': return 'bg-green-100 text-green-800';
      case 'reminder': return 'bg-green-100 text-green-800';
      case 'job': return 'bg-green-100 text-green-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const handleLogout = () => {
    setShowLogoutDialog(false);
    setShowProfileDropdown(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    navigate('/login', { replace: true });
    window.location.reload();
  };

  if (!profile) {
    return (
      <header 
        className="border-b shadow-sm sticky top-0 z-30 transition-colors duration-200"
        style={{ backgroundColor: theme === 'dark' ? 'hsl(240 10% 3.9%)' : '#457507' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{title}</h1>
                <p className="text-sm text-white/80">{subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header 
      className="border-b shadow-sm sticky top-0 z-30 transition-colors duration-200"
      style={{ backgroundColor: theme === 'dark' ? 'hsl(240 10% 3.9%)' : '#457507' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{title}</h1>
              <p className="text-sm text-white/80">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <Bell className="h-5 w-5 text-white" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="fixed sm:absolute left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 mt-2 w-auto sm:w-96 bg-popover rounded-lg shadow-xl border z-[60] max-h-[500px] overflow-hidden flex flex-col">
                  <div className="p-3 sm:p-4 border-b bg-muted">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-base sm:text-lg">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-xs text-muted-foreground">{unreadCount} unread</span>
                      )}
                    </div>
                  </div>
                  <div className="overflow-y-auto flex-1">
                    {notifications.length === 0 ? (
                      <div className="p-6 sm:p-8 text-center">
                        <Bell className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">No notifications yet</p>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 sm:p-4 hover:bg-muted/50 transition-colors ${
                              !notification.read ? 'bg-accent' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div 
                                className="flex-1 min-w-0 cursor-pointer"
                                onClick={() => {
                                  if (!notification.read) {
                                    markAsRead(notification.id);
                                  }
                                  setShowNotifications(false);
                                  
                                  // Route based on notification type and content
                                  const notifType = notification.type.toLowerCase();
                                  const notifTitle = notification.title.toLowerCase();
                                  const notifMessage = notification.message.toLowerCase();
                                  
                                  // Check for career service/resource keywords
                                  if (notifTitle.includes('career service') || 
                                      notifTitle.includes('job') || 
                                      notifTitle.includes('training') ||
                                      notifMessage.includes('career service') ||
                                      notifType === 'resource' ||
                                      notifType === 'alumni') {
                                    navigate('/graduate/resources');
                                  }
                                  // Check notification type
                                  else {
                                    switch (notifType) {
                                      case 'job':
                                      case 'job posting':
                                      case 'career':
                                      case 'training':
                                        navigate('/graduate/career-updates');
                                        break;
                                      case 'survey':
                                      case 'employment survey':
                                        navigate('/graduate/survey');
                                        break;
                                      case 'profile':
                                      case 'update':
                                        navigate('/graduate/dashboard');
                                        if (onProfileUpdate) {
                                          onProfileUpdate();
                                        }
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                        break;
                                      case 'event':
                                      case 'announcement':
                                        navigate('/graduate/dashboard');
                                        break;
                                      default:
                                        navigate('/graduate/notifications');
                                    }
                                  }
                                }}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${getNotificationColor(notification.type)}`}>
                                    {notification.type}
                                  </span>
                                  {!notification.read && (
                                    <span className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0"></span>
                                  )}
                                </div>
                                <h4 className="font-medium text-sm mb-1 break-words">{notification.title}</h4>
                                <p className="text-xs text-muted-foreground mb-2 break-words">{notification.message}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(notification.created_at).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </p>
                              </div>
                              <div className="flex flex-col gap-1 flex-shrink-0">
                                {!notification.read && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      markAsRead(notification.id);
                                    }}
                                    className="p-1 sm:p-1.5 hover:bg-muted rounded"
                                    title="Mark as read"
                                  >
                                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                  className="p-1 sm:p-1.5 hover:bg-muted rounded"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t bg-muted">
                    <Button
                      variant="link"
                      className="w-full text-sm"
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('/graduate/notifications');
                      }}
                    >
                      View All Notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 hover:bg-white/10 rounded-lg p-2 transition-colors"
              >
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-white">{profile.first_name} {profile.last_name}</p>
                  <p className="text-xs text-white/80">{profile.email}</p>
                </div>
                {profile.profile_photo_url ? (
                  <img
                    src={profile.profile_photo_url}
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                    onError={() => {
                      console.error('Failed to load profile photo in header:', profile.profile_photo_url);
                      setProfile({ ...profile, profile_photo_url: undefined });
                    }}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {profile.first_name?.[0] || ''}{profile.last_name?.[0] || ''}
                  </div>
                )}
                <ChevronDown className="h-4 w-4 text-white" />
              </button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-popover rounded-lg shadow-xl border z-[60]">
                  <div className="p-3 border-b bg-muted">
                    <p className="text-sm font-medium">{profile.first_name} {profile.last_name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{profile.email}</p>
                  </div>
                  
                  <div className="p-1">
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        navigate('/graduate/dashboard');
                        if (onProfileUpdate) {
                          onProfileUpdate();
                        }
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        navigate('/graduate/settings');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                    
                    <div className="my-1 h-px bg-gray-200" />
                    
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setShowLogoutDialog(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be redirected to the login page and will need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
