import type { Meta, StoryObj } from '@storybook/react';
import { Typography, XStack, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Typography',
};

export default meta;

type Story = StoryObj;

export const Scale: Story = {
  decorators: [
    (Story) => (
      <YStack gap={2}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <>
      {(['h1','h2','h3','h4','h5','h6','subtitle1','subtitle2','body1','body2','caption','overline'] as const).map((v) => (
        <Typography key={v} variant={v}>
          {v} — o rápido cão marrom saltou sobre a raposa
        </Typography>
      ))}
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
        <Typography key={i} variant="subtitle1" intent={i}>
          {i}
        </Typography>
      ))}
    </>
  ),
};

export const Alignment: Story = {
  decorators: [
    (Story) => (
      <YStack gap={2} width={360}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <>
      {(['left','center','right'] as const).map((a) => (
        <Typography key={a} variant="body1" align={a}>
          Alinhado à {a}
        </Typography>
      ))}
    </>
  ),
};
