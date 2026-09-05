import type { Meta, StoryObj } from '@storybook/react';
import { Link, XStack, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Link',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  decorators: [
    (Story) => (
      <YStack gap={2} align="start">
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <>
      <Link href="https://www.radix-ui.com/primitives">Com href, vira uma âncora</Link>
      <Link onPress={() => {}}>Sem href, vira um botão</Link>
      <Link disabled>Desabilitado</Link>
    </>
  ),
};

export const Underline: Story = {
  decorators: [
    (Story) => (
      <XStack gap={4} wrap>
        <Story />
      </XStack>
    ),
  ],
  render: () => (
    <>
      <Link underline="always">always</Link>
      <Link underline="hover">hover</Link>
      <Link underline="none">none</Link>
    </>
  ),
};

export const Intents: Story = {
  decorators: [
    (Story) => (
      <XStack gap={3} wrap>
        <Story />
      </XStack>
    ),
  ],
  render: () => (
    <>
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((i) => (
        <Link key={i} intent={i}>{i}</Link>
      ))}
    </>
  ),
};
