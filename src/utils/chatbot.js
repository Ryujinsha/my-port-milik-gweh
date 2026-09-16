import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Chatbot service implementing context management from agentic-chat.md:
 * - Static system prompt (Priority 1)
 * - Conversation summary (Priority 3)
 * - Sliding window of recent messages (Priority 4)
 * - Message filtering (ignore trivial messages)
 * - Token budget awareness
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/* ===========================
   System Prompt (Priority 1)
   =========================== */
const SYSTEM_PROMPT = `You are a friendly portfolio assistant for ${import.meta.env.VITE_NAME || 'the developer'}.

About the developer:
- Name: ${import.meta.env.VITE_NAME || 'Developer'}
- Title: ${import.meta.env.VITE_TITLE || 'Software Engineer'}
- Skills: React, Tailwind CSS, JavaScript, and modern web technologies

Rules:
- Keep responses concise and helpful (under 150 words when possible).
- Answer questions about the developer's work, skills, and projects.
- Be professional, friendly, and approachable.
- If you don't know something specific about the developer, say so politely.
- You can help visitors navigate the portfolio (mention sections like Projects, Contact).
- Never fabricate specific details about the developer that aren't provided.
- If asked to do something outside your role, politely redirect to the contact form.`;

/* ===========================
   Configuration (from spec §11)
   =========================== */
const GENERATION_CONFIG = {
  temperature: 0.7,
  maxOutputTokens: 512,
  topP: 0.95,
  topK: 40,
};

/* ===========================
   Sliding Window (from spec §4)
   =========================== */
const SLIDING_WINDOW_SIZE = 10;

/* ===========================
   Message Filtering (from spec §7)
   =========================== */
const TRIVIAL_MESSAGES = new Set([
  'hi', 'hello', 'hey', 'thanks', 'thank you', 'ok', 'okay',
  'good', 'nice', 'cool', 'bye', 'goodbye', '👍', '😂', '😊',
  'yes', 'no', 'yep', 'nope', 'sure', 'great', 'awesome',
]);

function isTrivialMessage(text) {
  return TRIVIAL_MESSAGES.has(text.trim().toLowerCase().replace(/[.!?,]/g, ''));
}

/* ===========================
   Summary Management (from spec §3)
   =========================== */
const SUMMARY_INTERVAL = 20;

/**
 * ChatbotService class — manages conversation state and Gemini API calls.
 */
class ChatbotService {
  constructor() {
    this.messages = [];
    this.meaningfulMessages = [];
    this.summary = '';
    this.messageCount = 0;
    this.model = null;
    this.isInitialized = false;
  }

  initialize() {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
      this.isInitialized = false;
      return false;
    }

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      this.model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        generationConfig: GENERATION_CONFIG,
        systemInstruction: SYSTEM_PROMPT,
      });
      this.isInitialized = true;
      return true;
    } catch {
      this.isInitialized = false;
      return false;
    }
  }

  /**
   * Build the conversation history for the API call.
   * Follows the prompt structure from spec:
   *   System Prompt → Summary → Recent Messages → Current Input
   */
  _buildHistory() {
    const history = [];

    // Add conversation summary if exists (Priority 3)
    if (this.summary) {
      history.push({
        role: 'user',
        parts: [{ text: `[Conversation context: ${this.summary}]` }],
      });
      history.push({
        role: 'model',
        parts: [{ text: 'Understood, I have the context.' }],
      });
    }

    // Add sliding window of recent messages (Priority 4)
    const recentMessages = this.meaningfulMessages.slice(-SLIDING_WINDOW_SIZE);
    for (const msg of recentMessages) {
      history.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      });
    }

    return history;
  }

  /**
   * Generate a conversation summary using Gemini (from spec §3).
   */
  async _updateSummary() {
    if (!this.model || this.meaningfulMessages.length < SUMMARY_INTERVAL) return;

    try {
      const messagesToSummarize = this.meaningfulMessages
        .slice(0, -SLIDING_WINDOW_SIZE)
        .map((m) => `${m.role}: ${m.text}`)
        .join('\n');

      if (!messagesToSummarize) return;

      const result = await this.model.generateContent(
        `Summarize this conversation in 2-3 sentences, focusing on key topics discussed:\n\n${messagesToSummarize}`
      );
      this.summary = result.response.text();
    } catch {
      // Silently fail — summary is optional
    }
  }

  /**
   * Send a message and get a response.
   */
  async sendMessage(userText) {
    if (!this.isInitialized) {
      return 'Chatbot is not configured. Please add your Gemini API key to the .env file.';
    }

    const trimmedText = userText.trim();
    if (!trimmedText) return '';

    // Always store in full messages array
    this.messages.push({ role: 'user', text: trimmedText, timestamp: Date.now() });
    this.messageCount++;

    // Only add to meaningful messages if not trivial (spec §7)
    if (!isTrivialMessage(trimmedText)) {
      this.meaningfulMessages.push({ role: 'user', text: trimmedText, timestamp: Date.now() });
    }

    try {
      // Build history with sliding window
      const history = this._buildHistory();

      // Start chat with history
      const chat = this.model.startChat({ history });

      // Send current message
      const result = await chat.sendMessage(trimmedText);
      const responseText = result.response.text();

      // Store assistant response
      this.messages.push({ role: 'assistant', text: responseText, timestamp: Date.now() });
      this.meaningfulMessages.push({ role: 'model', text: responseText, timestamp: Date.now() });

      // Update summary periodically (spec §3)
      if (this.messageCount % SUMMARY_INTERVAL === 0) {
        this._updateSummary();
      }

      return responseText;
    } catch (error) {
      const errorMsg = error.message?.includes('API_KEY')
        ? 'Invalid API key. Please check your Gemini API key in the .env file.'
        : 'Sorry, I encountered an error. Please try again.';
      return errorMsg;
    }
  }

  clearHistory() {
    this.messages = [];
    this.meaningfulMessages = [];
    this.summary = '';
    this.messageCount = 0;
  }
}

// Singleton instance
export const chatbotService = new ChatbotService();
