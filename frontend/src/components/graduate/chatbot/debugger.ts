/**
 * Debug Utilities for Chatbot
 * Tools for testing and debugging chatbot functionality
 */

import { getChatbotService } from './chatbotService';
import type { IntentMatchResult } from './types';

export class ChatbotDebugger {
  private chatbotService = getChatbotService({ debugMode: true });

  /**
   * Test intent detection with detailed output
   */
  public testIntent(userMessage: string): {
    input: string;
    result: IntentMatchResult | null;
    analysis: {
      hasMatch: boolean;
      confidence: number;
      intentName?: string;
      category?: string;
      matchedKeywords: string[];
      entities: Record<string, any>;
    };
  } {
    const result = this.chatbotService.testIntent(userMessage);

    return {
      input: userMessage,
      result,
      analysis: {
        hasMatch: result !== null,
        confidence: result?.confidence || 0,
        intentName: result?.intent.name,
        category: result?.intent.category,
        matchedKeywords: result?.matchedKeywords || [],
        entities: result?.entities || {}
      }
    };
  }

  /**
   * Test multiple queries at once
   */
  public testBatch(queries: string[]): Array<{
    query: string;
    intent: string | null;
    confidence: number;
  }> {
    return queries.map(query => {
      const result = this.chatbotService.testIntent(query);
      return {
        query,
        intent: result?.intent.name || null,
        confidence: result?.confidence || 0
      };
    });
  }

  /**
   * Search knowledge base and show results
   */
  public searchKnowledge(query: string) {
    const results = this.chatbotService.searchKnowledge(query);
    return {
      query,
      resultCount: results.length,
      results: results.map(r => ({
        id: r.id,
        category: r.category,
        question: r.question,
        answerPreview: r.answer.substring(0, 100) + '...',
        tags: r.tags
      }))
    };
  }

  /**
   * Simulate conversation
   */
  public async simulateConversation(messages: string[]): Promise<{
    sessionId: string;
    messages: Array<{
      user: string;
      assistant: string;
      intent: string;
      confidence: number;
    }>;
    summary: any;
  }> {
    const sessionId = `debug_${Date.now()}`;
    const conversation: Array<any> = [];

    for (const userMessage of messages) {
      const response = await this.chatbotService.processMessage(userMessage, sessionId);
      conversation.push({
        user: userMessage,
        assistant: response.content,
        intent: response.intent,
        confidence: response.confidence
      });
    }

    const summary = this.chatbotService.getSummary(sessionId);

    return {
      sessionId,
      messages: conversation,
      summary
    };
  }

  /**
   * Get conversation analytics
   */
  public getAnalytics(sessionId: string) {
    return this.chatbotService.getAnalytics(sessionId);
  }

  /**
   * Export conversation for analysis
   */
  public exportConversation(sessionId: string) {
    return this.chatbotService.exportConversation(sessionId);
  }

  /**
   * Test confidence threshold
   */
  public testConfidenceThreshold(
    userMessage: string,
    thresholds: number[] = [0.3, 0.4, 0.5, 0.6, 0.7]
  ) {
    const result = this.chatbotService.testIntent(userMessage);
    
    return {
      message: userMessage,
      detectedConfidence: result?.confidence || 0,
      intentName: result?.intent.name || 'none',
      wouldMatch: thresholds.map(threshold => ({
        threshold,
        passes: (result?.confidence || 0) >= threshold
      }))
    };
  }

  /**
   * Log conversation flow
   */
  public logConversationFlow(sessionId: string): void {
    const conversation = this.chatbotService.exportConversation(sessionId);
    
    console.group('📊 Conversation Flow');
    console.log('Session ID:', sessionId);
    console.log('Message Count:', conversation.messages.length);
    console.log('\nMessages:');
    
    conversation.messages.forEach((msg, idx) => {
      console.group(`${idx + 1}. ${msg.role.toUpperCase()}`);
      console.log('Content:', msg.content.substring(0, 100) + '...');
      console.log('Timestamp:', msg.timestamp);
      if (msg.metadata) {
        console.log('Intent:', msg.metadata.intent);
        console.log('Confidence:', msg.metadata.confidence);
        console.log('Entities:', msg.metadata.entities);
      }
      console.groupEnd();
    });

    console.log('\nSummary:', conversation.summary);
    console.groupEnd();
  }

