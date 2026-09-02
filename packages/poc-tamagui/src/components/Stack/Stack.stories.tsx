import type { Meta, StoryObj } from '@storybook/react';
import { Stack, XStack, YStack } from './Stack';
import { Card } from '../Card';
import { Typography } from '../Typography';

const meta: Meta<typeof Stack> = {
  title: 'Common/Stack',
  component: Stack,
  argTypes: {
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stack>;

const Box = ({ label }: { label: string }) => (
  <Card padding="$3">
    <Typography variant="body2">{label}</Typography>
  </Card>
);

export const Horizontal: Story = {
  render: () => (
    <XStack gap="$3" align="center">
      <Box label="um" />
      <Box label="dois" />
      <Box label="três" />
    </XStack>
  ),
};

export const Vertical: Story = {
  render: () => (
    <YStack gap="$3" width={200}>
      <Box label="um" />
      <Box label="dois" />
      <Box label="três" />
    </YStack>
  ),
};

export const SpaceBetween: Story = {
  render: () => (
    <XStack gap="$3" justify="between" width={400}>
      <Box label="início" />
      <Box label="fim" />
    </XStack>
  ),
};
