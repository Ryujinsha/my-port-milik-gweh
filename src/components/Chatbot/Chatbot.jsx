import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiPaperAirplane, HiTrash, HiSparkles } from 'react-icons/hi';
import { chatbotService } from '../../utils/chatbot';
import { PERSONAL_INFO } from '../../utils/data';

/**
 * Floating chatbot panel with neumorphic grayscale styling and Gemini AI integration.
 */
export default function Chatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Hi! 👋 I'm ${PERSONAL_INFO.firstName}'s portfolio assistant. Ask me about projects, skills, or how to get in touch!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  /* Initialize chatbot service */
  useEffect(() => {
    chatbotService.initialize();
  }, []);

  /* Auto-scroll to latest message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* Focus input when panel opens */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg = { id: Date.now(), role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatbotService.sendMessage(trimmed);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', text: response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    chatbotService.clearHistory();
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        text: `Chat cleared! 🧹 How can I help you?`,
      },
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] md:hidden"
            style={{ backgroundColor: 'rgba(30, 30, 34, 0.6)', backdropFilter: 'blur(4px)' }}
          />

          {/* Chat Panel — neumorphic raised */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-4 right-4 z-[70] flex h-[min(600px,85vh)] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl neu-raised-lg"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="neu-inset-sm flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold"
                  style={{ color: 'var(--accent-highlight)' }}
                >
                  <HiSparkles size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    AI Assistant
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Powered by Gemini
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClear}
                  className="neu-btn flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                  aria-label="Clear chat"
                  title="Clear chat"
                >
                  <HiTrash size={16} />
                </button>
                <button
                  onClick={onClose}
                  className="neu-btn flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                  aria-label="Close chat"
                >
                  <HiX size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              style={{ backgroundColor: 'var(--bg-main)' }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'rounded-br-md'
                        : 'rounded-bl-md'
                    }`}
                    style={
                      msg.role === 'user'
                        ? {
                            background: 'var(--bg-card)',
                            boxShadow: 'var(--shadow-raised-sm)',
                            color: 'var(--text-primary)',
                          }
                        : {
                            background: 'var(--bg-main)',
                            boxShadow: 'var(--shadow-inset-sm)',
                            color: 'var(--text-secondary)',
                          }
                    }
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div
                    className="rounded-2xl rounded-bl-md px-4 py-3"
                    style={{
                      background: 'var(--bg-main)',
                      boxShadow: 'var(--shadow-inset-sm)',
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 animate-bounce rounded-full [animation-delay:0ms]"
                        style={{ backgroundColor: 'var(--accent-primary)' }}
                      />
                      <span
                        className="h-2 w-2 animate-bounce rounded-full [animation-delay:150ms]"
                        style={{ backgroundColor: 'var(--accent-primary)' }}
                      />
                      <span
                        className="h-2 w-2 animate-bounce rounded-full [animation-delay:300ms]"
                        style={{ backgroundColor: 'var(--accent-primary)' }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area — neumorphic */}
            <div
              className="p-3"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderTop: '1px solid var(--border-color)',
              }}
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  rows={1}
                  disabled={isLoading}
                  className="neu-input flex-1 resize-none rounded-xl px-4 py-2.5 text-sm disabled:opacity-50"
                  style={{ maxHeight: '120px' }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="neu-btn flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ color: 'var(--accent-highlight)' }}
                  aria-label="Send message"
                >
                  <HiPaperAirplane size={16} className="rotate-90" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
