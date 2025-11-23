 /**
 * AI Provider Integration
 * Supports multiple free AI APIs for enhanced chatbot responses
 */

export interface AIProvider {
  name: string;
  generate: (prompt: string, context?: string) => Promise<string>;
  isAvailable: () => Promise<boolean>;
}

// ============================================
// 1. HUGGING FACE INFERENCE API (FREE)
// ============================================
export class HuggingFaceProvider implements AIProvider {
  name = 'Hugging Face';
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = 'mistralai/Mistral-7B-Instruct-v0.2') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async generate(prompt: string, context?: string): Promise<string> {
    const systemPrompt = context || 'You are a helpful assistant for the Graduate Tracer System.';
    
    try {
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${this.model}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: `${systemPrompt}\n\nUser: ${prompt}\nAssistant:`,
            parameters: {
              max_new_tokens: 250,
              temperature: 0.7,
              top_p: 0.95,
              do_sample: true,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data[0]?.generated_text || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('HuggingFace API error:', error);
      throw error;
    }
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${this.model}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: 'test' })
        }
      );
      return response.ok;
    } catch {
      return false;
    }
  }
}

// ============================================
// 2. GOOGLE GEMINI API (FREE)
// ============================================
export class GeminiProvider implements AIProvider {
  name = 'Google Gemini';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generate(prompt: string, context?: string): Promise<string> {
    const systemPrompt = context || 'You are a helpful assistant for the Graduate Tracer System. Provide clear, concise answers.';
    
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `${systemPrompt}\n\nUser question: ${prompt}`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'test' }] }]
          })
        }
      );
      return response.ok;
    } catch {
      return false;
    }
  }
}

// ============================================
// 3. GROQ API (FREE)
// ============================================
export class GroqProvider implements AIProvider {
  name = 'Groq';
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = 'llama-3.1-8b-instant') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async generate(prompt: string, context?: string): Promise<string> {
    const systemPrompt = context || 'You are a helpful assistant for the Graduate Tracer System.';
    
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 500,
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('Groq API error:', error);
      throw error;
    }
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/models', {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// ============================================
// 4. COHERE API (FREE TIER)
// ============================================
export class CohereProvider implements AIProvider {
  name = 'Cohere';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generate(prompt: string, context?: string): Promise<string> {
    const systemPrompt = context || 'You are a helpful assistant for the Graduate Tracer System.';
    
    try {
      const response = await fetch('https://api.cohere.ai/v1/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `${systemPrompt}\n\nUser: ${prompt}\nAssistant:`,
          model: 'command',
          max_tokens: 300,
          temperature: 0.7,
          stop_sequences: ['User:']
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.generations[0]?.text?.trim() || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('Cohere API error:', error);
      throw error;
    }
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch('https://api.cohere.ai/v1/check-api-key', {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// ============================================
// AI PROVIDER MANAGER
// ============================================
export class AIProviderManager {
  private providers: AIProvider[] = [];
  private currentProvider?: AIProvider;
  private fallbackEnabled: boolean = true;

  addProvider(provider: AIProvider): void {
    this.providers.push(provider);
    if (!this.currentProvider) {
      this.currentProvider = provider;
    }
  }

  setProvider(providerName: string): boolean {
    const provider = this.providers.find(p => p.name === providerName);
    if (provider) {
      this.currentProvider = provider;
      return true;
    }
    return false;
  }

  async generate(prompt: string, context?: string): Promise<string> {
    if (!this.currentProvider) {
      throw new Error('No AI provider configured');
    }

    try {
      return await this.currentProvider.generate(prompt, context);
    } catch (error) {
      console.error(`${this.currentProvider.name} failed:`, error);
      
      if (this.fallbackEnabled) {
        return await this.tryFallbackProviders(prompt, context);
      }
      
      throw error;
    }
  }

  private async tryFallbackProviders(prompt: string, context?: string): Promise<string> {
    for (const provider of this.providers) {
      if (provider === this.currentProvider) continue;
      
      try {
        console.log(`Trying fallback provider: ${provider.name}`);
        const isAvailable = await provider.isAvailable();
        if (isAvailable) {
          return await provider.generate(prompt, context);
        }
      } catch (error) {
        console.error(`Fallback provider ${provider.name} failed:`, error);
      }
    }
    
    throw new Error('All AI providers failed');
  }

  async checkAllProviders(): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {};
    
    for (const provider of this.providers) {
      results[provider.name] = await provider.isAvailable();
    }
    
    return results;
  }

  getProviderNames(): string[] {
    return this.providers.map(p => p.name);
  }

  getCurrentProvider(): string | undefined {
    return this.currentProvider?.name;
  }

  setFallbackEnabled(enabled: boolean): void {
    this.fallbackEnabled = enabled;
  }
}

// ============================================
// FACTORY FUNCTION
// ============================================
export function createAIProviderManager(): AIProviderManager {
  return new AIProviderManager();
}

// ============================================
// MOCK PROVIDER FOR TESTING
// ============================================
export class MockAIProvider implements AIProvider {
  name = 'Mock AI';
  private delay: number;

  constructor(delay: number = 500) {
    this.delay = delay;
  }

  async generate(prompt: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, this.delay));
    return `Mock AI response to: "${prompt}"`;
  }

  async isAvailable(): Promise<boolean> {
    return true;
  }
}
