import type { Meta, StoryObj } from '@storybook/react';
import { Button, Tooltip, XStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Tooltip',
};

export default meta;

type Story = StoryObj;

export const Placements: Story = {
  render: () => (
    <XStack gap={3} wrap align="center">
      {(['top','bottom','left','right'] as const).map((placement) => (
        <Tooltip key={placement} label={'Aparece a ' + placement} placement={placement}>
          <Button variant="outline" intent="neutral">{placement}</Button>
        </Tooltip>
      ))}
    </XStack>
  ),
};
