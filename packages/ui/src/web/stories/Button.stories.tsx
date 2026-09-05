import type { Meta, StoryObj } from '@storybook/react';
import { Button, XStack, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Button',
};

export default meta;

type Story = StoryObj;

export const Solid: Story = {
  decorators: [
    (Story) => (
      <XStack gap={2} wrap align="center">
        <Story />
      </XStack>
    ),
  ],
  render: () => (
    <>
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((intent) => (
        <Button key={intent} variant="solid" intent={intent}>
          {intent}
        </Button>
      ))}
    </>
  ),
};

export const Soft: Story = {
  decorators: [
    (Story) => (
      <XStack gap={2} wrap align="center">
        <Story />
      </XStack>
    ),
  ],
  render: () => (
    <>
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((intent) => (
        <Button key={intent} variant="soft" intent={intent}>
          {intent}
        </Button>
      ))}
    </>
  ),
};

export const Outline: Story = {
  decorators: [
    (Story) => (
      <XStack gap={2} wrap align="center">
        <Story />
      </XStack>
    ),
  ],
  render: () => (
    <>
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((intent) => (
        <Button key={intent} variant="outline" intent={intent}>
          {intent}
        </Button>
      ))}
    </>
  ),
};

export const Ghost: Story = {
  decorators: [
    (Story) => (
      <XStack gap={2} wrap align="center">
        <Story />
      </XStack>
    ),
  ],
  render: () => (
    <>
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((intent) => (
        <Button key={intent} variant="ghost" intent={intent}>
          {intent}
        </Button>
      ))}
    </>
  ),
};

export const Sizes: Story = {
  decorators: [
    (Story) => (
      <XStack gap={2} align="center">
        <Story />
      </XStack>
    ),
  ],
  render: () => (
    <>
      <Button size="sm">Pequeno</Button>
      <Button size="md">Médio</Button>
      <Button size="lg">Grande</Button>
    </>
  ),
};

export const States: Story = {
  decorators: [
    (Story) => (
      <XStack gap={2} wrap align="center">
        <Story />
      </XStack>
    ),
  ],
  render: () => (
    <>
      <Button>Normal</Button>
      <Button loading>Salvando</Button>
      <Button disabled>Desabilitado</Button>
    </>
  ),
};

export const FullWidth: Story = {
  decorators: [
    (Story) => (
      <YStack gap={2} width={320}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <>
      <Button fullWidth>Continuar</Button>
      <Button fullWidth variant="outline" intent="neutral">Cancelar</Button>
    </>
  ),
};