  /**
   * Test scenarios
   */
  public async testScenarios(): Promise<void> {
    console.group('🧪 Testing Chatbot Scenarios');

    const scenarios = [
      {
        name: 'Survey Submission',
        messages: [
          'How do I submit a survey?',
          'Can I edit it later?',
          'Thanks!'
        ]
      },
      {
        name: 'Job Search',
        messages: [
          'I need to find a job',
          'Are there remote positions?',
          'How do I apply?'
        ]
      },
      {
        name: 'Profile Update',
        messages: [
          'Update my profile',
          'Change my password',
          'Privacy settings'
        ]
      },
      {
        name: 'Mixed Topics',
        messages: [
          'Hello',
          'Jobs in Manila',
          'How about training programs?',
          'Thanks for your help'
        ]
      }
    ];

    for (const scenario of scenarios) {
      console.group(`\n📝 Scenario: ${scenario.name}`);
      const result = await this.simulateConversation(scenario.messages);
      
      console.log('Session ID:', result.sessionId);
      console.table(result.messages.map(m => ({
        User: m.user.substring(0, 30),
        Intent: m.intent,
        Confidence: m.confidence.toFixed(2)
      })));
      
      console.log('Summary:', result.summary);
      console.groupEnd();
    }

    console.groupEnd();
  }

  /**
   * Benchmark intent detection speed
   */
  public benchmarkIntentDetection(iterations: number = 1000): {
    iterations: number;
    totalTime: number;
    averageTime: number;
    queriesPerSecond: number;
  } {
    const testQueries = [
      'How do I submit a survey?',
      'Find me a job',
      'Update my profile',
      'Career services',
      'Technical support'
    ];

    const startTime = performance.now();

    for (let i = 0; i < iterations; i++) {
      const query = testQueries[i % testQueries.length];
      this.chatbotService.testIntent(query);
    }

    const endTime = performance.now();
    const totalTime = endTime - startTime;
    const averageTime = totalTime / iterations;
    const queriesPerSecond = 1000 / averageTime;

    return {
      iterations,
      totalTime,
      averageTime,
      queriesPerSecond
    };
  }

  /**
   * Generate debug report
   */
  public generateReport(sessionId: string): string {
    const conversation = this.chatbotService.exportConversation(sessionId);
    const analytics = this.chatbotService.getAnalytics(sessionId);

    let report = '# Chatbot Debug Report\n\n';
    report += `**Session ID:** ${sessionId}\n`;
    report += `**Generated:** ${new Date().toLocaleString()}\n\n`;
    
    report += '## Summary\n';
    report += `- Total Messages: ${conversation.summary.messageCount}\n`;
    report += `- User Messages: ${conversation.summary.userMessageCount}\n`;
    report += `- Assistant Messages: ${conversation.summary.assistantMessageCount}\n`;
    report += `- Topics Covered: ${conversation.summary.topics.join(', ')}\n`;
    report += `- Duration: ${Math.round(conversation.summary.duration / 1000)}s\n\n`;

    report += '## Analytics\n';
    report += `- Frequent Topics: ${analytics.frequentTopics.join(', ')}\n`;
    report += `- Avg Response Time: ${analytics.averageResponseTime.toFixed(2)}ms\n`;
    report += `- Thanks Count: ${analytics.satisfactionIndicators.thanksCount}\n`;
    report += `- Repeat Questions: ${analytics.satisfactionIndicators.repeatQuestions}\n`;
    report += `- Escalations: ${analytics.satisfactionIndicators.escalations}\n\n`;

    report += '## Conversation History\n';
    conversation.messages.forEach((msg, idx) => {
      report += `\n### Message ${idx + 1} - ${msg.role.toUpperCase()}\n`;
      report += `**Time:** ${msg.timestamp.toLocaleTimeString()}\n`;
      report += `**Content:** ${msg.content}\n`;
      if (msg.metadata) {
        report += `**Intent:** ${msg.metadata.intent} (${((msg.metadata.confidence || 0) * 100).toFixed(1)}%)\n`;
      }
    });

    return report;
  }
}

// Export singleton instance
let debuggerInstance: ChatbotDebugger | null = null;

export function getChatbotDebugger(): ChatbotDebugger {
  if (!debuggerInstance) {
    debuggerInstance = new ChatbotDebugger();
  }
  return debuggerInstance;
}

// Expose to window for console debugging
if (typeof window !== 'undefined') {
  (window as any).chatbotDebugger = getChatbotDebugger();
}
