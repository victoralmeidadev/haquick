import type { Meta, StoryObj } from '@storybook/react';
import { IconButton, XStack } from '../index';

const meta: Meta = {
  title: 'Componentes/IconButton',
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
      <IconButton label="Editar" variant="solid" intent="primary">✎</IconButton>
      <IconButton label="Excluir" variant="solid" intent="error">✕</IconButton>
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
      <IconButton label="Editar" variant="soft" intent="primary">✎</IconButton>
      <IconButton label="Excluir" variant="soft" intent="error">✕</IconButton>
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
      <IconButton label="Editar" variant="outline" intent="primary">✎</IconButton>
      <IconButton label="Excluir" variant="outline" intent="error">✕</IconButton>
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
      <IconButton label="Editar" variant="ghost" intent="primary">✎</IconButton>
      <IconButton label="Excluir" variant="ghost" intent="error">✕</IconButton>
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
      <IconButton label="Pequeno" size="sm">✎</IconButton>
      <IconButton label="Médio" size="md">✎</IconButton>
      <IconButton label="Grande" size="lg">✎</IconButton>
      <IconButton label="Quadrado" rounded={false}>✎</IconButton>
    </>
  ),
};
