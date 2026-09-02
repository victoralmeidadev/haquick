import type { Meta, StoryObj } from '@storybook/react';
import { Button, Spacer, XStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Spacer',
};

export default meta;

type Story = StoryObj;

export const PushToEnd: Story = {
  render: () => (
    <XStack width={360} align="center">
      <Button size="sm">Esquerda</Button>
      <Spacer fill />
      <Button size="sm" variant="outline" intent="neutral">Direita</Button>
    </XStack>
  ),
};

export const FixedSizes: Story = {
  render: () => (
    <XStack align="center">
      {(['xs','sm','md','lg','xl'] as const).map((size) => (
        <XStack key={size} align="center">
          <Button size="sm">{size}</Button>
          <Spacer size={size} />
        </XStack>
      ))}
    </XStack>
  ),
};
