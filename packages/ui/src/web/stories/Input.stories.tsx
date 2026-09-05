import type { Meta, StoryObj } from '@storybook/react';
import { HelperText, Input, Label, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Input',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  decorators: [
    (Story) => (
      <YStack gap={1} width={320}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <>
      <Label required>E-mail</Label>
      <Input placeholder="voce@empresa.com" inputMode="email" />
      <HelperText>Usamos só para o recibo.</HelperText>
    </>
  ),
};

export const Error: Story = {
  decorators: [
    (Story) => (
      <YStack gap={1} width={320}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <>
      <Label required>Senha</Label>
      <Input secure defaultValue="123" error />
      <HelperText error>Mínimo de 8 caracteres.</HelperText>
    </>
  ),
};

export const Sizes: Story = {
  decorators: [
    (Story) => (
      <YStack gap={2} width={320}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <>
      <Input size="sm" placeholder="Pequeno" />
      <Input size="md" placeholder="Médio" />
      <Input size="lg" placeholder="Grande" />
      <Input disabled placeholder="Desabilitado" />
    </>
  ),
};

export const Multiline: Story = {
  decorators: [
    (Story) => (
      <YStack gap={1} width={320}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <>
      <Label>Observações</Label>
      <Input multiline rows={4} placeholder="Opcional" />
    </>
  ),
};
