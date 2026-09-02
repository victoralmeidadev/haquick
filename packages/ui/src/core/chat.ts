import type { ReactNode } from 'react';
import type { ColorIntent } from './types';
import type { InputProps } from './form';

export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageStatus = 'sending' | 'sent' | 'error';
export type ToolCallStatus = 'running' | 'success' | 'error';

export type MessageProps = {
  role: MessageRole;
  children?: ReactNode;
  avatar?: ReactNode;
  author?: string;
  timestamp?: string;
  /** Resposta ainda chegando: mostra o cursor no fim do texto. */
  streaming?: boolean;
  status?: MessageStatus;
  actions?: ReactNode;
};

export type MessageListProps = {
  children?: ReactNode;
  empty?: ReactNode;
  isEmpty?: boolean;
};

export type SuggestionsProps = {
  items: string[];
  onSelect?: (item: string) => void;
  disabled?: boolean;
};

export type ToolCallProps = {
  name: string;
  status?: ToolCallStatus;
  args?: string;
  result?: string;
  defaultOpen?: boolean;
};

export type TypingIndicatorProps = { intent?: ColorIntent; speed?: number };

export type ComposerProps = {
  value?: string;
  onChangeText?: (text: string) => void;
  onSend?: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Agente respondendo: enviar vira parar. */
  busy?: boolean;
  onStop?: () => void;
  leading?: ReactNode;
  header?: ReactNode;
  rows?: number;
};

export type { InputProps };
