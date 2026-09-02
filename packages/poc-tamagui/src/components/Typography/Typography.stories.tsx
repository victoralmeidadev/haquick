import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Common/Typography',
  component: Typography,
  args: { children: 'The quick brown fox' },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'overline',
      ],
    },
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'neutral'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Playground: Story = { args: { variant: 'h4' } };

export const Scale: Story = {
  render: () => (
    <>
      <Typography variant="h1">h1. Cross UI</Typography>
      <Typography variant="h2">h2. Cross UI</Typography>
      <Typography variant="h3">h3. Cross UI</Typography>
      <Typography variant="h4">h4. Cross UI</Typography>
      <Typography variant="h5">h5. Cross UI</Typography>
      <Typography variant="h6">h6. Cross UI</Typography>
      <Typography variant="subtitle1">subtitle1. Cross UI</Typography>
      <Typography variant="subtitle2">subtitle2. Cross UI</Typography>
      <Typography variant="body1">body1. Cross UI</Typography>
      <Typography variant="body2">body2. Cross UI</Typography>
      <Typography variant="caption">caption. Cross UI</Typography>
      <Typography variant="overline">overline. Cross UI</Typography>
    </>
  ),
};
