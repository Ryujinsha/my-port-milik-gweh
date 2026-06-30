import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiPaperAirplane, HiTrash, HiSparkles } from 'react-icons/hi';
import { chatbotService } from '../../utils/chatbot';
import { PERSONAL_INFO } from '../../utils/data';

/**
 * Floating chatbot panel with Gemini AI integration.
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
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
          />

          {/* Chat Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-4 right-4 z-[70] flex h-[min(600px,85vh)] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-darker shadow-2xl shadow-black/40"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-primary/80 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white">
                  <HiSparkles size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
                  <p className="text-xs text-neutral-gray">Powered by Gemini</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClear}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-gray transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Clear chat"
                  title="Clear chat"
                >
                  <HiTrash size={16} />
                </button>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-gray transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close chat"
                >
                  <HiX size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
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
                        ? 'rounded-br-md bg-accent text-white'
                        : 'rounded-bl-md border border-white/5 bg-white/5 text-neutral-light'
                    }`}
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
                  <div className="rounded-2xl rounded-bl-md border border-white/5 bg-white/5 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:300ms]" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 bg-neutral-darker/80 p-3">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  rows={1}
                  disabled={isLoading}
                  className="flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-neutral-gray/50 transition-colors focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20 disabled:opacity-50"
                  style={{ maxHeight: '120px' }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-all hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-40"
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
