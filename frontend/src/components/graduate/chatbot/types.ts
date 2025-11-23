/**
 * Chatbot Type Definitions
 * Central type definitions for the chatbot system
 */

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    intent?: string;
    confidence?: number;
    entities?: Record<string, any>;
  };
}

export interface Intent {
  name: string;
  patterns: string[];
  keywords: string[];
  requiredKeywords?: string[];
  category: IntentCategory;
  confidence?: number;
  context?: string[];
  followUpIntents?: string[];
}

export type IntentCategory = 
  | 'survey'
  | 'jobs'
  | 'profile'
  | 'career'
  | 'support'
  | 'notification'
  | 'privacy'
  | 'training'
  | 'dashboard'
  | 'resources'
  | 'general';

export interface ConversationContext {
  userId?: string;
  sessionId: string;
  previousIntent?: string;
  conversationHistory: Message[];
  userPreferences?: Record<string, any>;
  currentTopic?: string;
  entities: Record<string, any>;
  timestamp: Date;
}

export interface KnowledgeEntry {
  id: string;
  category: IntentCategory;
  question: string;
  answer: string;
  relatedQuestions?: string[];
  tags?: string[];
  priority?: number;
}

export interface ChatbotResponse {
  content: string;
  intent: string;
  confidence: number;
  suggestions?: string[];
  quickActions?: QuickAction[];
  relatedTopics?: string[];
}

export interface QuickAction {
  label: string;
  action: string;
  icon?: string;
}

export interface ChatbotConfig {
  minConfidence: number;
  maxSuggestions: number;
  enableContextAwareness: boolean;
  enableFuzzyMatching: boolean;
  debugMode: boolean;
}

export interface IntentMatchResult {
  intent: Intent;
  confidence: number;
  matchedKeywords: string[];
  entities: Record<string, any>;
}
