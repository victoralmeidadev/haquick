import type { Meta, StoryObj } from '@storybook/react';
import { HelperText, Input, Label, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Label',
};

export default meta;

type Story = StoryObj;

export const WithField: Story = {
  render: () => (
    <YStack gap={3} width={320}>
      <YStack gap={1}>
        <Label>Nome</Label>
        <Input placeholder="Opcional" />
      </YStack>
      <YStack gap={1}>
        <Label required>E-mail</Label>
        <Input placeholder="Obrigatório" />
        <HelperText>O asterisco vem do required.</HelperText>
      </YStack>
    </YStack>
  ),
};
