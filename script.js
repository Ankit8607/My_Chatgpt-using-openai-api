// Replace 'YOUR_API_KEY' with your actual OpenAI API key
// import { Configuration, OpenAIApi } from "openai";
// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//   apiKey: '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',
// });
// const openai = new OpenAIApi(configuration);

const apiKey = 'YOUR_API_KEY';
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Function to display user and AI messages
function appendMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = message;
  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// Function to send user input to OpenAI and get AI response
async function getAIResponse(input) {
  const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      'prompt': input,
      'max_tokens': 50
    })
  });

  const data = await response.json();
  console.log(data);
  if (data.choices && data.choices.length > 0) {
    const aiResponse = data.choices[0].text.trim();
    appendMessage(aiResponse, 'ai');
  } else {
    console.log('Unexpected response structure');
  }
}

// Event listener for send button click
sendBtn.addEventListener('click', () => {
  const userMessage = userInput.value.trim();
  if (userMessage !== '') {
    appendMessage(userMessage, 'user');
    getAIResponse(userMessage);
    userInput.value = '';
  }
});

// Event listener for Enter key press
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendBtn.click();
  }
});