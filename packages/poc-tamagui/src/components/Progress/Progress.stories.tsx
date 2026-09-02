import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';
import { YStack } from '../Stack';

const meta: Meta<typeof Progress> = {
  title: 'Common/Progress',
  component: Progress,
  args: { value: 60 },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
  },
  render: (args) => (
    <YStack width={320}>
      <Progress {...args} />
    </YStack>
  ),
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {};

export const Intents: Story = {
  render: () => (
    <YStack gap="$3" width={320}>
      <Progress value={25} intent="primary" />
      <Progress value={50} intent="success" size="lg" />
      <Progress value={85} intent="warning" />
      <Progress value={100} intent="error" size="sm" />
    </YStack>
  ),
};
