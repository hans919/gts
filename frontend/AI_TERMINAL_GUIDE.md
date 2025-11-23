# AI CHATBOT INTEGRATION - TERMINAL COMMANDS

##  SETUP COMPLETE!
Your chatbot is now configured for AI integration!

##  QUICK START (Choose one method)

### Method 1: Interactive Wizard (Easiest!)
```powershell
.\setup-ai-wizard.ps1
```

This will guide you through:
1. Getting an API key
2. Adding it to your config
3. Enabling AI features

### Method 2: Manual Commands

#### Step 1: Add API Key
```powershell
# For Google Gemini (Recommended)
.\add-api-key.ps1 gemini 'your_api_key_here'

# For Groq (Fastest)
.\add-api-key.ps1 groq 'your_api_key_here'

# For Hugging Face
.\add-api-key.ps1 huggingface 'your_api_key_here'
```

#### Step 2: Enable AI
```powershell
.\enable-ai.ps1
```

#### Step 3: Restart Dev Server
```powershell
npm run dev
```

##  CHECK STATUS

Check current configuration:
```powershell
.\setup-ai.ps1
```

##  GET FREE API KEYS

### Google Gemini (Recommended)
- URL: https://makersuite.google.com/app/apikey
- Free: 60 requests/minute
- Easiest to set up

### Groq (Fastest)
- URL: https://console.groq.com
- Free tier available
- Super fast responses

### Hugging Face
- URL: https://huggingface.co/settings/tokens
- Generous free tier
- Open source models

##  MANUAL SETUP (Alternative)

If you prefer to edit files manually:

1. Edit .env.local:
```env
VITE_GEMINI_API_KEY=your_key_here
VITE_USE_AI=true
```

2. Restart dev server:
```powershell
npm run dev
```

##  TESTING

After setup, test in browser:
1. Open chatbot
2. Try: 'How do I submit a survey?' (rule-based)
3. Try: 'What is quantum physics?' (AI-powered)
4. Check browser console for AI status

##  TROUBLESHOOTING

### Issue: API key not working
```powershell
# Check current config
.\setup-ai.ps1

# Verify API key is correct
Get-Content .env.local | Select-String 'VITE_'
```

### Issue: AI not responding
- Check VITE_USE_AI=true in .env.local
- Restart dev server
- Check browser console for errors

### Issue: Need to change API key
```powershell
# Remove old key and add new one
.\add-api-key.ps1 gemini 'new_key_here'
```

##  DOCUMENTATION FILES

All in: src/components/graduate/chatbot/

- QUICKSTART_AI.md - Quick setup guide
- AI_INTEGRATION_GUIDE.md - Detailed documentation
- AI_EXAMPLES.tsx - Code examples
- CHEATSHEET.md - Quick reference

##  WHAT YOU GET

With AI enabled:
 Answers ANY question (not just predefined ones)
 Natural conversation flow
 Context-aware responses
 Multiple AI providers with fallback
 Smart hybrid mode (rule + AI)

Without AI:
 Fast rule-based responses
 Predefined intents (30+ topics)
 No API costs
 Works offline

##  TIPS

1. Start with Gemini (easiest)
2. Add multiple providers for redundancy
3. Keep VITE_USE_AI=false for development if not needed
4. Monitor API usage in provider dashboard

##  DEPLOYMENT

Before deploying:
1. Add API keys to your hosting environment variables
2. Never commit .env.local to git
3. Test thoroughly in production environment

##  NEED HELP?

Run the wizard again:
```powershell
.\setup-ai-wizard.ps1
```

Or check documentation:
```powershell
Get-Content src/components/graduate/chatbot/QUICKSTART_AI.md
```

---
Generated: 2025-11-23 09:53:59
