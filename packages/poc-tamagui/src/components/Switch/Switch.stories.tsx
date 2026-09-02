import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { YStack } from '../Stack';

const meta: Meta<typeof Switch> = {
  title: 'Common/Switch',
  component: Switch,
  args: { label: 'Notificações por e-mail' },
  argTypes: {
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = { args: { defaultChecked: true } };

export const States: Story = {
  render: () => (
    <YStack gap="$3" align="start">
      <Switch label="Desligado" />
      <Switch label="Ligado" defaultChecked />
      <Switch label="Ligado (success)" intent="success" defaultChecked />
      <Switch label="Desabilitado" disabled defaultChecked />
    </YStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <YStack gap="$3" align="start">
      <Switch size="sm" label="Pequeno" defaultChecked />
      <Switch size="md" label="Médio" defaultChecked />
      <Switch size="lg" label="Grande" defaultChecked />
    </YStack>
  ),
};
