'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatProps } from '@/types/chat';
import { loadMessages, saveMessages } from '@/lib/storage';
import { Bot, User, Loader2, SendHorizontal, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

const messageVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  }
};

export function Chat({ onError, onClose }: ChatProps & { onClose?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const usedIds = useRef(new Set<string>());

  // Generate a unique ID for messages
  const generateId = useCallback(() => {
    // Always ensure we have a unique ID
    const randomPart = typeof crypto !== 'undefined' 
      ? crypto.getRandomValues(new Uint32Array(1))[0].toString(36)
      : Math.random().toString(36).substring(2, 15);
    
    const timestamp = Date.now();
    const id = `msg-${timestamp}-${randomPart}`;
    
    // Track used IDs to prevent duplicates
    if (usedIds.current.has(id)) {
      // If by some chance we get a duplicate, append a counter
      let counter = 1;
      let newId = id;
      while (usedIds.current.has(newId) && counter < 100) {
        newId = `${id}-${counter}`;
        counter++;
      }
      usedIds.current.add(newId);
      return newId;
    }
    
    usedIds.current.add(id);
    return id;
  }, []);

  // Clean and deduplicate messages with strict validation
  const cleanMessages = useCallback((messages: any[]): Message[] => {
    if (!Array.isArray(messages)) return [];
    
    const seenContent = new Set<string>();
    const cleaned: Message[] = [];
    
    messages.forEach((msg) => {
      try {
        // Skip invalid messages
        if (!msg || typeof msg !== 'object' || !msg.role) {
          console.warn('Skipping invalid message (missing role or invalid format):', msg);
          return;
        }
        
        // Ensure content is a non-empty string
        const content = String(msg.content || '').trim();
        if (!content) {
          console.warn('Skipping empty message content');
          return;
        }
        
        // Generate a stable key for deduplication
        const contentKey = `${msg.role}-${content.substring(0, 100)}`;
        if (seenContent.has(contentKey)) {
          console.warn('Skipping duplicate message content:', contentKey);
          return;
        }
        seenContent.add(contentKey);
        
        // Generate a new ID for every message to ensure uniqueness
        const id = generateId();
        
        // Ensure the timestamp is valid
        const timestamp = typeof msg.timestamp === 'number' && !isNaN(msg.timestamp) 
          ? msg.timestamp 
          : Date.now();
        
        cleaned.push({
          id,
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content,
          timestamp
        });
      } catch (e) {
        console.error('Error processing message:', e, 'Message:', msg);
      }
    });
    
    return cleaned.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
  }, [generateId]);

  // Initialize messages with strict validation
  useEffect(() => {
    try {
      const saved = loadMessages();
      const cleaned = cleanMessages(Array.isArray(saved) ? saved : []);
      
      // Ensure we have valid messages with non-empty IDs and content
      const validMessages = cleaned
        .filter(msg => {
          const hasValidId = msg?.id && typeof msg.id === 'string' && msg.id.trim() !== '';
          const hasValidContent = msg?.content && typeof msg.content === 'string' && msg.content.trim() !== '';
          const hasValidRole = msg?.role && (msg.role === 'user' || msg.role === 'assistant');
          
          if (!hasValidId || !hasValidContent || !hasValidRole) {
            console.warn('Skipping invalid message:', msg);
            return false;
          }
          return true;
        })
        // Sort by timestamp to maintain order
        .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
      
      // Generate new IDs for all messages and ensure they're unique
      const messageIdSet = new Set<string>();
      const messagesWithNewIds = validMessages.map(msg => {
        // Generate a new ID and ensure it's unique
        let newId = generateId();
        while (messageIdSet.has(newId)) {
          newId = generateId();
        }
        messageIdSet.add(newId);
        
        return {
          ...msg,
          id: newId, // Always use the newly generated ID
          content: String(msg.content).trim(),
          timestamp: msg.timestamp || Date.now()
        };
      });
      
      // Clear and update used IDs
      usedIds.current = new Set(messageIdSet);
      
      // Update state with the new messages
      setMessages(messagesWithNewIds);
      saveMessages(messagesWithNewIds);
      
      // Clear any existing error state
      setError(null);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
    
    setIsMounted(true);
    return () => setIsMounted(false);
  }, [cleanMessages, generateId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = input.trim();
    if (!content || isLoading) return;

    // Generate a new ID and ensure it's unique
    const newId = generateId();
    
    const userMessage: Message = { 
      id: newId,
      role: 'user', 
      content,
      timestamp: Date.now()
    };
    
    setInput('');
    
    // Optimistically add user message
    setMessages(prev => {
      // Ensure we don't have any messages with empty or duplicate IDs
      const cleanedPrev = prev.filter(msg => 
        msg?.id && 
        typeof msg.id === 'string' && 
        msg.id.trim() !== '' && 
        msg.id !== newId
      );
      
      const updated = [...cleanedPrev, userMessage];
      saveMessages(updated);
      return updated;
    });
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.response || 'Sorry, I encountered an error.',
        timestamp: Date.now()
      };
      
      setMessages(prev => {
        // Remove any loading indicators
        const filtered = prev.filter(m => m.content !== '...');
        const updated = [...filtered, assistantMessage];
        saveMessages(updated);
        return updated;
      });
      
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to send message. Please try again.');
      
      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        timestamp: Date.now()
      };
      
      setMessages(prev => {
        const filtered = prev.filter(m => m.content !== '...');
        const updated = [...filtered, errorMessage];
        saveMessages(updated);
        return updated;
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  // Check if OpenRouter API key is configured
  const isApiKeyConfigured = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  
  if (!isMounted) return null;
  
  // Show warning if API key is not configured
  const renderApiKeyWarning = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 mb-4 mx-4 mt-2 rounded-r"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            <span className="font-medium">Chat functionality is limited</span> - Please set the <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">NEXT_PUBLIC_OPENROUTER_API_KEY</code> environment variable to enable full chat capabilities.
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="flex flex-col p-4 space-y-3">
            {!isApiKeyConfigured && renderApiKeyWarning()}
            {/* Error and empty state outside AnimatePresence to avoid key issues */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 px-4 py-3 rounded-md text-sm mb-4"
              >
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </div>
              </motion.div>
            )}

            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center text-center py-12 px-4"
              >
                <div className="p-3 mb-4 rounded-full bg-gray-100 dark:bg-gray-700">
                  <Bot className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  How can I help you today?
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                  Ask me anything about my work, experience, or just say hi!
                </p>
              </motion.div>
            )}

            {/* Only animate the messages list */}
            <AnimatePresence>
              {[...new Map(messages.filter(msg => msg.id && typeof msg.id === 'string' && msg.id.trim() !== '').map(msg => [msg.id, msg])).values()].map((message, idx) => (
                <motion.div
                  key={message.id || `fallback-key-${idx}`}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                  className={cn(
                    'flex',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'flex max-w-[85%] rounded-2xl px-4 py-2.5',
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-sm shadow-sm'
                    )}
                  >
                    <div className="flex items-start gap-2.5">
                      {message.role === 'assistant' && (
                        <div className="flex-shrink-0 mt-0.5">
                          <Bot className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        </div>
                      )}
                      <div className={cn(
                        'text-sm leading-relaxed whitespace-pre-wrap break-words',
                        message.role === 'user' 
                          ? 'text-white' 
                          : 'text-gray-800 dark:text-gray-100'
                      )}>
                        {message.content}
                      </div>
                      {message.role === 'user' && (
                        <div className="flex-shrink-0 mt-0.5">
                          <User className="h-5 w-5 text-blue-200" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading indicator and scroll ref outside AnimatePresence */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2.5 rounded-bl-sm">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className={cn(
                'flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600',
                'focus:border-blue-500 focus:ring-blue-500',
                'placeholder-gray-500 dark:placeholder-gray-400',
                'text-gray-900 dark:text-white',
                'pr-10' // Add padding for close button
              )}
              disabled={isLoading}
            />
            {input && (
              <button
                type="button"
                onClick={() => setInput('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Clear input"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={cn(
              'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              'disabled:opacity-50 disabled:pointer-events-none',
              'bg-blue-600 text-white hover:bg-blue-700',
              'dark:bg-blue-700 dark:hover:bg-blue-600',
              'min-w-[80px]',
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <SendHorizontal className="mr-2 h-4 w-4" />
                Send
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
