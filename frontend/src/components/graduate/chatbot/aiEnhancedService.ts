/**
 * AI-Enhanced Chatbot Service
 * Combines rule-based responses with AI-generated responses
 */

import { ChatbotService } from './chatbotService';
import { AIProviderManager } from './aiProviders';
import type { ChatbotResponse, ChatbotConfig } from './types';

export interface AIEnhancedConfig extends ChatbotConfig {
  useAI: boolean;
  aiConfidenceThreshold: number;
  hybridMode: boolean; // Use both rule-based and AI
}

export class AIEnhancedChatbotService extends ChatbotService {
  private aiManager?: AIProviderManager;
  private aiConfig: AIEnhancedConfig;

  constructor(config?: Partial<AIEnhancedConfig>, aiManager?: AIProviderManager) {
    const fullConfig = {
      minConfidence: 0.4,
      maxSuggestions: 3,
      enableContextAwareness: true,
      enableFuzzyMatching: true,
      debugMode: false,
      useAI: false,
      aiConfidenceThreshold: 0.5,
      hybridMode: true,
      ...config
    };

    super(fullConfig);
    this.aiConfig = fullConfig;
    this.aiManager = aiManager;
  }

  /**
   * Process message with AI enhancement
   */
  async processMessage(
    userMessage: string,
    sessionId: string,
    userId?: string
  ): Promise<ChatbotResponse> {
    // Get rule-based response first
    const ruleBasedResponse = await super.processMessage(userMessage, sessionId, userId);

    console.log('🤖 AI Config:', {
      useAI: this.aiConfig.useAI,
      hasManager: !!this.aiManager,
      threshold: this.aiConfig.aiConfidenceThreshold,
      ruleConfidence: ruleBasedResponse.confidence,
      hybridMode: this.aiConfig.hybridMode
    });

    // If AI is disabled or confidence is high enough, return rule-based response
    if (!this.aiConfig.useAI || !this.aiManager) {
      console.log('⚠️ AI disabled or no manager available');
      return ruleBasedResponse;
    }

    // If confidence is low, use AI
    if (ruleBasedResponse.confidence < this.aiConfig.aiConfidenceThreshold) {
      console.log('🚀 Using AI (low confidence)');
      return await this.generateAIResponse(userMessage, sessionId, ruleBasedResponse);
    }

    // In hybrid mode, enhance rule-based response with AI
    if (this.aiConfig.hybridMode && ruleBasedResponse.confidence < 0.8) {
      console.log('✨ Enhancing with AI (hybrid mode)');
      return await this.enhanceWithAI(userMessage, ruleBasedResponse);
    }

    console.log('✅ Using rule-based response (high confidence)');
    return ruleBasedResponse;
  }

  /**
   * Generate AI response when rule-based confidence is low
   */
  private async generateAIResponse(
    userMessage: string,
    sessionId: string,
    fallbackResponse: ChatbotResponse
  ): Promise<ChatbotResponse> {
    if (!this.aiManager) {
      return fallbackResponse;
    }

    try {
      console.log('🔄 Generating AI response...');
      const context = this.buildAIContext(sessionId);
      const aiResponse = await this.aiManager.generate(userMessage, context);
      console.log('✅ AI response generated:', aiResponse.substring(0, 100) + '...');

      // Create the response object
      const response: ChatbotResponse = {
        content: aiResponse,
        intent: 'ai_generated',
        confidence: 0.7,
        suggestions: fallbackResponse.suggestions,
        quickActions: fallbackResponse.quickActions
      };

      // Update the last assistant message in history with AI response
      this.updateLastAssistantMessage(sessionId, aiResponse, 'ai_generated', 0.7);

      return response;
    } catch (error) {
      console.error('❌ AI generation failed:', error);
      return fallbackResponse;
    }
  }

