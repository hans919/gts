/**
 * Knowledge Base System
 * Stores all responses, helps, and information the chatbot can provide
 */

import type { KnowledgeEntry, IntentCategory, QuickAction } from './types';

export class KnowledgeBase {
  private entries: Map<string, KnowledgeEntry> = new Map();

  constructor() {
    this.initializeKnowledge();
  }

  private initializeKnowledge(): void {
    const knowledgeData: KnowledgeEntry[] = [
      // Survey Knowledge
      {
        id: 'employment_survey_submit',
        category: 'survey',
        question: 'How do I submit an employment survey?',
        answer: `To submit an employment survey:

1. **Navigate to Survey**
   • Click on 'Employment Survey' in the sidebar
   • Or use the quick action on your dashboard

2. **Fill Out Your Information**
   • Employment status (Employed/Unemployed/Self-employed)
   • If employed: Company name, job title, salary (optional)
   • How you found the job
   • Start date and job description

3. **Skills & Training**
   • List relevant skills you're using
   • Mention any training programs attended

4. **Submit**
   • Review your information
   • Click 'Submit Survey'
   • You'll receive a confirmation

💡 Your responses help improve our programs and support future graduates!`,
        relatedQuestions: [
          'Can I edit my survey after submitting?',
          'How often should I update my employment status?',
          'Is the salary information confidential?'
        ],
        tags: ['survey', 'employment', 'submit', 'form'],
        priority: 1
      },

      {
        id: 'survey_status',
        category: 'survey',
        question: 'How can I check my survey status?',
        answer: `To check your survey status:

1. Go to **Dashboard** - Your survey completion status is displayed
2. Visit **Employment Survey** page - Shows your last submission date
3. Check **Profile** > **Survey History** for detailed records

Status indicators:
✅ **Completed** - Survey submitted
⏳ **Pending** - Survey in progress
❌ **Not Started** - No survey submitted yet`,
        tags: ['survey', 'status', 'check'],
        priority: 2
      },

      {
        id: 'survey_edit',
        category: 'survey',
        question: 'Can I edit my submitted survey?',
        answer: `Yes! You can update your employment survey:

1. Go to **Employment Survey** page
2. Your previous submission will be pre-filled
3. Make your changes
4. Click **Update Survey** to save

📌 **Note:** You can update your survey as many times as needed, especially when your employment status changes.`,
        tags: ['survey', 'edit', 'update'],
        priority: 2
      },

      // Job Search Knowledge
      {
        id: 'job_search',
        category: 'jobs',
        question: 'How do I find job opportunities?',
        answer: `To find job opportunities:

1. **Navigate to Jobs**
   • Click 'Alumni Resources' in sidebar
   • Select 'Job Opportunities' section

2. **Browse Listings**
   • View all available positions
   • See job title, company, location
   • Check salary range and type

3. **Filter Jobs**
   • By location
   • By job type (Full-time, Part-time, Remote)
   • By salary range
   • By posting date

4. **Apply**
   • Click on job for full details
   • Use "Apply Now" button for external links
   • Or follow application instructions

💼 **Pro tip:** Bookmark jobs you're interested in and check back regularly for new postings!`,
        relatedQuestions: [
          'How often are new jobs posted?',
          'Can I get alerts for new job postings?',
          'How do I apply for a job?'
        ],
        tags: ['jobs', 'opportunities', 'search', 'employment'],
        priority: 1
      },

      {
        id: 'job_application',
        category: 'jobs',
        question: 'How do I apply for jobs?',
        answer: `Job application process:

1. **Find the Job**
   • Browse available positions
   • Click on the job you're interested in

2. **Review Details**
   • Read job description carefully
   • Check requirements and qualifications
   • Note the salary and benefits

3. **Apply**
   • Click "Apply Now" or external link
   • Prepare your resume and cover letter
   • Follow employer's application process

4. **Track Applications**
   • Keep a record of jobs you've applied to
   • Note application deadlines
   • Follow up appropriately

📄 **Need help with your resume?** Check out our Career Services for resume assistance!`,
        tags: ['job', 'apply', 'application'],
        priority: 1
      },

      // Profile Management Knowledge
      {
        id: 'profile_update',
        category: 'profile',
        question: 'How do I update my profile?',
        answer: `To update your profile information:

1. **Access Settings**
   • Click your profile icon (top right)
   • Select 'Settings' from dropdown

2. **Edit Information**
   • **Personal Info:** Name, birthdate, gender
   • **Contact:** Email, phone number, address
   • **Education:** Course, graduation year
   • **Bio:** Add a personal description

3. **Upload Photo**
   • Click on profile picture area
   • Choose image file (JPG, PNG)
   • Crop and adjust as needed

4. **Save Changes**
   • Click 'Save Changes' at bottom
   • Wait for confirmation message

✨ **Keep your profile updated** to help us provide better services and connect you with opportunities!`,
        relatedQuestions: [
          'How do I change my password?',
          'Can I delete my account?',
          'Who can see my profile information?'
        ],
        tags: ['profile', 'update', 'edit', 'settings'],
        priority: 1
      },

      {
        id: 'password_change',
        category: 'profile',
        question: 'How do I change my password?',
        answer: `To change your password:

1. **Go to Settings**
   • Click profile icon > Settings
   • Navigate to 'Security' tab

2. **Change Password**
   • Enter your current password
   • Enter new password (min. 8 characters)
   • Confirm new password

3. **Requirements**
   • At least 8 characters
   • Mix of letters and numbers recommended
   • Use special characters for extra security

4. **Save & Log Out**
   • Click 'Update Password'
   • You'll be logged out
   • Log back in with new password

🔒 **Security Tip:** Use a strong, unique password and change it regularly!`,
        tags: ['password', 'security', 'change', 'reset'],
        priority: 2
      },

      // Career Services Knowledge
      {
        id: 'career_services',
        category: 'career',
        question: 'What career services are available?',
        answer: `Our Career Services provide comprehensive support:

1. **Resume Writing**
   • Professional resume review
   • CV formatting assistance
   • Cover letter help
   • LinkedIn profile optimization

2. **Interview Preparation**
   • Mock interviews
   • Common questions practice
   • Body language tips
   • Industry-specific guidance

3. **Career Counseling**
   • One-on-one sessions
   • Career path planning
   • Skills assessment
   • Goal setting

4. **Networking Events**
   • Alumni meetups
   • Industry talks
   • Job fairs
   • Professional workshops

📅 **Access:** Go to Alumni Resources > Career Services to view all offerings and contact information.`,
        relatedQuestions: [
          'How do I schedule a career counseling session?',
          'Are career services free?',
          'Can I get help with my resume?'
        ],
        tags: ['career', 'services', 'counseling', 'help'],
        priority: 1
      },

      {
        id: 'resume_help',
        category: 'career',
        question: 'Can you help me with my resume?',
        answer: `Yes! We offer resume assistance:

**Resume Writing Services:**
• Professional review of your current resume
• Format and layout optimization
• Content improvement suggestions
• ATS (Applicant Tracking System) optimization
• Industry-specific customization

**How to Get Help:**
1. Go to 'Alumni Resources' > 'Career Services'
2. Find 'Resume Writing' service
3. Contact via provided email/phone
4. Schedule a review session

**Self-Service Resources:**
• Resume templates available for download
• Best practices guides
• Sample resumes by industry
• Common mistakes to avoid

💼 **Pro tip:** Have your resume reviewed before applying to important positions!`,
        tags: ['resume', 'cv', 'help', 'writing'],
        priority: 2
      },

      // Support Knowledge
      {
        id: 'technical_support',
        category: 'support',
        question: 'How do I get technical support?',
        answer: `To get technical support:

1. **Submit a Support Ticket**
   • Go to 'Feedback & Support' in sidebar
   • Click 'Submit New Ticket'
   • Fill out the form

2. **Choose Category**
   • Technical Issue
   • Account Problem
   • Survey Question
   • General Inquiry
   • Bug Report

3. **Describe Your Issue**
   • Be specific about the problem
   • Include error messages if any
   • Mention what you've tried
   • Add screenshots if helpful

4. **Set Priority**
   • High - Critical issues
   • Medium - Important but not urgent
   • Low - General questions

5. **Track Your Ticket**
   • View ticket status in same section
   • Receive email updates
   • Admin response time: usually 24-48 hours

🔧 **Common Issues:** Check our FAQ section first - your answer might be there!`,
        relatedQuestions: [
          'How long does support take to respond?',
          'Can I call someone for immediate help?',
          'Where can I report a bug?'
        ],
        tags: ['support', 'help', 'technical', 'ticket'],
        priority: 1
      },

      {
        id: 'submit_ticket',
        category: 'support',
        question: 'How do I submit a support ticket?',
        answer: `Submitting a support ticket:

**Step-by-Step:**

1. **Navigate**
   • Sidebar > 'Feedback & Support'
   • Click 'Submit New Ticket' button

2. **Fill Form**
   • **Subject:** Brief description
   • **Category:** Select appropriate type
   • **Priority:** High/Medium/Low
   • **Description:** Detailed explanation
   • **Attachments:** Screenshots if needed

3. **Submit**
   • Review information
   • Click 'Submit Ticket'
   • Save your ticket number

4. **Wait for Response**
   • Check email for updates
   • Return to view ticket status
   • Respond to admin questions

**Response Times:**
• High Priority: 12-24 hours
• Medium Priority: 24-48 hours
• Low Priority: 2-5 business days`,
        tags: ['ticket', 'support', 'submit', 'help'],
        priority: 1
      },

      // Notification Knowledge
      {
        id: 'notifications_view',
        category: 'notification',
        question: 'How do I view my notifications?',
        answer: `To view and manage notifications:

1. **Access Notifications**
   • Click the bell icon (🔔) in header
   • Shows unread count badge

2. **Notification Types**
   • 📊 New survey requests
   • 💼 New job postings
   • 📅 Upcoming events
   • 🎓 Training opportunities
   • 📢 System announcements
   • ✅ Ticket updates

3. **Read Notifications**
   • Click on any notification to view details
   • Auto-marks as read when clicked
   • Navigate to relevant section

4. **Manage**
   • Mark all as read
   • Delete old notifications
   • Filter by type
   • Sort by date

**Notification Settings:** Customize what notifications you receive in Settings > Notifications`,
        tags: ['notifications', 'alerts', 'view', 'manage'],
        priority: 2
      },

      // Privacy Knowledge
      {
        id: 'privacy_settings',
        category: 'privacy',
        question: 'How do I manage my privacy settings?',
        answer: `Managing your privacy:

1. **Access Privacy Settings**
   • Sidebar > 'Privacy Settings'
   • Or Settings > Privacy tab

2. **Profile Visibility**
   • Public - Visible to all alumni
   • Alumni Only - Visible to verified alumni
   • Private - Only visible to admins

3. **Data Sharing**
   • Control what data is shared
   • Opt in/out of alumni directory
   • Manage contact visibility

4. **Email Preferences**
   • Newsletter subscriptions
   • Job alert emails
   • Event notifications

5. **Data Rights**
   • Request data export
   • Request data deletion
   • View data usage policy

🔒 **We respect your privacy** and give you full control over your information!`,
        relatedQuestions: [
          'Can I export my data?',
          'How do I delete my account?',
          'Who can see my information?'
        ],
        tags: ['privacy', 'settings', 'data', 'security'],
        priority: 2
      },

      {
        id: 'data_export',
        category: 'privacy',
        question: 'Can I export my data?',
        answer: `Yes! You can export your data:

**Data Export Process:**

1. **Request Export**
   • Go to Privacy Settings
   • Click 'Export My Data'
   • Confirm request

2. **What's Included**
   • Profile information
   • Survey responses
   • Activity history
   • Saved jobs
   • Support tickets

3. **Receive Data**
   • Processing takes 1-2 business days
   • Download link sent to email
   • Available in JSON/CSV format
   • Link valid for 7 days

4. **Security**
   • Password protected download
   • Encrypted file transfer
   • Secure deletion after 7 days

📦 **This is your data** - you have the right to access and download it anytime!`,
        tags: ['data', 'export', 'download', 'backup'],
        priority: 3
      },

      // Training Knowledge
      {
        id: 'training_programs',
        category: 'training',
        question: 'What training programs are available?',
        answer: `Available training and development programs:

1. **Professional Certifications**
   • IT certifications
   • Business management courses
   • Technical skills programs
   • Industry-specific training

2. **Workshops & Seminars**
   • Leadership development
   • Communication skills
   • Project management
   • Digital marketing
   • Data analytics

3. **Online Courses**
   • Self-paced learning
   • Live webinars
   • Recorded sessions
   • Interactive modules

4. **Benefits**
   • Many programs are free for alumni
   • Certificates upon completion
   • Career advancement opportunities
   • Networking with other professionals

**Access:** Go to Alumni Resources > Training Programs to view all offerings, schedules, and registration links.`,
        relatedQuestions: [
          'How do I register for training?',
          'Are training programs free?',
          'Do I get a certificate?'
        ],
        tags: ['training', 'courses', 'programs', 'learning'],
        priority: 2
      },

      // Dashboard Knowledge
      {
        id: 'dashboard_navigation',
        category: 'dashboard',
        question: 'What can I do on the dashboard?',
        answer: `Your Dashboard is your command center:

**Main Sections:**

1. **Profile Overview**
   • Your basic information
   • Completion status
   • Quick stats

2. **Quick Actions**
   • Submit Employment Survey
   • Post Career Update
   • Browse Jobs
   • Access Resources

3. **Recent Activities**
   • Your latest actions
   • Updates and changes
   • Timeline view

4. **System Stats**
   • Surveys completed
   • Jobs viewed
   • Resources accessed
   • Engagement metrics

5. **Notifications**
   • Latest alerts
   • Important announcements
   • Action items

6. **Shortcuts**
   • Fast access to common tasks
   • Frequently used features
   • Personalized recommendations

🏠 **Dashboard = Home** - Everything you need is just one click away!`,
        tags: ['dashboard', 'home', 'navigation', 'overview'],
        priority: 1
      },

      // General Knowledge
      {
        id: 'greeting',
        category: 'general',
        question: 'Hello!',
        answer: `Hello! 👋 Welcome to the Graduate Tracer System!

I'm here to help you navigate the system and answer your questions.

**I can help you with:**
• Submitting employment surveys
• Finding job opportunities
• Updating your profile
• Accessing career services
• Getting technical support
• Managing notifications
• Understanding privacy settings
• And much more!

What would you like to know about today?`,
        tags: ['greeting', 'hello', 'welcome'],
        priority: 1
      },

      {
        id: 'thanks',
        category: 'general',
        question: 'Thank you',
        answer: `You're welcome! 😊

I'm glad I could help. If you have any other questions about the Graduate Tracer System, feel free to ask anytime.

**Quick reminders:**
• Keep your profile updated
• Check for new job postings regularly
• Submit your employment survey if you haven't
• Explore available career services

Have a great day!`,
        tags: ['thanks', 'thank you', 'appreciation'],
        priority: 1
      },

      {
        id: 'help_general',
        category: 'general',
        question: 'What can you help me with?',
        answer: `I can assist you with many aspects of the Graduate Tracer System:

**📊 Surveys & Data**
• How to submit employment surveys
• Check survey status
• Edit your responses

**💼 Jobs & Career**
• Find job opportunities
• Apply for positions
• Access career services
• Get resume help

**👤 Profile & Account**
• Update personal information
• Change password
• Privacy settings
• Account management

**🎓 Resources**
• Training programs
• Alumni benefits
• Networking events
• Educational opportunities

**🔧 Support & Help**
• Technical issues
• Submit support tickets
• Report bugs
• General questions

**💡 Just ask me anything!** I'll do my best to help or point you in the right direction.`,
        tags: ['help', 'capabilities', 'features', 'general'],
        priority: 1
      }
    ];

    // Store all entries in map
    knowledgeData.forEach(entry => {
      this.entries.set(entry.id, entry);
    });
  }

