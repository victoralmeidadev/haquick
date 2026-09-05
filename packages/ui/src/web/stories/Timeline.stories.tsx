import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, TimelineItem, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Timeline',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  decorators: [
    (Story) => (
      <YStack width={360}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <Timeline>
      <TimelineItem intent="success" title="Pedido criado" subtitle="10:32" />
      <TimelineItem intent="primary" title="Em separação" subtitle="11:05" />
      <TimelineItem intent="neutral" variant="outlined" title="A caminho" subtitle="previsto 14:00" />
    </Timeline>
  ),
};
