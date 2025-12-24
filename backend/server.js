const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ 
        error: 'Invalid message. Please provide a non-empty message.' 
      });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'API key not configured. Please set GEMINI_API_KEY in environment variables.' 
      });
    }

    // Mock mode for testing (when API is not accessible)
    if (process.env.MOCK_MODE === 'true') {
      const mockResponses = [
        '你好！我是 AI 助手，由 Google Gemini 提供支持。我可以帮助你回答问题、提供信息、进行对话，并协助你完成各种任务。有什么我可以帮助你的吗？',
        'Hello! I am an AI assistant powered by Google Gemini. I can help you with answering questions, providing information, having conversations, and assisting with various tasks. How can I help you today?',
        '我可以帮助你解答问题、提供建议、进行翻译、写作、编程等多种任务。请随时告诉我你需要什么帮助！',
        'I am here to assist you with information, answer your questions, help with creative tasks, and more. What would you like to know?'
      ];
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return res.json({ 
        success: true,
        reply: randomResponse 
      });
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Generate response
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    // Send response back to frontend
    res.json({ 
      success: true,
      reply: text 
    });

  } catch (error) {
    console.error('Error processing chat request:', error);
    
    // Handle specific error cases
    if (error.message?.includes('API key')) {
      return res.status(401).json({ 
        error: 'Invalid API key. Please check your Gemini API configuration.' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to process your message. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Key configured: ${process.env.GEMINI_API_KEY ? 'Yes' : 'No'}`);
});
