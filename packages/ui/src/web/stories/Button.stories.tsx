import type { Meta, StoryObj } from '@storybook/react';
import { Button, XStack, YStack, Typography } from '../index';

const meta: Meta = {
  title: 'Componentes/Button',
};

export default meta;

type Story = StoryObj;

export const Variants: Story = {
  render: () => (
    <YStack gap={4}>
      {(['solid','soft','outline','ghost'] as const).map((variant) => (
        <YStack key={variant} gap={2}>
          <Typography variant="overline" intent="neutral">{variant}</Typography>
          <XStack gap={2} wrap>
            {(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((intent) => (
              <Button key={intent} variant={variant} intent={intent}>
                {intent}
              </Button>
            ))}
          </XStack>
        </YStack>
      ))}
    </YStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <XStack gap={2} align="center">
      <Button size="sm">Pequeno</Button>
      <Button size="md">Médio</Button>
      <Button size="lg">Grande</Button>
    </XStack>
  ),
};

export const States: Story = {
  render: () => (
    <XStack gap={2} wrap align="center">
      <Button>Normal</Button>
      <Button loading>Salvando</Button>
      <Button disabled>Desabilitado</Button>
    </XStack>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <YStack gap={2} width={320}>
      <Button fullWidth>Continuar</Button>
      <Button fullWidth variant="outline" intent="neutral">Cancelar</Button>
    </YStack>
  ),
};
