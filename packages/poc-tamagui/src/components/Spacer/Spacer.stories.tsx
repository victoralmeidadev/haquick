import type { Meta, StoryObj } from '@storybook/react';
import { Spacer } from './Spacer';
import { XStack } from '../Stack';
import { Card } from '../Card';
import { Typography } from '../Typography';

const meta: Meta<typeof Spacer> = {
  title: 'Common/Spacer',
  component: Spacer,
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
};

export default meta;

type Story = StoryObj<typeof Spacer>;

export const PushToEnd: Story = {
  render: () => (
    <XStack align="center" width={400}>
      <Typography variant="subtitle1">Título</Typography>
      <Spacer fill />
      <Card padding="$2">
        <Typography variant="caption">ação</Typography>
      </Card>
    </XStack>
  ),
};

export const FixedSizes: Story = {
  render: () => (
    <XStack align="center">
      <Card padding="$2">
        <Typography variant="caption">A</Typography>
      </Card>
      <Spacer size="xl" />
      <Card padding="$2">
        <Typography variant="caption">B</Typography>
      </Card>
    </XStack>
  ),
};
