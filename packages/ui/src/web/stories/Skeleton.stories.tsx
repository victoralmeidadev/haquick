import type { Meta, StoryObj } from '@storybook/react';
import { Card, Skeleton, XStack, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Skeleton',
};

export default meta;

type Story = StoryObj;

export const Variants: Story = {
  render: () => (
    <YStack gap={3} width={320}>
      <Skeleton variant="text" />
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="rectangular" height={80} />
      <Skeleton variant="circular" width={48} height={48} />
    </YStack>
  ),
};

export const LoadingCard: Story = {
  render: () => (
    <Card raised={1} width={320} gap={3}>
      <XStack gap={3} align="center">
        <Skeleton variant="circular" width={40} height={40} />
        <YStack gap={1} fill>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </YStack>
      </XStack>
      <Skeleton variant="rectangular" height={64} />
    </Card>
  ),
};
