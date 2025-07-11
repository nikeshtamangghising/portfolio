export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export interface ChatProps {
  className?: string;
  onError?: (hasError: boolean) => void;
}
