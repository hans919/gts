/**
 * Conversation Manager
 * Manages conversation context, history, and state
 */

import type { Message, ConversationContext } from './types';

export class ConversationManager {
  private contexts: Map<string, ConversationContext> = new Map();
  private readonly maxHistoryLength: number = 20;
  private readonly sessionTimeout: number = 30 * 60 * 1000; // 30 minutes

  /**
   * Get or create conversation context
   */
  public getContext(sessionId: string, userId?: string): ConversationContext {
    let context = this.contexts.get(sessionId);

    // Create new context if doesn't exist or expired
    if (!context || this.isContextExpired(context)) {
      context = this.createNewContext(sessionId, userId);
      this.contexts.set(sessionId, context);
    }

    return context;
  }

  /**
   * Update conversation context
   */
  public updateContext(
    sessionId: string,
    updates: Partial<ConversationContext>
  ): ConversationContext {
    const context = this.getContext(sessionId);
    const updatedContext = { ...context, ...updates, timestamp: new Date() };
    this.contexts.set(sessionId, updatedContext);
    return updatedContext;
  }

  /**
   * Add message to conversation history
   */
  public addMessage(sessionId: string, message: Message): void {
    const context = this.getContext(sessionId);
    context.conversationHistory.push(message);

    // Maintain max history length
    if (context.conversationHistory.length > this.maxHistoryLength) {
      context.conversationHistory = context.conversationHistory.slice(-this.maxHistoryLength);
    }

    // Update current topic based on message metadata
    if (message.metadata?.intent) {
      context.previousIntent = message.metadata.intent;
      context.currentTopic = this.extractTopic(message.metadata.intent);
    }

    // Extract and store entities
    if (message.metadata?.entities) {
      context.entities = { ...context.entities, ...message.metadata.entities };
    }

    this.contexts.set(sessionId, context);
  }

  /**
   * Get conversation history
   */
  public getHistory(sessionId: string, limit?: number): Message[] {
    const context = this.getContext(sessionId);
    const history = context.conversationHistory;
    
    if (limit) {
      return history.slice(-limit);
    }
    
    return history;
  }

  /**
   * Get previous user messages
   */
  public getPreviousUserMessages(sessionId: string, count: number = 3): Message[] {
    const context = this.getContext(sessionId);
    return context.conversationHistory
      .filter(msg => msg.role === 'user')
      .slice(-count);
  }

  /**
   * Check if user is asking follow-up question
   */
  public isFollowUpQuestion(sessionId: string, currentMessage: string): boolean {
    const context = this.getContext(sessionId);
    
    if (!context.previousIntent) return false;

    // Check for pronouns and context references
    const followUpIndicators = [
      /\b(it|this|that|these|those)\b/i,
      /\b(more|tell me more|explain|elaborate)\b/i,
      /\b(what about|how about)\b/i,
      /\b(also|additionally|furthermore)\b/i,
      /\b(can you|could you|would you)\b/i
    ];

    return followUpIndicators.some(pattern => pattern.test(currentMessage));
  }

  /**
   * Get contextual information for response generation
   */
  public getContextInfo(sessionId: string): {
    previousIntent?: string;
    currentTopic?: string;
    recentEntities: Record<string, any>;
    messageCount: number;
  } {
    const context = this.getContext(sessionId);
    return {
      previousIntent: context.previousIntent,
      currentTopic: context.currentTopic,
      recentEntities: context.entities,
      messageCount: context.conversationHistory.length
    };
  }

  /**
   * Set user preference
   */
  public setUserPreference(
    sessionId: string,
    key: string,
    value: any
  ): void {
    const context = this.getContext(sessionId);
    if (!context.userPreferences) {
      context.userPreferences = {};
    }
    context.userPreferences[key] = value;
    this.contexts.set(sessionId, context);
  }

  /**
   * Get user preference
   */
  public getUserPreference(sessionId: string, key: string): any {
    const context = this.getContext(sessionId);
    return context.userPreferences?.[key];
  }

  /**
   * Clear conversation history
   */
  public clearHistory(sessionId: string): void {
    const context = this.getContext(sessionId);
    context.conversationHistory = [];
    context.previousIntent = undefined;
    context.currentTopic = undefined;
    context.entities = {};
    this.contexts.set(sessionId, context);
  }

  /**
   * Reset context
   */
  public resetContext(sessionId: string): void {
    this.contexts.delete(sessionId);
  }

  /**
   * Clean up expired contexts
   */
  public cleanupExpiredContexts(): void {
    const now = Date.now();
    for (const [sessionId, context] of this.contexts.entries()) {
      if (now - context.timestamp.getTime() > this.sessionTimeout) {
        this.contexts.delete(sessionId);
      }
    }
  }

