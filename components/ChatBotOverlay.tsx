"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, Bot, User, Loader2 } from 'lucide-react';
import { generateStoreResponse } from '@/services/geminiService';
import { useApp } from './AppProvider';
import { translations } from '../constants/translations';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

interface ChatBotOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatBotOverlay = ({ isOpen, onClose }: ChatBotOverlayProps) => {
  const { lang } = useApp();
  const t = translations[lang];
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: t.chatbotGreeting }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update initial greeting if language changes and chat hasn't started
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'bot') {
      setMessages([{ role: 'bot', content: t.chatbotGreeting }]);
    }
  }, [lang, t.chatbotGreeting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await generateStoreResponse(userMsg);
      setMessages(prev => [...prev, { role: 'bot', content: response || 'I am sorry, I could not generate a response.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: 'There was an error connecting to our AI. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] md:hidden"
          />

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50, x: 20 }}
            className="fixed bottom-20 right-4 md:right-8 lg:right-12 xl:right-16 w-[calc(100vw-2rem)] sm:w-[360px] md:w-[400px] lg:w-[450px] xl:w-[500px] max-w-[95vw] h-[500px] max-h-[80vh] lg:max-h-[600px] bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-[80] flex flex-col overflow-hidden border border-gray-100 dark:border-slate-800"
          >
            {/* Header */}
            <div className="bg-brand-blue dark:bg-blue-700 p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">Binayak Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-xs text-blue-100 font-medium">Online & Ready</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth"
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user' 
                        ? 'bg-brand-orange text-white' 
                        : 'bg-gray-100 dark:bg-slate-800 text-brand-blue dark:text-blue-400'
                    }`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-4 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-brand-blue dark:bg-blue-600 text-white rounded-tr-none'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-200 rounded-tl-none'
                    } shadow-sm`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-end">
                    <div className="bg-gray-100 dark:bg-slate-800 text-brand-blue dark:text-blue-400 w-8 h-8 rounded-full flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-slate-500 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about materials, prices, location..."
                  className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl py-3.5 pl-4 pr-14 focus:outline-none focus:ring-2 focus:ring-brand-blue dark:focus:ring-blue-600 text-sm text-gray-800 dark:text-slate-200 transition-all shadow-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2.5 bg-brand-blue dark:bg-blue-600 text-white rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
              <p className="text-center text-[10px] text-gray-400 dark:text-slate-500 mt-2 font-medium">
                powred by Groq AI 
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
