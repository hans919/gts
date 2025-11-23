# Graduate Tracer System - Chatbot Module

## Overview

The GTS Chatbot is a sophisticated, context-aware AI assistant built with modular architecture for easy maintenance, debugging, and extensibility. It uses NLP-like techniques for intent detection and provides intelligent, contextual responses.

## Architecture

```
chatbot/
├── types.ts                 # TypeScript interfaces and types
├── intentDetector.ts        # Intent detection engine with NLP capabilities
├── knowledgeBase.ts         # Structured knowledge and responses
├── conversationManager.ts   # Conversation context and history management
├── chatbotService.ts        # Main orchestrator service
├── debugger.ts              # Debugging and testing utilities
└── index.ts                 # Module exports
```

## Key Features

### 1. **Intent Detection Engine** (`intentDetector.ts`)
- **Pattern Matching**: Matches user input against predefined patterns
- **Keyword Matching**: Identifies intents based on keywords with weights
- **Fuzzy Matching**: Uses Levenshtein distance for typo tolerance
- **Confidence Scoring**: Calculates confidence levels for matched intents
- **Entity Extraction**: Extracts entities like job types, locations, and statuses
- **Context Awareness**: Considers previous intents for better matching
- **Follow-up Intent Support**: Handles conversational flow

**Supported Intent Categories:**
- Survey management
- Job search and applications
- Profile management
- Career services
- Technical support
- Notifications
- Privacy settings
- Training programs
- Dashboard navigation
- Alumni resources
- General conversation

### 2. **Knowledge Base** (`knowledgeBase.ts`)
- **Structured Responses**: Organized by intent categories
- **Rich Content**: Detailed, step-by-step responses with formatting
- **Related Questions**: Suggests follow-up questions
- **Quick Actions**: Provides actionable buttons for common tasks
- **Search Capability**: Full-text search across all knowledge
- **Easy to Update**: Simple object structure for adding/modifying content
- **Priority System**: Higher priority entries shown first

### 3. **Conversation Manager** (`conversationManager.ts`)
- **Session Management**: Tracks multiple user sessions
- **Conversation History**: Stores complete message history
- **Context Tracking**: Maintains current topic and entities
- **Follow-up Detection**: Identifies when users ask follow-up questions
- **User Preferences**: Stores user-specific preferences
- **Analytics**: Tracks conversation patterns and satisfaction
- **Export Capability**: Export conversations for analysis
- **Auto Cleanup**: Removes expired sessions automatically

### 4. **Chatbot Service** (`chatbotService.ts`)
- **Message Processing**: Orchestrates intent detection and response generation
- **Response Personalization**: Customizes responses based on extracted entities
- **Fallback Handling**: Provides helpful responses when intent is unclear
- **Error Handling**: Graceful error recovery
- **Configuration**: Adjustable parameters for fine-tuning
- **History Management**: Access to conversation history
- **Analytics Integration**: Provides conversation insights

### 5. **Debugging Tools** (`debugger.ts`)
- **Intent Testing**: Test intent detection with detailed output
- **Batch Testing**: Test multiple queries at once
- **Conversation Simulation**: Simulate full conversations
- **Analytics**: Analyze conversation patterns
- **Export**: Export conversations in JSON format
- **Performance Benchmarking**: Test intent detection speed
- **Debug Reports**: Generate detailed markdown reports

## Usage

### Basic Usage

```typescript
import { getChatbotService } from './chatbot';

// Initialize service
const chatbot = getChatbotService({
  minConfidence: 0.4,
  maxSuggestions: 3,
  enableContextAwareness: true,
  enableFuzzyMatching: true,
  debugMode: false
});

// Process a message
const response = await chatbot.processMessage(
  "How do I submit a survey?",
  "session_123"
);

console.log(response.content);      // Response text
console.log(response.suggestions);  // Related questions
console.log(response.quickActions); // Action buttons
```

### Debugging

```typescript
import { getChatbotDebugger } from './chatbot';

const debugger = getChatbotDebugger();

// Test intent detection
const result = debugger.testIntent("Find me a job");
console.log(result);

// Simulate conversation
const conversation = await debugger.simulateConversation([
  "Hello",
  "How do I submit a survey?",
  "Can I edit it later?",
  "Thanks!"
]);

// Generate report
const report = debugger.generateReport("session_123");
console.log(report);

// Access from browser console
window.chatbotDebugger.testIntent("your query here");
```

### Testing Multiple Scenarios

```typescript
// Run predefined scenarios
await debugger.testScenarios();

// Test confidence thresholds
const thresholdTest = debugger.testConfidenceThreshold(
  "submit employment survey",
  [0.3, 0.4, 0.5, 0.6, 0.7]
);

// Benchmark performance
const benchmark = debugger.benchmarkIntentDetection(1000);
console.log(`Avg: ${benchmark.averageTime}ms, QPS: ${benchmark.queriesPerSecond}`);
```

