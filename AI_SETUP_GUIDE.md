# AI Chatbot Setup Guide

## Why is AI Disabled?

Your AI chatbot is currently disabled because you need to add at least **one FREE API key** to your production environment.

## Current Status

✅ AI Code Installed  
✅ Multiple AI Providers Available (Gemini, Groq, HuggingFace, Cohere)  
❌ No API Keys Configured  
❌ AI Disabled in Production

## Quick Fix (Choose ONE Provider)

### Option 1: Google Gemini (RECOMMENDED - Fastest Setup)

**Why Gemini?**
- FREE forever
- No credit card required
- Very fast responses
- Best for chatbots

**Setup Steps:**

1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy your API key
4. Add to `.env.production`:
   ```
   VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
   ```

### Option 2: Groq (RECOMMENDED - Super Fast)

**Why Groq?**
- FREE forever
- Ultra-fast inference
- Great for real-time chat

**Setup Steps:**

1. Go to: https://console.groq.com
2. Sign up for free account
3. Go to API Keys section
4. Create new API key
5. Add to `.env.production`:
   ```
   VITE_GROQ_API_KEY=YOUR_API_KEY_HERE
   ```

### Option 3: HuggingFace

1. Go to: https://huggingface.co/settings/tokens
2. Create new token
3. Add to `.env.production`:
   ```
   VITE_HUGGINGFACE_API_KEY=YOUR_API_KEY_HERE
   ```

### Option 4: Cohere

1. Go to: https://dashboard.cohere.com/api-keys
2. Create API key
3. Add to `.env.production`:
   ```
   VITE_COHERE_API_KEY=YOUR_API_KEY_HERE
   ```

## Complete .env.production File Example

```env
VITE_API_URL=https://lightsteelblue-locust-816886.hostingersite.com/api

# Enable AI
VITE_USE_AI=true

# Add at least ONE of these (I recommend Gemini):
VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX
# VITE_GROQ_API_KEY=gsk_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
# VITE_HUGGINGFACE_API_KEY=hf_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
# VITE_COHERE_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## Deploy to Netlify

After adding your API key:

### Method 1: Via Netlify Dashboard (EASIEST)

1. Go to: https://app.netlify.com
2. Click your site: `sjcbts`
3. Go to: **Site settings** → **Environment variables**
4. Add these variables:
   - `VITE_API_URL` = `https://lightsteelblue-locust-816886.hostingersite.com/api`
   - `VITE_USE_AI` = `true`
   - `VITE_GEMINI_API_KEY` = `YOUR_ACTUAL_KEY`
5. Go to **Deploys** → **Trigger deploy** → **Deploy site**

### Method 2: Via Command Line

```powershell
# 1. Build with production environment
cd c:\xampp\htdocs\gts\frontend
npm run build

# 2. Deploy
netlify deploy --prod

# When prompted, select:
# - Publish directory: dist
```

### Method 3: Via Git Push (if connected to GitHub)

```powershell
# Just push your changes
git add .env.production
git commit -m "Enable AI chatbot with API key"
git push
```

## Verification

After deployment, check if AI is working:

1. Open your site: https://sjcbts.netlify.app
2. Open browser console (F12)
3. Look for these messages:
   ```
   ✅ Gemini AI provider initialized
   🤖 AI-enhanced chatbot enabled
   AI Status: { enabled: true, provider: 'Google Gemini', available: true }
   ```

## Troubleshooting

### AI Still Says "Disabled"

**Problem**: Environment variables not loaded

**Solution**:
```powershell
# Clear build cache
cd c:\xampp\htdocs\gts\frontend
rm -r dist
rm -r node_modules/.vite
npm run build
netlify deploy --prod
```

### "Invalid API Key" Error

**Solutions**:
1. Regenerate API key from provider dashboard
2. Make sure no extra spaces in `.env.production`
3. Make sure you're using the RIGHT provider's key
4. Wait 5 minutes after creating key (some providers have delay)

### Build Succeeds But AI Not Working

**Check**:
1. Netlify environment variables are set correctly
2. You triggered a NEW deploy after adding variables
3. Clear browser cache (Ctrl+Shift+Delete)

## How the AI Works

1. **Rule-Based First**: If the chatbot knows the answer (confidence > 50%), it uses built-in rules
2. **AI Fallback**: If confidence is low, it uses AI to generate a response
3. **Hybrid Mode**: AI can enhance rule-based responses to make them friendlier
4. **Multiple Providers**: If one AI fails, it automatically tries another

## Cost

**All providers are 100% FREE** with generous limits:

- **Gemini**: 60 requests/minute (FREE forever)
- **Groq**: 30 requests/minute (FREE)
- **HuggingFace**: 1000 requests/month (FREE)
- **Cohere**: 100 calls/month (FREE)

For a graduate portal, this is MORE than enough!

## Recommended Configuration

For production, use this setup:

```env
VITE_USE_AI=true
VITE_GEMINI_API_KEY=your_key_here
VITE_GROQ_API_KEY=your_backup_key_here
```

This gives you:
- Primary: Gemini (fast, reliable)
- Backup: Groq (if Gemini fails)
- Automatic failover between providers

## Security Notes

✅ **Safe**: Environment variables are only used during build
✅ **Safe**: API keys are compiled into the app (not exposed)
✅ **Safe**: All AI calls are from browser to AI provider directly
✅ **Safe**: No API key is sent to your backend

⚠️ **Warning**: Never commit `.env.production` to public GitHub repos

## Next Steps

1. **Get Gemini API Key** (5 minutes): https://makersuite.google.com/app/apikey
2. **Add to .env.production**
3. **Deploy**: `npm run build && netlify deploy --prod`
4. **Test**: Visit your site and try the chatbot

## Questions?

Check the console logs:
- `🤖 AI-enhanced chatbot enabled` = AI is on
- `📝 Rule-based chatbot (AI disabled)` = AI is off
- `✅ [Provider] initialized` = Provider loaded successfully

---

**Need help?** Open the browser console (F12) and paste this:

```javascript
// Check AI status
chatbotDebugger.getStatus()

// Test AI manually
await chatbotDebugger.testAI("What is GTS?")
```
