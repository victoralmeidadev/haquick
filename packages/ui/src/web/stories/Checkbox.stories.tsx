import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, XStack, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Checkbox',
};

export default meta;

type Story = StoryObj;

export const States: Story = {
  render: () => (
    <YStack gap={2} align="start">
      <Checkbox label="Não marcado" />
      <Checkbox label="Marcado" defaultChecked />
      <Checkbox label="Indeterminado" indeterminate />
      <Checkbox label="Desabilitado" disabled defaultChecked />
    </YStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <XStack gap={4} align="center">
      <Checkbox label="sm" size="sm" defaultChecked />
      <Checkbox label="md" size="md" defaultChecked />
      <Checkbox label="lg" size="lg" defaultChecked />
    </XStack>
  ),
};

export const Intents: Story = {
  render: () => (
    <XStack gap={3} wrap align="center">
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((i) => (
        <Checkbox key={i} label={i} intent={i} defaultChecked />
      ))}
    </XStack>
  ),
};
