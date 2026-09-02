import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import { Avatar } from '../Avatar';
import { XStack } from '../Stack';

const meta: Meta<typeof Chip> = {
  title: 'Common/Chip',
  component: Chip,
  args: { children: 'React Native' },
  argTypes: {
    variant: { control: 'select', options: ['solid', 'outline', 'ghost'] },
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <XStack gap="$2" wrap align="center">
      <Chip variant="outline">Outline</Chip>
      <Chip variant="solid" intent="primary">
        Solid
      </Chip>
      <Chip variant="ghost" intent="neutral">
        Ghost
      </Chip>
      <Chip variant="solid" intent="success" size="sm">
        Pequeno
      </Chip>
    </XStack>
  ),
};

export const Removable: Story = {
  render: () => (
    <XStack gap="$2" wrap align="center">
      <Chip intent="primary" onRemove={() => {}}>
        tamagui
      </Chip>
      <Chip intent="secondary" onRemove={() => {}}>
        design-system
      </Chip>
      <Chip leading={<Avatar size="sm" initials="AS" width={20} height={20} />} onRemove={() => {}}>
        Ana Silva
      </Chip>
    </XStack>
  ),
};