## Adding New Intents

### 1. Add Intent Definition

Edit `intentDetector.ts` in the `initializeIntents()` method:

```typescript
{
  name: 'my_new_intent',
  category: 'general',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  requiredKeywords: ['keyword1'], // Optional
  patterns: [
    'pattern one',
    'pattern two',
    'pattern three'
  ],
  followUpIntents: ['related_intent_1', 'related_intent_2']
}
```

### 2. Add Knowledge Entry

Edit `knowledgeBase.ts` in the `initializeKnowledge()` method:

```typescript
{
  id: 'my_new_intent',
  category: 'general',
  question: 'What is this feature?',
  answer: `Your detailed answer here.

**Step-by-Step:**
1. First step
2. Second step
3. Third step

💡 **Pro tip:** Add helpful hints!`,
  relatedQuestions: [
    'Related question 1?',
    'Related question 2?',
    'Related question 3?'
  ],
  tags: ['tag1', 'tag2', 'tag3'],
  priority: 1
}
```

### 3. Add Quick Actions (Optional)

Edit `knowledgeBase.ts` in the `getQuickActions()` method:

```typescript
my_new_intent: [
  { label: 'Action 1', action: '/path', icon: '🎯' },
  { label: 'Action 2', action: '/path2', icon: '⚡' }
]
```

## Configuration Options

```typescript
interface ChatbotConfig {
  minConfidence: number;           // Minimum confidence for intent match (0-1)
  maxSuggestions: number;          // Max number of suggestions to show
  enableContextAwareness: boolean;  // Use conversation context
  enableFuzzyMatching: boolean;    // Allow typo tolerance
  debugMode: boolean;              // Enable debug logging
}
```

## Performance

- **Intent Detection**: ~1-2ms average per query
- **Response Generation**: ~5-10ms average
- **Memory**: Lightweight, ~1-2MB per session
- **Scalability**: Can handle 1000+ queries per second

## Testing

### Manual Testing

1. Open the chatbot interface
2. Try various queries
3. Check responses and suggestions
4. Verify quick actions work

### Automated Testing

```typescript
// Test all scenarios
await debugger.testScenarios();

// Test specific intent
const test = debugger.testIntent("your query");
console.log(`Intent: ${test.analysis.intentName}, Confidence: ${test.analysis.confidence}`);

// Batch test
const results = debugger.testBatch([
  "submit survey",
  "find job",
  "update profile",
  "career help",
  "technical support"
]);
console.table(results);
```

### Browser Console Testing

```javascript
// Access debugger from console
window.chatbotDebugger.testIntent("how do I submit a survey?");
window.chatbotDebugger.searchKnowledge("job");
window.chatbotDebugger.testScenarios();
```

## Best Practices

### Intent Design
1. **Use clear, specific keywords** - Avoid ambiguous terms
2. **Include variations** - Cover different ways users might ask
3. **Set appropriate confidence thresholds** - Balance precision and recall
4. **Group related intents** - Use categories effectively

### Knowledge Base
1. **Be concise yet complete** - Provide all necessary information
2. **Use formatting** - Make responses easy to scan
3. **Add visual indicators** - Use emojis for quick recognition
4. **Link related topics** - Help users discover more
5. **Update regularly** - Keep information current

### Conversation Flow
1. **Provide suggestions** - Guide users to relevant topics
2. **Offer quick actions** - Enable one-click navigation
3. **Handle fallbacks gracefully** - Always provide helpful alternatives
4. **Maintain context** - Remember previous conversation

## Troubleshooting

### Intent Not Detected
1. Check keyword matches: `debugger.testIntent("your query")`
2. Verify confidence threshold in config
3. Add more patterns or keywords
4. Enable fuzzy matching for typos

### Wrong Intent Detected
1. Check for keyword conflicts
2. Adjust keyword weights
3. Add required keywords to specific intents
4. Review confidence scores

### Poor Responses
1. Update knowledge base entries
2. Add more related questions
3. Improve formatting and structure
4. Test with real user queries

## Future Enhancements

- [ ] Machine learning-based intent classification
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Advanced entity extraction (dates, numbers, names)
- [ ] Integration with external APIs
- [ ] Sentiment analysis
- [ ] Conversation templates
- [ ] A/B testing framework
- [ ] Analytics dashboard

## Contributing

When adding new features:
1. Follow the modular architecture
2. Add comprehensive TypeScript types
3. Include debug capabilities
4. Write clear documentation
5. Test thoroughly with various scenarios

## License

Part of the Graduate Tracer System © 2024
