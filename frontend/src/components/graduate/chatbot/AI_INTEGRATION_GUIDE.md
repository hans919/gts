# 🤖 AI Integration Guide

## Overview

This guide shows how to integrate free AI APIs to enhance your chatbot with natural language understanding and generation.

## Supported Free AI Providers

### 1. **Hugging Face** (Recommended for starting)
- **Free Tier:** Yes
- **Sign up:** https://huggingface.co/join
- **Get API Key:** Settings → Access Tokens
- **Limits:** Generous free tier
- **Models:** Mistral-7B, LLaMA, etc.

### 2. **Google Gemini**
- **Free Tier:** 60 requests/minute
- **Sign up:** https://makersuite.google.com/app/apikey
- **Get API Key:** Create API key
- **Limits:** Very generous
- **Model:** Gemini Pro

### 3. **Groq** (Fastest)
- **Free Tier:** Yes
- **Sign up:** https://console.groq.com
- **Get API Key:** API Keys section
- **Limits:** Good free tier
- **Models:** Mixtral, LLaMA3

### 4. **Cohere**
- **Free Tier:** Trial credits
- **Sign up:** https://cohere.com/
- **Get API Key:** Dashboard → API Keys
- **Limits:** Trial available

## Quick Start

### Step 1: Get API Key

Choose one provider and get your API key. We recommend starting with **Hugging Face** or **Google Gemini**.

### Step 2: Configure Environment

Create `.env.local` in your frontend folder:

```env
# Choose one or more providers
VITE_HUGGINGFACE_API_KEY=your_key_here
VITE_GEMINI_API_KEY=your_key_here
VITE_GROQ_API_KEY=your_key_here
VITE_COHERE_API_KEY=your_key_here

# Enable AI
VITE_USE_AI=true
```

### Step 3: Initialize AI Provider

Update `ChatBot.tsx`:

```typescript
import { getAIEnhancedChatbotService } from './chatbot/aiEnhancedService';
import { 
  createAIProviderManager, 
  HuggingFaceProvider,
  GeminiProvider,
  GroqProvider 
} from './chatbot/aiProviders';

// Create AI manager
const aiManager = createAIProviderManager();

// Add providers (only add those you have keys for)
if (import.meta.env.VITE_GEMINI_API_KEY) {
  aiManager.addProvider(
    new GeminiProvider(import.meta.env.VITE_GEMINI_API_KEY)
  );
}

if (import.meta.env.VITE_HUGGINGFACE_API_KEY) {
  aiManager.addProvider(
    new HuggingFaceProvider(import.meta.env.VITE_HUGGINGFACE_API_KEY)
  );
}

if (import.meta.env.VITE_GROQ_API_KEY) {
  aiManager.addProvider(
    new GroqProvider(import.meta.env.VITE_GROQ_API_KEY)
  );
}

// Use AI-enhanced service
const chatbotService = getAIEnhancedChatbotService({
  useAI: import.meta.env.VITE_USE_AI === 'true',
  aiConfidenceThreshold: 0.5,
  hybridMode: true,
  minConfidence: 0.4,
  enableContextAwareness: true,
  enableFuzzyMatching: true
}, aiManager);
```

## Configuration Options

```typescript
{
  useAI: true,                    // Enable AI responses
  aiConfidenceThreshold: 0.5,     // Use AI when confidence < 0.5
  hybridMode: true,               // Enhance rule-based with AI
  minConfidence: 0.4,             // Min confidence for rule-based
  enableContextAwareness: true,   // Use conversation context
  enableFuzzyMatching: true       // Typo tolerance
}
```

## How It Works

### Mode 1: Pure Rule-Based (AI Disabled)
```
User Query → Intent Detection → Knowledge Base → Response
```

### Mode 2: AI Fallback
```
User Query → Intent Detection
  ↓
  Confidence >= 0.5? → Use Knowledge Base
  ↓
  Confidence < 0.5?  → Use AI API
```

### Mode 3: Hybrid (Recommended)
```
User Query → Intent Detection
  ↓
  High Confidence (>0.8) → Knowledge Base
  ↓
  Medium Confidence (0.5-0.8) → Knowledge Base + AI Enhancement
  ↓
  Low Confidence (<0.5) → Pure AI
```

## Usage Examples

### Example 1: Gemini Only (Easiest)

```typescript
import { GeminiProvider, createAIProviderManager } from './chatbot/aiProviders';
import { getAIEnhancedChatbotService } from './chatbot/aiEnhancedService';

const aiManager = createAIProviderManager();
aiManager.addProvider(
  new GeminiProvider('YOUR_GEMINI_API_KEY')
);

const chatbot = getAIEnhancedChatbotService({
  useAI: true,
  aiConfidenceThreshold: 0.5,
  hybridMode: true
}, aiManager);

// Use it
const response = await chatbot.processMessage("your question", "session_123");
```

