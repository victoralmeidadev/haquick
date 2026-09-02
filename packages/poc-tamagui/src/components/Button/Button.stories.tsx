import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { XStack, YStack } from '../Stack';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  args: { children: 'Enviar' },
  argTypes: {
    variant: { control: 'select', options: ['solid', 'soft', 'outline', 'ghost'] },
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Solid: Story = { args: { variant: 'solid' } };
export const Soft: Story = { args: { variant: 'soft' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Ghost: Story = { args: { variant: 'ghost' } };

export const Intents: Story = {
  render: () => (
    <YStack gap="$3">
      <XStack gap="$2" wrap>
        <Button intent="primary">Primary</Button>
        <Button intent="secondary">Secondary</Button>
        <Button intent="success">Success</Button>
        <Button intent="warning">Warning</Button>
        <Button intent="error">Error</Button>
        <Button intent="info">Info</Button>
        <Button intent="neutral">Neutral</Button>
      </XStack>
      <XStack gap="$2" wrap>
        <Button variant="soft" intent="primary">
          Primary
        </Button>
        <Button variant="soft" intent="success">
          Success
        </Button>
        <Button variant="soft" intent="warning">
          Warning
        </Button>
        <Button variant="soft" intent="error">
          Error
        </Button>
      </XStack>
      <XStack gap="$2" wrap>
        <Button variant="outline" intent="primary">
          Primary
        </Button>
        <Button variant="outline" intent="error">
          Excluir
        </Button>
        <Button variant="ghost" intent="neutral">
          Cancelar
        </Button>
      </XStack>
    </YStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <XStack gap="$2" align="center">
      <Button size="sm">Pequeno</Button>
      <Button size="md">Médio</Button>
      <Button size="lg">Grande</Button>
    </XStack>
  ),
};

export const States: Story = {
  render: () => (
    <XStack gap="$2" align="center" wrap>
      <Button loading>Salvando</Button>
      <Button disabled>Desabilitado</Button>
      <Button variant="outline" loading intent="error">
        Excluindo
      </Button>
    </XStack>
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Continuar' },
  render: (args) => (
    <YStack width={320}>
      <Button {...args} />
    </YStack>
  ),
};
