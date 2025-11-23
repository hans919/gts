// Paste this in your browser console (F12) to test AI

console.log('=== AI CHATBOT DIAGNOSTIC ===');

// Check environment variables
console.log('1. Environment Check:');
console.log('   VITE_USE_AI:', import.meta.env.VITE_USE_AI);
console.log('   Has Gemini Key:', !!import.meta.env.VITE_GEMINI_API_KEY);

// Test the chatbot
console.log('\n2. Testing Chatbot:');
const testAI = async () => {
  try {
    const response = await chatbotDebugger.testIntent('What is quantum physics?');
    console.log('   Response:', response);
  } catch (error) {
    console.error('   Error:', error);
  }
};

testAI();

console.log('\n3. Check window objects:');
console.log('   chatbotDebugger exists:', typeof chatbotDebugger !== 'undefined');