### Example 2: Multiple Providers with Fallback

```typescript
const aiManager = createAIProviderManager();

// Add primary provider
aiManager.addProvider(new GeminiProvider(geminiKey));

// Add fallback providers
aiManager.addProvider(new GroqProvider(groqKey));
aiManager.addProvider(new HuggingFaceProvider(hfKey));

// If Gemini fails, will try Groq, then HuggingFace
const chatbot = getAIEnhancedChatbotService({ useAI: true }, aiManager);
```

### Example 3: Switch Providers

```typescript
// Check which providers are available
const status = await aiManager.checkAllProviders();
console.log(status); // { "Google Gemini": true, "Groq": true, ... }

// Switch to specific provider
aiManager.setProvider('Groq');

// Current provider
console.log(aiManager.getCurrentProvider()); // "Groq"
```

## Testing

### Test AI Provider

```javascript
// In browser console
const aiManager = createAIProviderManager();
aiManager.addProvider(new GeminiProvider('your_key'));

// Test
const response = await aiManager.generate("What is the Graduate Tracer System?");
console.log(response);
```

### Test Hybrid Mode

```typescript
const chatbot = getAIEnhancedChatbotService({
  useAI: true,
  aiConfidenceThreshold: 0.5,
  hybridMode: true,
  debugMode: true // See logs
}, aiManager);

// Test various confidence levels
await chatbot.processMessage("submit survey", "session_1"); // High confidence → Rule-based
await chatbot.processMessage("how to apply", "session_1");  // Medium → Hybrid
await chatbot.processMessage("random question", "session_1"); // Low → AI
```

## Cost & Limits

### Free Tier Comparison

| Provider | Free Limit | Best For |
|----------|-----------|----------|
| **Gemini** | 60 req/min | General use, fast |
| **Hugging Face** | Generous | Open source models |
| **Groq** | Good limits | Speed, quality |
| **Cohere** | Trial credits | Testing |

### Recommendations

1. **Start with Gemini** - Easy setup, generous limits
2. **Add Groq** as fallback - Very fast
3. **Add HuggingFace** - Good for open source models

## Production Tips

### 1. Use Environment Variables
Never commit API keys! Always use `.env.local`:

```env
VITE_GEMINI_API_KEY=your_key_here
```

### 2. Enable Fallback
```typescript
aiManager.setFallbackEnabled(true); // Automatic fallback
```

### 3. Monitor Usage
```typescript
const status = await chatbot.getAIStatus();
console.log('AI Available:', status.available);
console.log('Current Provider:', status.provider);
```

### 4. Handle Errors
```typescript
try {
  const response = await chatbot.processMessage(userInput, sessionId);
} catch (error) {
  // Will automatically fallback to rule-based if AI fails
  console.error('Error:', error);
}
```

### 5. Rate Limiting
```typescript
// Simple rate limiter
let lastRequest = 0;
const MIN_DELAY = 1000; // 1 second

async function processWithRateLimit(message, session) {
  const now = Date.now();
  const delay = Math.max(0, MIN_DELAY - (now - lastRequest));
  
  if (delay > 0) {
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  lastRequest = Date.now();
  return await chatbot.processMessage(message, session);
}
```

## Troubleshooting

### Issue: "API key invalid"
- **Solution:** Check your API key in provider dashboard
- Ensure key is correctly set in `.env.local`
- Restart dev server after changing `.env.local`

### Issue: "Rate limit exceeded"
- **Solution:** Add delay between requests
- Enable fallback to other providers
- Upgrade to paid tier if needed

### Issue: "Slow responses"
- **Solution:** Use Groq (fastest)
- Lower `max_tokens` parameter
- Enable caching for common queries

### Issue: "Poor quality responses"
- **Solution:** Improve context in `buildAIContext()`
- Adjust temperature (lower = more focused)
- Try different models

## Advanced: Custom Provider

```typescript
class MyCustomProvider implements AIProvider {
  name = 'My Provider';
  
  async generate(prompt: string, context?: string): Promise<string> {
    // Your implementation
    const response = await fetch('your_api_endpoint', {
      // your config
    });
    return response.text();
  }
  
  async isAvailable(): Promise<boolean> {
    // Check if provider is available
    return true;
  }
}

// Use it
aiManager.addProvider(new MyCustomProvider());
```

## Next Steps

1. Get API key from one provider
2. Add to `.env.local`
3. Update `ChatBot.tsx` with provider
4. Test in browser
5. Deploy!

## Resources

- [Hugging Face Docs](https://huggingface.co/docs/api-inference)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Groq Documentation](https://console.groq.com/docs)
- [Cohere Docs](https://docs.cohere.com/)

---

💡 **Pro Tip:** Start with Gemini for easiest setup, then add other providers for redundancy!
