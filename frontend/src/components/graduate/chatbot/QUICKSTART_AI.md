# 🚀 Quick Start: Add AI to Your Chatbot (5 Minutes!)

## Step 1: Get Free API Key (2 minutes)

### Option A: Google Gemini (Recommended - Easiest!)
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy your key

### Option B: Groq (Fastest responses)
1. Visit: https://console.groq.com
2. Sign up
3. Go to API Keys → Create
4. Copy your key

## Step 2: Add to Environment (1 minute)

Create `frontend/.env.local`:

```env
# Choose one or both
VITE_GEMINI_API_KEY=your_key_here
VITE_GROQ_API_KEY=your_key_here

# Enable AI
VITE_USE_AI=true
```

## Step 3: Update ChatBot.tsx (2 minutes)

Find this line in `ChatBot.tsx`:
```typescript
import { getChatbotService } from './chatbot/index';
```

Replace with:
```typescript
import { 
  getAIEnhancedChatbotService,
  createAIProviderManager,
  GeminiProvider,
  GroqProvider 
} from './chatbot/index';
```

Then find:
```typescript
const chatbotService = getChatbotService({
  minConfidence: 0.4,
  // ...
});
```

Replace with:
```typescript
// Create AI manager
const aiManager = createAIProviderManager();

// Add Gemini (if you have the key)
if (import.meta.env.VITE_GEMINI_API_KEY) {
  aiManager.addProvider(
    new GeminiProvider(import.meta.env.VITE_GEMINI_API_KEY)
  );
}

// Add Groq (if you have the key)
if (import.meta.env.VITE_GROQ_API_KEY) {
  aiManager.addProvider(
    new GroqProvider(import.meta.env.VITE_GROQ_API_KEY)
  );
}

// Use AI-enhanced chatbot
const chatbotService = getAIEnhancedChatbotService({
  useAI: import.meta.env.VITE_USE_AI === 'true',
  aiConfidenceThreshold: 0.5,  // Use AI when confidence < 50%
  hybridMode: true,             // Enhance responses with AI
  minConfidence: 0.4,
  enableContextAwareness: true,
  enableFuzzyMatching: true,
  debugMode: false
}, aiManager);
```

## Step 4: Test! (30 seconds)

1. Restart your dev server: `npm run dev`
2. Open the chatbot
3. Try: "What is the Graduate Tracer System?"
4. Try: "Tell me about quantum physics" (tests AI fallback)

## What You Get

### Before (Rule-Based Only):
- User: "Tell me about quantum physics"
- Bot: "I can help you with surveys, jobs, profiles..." ❌

### After (With AI):
- User: "Tell me about quantum physics"  
- Bot: *Provides actual answer using AI* ✅

### Smart Behavior:
- Known questions → Fast rule-based responses
- Unknown questions → AI-generated responses  
- Medium confidence → Hybrid (rule + AI enhancement)

## Configuration Tweaks

### Use AI Less (Save API calls):
```typescript
aiConfidenceThreshold: 0.7,  // Only use AI when very uncertain
hybridMode: false             // Don't enhance rule-based responses
```

### Use AI More (Better responses):
```typescript
aiConfidenceThreshold: 0.3,  // Use AI more often
hybridMode: true              // Always enhance with AI
```

### Disable AI Temporarily:
```env
VITE_USE_AI=false
```

## Troubleshooting

### "API key invalid"
- Double-check your key in the provider dashboard
- Make sure it's in `.env.local` (not `.env`)
- Restart dev server after changing `.env.local`

### "No response"
- Check browser console for errors
- Verify API key is correct
- Try: `await chatbotService.getAIStatus()`

### "Slow responses"
- Normal for first request (model loading)
- Use Groq for faster responses
- Consider caching common queries

## Cost

**All providers listed are FREE!**
- Gemini: 60 requests/minute free
- Groq: Good free tier
- HuggingFace: Generous free tier

For a small site, you'll likely never hit limits.

## Next Steps

✅ Basic setup done!

Optional enhancements:
- Add more providers for redundancy
- Adjust confidence thresholds
- Add response caching
- Monitor usage

## Need Help?

Check these files:
- `AI_INTEGRATION_GUIDE.md` - Detailed guide
- `AI_EXAMPLES.tsx` - More examples
- `CHEATSHEET.md` - Quick reference

---

**That's it!** Your chatbot now uses AI for better responses! 🎉
