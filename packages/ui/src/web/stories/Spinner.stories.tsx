import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, XStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Spinner',
};

export default meta;

type Story = StoryObj;

export const Sizes: Story = {
  render: () => (
    <XStack gap={3} align="center">
      <Spinner size="sm" />
      <Spinner size="lg" />
    </XStack>
  ),
};

export const Intents: Story = {
  render: () => (
    <XStack gap={3} align="center">
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((i) => (
        <Spinner key={i} intent={i} />
      ))}
    </XStack>
  ),
};
