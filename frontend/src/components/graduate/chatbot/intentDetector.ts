/**
 * Intent Detection Engine
 * Advanced pattern matching and NLP-like capabilities for understanding user intent
 */

import type { Intent, IntentMatchResult, IntentCategory } from './types';

export class IntentDetector {
  private intents: Intent[] = [];
  private enableFuzzyMatching: boolean = true;

  constructor(enableFuzzyMatching: boolean = true) {
    this.enableFuzzyMatching = enableFuzzyMatching;
    this.initializeIntents();
  }

  private initializeIntents(): void {
    this.intents = [
      // Survey Intents
      {
        name: 'employment_survey_submit',
        category: 'survey',
        keywords: ['employment', 'survey', 'submit', 'fill', 'complete', 'send'],
        requiredKeywords: ['survey'],
        patterns: [
          'how to submit survey',
          'submit employment survey',
          'fill out survey',
          'complete employment form'
        ],
        followUpIntents: ['survey_status', 'survey_help']
      },
      {
        name: 'survey_status',
        category: 'survey',
        keywords: ['survey', 'status', 'check', 'submitted', 'completed'],
        patterns: ['check survey status', 'did i submit', 'survey completed']
      },
      {
        name: 'survey_edit',
        category: 'survey',
        keywords: ['survey', 'edit', 'change', 'update', 'modify'],
        patterns: ['edit my survey', 'change survey response', 'update survey']
      },

      // Job Search Intents
      {
        name: 'job_search',
        category: 'jobs',
        keywords: ['job', 'work', 'employment', 'find', 'search', 'opportunities', 'vacancy', 'hiring'],
        requiredKeywords: ['job'],
        patterns: [
          'find jobs',
          'job opportunities',
          'search for work',
          'looking for employment'
        ]
      },
      {
        name: 'job_application',
        category: 'jobs',
        keywords: ['job', 'apply', 'application', 'submit', 'resume'],
        patterns: ['how to apply', 'submit application', 'apply for job']
      },
      {
        name: 'job_filters',
        category: 'jobs',
        keywords: ['job', 'filter', 'type', 'location', 'salary', 'fulltime', 'parttime'],
        patterns: ['filter jobs', 'job by location', 'salary range']
      },

      // Profile Management Intents
      {
        name: 'profile_update',
        category: 'profile',
        keywords: ['profile', 'update', 'edit', 'change', 'modify', 'information'],
        requiredKeywords: ['profile'],
        patterns: [
          'update my profile',
          'edit profile information',
          'change personal details'
        ]
      },
      {
        name: 'profile_photo',
        category: 'profile',
        keywords: ['photo', 'picture', 'image', 'avatar', 'upload'],
        patterns: ['change profile photo', 'upload picture', 'update avatar']
      },
      {
        name: 'password_change',
        category: 'profile',
        keywords: ['password', 'change', 'reset', 'forgot', 'security'],
        patterns: ['change password', 'reset password', 'forgot password']
      },

      // Career Services Intents
      {
        name: 'career_services',
        category: 'career',
        keywords: ['career', 'service', 'help', 'counseling', 'advice', 'guidance'],
        patterns: [
          'career services',
          'career counseling',
          'get career advice',
          'professional guidance'
        ]
      },
      {
        name: 'resume_help',
        category: 'career',
        keywords: ['resume', 'cv', 'help', 'writing', 'review', 'improve'],
        patterns: ['resume help', 'cv writing', 'improve resume']
      },
      {
        name: 'interview_prep',
        category: 'career',
        keywords: ['interview', 'preparation', 'tips', 'practice', 'help'],
        patterns: ['interview preparation', 'interview tips', 'practice interview']
      },

      // Support Intents
      {
        name: 'technical_support',
        category: 'support',
        keywords: ['support', 'help', 'problem', 'issue', 'bug', 'error', 'not working', 'broken'],
        patterns: [
          'technical support',
          'need help',
          'something not working',
          'report bug'
        ]
      },
      {
        name: 'submit_ticket',
        category: 'support',
        keywords: ['ticket', 'submit', 'create', 'support', 'request'],
        patterns: ['submit ticket', 'create support ticket', 'contact support']
      },
      {
        name: 'contact_admin',
        category: 'support',
        keywords: ['admin', 'administrator', 'contact', 'reach', 'speak'],
        patterns: ['contact admin', 'speak to administrator', 'reach admin']
      },

      // Notification Intents
      {
        name: 'notifications_view',
        category: 'notification',
        keywords: ['notification', 'alert', 'view', 'check', 'see', 'updates'],
        patterns: ['view notifications', 'check alerts', 'see updates']
      },
      {
        name: 'notifications_settings',
        category: 'notification',
        keywords: ['notification', 'settings', 'configure', 'manage', 'turn off', 'enable'],
        patterns: ['notification settings', 'manage alerts', 'turn off notifications']
      },

      // Privacy Intents
      {
        name: 'privacy_settings',
        category: 'privacy',
        keywords: ['privacy', 'settings', 'data', 'security', 'confidential'],
        patterns: ['privacy settings', 'data privacy', 'manage privacy']
      },
      {
        name: 'data_export',
        category: 'privacy',
        keywords: ['data', 'export', 'download', 'backup'],
        patterns: ['export my data', 'download information', 'data backup']
      },
      {
        name: 'account_deletion',
        category: 'privacy',
        keywords: ['delete', 'account', 'remove', 'deactivate', 'close'],
        patterns: ['delete account', 'remove my account', 'deactivate profile']
      },

      // Training Intents
      {
        name: 'training_programs',
        category: 'training',
        keywords: ['training', 'program', 'course', 'workshop', 'seminar', 'learning'],
        patterns: [
          'training programs',
          'available courses',
          'find workshops',
          'learning opportunities'
        ]
      },
      {
        name: 'training_register',
        category: 'training',
        keywords: ['training', 'register', 'enroll', 'signup', 'join'],
        patterns: ['register for training', 'enroll in course', 'join program']
      },

      // Dashboard Intents
      {
        name: 'dashboard_navigation',
        category: 'dashboard',
        keywords: ['dashboard', 'home', 'main', 'navigate', 'go to'],
        patterns: ['go to dashboard', 'show dashboard', 'main page']
      },
      {
        name: 'dashboard_stats',
        category: 'dashboard',
        keywords: ['dashboard', 'statistics', 'stats', 'overview', 'summary'],
        patterns: ['dashboard stats', 'view statistics', 'show overview']
      },

      // Resources Intents
      {
        name: 'alumni_resources',
        category: 'resources',
        keywords: ['resources', 'alumni', 'benefits', 'services', 'access'],
        patterns: ['alumni resources', 'available services', 'member benefits']
      },
      {
        name: 'networking_events',
        category: 'resources',
        keywords: ['events', 'networking', 'meetup', 'gathering', 'conference'],
        patterns: ['networking events', 'alumni meetups', 'upcoming events']
      },

      // General Intents
      {
        name: 'greeting',
        category: 'general',
        keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
        patterns: ['hello', 'hi there', 'hey', 'good morning']
      },
      {
        name: 'goodbye',
        category: 'general',
        keywords: ['bye', 'goodbye', 'see you', 'later', 'exit', 'quit'],
        patterns: ['goodbye', 'bye', 'see you later', 'thanks bye']
      },
      {
        name: 'thanks',
        category: 'general',
        keywords: ['thank', 'thanks', 'appreciate', 'grateful'],
        patterns: ['thank you', 'thanks', 'appreciate it']
      },
      {
        name: 'help_general',
        category: 'general',
        keywords: ['help', 'what can you do', 'capabilities', 'features'],
        patterns: ['what can you do', 'help me', 'show features']
      }
    ];
  }