  /**
   * Update the last assistant message with new content
   */
  private updateLastAssistantMessage(
    sessionId: string,
    content: string,
    intent: string,
    confidence: number
  ): void {
    const history = this.getHistory(sessionId);
    if (history.length > 0) {
      const lastMessage = history[history.length - 1];
      if (lastMessage.role === 'assistant') {
        lastMessage.content = content;
        if (lastMessage.metadata) {
          lastMessage.metadata.intent = intent;
          lastMessage.metadata.confidence = confidence;
        }
      }
    }
  }

  /**
   * Enhance rule-based response with AI
   */
  private async enhanceWithAI(
    userMessage: string,
    baseResponse: ChatbotResponse
  ): Promise<ChatbotResponse> {
    if (!this.aiManager) {
      return baseResponse;
    }

    try {
      const enhancementPrompt = `
Based on this question: "${userMessage}"
And this response: "${baseResponse.content.substring(0, 200)}..."

Provide a brief, friendly introduction (1-2 sentences) to make the response more natural and conversational.
Keep it short and helpful.`;

      const aiEnhancement = await this.aiManager.generate(enhancementPrompt, 
        'You are enhancing responses for a chatbot. Be brief and friendly.');

      return {
        ...baseResponse,
        content: `${aiEnhancement}\n\n${baseResponse.content}`,
        confidence: Math.min(baseResponse.confidence + 0.1, 1.0)
      };
    } catch (error) {
      console.error('AI enhancement failed:', error);
      return baseResponse;
    }
  }

  /**
   * Build context for AI from conversation history
   */
  private buildAIContext(sessionId: string): string {
    const history = this.getHistory(sessionId, 5);
    const contextInfo = this.getSummary(sessionId);

    let context = `You are a helpful assistant for the Graduate Tracer System (GTS).

System Information:
- GTS helps track alumni employment and career progress
- Features: Employment surveys, job search, career services, profile management
- Users can submit surveys, find jobs, get career help, and manage their profiles

Recent conversation topics: ${contextInfo.topics.join(', ')}

`;

    if (history.length > 1) {
      context += 'Recent messages:\n';
      history.slice(-3).forEach(msg => {
        context += `${msg.role}: ${msg.content.substring(0, 100)}...\n`;
      });
    }

    context += `
Instructions:
- Be helpful, concise, and friendly
- Provide specific, actionable steps when possible
- Keep responses under 200 words
- If you don't know something specific about GTS, acknowledge it
- Focus on helping with surveys, jobs, profiles, career services, or technical support`;

    return context;
  }

  /**
   * Set AI provider manager
   */
  setAIManager(manager: AIProviderManager): void {
    this.aiManager = manager;
  }

  /**
   * Enable/disable AI
   */
  setAIEnabled(enabled: boolean): void {
    this.aiConfig.useAI = enabled;
  }

  /**
   * Set hybrid mode
   */
  setHybridMode(enabled: boolean): void {
    this.aiConfig.hybridMode = enabled;
  }

  /**
   * Get AI status
   */
  async getAIStatus(): Promise<{
    enabled: boolean;
    provider?: string;
    available: boolean;
  }> {
    if (!this.aiManager || !this.aiConfig.useAI) {
      return { enabled: false, available: false };
    }

    const providers = await this.aiManager.checkAllProviders();
    const currentProvider = this.aiManager.getCurrentProvider();

    return {
      enabled: true,
      provider: currentProvider,
      available: currentProvider ? providers[currentProvider] : false
    };
  }
}

// Export singleton instance
let aiEnhancedServiceInstance: AIEnhancedChatbotService | null = null;

export function getAIEnhancedChatbotService(
  config?: Partial<AIEnhancedConfig>,
  aiManager?: AIProviderManager
): AIEnhancedChatbotService {
  if (!aiEnhancedServiceInstance) {
    aiEnhancedServiceInstance = new AIEnhancedChatbotService(config, aiManager);
  }
  return aiEnhancedServiceInstance;
}
