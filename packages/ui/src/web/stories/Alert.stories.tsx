import type { Meta, StoryObj } from '@storybook/react';
import { Alert, Button, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Alert',
};

export default meta;

type Story = StoryObj;

export const Intents: Story = {
  decorators: [
    (Story) => (
      <YStack gap={3} width={480}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <>
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((i) => (
        <Alert key={i} intent={i} title={i}>
          Mensagem de exemplo para a intenção {i}.
        </Alert>
      ))}
    </>
  ),
};

export const Variants: Story = {
  decorators: [
    (Story) => (
      <YStack gap={3} width={480}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <>
      <Alert intent="success" variant="outline" title="outline">Borda e texto tingidos.</Alert>
      <Alert intent="success" variant="soft" title="soft">Superfície tingida.</Alert>
      <Alert intent="success" variant="solid" title="solid">Preenchimento sólido.</Alert>
    </>
  ),
};

export const WithAction: Story = {
  decorators: [
    (Story) => (
      <YStack width={480}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <Alert
      intent="warning"
      variant="soft"
      title="Plano expirando"
      action={<Button size="sm" intent="warning">Renovar</Button>}
    >
      Seu plano expira em 3 dias.
    </Alert>
  ),
};
