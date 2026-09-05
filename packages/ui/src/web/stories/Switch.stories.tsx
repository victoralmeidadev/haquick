import type { Meta, StoryObj } from '@storybook/react';
import { Switch, XStack, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Switch',
};

export default meta;

type Story = StoryObj;

export const States: Story = {
  decorators: [
    (Story) => (
      <YStack gap={2} align="start">
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <>
      <Switch label="Desligado" />
      <Switch label="Ligado" defaultChecked />
      <Switch label="Desabilitado" disabled defaultChecked />
    </>
  ),
};

export const Sizes: Story = {
  decorators: [
    (Story) => (
      <XStack gap={4} align="center">
        <Story />
      </XStack>
    ),
  ],
  render: () => (
    <>
      <Switch size="sm" defaultChecked />
      <Switch size="md" defaultChecked />
      <Switch size="lg" defaultChecked />
    </>
  ),
};
