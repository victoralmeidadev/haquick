import type { Meta, StoryObj } from '@storybook/react';
import { Switch, XStack, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Switch',
};

export default meta;

type Story = StoryObj;

export const States: Story = {
  render: () => (
    <YStack gap={2} align="start">
      <Switch label="Desligado" />
      <Switch label="Ligado" defaultChecked />
      <Switch label="Desabilitado" disabled defaultChecked />
    </YStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <XStack gap={4} align="center">
      <Switch size="sm" defaultChecked />
      <Switch size="md" defaultChecked />
      <Switch size="lg" defaultChecked />
    </XStack>
  ),
};
