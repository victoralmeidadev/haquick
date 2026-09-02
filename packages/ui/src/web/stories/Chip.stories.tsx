import type { Meta, StoryObj } from '@storybook/react';
import { Chip, XStack, YStack, Typography } from '../index';

const meta: Meta = {
  title: 'Componentes/Chip',
};

export default meta;

type Story = StoryObj;

export const Variants: Story = {
  render: () => (
    <YStack gap={3}>
      {(['solid','soft','outline','ghost'] as const).map((variant) => (
        <XStack key={variant} gap={2} wrap align="center">
          <Typography variant="overline" intent="neutral">{variant}</Typography>
          {(['primary','success','error'] as const).map((intent) => (
            <Chip key={intent} variant={variant} intent={intent}>{intent}</Chip>
          ))}
        </XStack>
      ))}
    </YStack>
  ),
};

export const Removable: Story = {
  render: () => (
    <XStack gap={2} wrap align="center">
      <Chip intent="primary" onRemove={() => {}}>com remover</Chip>
      <Chip intent="secondary" onPress={() => {}}>clicável</Chip>
      <Chip size="sm" intent="success">pequeno</Chip>
      <Chip disabled>desabilitado</Chip>
    </XStack>
  ),
};
