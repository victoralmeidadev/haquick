import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';
import { YStack } from '../Stack';

const meta: Meta<typeof Link> = {
  title: 'Common/Link',
  component: Link,
  args: { children: 'Ver documentação' },
  argTypes: {
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    underline: { control: 'select', options: ['always', 'hover', 'none'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = { args: { href: 'https://tamagui.dev' } };

export const Variants: Story = {
  render: () => (
    <YStack gap="$2" align="start">
      <Link underline="always">Sempre sublinhado</Link>
      <Link underline="hover">Sublinha no hover</Link>
      <Link underline="none">Sem sublinhado</Link>
      <Link intent="error">Cancelar assinatura</Link>
      <Link disabled>Indisponível</Link>
    </YStack>
  ),
};
