import type { Meta, StoryObj } from '@storybook/react';
import { Badge, XStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Badge',
};

export default meta;

type Story = StoryObj;

export const Intents: Story = {
  render: () => (
    <XStack gap={2} wrap align="center">
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((i) => (
        <Badge key={i} intent={i}>{i}</Badge>
      ))}
    </XStack>
  ),
};
