import type { Meta, StoryObj } from '@storybook/react';
import { IconButton, XStack, YStack, Typography } from '../index';

const meta: Meta = {
  title: 'Componentes/IconButton',
};

export default meta;

type Story = StoryObj;

export const Variants: Story = {
  render: () => (
    <YStack gap={3}>
      {(['solid','soft','outline','ghost'] as const).map((variant) => (
        <XStack key={variant} gap={2} align="center">
          <Typography variant="overline" intent="neutral">{variant}</Typography>
          <IconButton label="Editar" variant={variant} intent="primary">✎</IconButton>
          <IconButton label="Excluir" variant={variant} intent="error">✕</IconButton>
        </XStack>
      ))}
    </YStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <XStack gap={2} align="center">
      <IconButton label="Pequeno" size="sm">✎</IconButton>
      <IconButton label="Médio" size="md">✎</IconButton>
      <IconButton label="Grande" size="lg">✎</IconButton>
      <IconButton label="Quadrado" rounded={false}>✎</IconButton>
    </XStack>
  ),
};
