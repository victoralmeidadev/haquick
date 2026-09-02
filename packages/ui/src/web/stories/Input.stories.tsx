import type { Meta, StoryObj } from '@storybook/react';
import { HelperText, Input, Label, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Input',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <YStack gap={1} width={320}>
      <Label required>E-mail</Label>
      <Input placeholder="voce@empresa.com" inputMode="email" />
      <HelperText>Usamos só para o recibo.</HelperText>
    </YStack>
  ),
};

export const Error: Story = {
  render: () => (
    <YStack gap={1} width={320}>
      <Label required>Senha</Label>
      <Input secure defaultValue="123" error />
      <HelperText error>Mínimo de 8 caracteres.</HelperText>
    </YStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <YStack gap={2} width={320}>
      <Input size="sm" placeholder="Pequeno" />
      <Input size="md" placeholder="Médio" />
      <Input size="lg" placeholder="Grande" />
      <Input disabled placeholder="Desabilitado" />
    </YStack>
  ),
};

export const Multiline: Story = {
  render: () => (
    <YStack gap={1} width={320}>
      <Label>Observações</Label>
      <Input multiline rows={4} placeholder="Opcional" />
    </YStack>
  ),
};
