import { ThemeProvider } from '@/contexts/ThemeContext';
import ChatBot from '@/components/graduate/ChatBot';

interface GraduatePortalLayoutProps {
  children: React.ReactNode;
}

export default function GraduatePortalLayout({ children }: GraduatePortalLayoutProps) {
  return (
    <ThemeProvider storageKey="graduate-theme">
      {children}
      <ChatBot />
    </ThemeProvider>
  );
}
