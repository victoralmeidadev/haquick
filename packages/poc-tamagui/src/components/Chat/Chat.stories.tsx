import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Composer } from './Composer';
import { Message } from './Message';
import { MessageList, Suggestions } from './MessageList';
import { ToolCall } from './ToolCall';
import { TypingIndicator } from './TypingIndicator';
import { Avatar } from '../Avatar';
import { EmptyState } from '../EmptyState';
import { IconButton } from '../IconButton';
import { YStack } from '../Stack';

const meta: Meta = {
  title: 'Agentes/Chat',
};

export default meta;

type Story = StoryObj;

const Bot = () => <Avatar size="sm" initials="AI" intent="secondary" />;

export const Conversation: Story = {
  render: () => (
    <YStack width={620}>
      <MessageList>
        <Message role="system">Conversa iniciada · modelo gpt-4o</Message>

        <Message role="user" timestamp="10:32">
          Quantos pedidos foram cancelados neste mês?
        </Message>

        <Message role="assistant" avatar={<Bot />} author="Assistente" timestamp="10:32">
          Vou consultar a base.
        </Message>

        <ToolCall
          name="consultar_pedidos"
          status="success"
          args={'{ "status": "cancelado", "periodo": "2026-09" }'}
          result={'{ "total": 37, "valor": 4210.5 }'}
        />

        <Message
          role="assistant"
          avatar={<Bot />}
          actions={
            <>
              <IconButton label="Copiar" size="sm">
                ⧉
              </IconButton>
              <IconButton label="Refazer" size="sm">
                ↻
              </IconButton>
            </>
          }
        >
          Foram 37 cancelamentos em setembro, somando R$ 4.210,50 — 8% acima do mês anterior.
        </Message>
      </MessageList>
    </YStack>
  ),
};

export const States: Story = {
  render: () => (
    <YStack width={620}>
      <MessageList>
        <Message role="user" status="error">
          Esta mensagem falhou ao enviar.
        </Message>

        <Message role="assistant" avatar={<Bot />} streaming>
          Esta resposta ainda está chegando
        </Message>

        <TypingIndicator />

        <ToolCall name="buscar_documentos" status="running" />

        <ToolCall
          name="enviar_email"
          status="error"
          args={'{ "para": "ana@empresa.com" }'}
          result={'Error: SMTP timeout'}
        />
      </MessageList>
    </YStack>
  ),
};

export const Empty: Story = {
  render: () => (
    <YStack width={620}>
      <MessageList
        isEmpty
        empty={
          <EmptyState
            icon="✦"
            intent="primary"
            title="Como posso ajudar?"
            description="Pergunte sobre pedidos, clientes ou relatórios."
          />
        }
      />
      <Suggestions
        items={['Resumir o mês', 'Pedidos cancelados', 'Top 5 clientes']}
        onSelect={() => {}}
      />
    </YStack>
  ),
};

// Simula o ciclo de eventos de um agente: usuário envia, agente "pensa",
// responde token a token e termina. É o mesmo ciclo que o AG-UI descreve com
// RUN_STARTED → TEXT_MESSAGE_CONTENT → RUN_FINISHED.
const ANSWER =
  'Claro. Em setembro houve 37 cancelamentos, somando R$ 4.210,50. O pico foi na semana do dia 12.';

export const Streaming: Story = {
  render: () => {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
    const [thinking, setThinking] = useState(false);
    const [streaming, setStreaming] = useState(false);

    useEffect(() => {
      if (!streaming) return;
      let i = 0;
      const timer = setInterval(() => {
        i += 2;
        setMessages((m) => {
          const copia = [...m];
          copia[copia.length - 1] = { role: 'assistant', text: ANSWER.slice(0, i) };
          return copia;
        });
        if (i >= ANSWER.length) {
          clearInterval(timer);
          setStreaming(false);
        }
      }, 25);
      return () => clearInterval(timer);
    }, [streaming]);

    const send = (text: string) => {
      setMessages((m) => [...m, { role: 'user', text }]);
      setThinking(true);
      setTimeout(() => {
        setThinking(false);
        setMessages((m) => [...m, { role: 'assistant', text: '' }]);
        setStreaming(true);
      }, 700);
    };

    return (
      <YStack width={620} gap="$2">
        <MessageList
          isEmpty={messages.length === 0 && !thinking}
          empty={
            <EmptyState
              icon="✦"
              intent="primary"
              title="Comece a conversa"
              description="Envie uma mensagem para ver a resposta chegando token a token."
            />
          }
        >
          {messages.map((m, i) => (
            <Message
              key={i}
              role={m.role}
              avatar={m.role === 'assistant' ? <Bot /> : undefined}
              streaming={streaming && i === messages.length - 1}
            >
              {m.text}
            </Message>
          ))}
          {thinking ? <TypingIndicator /> : null}
        </MessageList>

        <Composer onSend={send} busy={thinking || streaming} onStop={() => setStreaming(false)} />
      </YStack>
    );
  },
};
