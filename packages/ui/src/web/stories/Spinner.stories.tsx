import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, XStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Spinner',
};

export default meta;

type Story = StoryObj;

export const Sizes: Story = {
  decorators: [
    (Story) => (
      <XStack gap={3} align="center">
        <Story />
      </XStack>
    ),
  ],
  render: () => (
    <>
      <Spinner size="sm" />
      <Spinner size="lg" />
    </>
  ),
};

export const Intents: Story = {
  decorators: [
    (Story) => (
      <XStack gap={3} align="center">
        <Story />
      </XStack>
    ),
  ],
  render: () => (
    <>
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((i) => (
        <Spinner key={i} intent={i} />
      ))}
    </>
  ),
};
