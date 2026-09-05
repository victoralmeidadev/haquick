import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Button, PageHeader, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/PageHeader',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  decorators: [
    (Story) => (
      <YStack width={560}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <PageHeader
      title="Pessoas"
      subtitle="42 no total"
      actions={<Button size="sm">Convidar</Button>}
    />
  ),
};

export const WithBackAndDivider: Story = {
  decorators: [
    (Story) => (
      <YStack width={560}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <PageHeader
      divided
      title="Ana Silva"
      subtitle="ana@empresa.com"
      onBack={() => {}}
      leading={<Avatar size="sm" initials="AS" />}
    />
  ),
};
