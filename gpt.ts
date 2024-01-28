

const OpenAI = require('openai');

const openaiApiKey = 'ваш API ключ'; 

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  });

console.log('chatCompletion', chatCompletion, chatCompletion.choices)
}

main();