  /**
   * Get knowledge entry by intent name
   */
  public getByIntent(intentName: string): KnowledgeEntry | undefined {
    return this.entries.get(intentName);
  }

  /**
   * Get all entries by category
   */
  public getByCategory(category: IntentCategory): KnowledgeEntry[] {
    return Array.from(this.entries.values())
      .filter(entry => entry.category === category)
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  /**
   * Search knowledge base
   */
  public search(query: string): KnowledgeEntry[] {
    const normalizedQuery = query.toLowerCase();
    const results: Array<{ entry: KnowledgeEntry; score: number }> = [];

    for (const entry of this.entries.values()) {
      let score = 0;

      // Check question
      if (entry.question.toLowerCase().includes(normalizedQuery)) {
        score += 3;
      }

      // Check answer
      if (entry.answer.toLowerCase().includes(normalizedQuery)) {
        score += 2;
      }

      // Check tags
      if (entry.tags?.some(tag => tag.toLowerCase().includes(normalizedQuery))) {
        score += 2;
      }

      // Check related questions
      if (entry.relatedQuestions?.some(q => q.toLowerCase().includes(normalizedQuery))) {
        score += 1;
      }

      if (score > 0) {
        results.push({ entry, score });
      }
    }

    return results
      .sort((a, b) => b.score - a.score)
      .map(r => r.entry)
      .slice(0, 5);
  }

  /**
   * Get quick actions for an intent
   */
  public getQuickActions(intentName: string): QuickAction[] {
    const quickActions: Record<string, QuickAction[]> = {
      employment_survey_submit: [
        { label: 'Go to Survey', action: '/graduate/employment-survey', icon: '📊' },
        { label: 'View Dashboard', action: '/graduate/dashboard', icon: '🏠' }
      ],
      job_search: [
        { label: 'Browse Jobs', action: '/graduate/resources', icon: '💼' },
        { label: 'Career Services', action: '/graduate/resources#career', icon: '🎯' }
      ],
      profile_update: [
        { label: 'Edit Profile', action: '/graduate/settings', icon: '✏️' },
        { label: 'Privacy Settings', action: '/graduate/privacy', icon: '🔒' }
      ],
      technical_support: [
        { label: 'Submit Ticket', action: '/graduate/support', icon: '🎫' },
        { label: 'View FAQ', action: '/graduate/faq', icon: '❓' }
      ]
    };

    return quickActions[intentName] || [];
  }

  /**
   * Get related topics for an entry
   */
  public getRelatedTopics(intentName: string): string[] {
    const entry = this.entries.get(intentName);
    if (!entry) return [];

    // Get other entries in same category
    return Array.from(this.entries.values())
      .filter(e => e.category === entry.category && e.id !== intentName)
      .sort((a, b) => (b.priority || 0) - (a.priority || 0))
      .slice(0, 3)
      .map(e => e.question);
  }

  /**
   * Add custom knowledge entry
   */
  public addEntry(entry: KnowledgeEntry): void {
    this.entries.set(entry.id, entry);
  }

  /**
   * Get all categories
   */
  public getAllCategories(): IntentCategory[] {
    const categories = new Set<IntentCategory>();
    this.entries.forEach(entry => categories.add(entry.category));
    return Array.from(categories);
  }
}
