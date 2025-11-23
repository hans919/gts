/**
 * Chatbot Service
 * Main orchestrator that brings together all chatbot components
 */

import { IntentDetector } from './intentDetector';
import { KnowledgeBase } from './knowledgeBase';
import { ConversationManager } from './conversationManager';
import type {
  Message,
  ChatbotResponse,
  ChatbotConfig,
  IntentMatchResult
} from './types';

export class ChatbotService {
  private intentDetector: IntentDetector;
  private knowledgeBase: KnowledgeBase;
  private conversationManager: ConversationManager;
  private config: ChatbotConfig;

  constructor(config?: Partial<ChatbotConfig>) {
    this.config = {
      minConfidence: 0.4,
      maxSuggestions: 3,
      enableContextAwareness: true,
      enableFuzzyMatching: true,
      debugMode: false,
      ...config
    };

    this.intentDetector = new IntentDetector(this.config.enableFuzzyMatching);
    this.knowledgeBase = new KnowledgeBase();
    this.conversationManager = new ConversationManager();

    // Cleanup expired contexts periodically
    setInterval(() => {
      this.conversationManager.cleanupExpiredContexts();
    }, 5 * 60 * 1000); // Every 5 minutes
  }

  /**
   * Process user message and generate response
   */
  public async processMessage(
    userMessage: string,
    sessionId: string,
    userId?: string
  ): Promise<ChatbotResponse> {
    try {
      // Get conversation context
      const context = this.conversationManager.getContext(sessionId, userId);

      // Add user message to history
      const userMsg: Message = {
        id: this.generateId(),
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      };

      // Detect intent
      const intentMatch = this.intentDetector.detectIntent(
        userMessage,
        context.previousIntent
      );

      if (this.config.debugMode) {
        console.log('Intent Match:', intentMatch);
      }

      // Add metadata to user message
      if (intentMatch) {
        userMsg.metadata = {
          intent: intentMatch.intent.name,
          confidence: intentMatch.confidence,
          entities: intentMatch.entities
        };
      }

      this.conversationManager.addMessage(sessionId, userMsg);

      // Generate response
      let response: ChatbotResponse;

      if (intentMatch && intentMatch.confidence >= this.config.minConfidence) {
        response = this.generateIntentBasedResponse(intentMatch, sessionId);
      } else {
        response = this.generateFallbackResponse(userMessage, sessionId);
      }

      // Add assistant message to history
      const assistantMsg: Message = {
        id: this.generateId(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        metadata: {
          intent: response.intent,
          confidence: response.confidence
        }
      };

      this.conversationManager.addMessage(sessionId, assistantMsg);

      return response;
    } catch (error) {
      console.error('Chatbot error:', error);
      return this.generateErrorResponse();
    }
  }

  /**
   * Generate response based on detected intent
   */
  private generateIntentBasedResponse(
    intentMatch: IntentMatchResult,
    sessionId: string
  ): ChatbotResponse {
    const { intent, confidence, entities } = intentMatch;

    // Get knowledge entry
    const knowledgeEntry = this.knowledgeBase.getByIntent(intent.name);

    if (!knowledgeEntry) {
      return this.generateFallbackResponse('', sessionId);
    }

    // Personalize response with entities
    let content = knowledgeEntry.answer;

    // Add entity-specific information
    if (entities.jobType) {
      content += `\n\n💡 I see you're interested in **${entities.jobType}** positions. You can filter jobs by type in the job search section.`;
    }

    if (entities.location) {
      content += `\n\n📍 Looking for opportunities in **${entities.location}**? Use the location filter to narrow down your search.`;
    }

    // Get suggestions (related questions)
    const suggestions = knowledgeEntry.relatedQuestions?.slice(0, this.config.maxSuggestions) || [];

    // Get quick actions
    const quickActions = this.knowledgeBase.getQuickActions(intent.name);

    // Get related topics
    const relatedTopics = this.knowledgeBase.getRelatedTopics(intent.name);

    return {
      content,
      intent: intent.name,
      confidence,
      suggestions,
      quickActions,
      relatedTopics
    };
  }

  /**
   * Generate fallback response when intent is unclear
   */
  private generateFallbackResponse(
    userMessage: string,
    sessionId: string
  ): ChatbotResponse {
    // Try to search knowledge base
    const searchResults = this.knowledgeBase.search(userMessage);

    if (searchResults.length > 0) {
      const bestMatch = searchResults[0];
      return {
        content: `I think you might be asking about:\n\n${bestMatch.answer}\n\nIs this what you were looking for?`,
        intent: 'search_result',
        confidence: 0.5,
        suggestions: searchResults.slice(1, 4).map(r => r.question)
      };
    }

    // Check if it's a follow-up question
    const isFollowUp = this.conversationManager.isFollowUpQuestion(sessionId, userMessage);
    const contextInfo = this.conversationManager.getContextInfo(sessionId);

    if (isFollowUp && contextInfo.previousIntent) {
      const previousEntry = this.knowledgeBase.getByIntent(contextInfo.previousIntent);
      if (previousEntry?.relatedQuestions) {
        return {
          content: `Here are some related questions about ${contextInfo.currentTopic}:\n\n${previousEntry.relatedQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n\nWhich one would you like to know more about?`,
          intent: 'follow_up',
          confidence: 0.6,
          suggestions: previousEntry.relatedQuestions
        };
      }
    }

    // General help response
    return {
      content: `I'm not quite sure what you're asking about. Here's what I can help you with:

**Popular Topics:**
• 📊 Submitting employment surveys
• 💼 Finding job opportunities
• 👤 Updating your profile
• 🎯 Accessing career services
• 🔧 Getting technical support
• 🔔 Managing notifications

Could you try rephrasing your question, or choose one of the topics above?`,
      intent: 'fallback',
      confidence: 0.3,
      suggestions: [
        'How do I submit a survey?',
        'Find me a job',
        'Update my profile'
      ]
    };
  }

  /**
   * Generate error response
   */
  private generateErrorResponse(): ChatbotResponse {
    return {
      content: `I apologize, but I encountered an error processing your request. 😔

Please try:
• Rephrasing your question
• Asking something else
• Contacting support if the issue persists

You can submit a support ticket by going to **Feedback & Support** in the sidebar.`,
      intent: 'error',
      confidence: 0,
      suggestions: [
        'How do I contact support?',
        'Submit a support ticket'
      ]
    };
  }

  /**
   * Get welcome message
   */
  public getWelcomeMessage(sessionId: string): Message {
    const welcomeMsg: Message = {
      id: this.generateId(),
      role: 'assistant',
      content: `Hi! 👋 Welcome to the Graduate Tracer System!

I'm your AI assistant here to help you navigate the system and answer your questions.

**I can help you with:**
• 📊 Employment surveys
• 💼 Job opportunities
• 👤 Profile management
• 🎯 Career services
• 🔧 Technical support
• And much more!

What would you like to know about today?`,
      timestamp: new Date(),
      metadata: {
        intent: 'greeting',
        confidence: 1.0
      }
    };

    this.conversationManager.addMessage(sessionId, welcomeMsg);
    return welcomeMsg;
  }

  /**
   * Get conversation history
   */
  public getHistory(sessionId: string, limit?: number): Message[] {
    return this.conversationManager.getHistory(sessionId, limit);
  }

  /**
   * Clear conversation
   */
  public clearConversation(sessionId: string): void {
    this.conversationManager.clearHistory(sessionId);
  }

  /**
   * Get conversation summary
   */
  public getSummary(sessionId: string) {
    return this.conversationManager.getSummary(sessionId);
  }

  /**
   * Export conversation
   */
  public exportConversation(sessionId: string) {
    return this.conversationManager.exportConversation(sessionId);
  }

  /**
   * Get analytics
   */
  public getAnalytics(sessionId: string) {
    return this.conversationManager.analyzePatterns(sessionId);
  }

  /**
   * Update configuration
   */
  public updateConfig(config: Partial<ChatbotConfig>): void {
    this.config = { ...this.config, ...config };
    this.intentDetector = new IntentDetector(this.config.enableFuzzyMatching);
  }

  /**
   * Get configuration
   */
  public getConfig(): ChatbotConfig {
    return { ...this.config };
  }

  /**
   * Test intent detection (for debugging)
   */
  public testIntent(userMessage: string): IntentMatchResult | null {
    return this.intentDetector.detectIntent(userMessage);
  }

  /**
   * Search knowledge base (for debugging)
   */
  public searchKnowledge(query: string) {
    return this.knowledgeBase.search(query);
  }

  /**
   * Get all intents (for debugging)
   */
  public getAllIntents() {
    return this.intentDetector.getIntentsByCategory('general');
  }

  // Helper methods

  private generateId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get quick questions for initial interaction
   */
  public getQuickQuestions(): string[] {
    return [
      "How do I submit an employment survey?",
      "Where can I find job opportunities?",
      "How do I update my profile?",
      "What are career services?",
      "How do I contact support?"
    ];
  }

  /**
   * Get contextual suggestions based on conversation
   */
  public getContextualSuggestions(sessionId: string): string[] {
    const contextInfo = this.conversationManager.getContextInfo(sessionId);
    
    if (contextInfo.previousIntent) {
      const entry = this.knowledgeBase.getByIntent(contextInfo.previousIntent);
      if (entry?.relatedQuestions) {
        return entry.relatedQuestions.slice(0, 3);
      }
    }

    return this.getQuickQuestions();
  }
}

// Export singleton instance
let chatbotServiceInstance: ChatbotService | null = null;

export function getChatbotService(config?: Partial<ChatbotConfig>): ChatbotService {
  if (!chatbotServiceInstance) {
    chatbotServiceInstance = new ChatbotService(config);
  }
  return chatbotServiceInstance;
}
