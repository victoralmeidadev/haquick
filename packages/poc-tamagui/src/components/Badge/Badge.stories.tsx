import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { XStack, YStack } from '../Stack';

const meta: Meta<typeof Badge> = {
  title: 'Common/Badge',
  component: Badge,
  args: { children: 'Badge' },
  argTypes: {
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
  },
  // O Badge usa `alignSelf: flex-start` para encolher até o conteúdo — isso só
  // vale dentro de um container flex, então as stories usam Stack.
  render: (args) => (
    <YStack align="start">
      <Badge {...args} />
    </YStack>
  ),
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Playground: Story = { args: { intent: 'primary' } };

export const AllIntents: Story = {
  render: () => (
    <XStack gap="$2" wrap align="center">
      <Badge intent="primary">Primary</Badge>
      <Badge intent="secondary">Secondary</Badge>
      <Badge intent="success">Success</Badge>
      <Badge intent="warning">Warning</Badge>
      <Badge intent="error">Error</Badge>
      <Badge intent="info">Info</Badge>
      <Badge intent="neutral">Neutral</Badge>
    </XStack>
  ),
};
