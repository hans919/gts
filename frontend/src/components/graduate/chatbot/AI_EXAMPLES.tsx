/**
 * AI Integration Example
 * Copy this code to ChatBot.tsx to enable AI
 */

// ============================================
// OPTION 1: GOOGLE GEMINI (EASIEST - RECOMMENDED)
// ============================================

/*
1. Get free API key from: https://makersuite.google.com/app/apikey
2. Create .env.local file in frontend folder:

VITE_GEMINI_API_KEY=your_key_here
VITE_USE_AI=true

3. Replace chatbot initialization in ChatBot.tsx:
*/

import { getAIEnhancedChatbotService } from './chatbot/aiEnhancedService';
import { createAIProviderManager, GeminiProvider } from './chatbot/aiProviders';

// Create AI manager
const aiManager = createAIProviderManager();

// Add Gemini provider (FREE!)
if (import.meta.env.VITE_GEMINI_API_KEY) {
  aiManager.addProvider(
    new GeminiProvider(import.meta.env.VITE_GEMINI_API_KEY)
  );
}

// Use AI-enhanced chatbot
const chatbotService = getAIEnhancedChatbotService({
  useAI: import.meta.env.VITE_USE_AI === 'true',
  aiConfidenceThreshold: 0.5,  // Use AI when rule-based confidence < 0.5
  hybridMode: true,             // Enhance good responses with AI
  minConfidence: 0.4,
  enableContextAwareness: true,
  enableFuzzyMatching: true,
  debugMode: false
}, aiManager);

// That's it! Your chatbot now uses AI when needed!

// ============================================
// OPTION 2: MULTIPLE PROVIDERS (RECOMMENDED FOR PRODUCTION)
// ============================================

/*
.env.local:

VITE_GEMINI_API_KEY=your_gemini_key
VITE_GROQ_API_KEY=your_groq_key
VITE_HUGGINGFACE_API_KEY=your_hf_key
VITE_USE_AI=true
*/

import { 
  createAIProviderManager, 
  GeminiProvider,
  GroqProvider,
  HuggingFaceProvider 
} from './chatbot/aiProviders';

const aiManager2 = createAIProviderManager();

// Add primary provider (Gemini - fast & reliable)
if (import.meta.env.VITE_GEMINI_API_KEY) {
  aiManager2.addProvider(
    new GeminiProvider(import.meta.env.VITE_GEMINI_API_KEY)
  );
}

// Add fallback providers
if (import.meta.env.VITE_GROQ_API_KEY) {
  aiManager2.addProvider(
    new GroqProvider(import.meta.env.VITE_GROQ_API_KEY)
  );
}

if (import.meta.env.VITE_HUGGINGFACE_API_KEY) {
  aiManager2.addProvider(
    new HuggingFaceProvider(import.meta.env.VITE_HUGGINGFACE_API_KEY)
  );
}

// If Gemini fails, automatically tries Groq, then HuggingFace
const chatbotService2 = getAIEnhancedChatbotService({
  useAI: true,
  aiConfidenceThreshold: 0.5,
  hybridMode: true
}, aiManager2);

// ============================================
// OPTION 3: WITHOUT AI (KEEP CURRENT SYSTEM)
// ============================================

import { getChatbotService } from './chatbot/chatbotService';

const chatbotService3 = getChatbotService({
  minConfidence: 0.4,
  enableContextAwareness: true,
  enableFuzzyMatching: true
});

// ============================================
// TESTING AI INTEGRATION
// ============================================

// In browser console:

// 1. Test AI provider directly
/*
const aiManager = createAIProviderManager();
aiManager.addProvider(new GeminiProvider('your_key'));
const response = await aiManager.generate("What is GTS?");
console.log(response);
*/

// 2. Check AI status
/*
const status = await chatbotService.getAIStatus();
console.log('AI Enabled:', status.enabled);
console.log('Provider:', status.provider);
console.log('Available:', status.available);
*/

