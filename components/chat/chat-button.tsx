'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Chat } from './chat';
import { MessageSquare, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Variants } from 'framer-motion';

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleError = (error: boolean) => {
    setHasError(error);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4" style={{ zIndex: 9999 }}>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative"
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-[350px] h-[500px] flex flex-col overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <h3 className="font-semibold text-gray-900 dark:text-white">Chat with me</h3>
                <button
                  onClick={toggleChat}
                  className="h-8 w-8 rounded-full p-0 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <Chat onError={handleError} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.div
        initial={false}
        animate={isOpen ? 'hidden' : 'visible'}
        variants={buttonVariants}
        whileHover={isOpen ? {} : 'hover'}
        whileTap={isOpen ? {} : 'tap'}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn(
          'relative',
          isOpen && 'pointer-events-none'
        )}
      >
        <button
          onClick={toggleChat}
          className={cn(
            'h-14 w-14 rounded-full shadow-lg transition-all duration-200 group',
            'flex items-center justify-center',
            hasError 
              ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90 ring-2 ring-red-500 ring-offset-2' 
              : 'bg-primary text-primary-foreground hover:bg-primary/90',
            isOpen ? 'opacity-0' : 'opacity-100'
          )}
          aria-label={hasError ? 'Open chat (error occurred)' : 'Open chat'}
        >
          {hasError ? (
            <AlertCircle className="h-6 w-6" />
          ) : (
            <MessageSquare className="h-6 w-6 transition-transform group-hover:scale-110" />
          )}
        </button>
        
        {/* Tooltip */}
        {isHovered && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg"
          >
            Need help? Chat with me
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
