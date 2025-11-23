/**
 * Chatbot Module Index
 * Central export point for all chatbot functionality
 */

export * from './types';
export { IntentDetector } from './intentDetector';
export { KnowledgeBase } from './knowledgeBase';
export { ConversationManager } from './conversationManager';
export { ChatbotService, getChatbotService } from './chatbotService';
export { ChatbotDebugger, getChatbotDebugger } from './debugger';

// AI Integration
export * from './aiProviders';
export { AIEnhancedChatbotService, getAIEnhancedChatbotService } from './aiEnhancedService';
