/**
 * Chatbot Testing Examples
 * Run these in the browser console to test chatbot functionality
 */

// ============================================
// BASIC USAGE EXAMPLES
// ============================================

// 1. Test Intent Detection
console.log('=== Intent Detection Tests ===');
window.chatbotDebugger.testIntent("How do I submit a survey?");
window.chatbotDebugger.testIntent("Find me a job in Manila");
window.chatbotDebugger.testIntent("Update my profile");
window.chatbotDebugger.testIntent("I need help with my resume");

// 2. Batch Test Multiple Queries
console.log('\n=== Batch Testing ===');
const queries = [
  "submit employment survey",
  "job opportunities remote",
  "change password",
  "career counseling",
  "technical support",
  "privacy settings",
  "training programs",
  "dashboard overview"
];
const batchResults = window.chatbotDebugger.testBatch(queries);
console.table(batchResults);

// 3. Search Knowledge Base
console.log('\n=== Knowledge Base Search ===');
window.chatbotDebugger.searchKnowledge("job");
window.chatbotDebugger.searchKnowledge("profile");
window.chatbotDebugger.searchKnowledge("survey");

// ============================================
// CONVERSATION SIMULATION
// ============================================

// 4. Simulate Complete Conversation
console.log('\n=== Conversation Simulation ===');
(async () => {
  const conversation = await window.chatbotDebugger.simulateConversation([
    "Hello",
    "How do I submit a survey?",
    "Can I edit it later?",
    "What about job opportunities?",
    "Thanks for your help!"
  ]);
  console.log('Conversation Results:');
  console.table(conversation.messages);
  console.log('Summary:', conversation.summary);
})();

// 5. Test Follow-up Questions
console.log('\n=== Follow-up Questions Test ===');
(async () => {
  const followUpTest = await window.chatbotDebugger.simulateConversation([
    "Tell me about job opportunities",
    "How do I apply?",
    "What about remote positions?",
    "Can I filter by location?"
  ]);
  console.log('Follow-up Test:');
  console.table(followUpTest.messages);
})();

// ============================================
// CONFIDENCE THRESHOLD TESTING
// ============================================

// 6. Test Confidence Thresholds
console.log('\n=== Confidence Threshold Tests ===');
const queries_to_test = [
  "submit survey",
  "job search",
  "profile update",
  "career help",
  "tech support",
  "I need some help",  // Low confidence
  "what can you do"     // General
];

queries_to_test.forEach(query => {
  const result = window.chatbotDebugger.testConfidenceThreshold(
    query,
    [0.3, 0.4, 0.5, 0.6, 0.7]
  );
  console.log(`\nQuery: "${query}"`);
  console.log(`Detected Intent: ${result.intentName}`);
  console.log(`Confidence: ${result.detectedConfidence.toFixed(3)}`);
  console.table(result.wouldMatch);
});

// ============================================
// PERFORMANCE BENCHMARKING
// ============================================

// 7. Benchmark Intent Detection Speed
console.log('\n=== Performance Benchmark ===');
const benchmark = window.chatbotDebugger.benchmarkIntentDetection(1000);
console.log('Benchmark Results (1000 iterations):');
console.log(`Total Time: ${benchmark.totalTime.toFixed(2)}ms`);
console.log(`Average Time: ${benchmark.averageTime.toFixed(3)}ms`);
console.log(`Queries Per Second: ${benchmark.queriesPerSecond.toFixed(0)}`);

// ============================================
// SCENARIO TESTING
// ============================================

// 8. Run All Predefined Scenarios
console.log('\n=== Running All Test Scenarios ===');
(async () => {
  await window.chatbotDebugger.testScenarios();
})();

// ============================================
// ADVANCED TESTING
// ============================================

// 9. Test Edge Cases
console.log('\n=== Edge Case Testing ===');
const edgeCases = [
  "hdlp me",                    // Typo
  "JOB SEARCH",                 // All caps
  "job    opportunities",       // Multiple spaces
  "find a job plz",            // Informal
  "i want to submit survey",   // Natural language
  "survey submission",         // Short form
  "I don't know what to do",   // Uncertain
  ""                           // Empty (should handle gracefully)
];

edgeCases.forEach(testCase => {
  console.log(`\nTesting: "${testCase}"`);
  const result = window.chatbotDebugger.testIntent(testCase);
  console.log(`Intent: ${result.analysis.intentName || 'none'}`);
  console.log(`Confidence: ${result.analysis.confidence.toFixed(3)}`);
});

