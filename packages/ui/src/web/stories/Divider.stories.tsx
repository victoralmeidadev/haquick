import type { Meta, StoryObj } from '@storybook/react';
import { Divider, Typography, XStack, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Divider',
};

export default meta;

type Story = StoryObj;

export const Horizontal: Story = {
  decorators: [
    (Story) => (
      <YStack gap={3} width={320}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <>
      <Typography variant="body2">Acima</Typography>
      <Divider />
      <Typography variant="body2">Abaixo</Typography>
    </>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', height: 40 }}>
      <Typography variant="body2">Esquerda</Typography>
      <Divider orientation="vertical" />
      <Typography variant="body2">Direita</Typography>
    </div>
  ),
};
