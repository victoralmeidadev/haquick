import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { XStack } from '../Stack';

const meta: Meta<typeof Spinner> = {
  title: 'Common/Spinner',
  component: Spinner,
  argTypes: {
    size: { control: 'select', options: ['sm', 'lg'] },
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = { args: { size: 'lg', intent: 'primary' } };

export const Intents: Story = {
  render: () => (
    <XStack gap="$4" align="center">
      <Spinner intent="primary" />
      <Spinner intent="success" />
      <Spinner intent="error" size="lg" />
      <Spinner intent="neutral" />
    </XStack>
  ),
};
