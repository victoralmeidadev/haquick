import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Button, PageHeader, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/PageHeader',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <YStack width={560}>
      <PageHeader
        title="Pessoas"
        subtitle="42 no total"
        actions={<Button size="sm">Convidar</Button>}
      />
    </YStack>
  ),
};

export const WithBackAndDivider: Story = {
  render: () => (
    <YStack width={560}>
      <PageHeader
        divided
        title="Ana Silva"
        subtitle="ana@empresa.com"
        onBack={() => {}}
        leading={<Avatar size="sm" initials="AS" />}
      />
    </YStack>
  ),
};
