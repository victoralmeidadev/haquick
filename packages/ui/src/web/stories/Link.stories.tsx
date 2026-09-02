import type { Meta, StoryObj } from '@storybook/react';
import { Link, XStack, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Link',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <YStack gap={2} align="start">
      <Link href="https://www.radix-ui.com/primitives">Com href, vira uma âncora</Link>
      <Link onPress={() => {}}>Sem href, vira um botão</Link>
      <Link disabled>Desabilitado</Link>
    </YStack>
  ),
};

export const Sublinhado: Story = {
  render: () => (
    <XStack gap={4} wrap>
      <Link underline="always">always</Link>
      <Link underline="hover">hover</Link>
      <Link underline="none">none</Link>
    </XStack>
  ),
};

export const Intents: Story = {
  render: () => (
    <XStack gap={3} wrap>
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((i) => (
        <Link key={i} intent={i}>{i}</Link>
      ))}
    </XStack>
  ),
};
