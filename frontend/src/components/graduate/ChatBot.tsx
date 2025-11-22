import { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickQuestions = [
  "How do I submit an employment survey?",
  "Where can I find job opportunities?",
  "How do I update my profile?",
  "What are career services?",
  "How do I contact support?"
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add custom animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gentle-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes typing-dots {
        0%, 20% { content: '.'; }
        40% { content: '..'; }
        60%, 100% { content: '...'; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      setMessages([{
        id: Date.now().toString(),
        role: 'assistant',
        content: "Hi! 👋 I'm your Graduate Tracer System assistant. I can help you navigate the system, submit surveys, find resources, and more. What would you like to know?",
        timestamp: new Date()
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Simple rule-based responses for common queries
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('employment survey') || lowerMessage.includes('submit survey')) {
      return "To submit an employment survey:\n\n1. Click on 'Employment Survey' in the sidebar or dashboard\n2. Fill out your current employment status\n3. If employed, provide company name, job title, and salary (optional)\n4. Share details about how you found the job\n5. Add information about skills and trainings\n6. Click 'Submit Survey'\n\nYour responses help improve our programs and support future graduates!";
    }

    if (lowerMessage.includes('job') && (lowerMessage.includes('find') || lowerMessage.includes('search') || lowerMessage.includes('opportunities'))) {
      return "To find job opportunities:\n\n1. Go to 'Alumni Resources' from the sidebar\n2. Browse the Jobs section\n3. You'll see job listings with details like:\n   - Job title and company\n   - Location and salary range\n   - Job type (Full-time, Part-time, etc.)\n4. Click on jobs to view full details\n5. Some jobs have external application links\n\nYou can also bookmark jobs for later!";
    }

    if (lowerMessage.includes('profile') || lowerMessage.includes('update information')) {
      return "To update your profile:\n\n1. Click on your profile icon in the header\n2. Select 'Settings' from the dropdown\n3. In the Profile tab, you can update:\n   - Personal information\n   - Contact details\n   - Profile photo\n4. Remember to click 'Save Changes' when done\n\nYou can also change your password in the Security tab.";
    }

    if (lowerMessage.includes('career service') || lowerMessage.includes('career help')) {
      return "Career Services provide professional support:\n\n1. Go to 'Alumni Resources' > Career Services\n2. Browse available services like:\n   - Resume writing assistance\n   - Interview preparation\n   - Career counseling\n   - Networking events\n3. Each service shows contact info and website\n\nThese services are here to support your career growth!";
    }

    if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('problem') || lowerMessage.includes('issue')) {
      return "To get support:\n\n1. Go to 'Feedback & Support' in the sidebar\n2. Click 'Submit New Ticket'\n3. Choose a category:\n   - Technical issues\n   - Account problems\n   - Survey questions\n   - General inquiry\n4. Select priority level\n5. Describe your issue\n6. Submit the ticket\n\nYou'll receive a response from the admin team. You can track your tickets in the same section.";
    }

    if (lowerMessage.includes('notification')) {
      return "To manage notifications:\n\n1. Click the bell icon in the header to view notifications\n2. You'll see:\n   - System updates\n   - New surveys\n   - Job postings\n   - Career events\n3. Click on a notification to view details\n4. Mark as read or delete old notifications\n\nNotifications keep you updated on opportunities and important announcements!";
    }

    if (lowerMessage.includes('privacy') || lowerMessage.includes('data') || lowerMessage.includes('delete account')) {
      return "Privacy & Data Settings:\n\n1. Go to 'Privacy Settings' in the sidebar\n2. You can:\n   - Control who sees your profile\n   - Manage data sharing preferences\n   - Export your data\n   - Request account deletion\n\nWe respect your privacy and give you full control over your information.";
    }

    if (lowerMessage.includes('training') || lowerMessage.includes('course') || lowerMessage.includes('program')) {
      return "Training Programs:\n\n1. Visit 'Alumni Resources' > Training Programs\n2. Browse available programs:\n   - Professional certifications\n   - Skills development courses\n   - Workshops and seminars\n3. View details like duration, schedule, and registration\n4. Click registration links to enroll\n\nThese programs help you develop new skills and advance your career!";
    }

    if (lowerMessage.includes('dashboard')) {
      return "The Dashboard is your home page with:\n\n1. Profile Overview - Your basic info and status\n2. Quick Actions - Easy access to common tasks\n3. Recent Activities - Your latest updates\n4. System Stats - Survey completion, updates posted\n5. Shortcuts to:\n   - Submit Employment Survey\n   - Post Career Update\n   - Browse Jobs\n   - Access Resources\n\nIt's designed to give you quick access to everything you need!";
    }

    // Default response
    return "I can help you with:\n\n• Submitting employment surveys\n• Finding job opportunities\n• Updating your profile\n• Accessing career services\n• Getting technical support\n• Managing notifications\n• Understanding privacy settings\n\nWhat specific topic would you like to know more about?";
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setIsTyping(true);

    try {
      // Simulate typing delay for more natural feel
      await new Promise(resolve => setTimeout(resolve, 800));
      const response = await getAIResponse(input);
      
      // Add another small delay before showing response
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try asking your question again or contact support if the issue persists.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-20 w-20 sm:h-24 sm:w-24 z-50 transform transition-all duration-500 hover:scale-110 hover:-translate-y-2 active:scale-95 flex items-center justify-center bg-transparent border-0 cursor-pointer animate-bounce-gentle"
        style={{
          filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))',
          animation: 'gentle-bounce 3s ease-in-out infinite'
        }}
      >
        <svg
          viewBox="0 0 200 240"
          className="h-full w-full"
        >
          <defs>
            {/* 3D Body gradient - light to dark for depth */}
            <linearGradient id="body3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DBEAFE" />
              <stop offset="40%" stopColor="#BFDBFE" />
              <stop offset="70%" stopColor="#93C5FD" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
            
            {/* Head 3D gradient */}
            <linearGradient id="head3D" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#F0F9FF" />
              <stop offset="50%" stopColor="#DBEAFE" />
              <stop offset="100%" stopColor="#93C5FD" />
            </linearGradient>
            
            {/* Screen with depth */}
            <linearGradient id="screen3D" x1="30%" y1="30%" x2="70%" y2="70%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            
            {/* Eye glow */}
            <linearGradient id="eye3D" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            
            {/* Shadow definitions */}
            <filter id="shadow3D" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
              <feOffset dx="3" dy="3" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.4"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Antenna with 3D effect */}
          <line x1="100" y1="45" x2="100" y2="22" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          <circle cx="100" cy="18" r="7" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
          <circle cx="97" cy="16" r="2" fill="#60A5FA" />
          
          {/* Head - 3D rounded box */}
          <rect x="50" y="45" width="100" height="80" rx="25" fill="url(#head3D)" filter="url(#shadow3D)" />
          
          {/* Head shadow side (right) */}
          <rect x="140" y="50" width="10" height="70" rx="5" fill="#93C5FD" opacity="0.5" />
          
          {/* Head highlight (left) */}
          <ellipse cx="70" cy="65" rx="15" ry="20" fill="white" opacity="0.4" />
          
          {/* Screen/Face with 3D bezel */}
          <rect x="60" y="55" width="80" height="60" rx="18" fill="url(#screen3D)" stroke="#334155" strokeWidth="3" />
          
          {/* Screen inner shadow */}
          <rect x="63" y="58" width="74" height="54" rx="15" fill="none" stroke="#0F172A" strokeWidth="1" />
          
          {/* Eyes - 3D vertical bars */}
          <rect x="78" y="73" width="10" height="24" rx="5" fill="url(#eye3D)" />
          <rect x="112" y="73" width="10" height="24" rx="5" fill="url(#eye3D)" />
          
          {/* Eye highlights */}
          <rect x="79" y="75" width="3" height="10" rx="1.5" fill="#93C5FD" opacity="0.8" />
          <rect x="113" y="75" width="3" height="10" rx="1.5" fill="#93C5FD" opacity="0.8" />
          
          {/* Smile - 3D curved */}
          <path d="M 82 100 Q 100 112, 118 100" stroke="#60A5FA" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 82 100 Q 100 112, 118 100" stroke="#3B82F6" strokeWidth="3" fill="none" strokeLinecap="round" />
          
          {/* Ear sensors - 3D circular */}
          <ellipse cx="45" cy="85" rx="15" ry="18" fill="#64748B" filter="url(#shadow3D)" />
          <ellipse cx="155" cy="85" rx="15" ry="18" fill="#64748B" filter="url(#shadow3D)" />
          
          {/* Ear inner */}
          <ellipse cx="45" cy="85" rx="10" ry="13" fill="#334155" />
          <ellipse cx="155" cy="85" rx="10" ry="13" fill="#334155" />
          
          {/* Ear highlight */}
          <ellipse cx="42" cy="80" rx="4" ry="6" fill="#94A3B8" opacity="0.6" />
          <ellipse cx="152" cy="80" rx="4" ry="6" fill="#94A3B8" opacity="0.6" />
          
          {/* Body - 3D rounded */}
          <ellipse cx="100" cy="165" rx="60" ry="55" fill="url(#body3D)" filter="url(#shadow3D)" />
          
          {/* Body highlight */}
          <ellipse cx="85" cy="145" rx="30" ry="25" fill="white" opacity="0.35" />
          
          {/* Body shadow bottom */}
          <ellipse cx="100" cy="210" rx="55" ry="10" fill="#60A5FA" opacity="0.4" />
          
          {/* Left arm - waving up with 3D */}
          <ellipse cx="42" cy="150" rx="12" ry="28" fill="url(#body3D)" filter="url(#shadow3D)" 
                   transform="rotate(-25 42 150)" />
          
          {/* Right arm - 3D */}
          <ellipse cx="158" cy="165" rx="12" ry="26" fill="url(#body3D)" filter="url(#shadow3D)" />
          
          {/* Left hand - waving */}
          <ellipse cx="35" cy="128" rx="10" ry="12" fill="url(#body3D)" filter="url(#shadow3D)" />
          <ellipse cx="32" cy="125" rx="4" ry="5" fill="white" opacity="0.4" />
          
          {/* Right hand */}
          <ellipse cx="165" cy="188" rx="10" ry="12" fill="url(#body3D)" filter="url(#shadow3D)" />
          <ellipse cx="162" cy="185" rx="4" ry="5" fill="white" opacity="0.4" />
          
          {/* Base/feet - 3D block */}
          <rect x="80" y="210" width="40" height="15" rx="7" fill="#475569" filter="url(#shadow3D)" />
          <rect x="82" y="211" width="36" height="6" rx="3" fill="#64748B" opacity="0.6" />
        </svg>
      </button>
    );
  }

  return (
    <Card className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[380px] h-[100dvh] sm:h-[600px] sm:rounded-lg shadow-2xl z-50 flex flex-col animate-in slide-in-from-bottom-4 sm:slide-in-from-right-4 duration-500">
      <CardHeader className="border-b bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 animate-pulse" />
            <CardTitle className="text-base font-semibold">GTS Assistant</CardTitle>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in-up`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 shadow-sm transition-all hover:shadow-md ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-in fade-in-up">
            <div className="bg-muted rounded-lg px-4 py-3 flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Quick questions:</p>
            {quickQuestions.map((question, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className="w-full text-left justify-start text-xs h-auto py-2 hover:bg-primary hover:text-primary-foreground transition-all animate-in fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </CardContent>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            disabled={loading}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            size="icon"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          AI Assistant • SJCB Graduate Tracer System
        </p>
      </div>
    </Card>
  );
}
