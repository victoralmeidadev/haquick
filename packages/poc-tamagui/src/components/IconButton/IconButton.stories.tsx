import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { XStack } from '../Stack';

const meta: Meta<typeof IconButton> = {
  title: 'Common/IconButton',
  component: IconButton,
  args: { children: '✕', label: 'Fechar' },
  argTypes: {
    variant: { control: 'select', options: ['solid', 'outline', 'ghost'] },
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Ghost: Story = { args: { variant: 'ghost' } };

export const Variants: Story = {
  render: () => (
    <XStack gap="$2" align="center">
      <IconButton label="Fechar" variant="ghost">
        ✕
      </IconButton>
      <IconButton label="Editar" variant="outline" intent="primary">
        ✎
      </IconButton>
      <IconButton label="Excluir" variant="solid" intent="error">
        ✕
      </IconButton>
      <IconButton label="Favoritar" variant="solid" intent="warning" rounded>
        ★
      </IconButton>
    </XStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <XStack gap="$2" align="center">
      <IconButton label="Adicionar" size="sm" variant="outline" intent="primary">
        +
      </IconButton>
      <IconButton label="Adicionar" size="md" variant="outline" intent="primary">
        +
      </IconButton>
      <IconButton label="Adicionar" size="lg" variant="outline" intent="primary">
        +
      </IconButton>
    </XStack>
  ),
};
