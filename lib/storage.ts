import { Message as BaseMessage } from '@/types/chat';

type Message = BaseMessage & {
  id: string;
  timestamp: number;
};

const CHAT_STORAGE_KEY = 'chat-messages';

export const loadMessages = (): Message[] => {
  if (typeof window === 'undefined') return [];
  
  const saved = localStorage.getItem(CHAT_STORAGE_KEY);
  if (!saved) return [];
  
  try {
    const messages = JSON.parse(saved);
    // Ensure all messages have required fields
    return messages.map((msg: any) => ({
      ...msg,
      id: msg.id || `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: msg.timestamp || Date.now(),
      role: msg.role || 'user',
      content: msg.content || ''
    }));
  } catch (e) {
    console.error('Failed to parse messages from localStorage', e);
    return [];
  }
};

export const saveMessages = (messages: Message[]): void => {
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving messages to localStorage:', error);
  }
};
const isValidMessage = (message: any): message is Message => {
  return (
    message &&
    typeof message === 'object' &&
    (message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string'
  );
};
