import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { XStack } from '../Stack';

const meta: Meta<typeof Avatar> = {
  title: 'Common/Avatar',
  component: Avatar,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Initials: Story = { args: { initials: 'VA', size: 'md' } };

export const Sizes: Story = {
  render: () => (
    <XStack gap="$3" align="center">
      <Avatar size="sm" initials="AS" />
      <Avatar size="md" initials="BC" intent="secondary" />
      <Avatar size="lg" initials="CN" intent="success" />
    </XStack>
  ),
};