  /**
   * Get conversation summary
   */
  public getSummary(sessionId: string): {
    messageCount: number;
    userMessageCount: number;
    assistantMessageCount: number;
    topics: string[];
    duration: number;
    lastActivity: Date;
  } {
    const context = this.getContext(sessionId);
    const history = context.conversationHistory;

    const userMessages = history.filter(m => m.role === 'user');
    const assistantMessages = history.filter(m => m.role === 'assistant');

    const topics = new Set<string>();
    history.forEach(msg => {
      if (msg.metadata?.intent) {
        topics.add(this.extractTopic(msg.metadata.intent));
      }
    });

    const firstMessage = history[0];
    const lastMessage = history[history.length - 1];
    const duration = firstMessage && lastMessage
      ? lastMessage.timestamp.getTime() - firstMessage.timestamp.getTime()
      : 0;

    return {
      messageCount: history.length,
      userMessageCount: userMessages.length,
      assistantMessageCount: assistantMessages.length,
      topics: Array.from(topics),
      duration,
      lastActivity: context.timestamp
    };
  }

  /**
   * Export conversation
   */
  public exportConversation(sessionId: string): {
    sessionId: string;
    messages: Message[];
    summary: any;
    context: ConversationContext;
  } {
    const context = this.getContext(sessionId);
    const summary = this.getSummary(sessionId);

    return {
      sessionId,
      messages: context.conversationHistory,
      summary,
      context
    };
  }

  // Private helper methods

  private createNewContext(sessionId: string, userId?: string): ConversationContext {
    return {
      sessionId,
      userId,
      conversationHistory: [],
      entities: {},
      timestamp: new Date()
    };
  }

  private isContextExpired(context: ConversationContext): boolean {
    const now = Date.now();
    return now - context.timestamp.getTime() > this.sessionTimeout;
  }

  private extractTopic(intent: string): string {
    // Extract category from intent name
    // e.g., "employment_survey_submit" -> "survey"
    const parts = intent.split('_');
    return parts[0] || 'general';
  }

  /**
   * Analyze conversation patterns
   */
  public analyzePatterns(sessionId: string): {
    frequentTopics: string[];
    averageResponseTime: number;
    satisfactionIndicators: {
      thanksCount: number;
      repeatQuestions: number;
      escalations: number;
    };
  } {
    const context = this.getContext(sessionId);
    const history = context.conversationHistory;

    // Count topic frequency
    const topicCounts = new Map<string, number>();
    history.forEach(msg => {
      if (msg.metadata?.intent) {
        const topic = this.extractTopic(msg.metadata.intent);
        topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
      }
    });

    const frequentTopics = Array.from(topicCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([topic]) => topic);

    // Calculate average response time
    let totalResponseTime = 0;
    let responseCount = 0;
    for (let i = 1; i < history.length; i++) {
      if (history[i].role === 'assistant' && history[i - 1].role === 'user') {
        const timeDiff = history[i].timestamp.getTime() - history[i - 1].timestamp.getTime();
        totalResponseTime += timeDiff;
        responseCount++;
      }
    }
    const averageResponseTime = responseCount > 0 ? totalResponseTime / responseCount : 0;

    // Satisfaction indicators
    const thanksCount = history.filter(msg => 
      msg.role === 'user' && /thank|thanks|appreciate/i.test(msg.content)
    ).length;

    const repeatQuestions = this.countRepeatQuestions(history);
    const escalations = history.filter(msg =>
      msg.content.toLowerCase().includes('talk to human') ||
      msg.content.toLowerCase().includes('real person') ||
      msg.content.toLowerCase().includes('not helpful')
    ).length;

    return {
      frequentTopics,
      averageResponseTime,
      satisfactionIndicators: {
        thanksCount,
        repeatQuestions,
        escalations
      }
    };
  }

  private countRepeatQuestions(history: Message[]): number {
    const userMessages = history
      .filter(m => m.role === 'user')
      .map(m => m.content.toLowerCase());

    let repeatCount = 0;
    for (let i = 1; i < userMessages.length; i++) {
      const similarity = this.calculateSimpleSimilarity(userMessages[i], userMessages[i - 1]);
      if (similarity > 0.7) {
        repeatCount++;
      }
    }

    return repeatCount;
  }

  private calculateSimpleSimilarity(str1: string, str2: string): number {
    const words1 = new Set(str1.split(' '));
    const words2 = new Set(str2.split(' '));
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    return intersection.size / union.size;
  }
}