// 3. Test different confidence levels
/*
// High confidence - uses rule-based
await chatbotService.processMessage("submit survey", "test_session");

// Medium confidence - uses hybrid (rule + AI enhancement)
await chatbotService.processMessage("how to apply for jobs", "test_session");

// Low confidence - uses pure AI
await chatbotService.processMessage("what is the meaning of life", "test_session");
*/

// 4. Switch providers
/*
aiManager.setProvider('Groq');
console.log('Current:', aiManager.getCurrentProvider());
*/

// 5. Check all providers
/*
const providerStatus = await aiManager.checkAllProviders();
console.table(providerStatus);
*/

// ============================================
// COMPLETE EXAMPLE: Update ChatBot.tsx
// ============================================

/*
// At the top of ChatBot.tsx, replace the chatbot initialization:

import { getAIEnhancedChatbotService } from './chatbot/aiEnhancedService';
import { createAIProviderManager, GeminiProvider, GroqProvider } from './chatbot/aiProviders';

// Create AI manager
const aiManager = createAIProviderManager();

// Add providers (only those you have keys for)
if (import.meta.env.VITE_GEMINI_API_KEY) {
  aiManager.addProvider(new GeminiProvider(import.meta.env.VITE_GEMINI_API_KEY));
}

if (import.meta.env.VITE_GROQ_API_KEY) {
  aiManager.addProvider(new GroqProvider(import.meta.env.VITE_GROQ_API_KEY));
}

// Initialize AI-enhanced chatbot
const chatbotService = getAIEnhancedChatbotService({
  useAI: import.meta.env.VITE_USE_AI === 'true',
  aiConfidenceThreshold: 0.5,
  hybridMode: true,
  minConfidence: 0.4,
  enableContextAwareness: true,
  enableFuzzyMatching: true,
  debugMode: false
}, aiManager);

// Rest of your ChatBot component stays the same!
// The component will automatically use AI when needed.
*/

// ============================================
// BENEFITS OF EACH MODE
// ============================================

/*
RULE-BASED ONLY (useAI: false)
✅ Fast
✅ Predictable
✅ No API costs
✅ Works offline
❌ Can't handle unexpected questions

AI FALLBACK (aiConfidenceThreshold: 0.5, hybridMode: false)
✅ Handles unexpected questions
✅ More flexible
✅ Uses rule-based when possible (fast)
✅ Falls back to AI when needed
❌ Slower for unknown questions
❌ Requires API key

HYBRID MODE (hybridMode: true) - RECOMMENDED
✅ Best of both worlds
✅ Fast for known questions
✅ Natural responses for all questions
✅ AI enhances even good rule-based responses
✅ Handles unknown questions
❌ Uses AI more often (more API calls)
*/

// ============================================
// COST CONSIDERATIONS
// ============================================

/*
FREE TIER LIMITS:
- Google Gemini: 60 requests/minute (FREE!)
- Groq: Good free tier
- HuggingFace: Generous free tier

TYPICAL USAGE:
- Small site (< 100 users/day): FREE
- Medium site (< 1000 users/day): FREE with multiple providers
- Large site: Consider paid tier or caching

OPTIMIZATION TIPS:
1. Use hybridMode only if needed
2. Set aiConfidenceThreshold higher (0.6-0.7) to use AI less
3. Cache common AI responses
4. Use multiple providers with fallback
*/

// ============================================
// QUICK START CHECKLIST
// ============================================

/*
□ 1. Sign up for Google Gemini: https://makersuite.google.com/app/apikey
□ 2. Get your free API key
□ 3. Create .env.local with: VITE_GEMINI_API_KEY=your_key
□ 4. Add: VITE_USE_AI=true
□ 5. Copy initialization code above to ChatBot.tsx
□ 6. Test: "What is the Graduate Tracer System?"
□ 7. Done! 🎉
*/

export {};