  /**
   * Main method to detect intent from user input
   */
  public detectIntent(userInput: string, previousIntent?: string): IntentMatchResult | null {
    const normalizedInput = this.normalizeText(userInput);
    const tokens = this.tokenize(normalizedInput);

    let bestMatch: IntentMatchResult | null = null;
    let highestConfidence = 0;

    for (const intent of this.intents) {
      const matchResult = this.matchIntent(intent, normalizedInput, tokens, previousIntent);
      
      if (matchResult && matchResult.confidence > highestConfidence) {
        highestConfidence = matchResult.confidence;
        bestMatch = matchResult;
      }
    }

    // Only return if confidence is above threshold
    return bestMatch && bestMatch.confidence > 0.3 ? bestMatch : null;
  }

  /**
   * Match a single intent against user input
   */
  private matchIntent(
    intent: Intent,
    normalizedInput: string,
    tokens: string[],
    previousIntent?: string
  ): IntentMatchResult | null {
    let confidence = 0;
    const matchedKeywords: string[] = [];
    const entities: Record<string, any> = {};

    // Check required keywords first
    if (intent.requiredKeywords) {
      const hasAllRequired = intent.requiredKeywords.every(keyword => 
        normalizedInput.includes(keyword.toLowerCase())
      );
      if (!hasAllRequired) {
        return null;
      }
    }

    // Keyword matching with weights
    const keywordMatches = intent.keywords.filter(keyword => {
      const normalizedKeyword = keyword.toLowerCase();
      if (normalizedInput.includes(normalizedKeyword)) {
        matchedKeywords.push(keyword);
        return true;
      }
      
      // Fuzzy matching
      if (this.enableFuzzyMatching) {
        for (const token of tokens) {
          if (this.levenshteinDistance(token, normalizedKeyword) <= 2 && token.length > 3) {
            matchedKeywords.push(keyword);
            return true;
          }
        }
      }
      
      return false;
    });

    // Calculate base confidence from keyword matches
    if (keywordMatches.length > 0) {
      confidence = (keywordMatches.length / intent.keywords.length) * 0.7;
    }

    // Pattern matching bonus
    for (const pattern of intent.patterns) {
      const similarity = this.calculateSimilarity(normalizedInput, pattern.toLowerCase());
      if (similarity > 0.6) {
        confidence += similarity * 0.3;
        break;
      }
    }

    // Context bonus
    if (previousIntent && intent.followUpIntents?.includes(previousIntent)) {
      confidence += 0.2;
    }

    // Extract entities
    this.extractEntities(normalizedInput, tokens, entities);

    if (confidence > 0) {
      return {
        intent,
        confidence: Math.min(confidence, 1.0),
        matchedKeywords,
        entities
      };
    }

    return null;
  }

