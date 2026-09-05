import type { Meta, StoryObj } from '@storybook/react';
import { Chip, XStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Chip',
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
      {(['primary', 'success', 'error'] as const).map((intent) => (
        <Chip key={intent} variant="solid" intent={intent}>{intent}</Chip>
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
      {(['primary', 'success', 'error'] as const).map((intent) => (
        <Chip key={intent} variant="soft" intent={intent}>{intent}</Chip>
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
      {(['primary', 'success', 'error'] as const).map((intent) => (
        <Chip key={intent} variant="outline" intent={intent}>{intent}</Chip>
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
      {(['primary', 'success', 'error'] as const).map((intent) => (
        <Chip key={intent} variant="ghost" intent={intent}>{intent}</Chip>
      ))}
    </>
  ),
};

export const Removable: Story = {
  decorators: [
    (Story) => (
      <XStack gap={2} wrap align="center">
        <Story />
      </XStack>
    ),
  ],
  render: () => (
    <>
      <Chip intent="primary" onRemove={() => {}}>com remover</Chip>
      <Chip intent="secondary" onPress={() => {}}>clicável</Chip>
      <Chip size="sm" intent="success">pequeno</Chip>
      <Chip disabled>desabilitado</Chip>
    </>
  ),
};
