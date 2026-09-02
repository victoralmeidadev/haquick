import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { Card } from '../Card';
import { XStack, YStack } from '../Stack';

const meta: Meta<typeof Skeleton> = {
  title: 'Common/Skeleton',
  component: Skeleton,
  argTypes: {
    variant: { control: 'select', options: ['text', 'circular', 'rectangular'] },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Variants: Story = {
  render: () => (
    <YStack gap="$3" width={320}>
      <Skeleton variant="text" />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="circular" />
      <Skeleton variant="rectangular" />
    </YStack>
  ),
};

export const CardLoading: Story = {
  render: () => (
    <Card width={320} gap="$3">
      <XStack gap="$3" align="center">
        <Skeleton variant="circular" width={40} height={40} />
        <YStack gap="$2" fill>
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="40%" height={10} />
        </YStack>
      </XStack>
      <Skeleton variant="rectangular" height={100} />
    </Card>
  ),
};