// 10. Test Context Awareness
console.log('\n=== Context Awareness Test ===');
(async () => {
  const contextTest = await window.chatbotDebugger.simulateConversation([
    "Tell me about surveys",
    "How do I submit one?",      // Context: referring to survey
    "Can I edit it?",            // Context: referring to survey
    "What about my profile?",    // Topic change
    "How do I change it?",       // Context: referring to profile
    "And the password?"          // Context: security/profile
  ]);
  
  console.log('Context Test Results:');
  contextTest.messages.forEach((msg, idx) => {
    console.log(`\n${idx + 1}. User: ${msg.user}`);
    console.log(`   Intent: ${msg.intent} (${(msg.confidence * 100).toFixed(1)}%)`);
  });
})();

// ============================================
// ANALYTICS & REPORTING
// ============================================

// 11. Generate Detailed Report
console.log('\n=== Generating Detailed Report ===');
// Note: This requires an active session ID
// Replace 'your_session_id' with actual session ID from chat
const generateReport = (sessionId) => {
  const report = window.chatbotDebugger.generateReport(sessionId);
  console.log(report);
  
  // Download report
  const blob = new Blob([report], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chatbot-report-${sessionId}.md`;
  a.click();
  URL.revokeObjectURL(url);
};

// Usage: generateReport('your_session_id');

// 12. View Conversation Analytics
console.log('\n=== Analytics Example ===');
const viewAnalytics = (sessionId) => {
  const analytics = window.chatbotDebugger.getAnalytics(sessionId);
  console.log('Conversation Analytics:');
  console.log('Frequent Topics:', analytics.frequentTopics);
  console.log('Average Response Time:', analytics.averageResponseTime.toFixed(2), 'ms');
  console.log('Satisfaction Indicators:', analytics.satisfactionIndicators);
};

// Usage: viewAnalytics('your_session_id');

// ============================================
// CATEGORY TESTING
// ============================================

// 13. Test Each Category
console.log('\n=== Category Testing ===');
const categoryTests = {
  survey: [
    "submit employment survey",
    "check survey status",
    "edit my survey"
  ],
  jobs: [
    "find job opportunities",
    "apply for job",
    "remote positions"
  ],
  profile: [
    "update my profile",
    "change password",
    "upload photo"
  ],
  career: [
    "career services",
    "resume help",
    "interview preparation"
  ],
  support: [
    "technical support",
    "submit ticket",
    "contact admin"
  ],
  privacy: [
    "privacy settings",
    "export my data",
    "delete account"
  ],
  training: [
    "training programs",
    "enroll in course",
    "certifications"
  ]
};

Object.entries(categoryTests).forEach(([category, queries]) => {
  console.log(`\n=== Testing ${category.toUpperCase()} Category ===`);
  const results = window.chatbotDebugger.testBatch(queries);
  console.table(results);
});

// ============================================
// EXPORT FUNCTIONS
// ============================================

// 14. Export Conversation Data
const exportConversation = (sessionId) => {
  const data = window.chatbotDebugger.exportConversation(sessionId);
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `conversation-${sessionId}.json`;
  a.click();
  URL.revokeObjectURL(url);
  console.log('Conversation exported!');
};

// Usage: exportConversation('your_session_id');

// ============================================
// HELPER FUNCTIONS
// ============================================

// 15. Quick Test Function
window.quickTest = (query) => {
  console.log(`\n=== Quick Test: "${query}" ===`);
  const result = window.chatbotDebugger.testIntent(query);
  console.log('Intent:', result.analysis.intentName || 'none');
  console.log('Category:', result.result?.intent.category || 'n/a');
  console.log('Confidence:', (result.analysis.confidence * 100).toFixed(1) + '%');
  console.log('Keywords:', result.analysis.matchedKeywords);
  console.log('Entities:', result.analysis.entities);
  return result;
};

// Usage: window.quickTest("your query here")

// 16. Compare Multiple Queries
window.compareQueries = (...queries) => {
  console.log('\n=== Query Comparison ===');
  const results = queries.map(q => {
    const result = window.chatbotDebugger.testIntent(q);
    return {
      query: q,
      intent: result.analysis.intentName || 'none',
      confidence: (result.analysis.confidence * 100).toFixed(1) + '%'
    };
  });
  console.table(results);
  return results;
};

// Usage: window.compareQueries("query 1", "query 2", "query 3")

console.log('\n✅ All testing functions loaded!');
console.log('💡 Try: window.quickTest("how do I submit a survey?")');
console.log('💡 Try: window.compareQueries("find job", "search for work", "job opportunities")');
