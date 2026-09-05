import type { Meta, StoryObj } from '@storybook/react';
import { Card, Typography, XStack, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Stack',
};

export default meta;

type Story = StoryObj;

export const Direction: Story = {
  decorators: [
    (Story) => (
      <YStack gap={4}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <>
      <YStack gap={2}>
        <Typography variant="overline" intent="neutral">XStack</Typography>
        <XStack gap={2}>
          <Card raised={1} width={80}><Typography variant="caption">um</Typography></Card>
          <Card raised={1} width={80}><Typography variant="caption">dois</Typography></Card>
        </XStack>
      </YStack>
      <YStack gap={2}>
        <Typography variant="overline" intent="neutral">YStack</Typography>
        <YStack gap={2} width={80}>
          <Card raised={1}><Typography variant="caption">um</Typography></Card>
          <Card raised={1}><Typography variant="caption">dois</Typography></Card>
        </YStack>
      </YStack>
    </>
  ),
};

export const Distribution: Story = {
  decorators: [
    (Story) => (
      <YStack gap={3} width={360}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <>
      {(['start','center','end','between','around','evenly'] as const).map((justify) => (
        <XStack key={justify} justify={justify} width="100%">
          <Card raised={1} width={60}><Typography variant="caption">{justify}</Typography></Card>
          <Card raised={1} width={60}><Typography variant="caption">b</Typography></Card>
        </XStack>
      ))}
    </>
  ),
};
