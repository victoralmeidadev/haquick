import type { Meta, StoryObj } from '@storybook/react';
import { Typography, XStack, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Typography',
};

export default meta;

type Story = StoryObj;

export const Scale: Story = {
  render: () => (
    <YStack gap={2}>
      {(['h1','h2','h3','h4','h5','h6','subtitle1','subtitle2','body1','body2','caption','overline'] as const).map((v) => (
        <Typography key={v} variant={v}>
          {v} — o rápido cão marrom saltou sobre a raposa
        </Typography>
      ))}
    </YStack>
  ),
};

export const Intents: Story = {
  render: () => (
    <XStack gap={3} wrap>
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((i) => (
        <Typography key={i} variant="subtitle1" intent={i}>
          {i}
        </Typography>
      ))}
    </XStack>
  ),
};

export const Alignment: Story = {
  render: () => (
    <YStack gap={2} width={360}>
      {(['left','center','right'] as const).map((a) => (
        <Typography key={a} variant="body1" align={a}>
          Alinhado à {a}
        </Typography>
      ))}
    </YStack>
  ),
};
