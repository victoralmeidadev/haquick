import type { Meta, StoryObj } from '@storybook/react';
import { HelperText, Input, Label, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Label',
};

export default meta;

type Story = StoryObj;

export const WithField: Story = {
  decorators: [
    (Story) => (
      <YStack gap={1} width={320}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <>
      <Label>Nome</Label>
      <Input placeholder="Opcional" />
    </>
  ),
};

export const Required: Story = {
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
      <Input placeholder="Obrigatório" />
      <HelperText>O asterisco vem de required.</HelperText>
    </>
  ),
};
