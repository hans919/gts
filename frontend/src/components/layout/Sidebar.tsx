import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart3,
  FileText,
  Settings,
  X,
  Briefcase,
  GraduationCap,
  MessageSquare,
  FileCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    name: 'Graduates',
    path: '/graduates',
    icon: <Users className="h-5 w-5" />,
  },
  {
    name: 'Surveys',
    path: '/surveys',
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    name: 'Reports',
    path: '/reports',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    name: 'Jobs',
    path: '/jobs',
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    name: 'Services',
    path: '/career-services',
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    name: 'Support',
    path: '/support-tickets',
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    name: 'Employment Surveys',
    path: '/employment-surveys',
    icon: <FileCheck className="h-5 w-5" />,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-card border-r border-border
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">GTS</span>
              </div>
              <span className="font-semibold">SJCB TRS</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose()}
              >
                {({ isActive }) => (
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={`w-full justify-start gap-3 ${
                      isActive ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </Button>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="rounded-lg bg-primary/10 p-4">
              <p className="text-xs font-semibold mb-1">Need Help?</p>
              <p className="text-xs text-muted-foreground mb-3">
                Check our documentation or contact support
              </p>
              <Button size="sm" className="w-full">
                View Docs
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
