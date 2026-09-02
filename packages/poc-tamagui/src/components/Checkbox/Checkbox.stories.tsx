import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { YStack } from '../Stack';

const meta: Meta<typeof Checkbox> = {
  title: 'Common/Checkbox',
  component: Checkbox,
  args: { label: 'Aceito os termos' },
  argTypes: {
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = { args: { defaultChecked: true } };

export const States: Story = {
  render: () => (
    <YStack gap="$3" align="start">
      <Checkbox label="Desmarcado" />
      <Checkbox label="Marcado" defaultChecked />
      <Checkbox label="Parcial" indeterminate />
      <Checkbox label="Desabilitado" disabled defaultChecked />
      <Checkbox label="Erro" intent="error" defaultChecked />
    </YStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <YStack gap="$3" align="start">
      <Checkbox size="sm" label="Pequeno" defaultChecked />
      <Checkbox size="md" label="Médio" defaultChecked />
      <Checkbox size="lg" label="Grande" defaultChecked />
    </YStack>
  ),
};
