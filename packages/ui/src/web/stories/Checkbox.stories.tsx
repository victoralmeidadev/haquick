import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, XStack, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Checkbox',
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
      <Checkbox label="Não marcado" />
      <Checkbox label="Marcado" defaultChecked />
      <Checkbox label="Indeterminado" indeterminate />
      <Checkbox label="Desabilitado" disabled defaultChecked />
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
      <Checkbox label="sm" size="sm" defaultChecked />
      <Checkbox label="md" size="md" defaultChecked />
      <Checkbox label="lg" size="lg" defaultChecked />
    </>
  ),
};

export const Intents: Story = {
  decorators: [
    (Story) => (
      <XStack gap={3} wrap align="center">
        <Story />
      </XStack>
    ),
  ],
  render: () => (
    <>
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((i) => (
        <Checkbox key={i} label={i} intent={i} defaultChecked />
      ))}
    </>
  ),
};
