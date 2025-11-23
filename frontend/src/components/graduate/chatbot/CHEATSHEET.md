# 🚀 Chatbot Cheat Sheet

## Quick Commands (Browser Console)

```javascript
// Test a single query
window.quickTest("your question here")

// Compare multiple queries
window.compareQueries("query 1", "query 2", "query 3")

// Test intent detection
window.chatbotDebugger.testIntent("How do I submit a survey?")

// Search knowledge base
window.chatbotDebugger.searchKnowledge("job")

// Run all test scenarios
await window.chatbotDebugger.testScenarios()

// Benchmark performance
window.chatbotDebugger.benchmarkIntentDetection(1000)

// Test confidence threshold
window.chatbotDebugger.testConfidenceThreshold("query", [0.3, 0.4, 0.5])

// Simulate conversation
await window.chatbotDebugger.simulateConversation([
  "Hello",
  "How do I submit a survey?",
  "Thanks!"
])

// View analytics (replace with actual session ID)
window.chatbotDebugger.getAnalytics("session_id")

// Generate report
window.chatbotDebugger.generateReport("session_id")

// Log conversation flow
window.chatbotDebugger.logConversationFlow("session_id")

// Export conversation
window.chatbotDebugger.exportConversation("session_id")
```

## File Quick Reference

| File | Purpose | Lines |
|------|---------|-------|
| `types.ts` | TypeScript definitions | 152 |
| `intentDetector.ts` | Intent detection logic | 426 |
| `knowledgeBase.ts` | Responses & knowledge | 683 |
| `conversationManager.ts` | Context management | 303 |
| `chatbotService.ts` | Main service | 356 |
| `debugger.ts` | Debug utilities | 343 |
| `index.ts` | Module exports | 9 |

## Intent Categories

| Category | Count | Examples |
|----------|-------|----------|
| Survey | 3 | submit, status, edit |
| Jobs | 3 | search, apply, filter |
| Profile | 3 | update, photo, password |
| Career | 3 | services, resume, interview |
| Support | 3 | technical, ticket, contact |
| Notification | 2 | view, settings |
| Privacy | 3 | settings, export, delete |
| Training | 2 | programs, register |
| Dashboard | 2 | navigation, stats |
| Resources | 2 | alumni, events |
| General | 4 | greeting, thanks, help |

## Configuration Options

```typescript
const chatbotService = getChatbotService({
  minConfidence: 0.4,           // 0.0 - 1.0 (lower = more lenient)
  maxSuggestions: 3,            // Number of suggestions to show
  enableContextAwareness: true, // Use conversation context
  enableFuzzyMatching: true,    // Typo tolerance
  debugMode: false              // Console logging
});
```

## Common Tasks

### Add New Intent
1. Edit `intentDetector.ts` → `initializeIntents()`
2. Edit `knowledgeBase.ts` → `initializeKnowledge()`
3. Test: `window.quickTest("your query")`

### Update Response
1. Edit `knowledgeBase.ts` → Find entry by ID
2. Update `answer` field
3. Save & reload

### Debug Issue
1. `window.quickTest("problematic query")`
2. Check intent name and confidence
3. Adjust keywords or threshold

### Test Category
```javascript
const tests = ["query1", "query2", "query3"];
window.chatbotDebugger.testBatch(tests)
```

## Example Queries

### Survey
```
"How do I submit a survey?"
"Can I edit my survey?"
"Check survey status"
```

### Jobs
```
"Find me a job"
"Remote positions"
"How to apply?"
```

### Profile
```
"Update my profile"
"Change password"
"Upload photo"
```

### Career
```
"Career services"
"Resume help"
"Interview tips"
```

### Support
```
"Technical support"
"Submit ticket"
"Contact admin"
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Send message |
| `F12` | Open console |

## Performance Targets

| Metric | Target | Actual |
|--------|--------|--------|
| Intent Detection | < 5ms | ~1-2ms |
| Response Time | < 20ms | ~5-10ms |
| Queries/Second | > 500 | ~1000+ |
| Memory/Session | < 5MB | ~1-2MB |

## Confidence Levels

| Range | Meaning |
|-------|---------|
| 0.9 - 1.0 | Excellent match |
| 0.7 - 0.9 | Good match |
| 0.5 - 0.7 | Fair match |
| 0.3 - 0.5 | Poor match |
| 0.0 - 0.3 | No match |

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Intent not detected | Add more keywords or lower threshold |
| Wrong intent | Check keyword conflicts |
| Slow response | Check entity extraction or fuzzy matching |
| Poor answer | Update knowledge base entry |
| No suggestions | Add relatedQuestions to entry |

## Quick Links

- Full Docs: `README.md`
- Quick Start: `QUICKSTART.md`
- Testing: `TESTING_EXAMPLES.js`
- Summary: `SUMMARY.md`

## Version Info

- **Version:** 2.0
- **Date:** November 2025
- **Architecture:** Modular
- **Language:** TypeScript
- **Framework:** React + Vite

---

💡 **Tip:** Keep this cheat sheet handy for quick reference!
