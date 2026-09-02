import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { YStack } from '../Stack';

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  args: { placeholder: 'Digite algo...' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    inputMode: { control: 'select', options: ['text', 'email', 'numeric', 'tel', 'url', 'search'] },
  },
  render: (args) => (
    <YStack width={320}>
      <Input {...args} />
    </YStack>
  ),
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Error: Story = { args: { error: true, placeholder: 'Campo inválido' } };
export const Secure: Story = { args: { secure: true, defaultValue: 'senha-secreta' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'somente leitura' } };

export const Sizes: Story = {
  render: () => (
    <YStack gap="$3" width={320}>
      <Input size="sm" placeholder="Pequeno" />
      <Input size="md" placeholder="Médio" />
      <Input size="lg" placeholder="Grande" />
    </YStack>
  ),
};
