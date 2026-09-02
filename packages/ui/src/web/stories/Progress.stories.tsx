import type { Meta, StoryObj } from '@storybook/react';
import { Progress, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Progress',
};

export default meta;

type Story = StoryObj;

export const Intents: Story = {
  render: () => (
    <YStack gap={3} width={320}>
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((i, n) => (
        <Progress key={i} intent={i} value={(n + 1) * 14} />
      ))}
    </YStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <YStack gap={3} width={320}>
      <Progress size="sm" value={40} />
      <Progress size="md" value={60} />
      <Progress size="lg" value={80} />
    </YStack>
  ),
};