  /**
   * Extract entities from user input
   */
  private extractEntities(input: string, _tokens: string[], entities: Record<string, any>): void {
    // Extract job types
    const jobTypes = ['fulltime', 'full-time', 'parttime', 'part-time', 'remote', 'contract', 'internship'];
    for (const type of jobTypes) {
      if (input.includes(type.toLowerCase())) {
        entities.jobType = type;
        break;
      }
    }

    // Extract locations (simple pattern)
    const locationPattern = /\b(?:in|at|near)\s+([a-z\s]+?)(?:\s|$|,)/i;
    const locationMatch = input.match(locationPattern);
    if (locationMatch) {
      entities.location = locationMatch[1].trim();
    }

    // Extract status
    const statuses = ['employed', 'unemployed', 'self-employed', 'freelance'];
    for (const status of statuses) {
      if (input.includes(status.toLowerCase())) {
        entities.employmentStatus = status;
        break;
      }
    }
  }

  /**
   * Calculate similarity between two strings
   */
  private calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  /**
   * Calculate Levenshtein distance between two strings
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Normalize text for processing
   */
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Tokenize text into words
   */
  private tokenize(text: string): string[] {
    return text.split(' ').filter(token => token.length > 0);
  }

  /**
   * Get all intents by category
   */
  public getIntentsByCategory(category: IntentCategory): Intent[] {
    return this.intents.filter(intent => intent.category === category);
  }

  /**
   * Get intent by name
   */
  public getIntentByName(name: string): Intent | undefined {
    return this.intents.find(intent => intent.name === name);
  }

  /**
   * Add custom intent
   */
  public addIntent(intent: Intent): void {
    this.intents.push(intent);
  }
}
