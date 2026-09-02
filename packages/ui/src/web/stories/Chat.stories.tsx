import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Composer, IconButton, Message, MessageList, Suggestions, ToolCall, TypingIndicator, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Chat',
};

export default meta;

type Story = StoryObj;

export const Conversation: Story = {
  render: () => (
    <YStack gap={2} width={560}>
      <MessageList>
        <Message role="system">Conversa iniciada</Message>
        <Message role="user" timestamp="10:32">Quantos pedidos foram cancelados?</Message>
        <Message
          role="assistant"
          author="Assistente"
          avatar={<Avatar size="sm" initials="AI" intent="secondary" />}
        >
          Vou consultar a base.
        </Message>
        <ToolCall
          name="consultar_pedidos"
          status="success"
          args={'{ "status": "cancelado" }'}
          result={'{ "total": 37 }'}
        />
        <Message
          role="assistant"
          avatar={<Avatar size="sm" initials="AI" intent="secondary" />}
          actions={<IconButton label="Copiar" size="sm">⧉</IconButton>}
        >
          Foram 37 cancelamentos.
        </Message>
        <TypingIndicator />
      </MessageList>
      <Suggestions items={['Resumir o mês', 'Top 5 clientes']} onSelect={() => {}} />
      <Composer onSend={() => {}} />
    </YStack>
  ),
};

export const ToolCallStates: Story = {
  render: () => (
    <YStack gap={3} width={560}>
      <ToolCall name="executando" status="running" />
      <ToolCall name="concluida" status="success" result={'{ "ok": true }'} />
      <ToolCall name="falhou" status="error" args={'{ "id": 42 }'} />
    </YStack>
  ),
};

export const Streaming: Story = {
  render: () => (
    <YStack width={560}>
      <MessageList>
        <Message role="user">Escreva um resumo</Message>
        <Message role="assistant" streaming avatar={<Avatar size="sm" initials="AI" />}>
          O texto vai chegando
        </Message>
        <Message role="user" status="error">Esta falhou ao enviar</Message>
      </MessageList>
    </YStack>
  ),
};
