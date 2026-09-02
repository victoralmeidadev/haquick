import type { ReactNode } from 'react';

// Papéis de mensagem. Os mesmos três que a maioria dos protocolos de agente usa
// — inclusive o AG-UI, onde chegam como `role` nos eventos de mensagem.
export type MessageRole = 'user' | 'assistant' | 'system';

export type MessageStatus = 'sending' | 'sent' | 'error';

export type MessageProps = {
  role: MessageRole;
  children?: ReactNode;
  /** Avatar do autor. Só é mostrado em mensagens do assistente. */
  avatar?: ReactNode;
  author?: string;
  timestamp?: string;
  /**
   * Resposta ainda chegando. Mostra o cursor de digitação no fim do texto —
   * é o estado de quem está consumindo TEXT_MESSAGE_CONTENT do AG-UI.
   */
  streaming?: boolean;
  status?: MessageStatus;
  /** Ações da mensagem: copiar, refazer, avaliar. */
  actions?: ReactNode;
};

// Estado de uma chamada de ferramenta. Mapeia direto para o par
// TOOL_CALL_START / TOOL_CALL_END do AG-UI.
export type ToolCallStatus = 'running' | 'success' | 'error';

export type ToolCallProps = {
  name: string;
  status?: ToolCallStatus;
  /** Argumentos, já serializados para exibição. */
  args?: string;
  /** Retorno da ferramenta, já serializado. */
  result?: string;
  defaultOpen?: boolean;
};
