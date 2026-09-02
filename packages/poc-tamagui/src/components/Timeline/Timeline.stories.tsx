import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, TimelineItem } from './Timeline';
import { Badge } from '../Badge';
import { YStack } from '../Stack';

const meta: Meta<typeof Timeline> = {
  title: 'Common/Timeline',
  component: Timeline,
};

export default meta;

type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: () => (
    <YStack width={380}>
      <Timeline>
        <TimelineItem intent="success" title="Pedido criado" subtitle="Hoje, 10:32" />
        <TimelineItem intent="success" title="Pagamento aprovado" subtitle="Hoje, 10:33" />
        <TimelineItem intent="primary" title="Em separação" subtitle="Hoje, 11:05" />
        <TimelineItem
          intent="neutral"
          variant="outlined"
          title="A caminho"
          subtitle="Previsto para amanhã"
        />
        <TimelineItem intent="neutral" variant="outlined" title="Entregue" />
      </Timeline>
    </YStack>
  ),
};

export const WithContent: Story = {
  render: () => (
    <YStack width={420}>
      <Timeline>
        <TimelineItem intent="error" title="Build falhou" subtitle="12 min atrás">
          <Badge intent="error">exit 1</Badge>
        </TimelineItem>
        <TimelineItem intent="warning" title="Testes instáveis" subtitle="1 h atrás">
          <Badge intent="warning">3 flaky</Badge>
        </TimelineItem>
        <TimelineItem intent="success" title="Deploy em produção" subtitle="ontem" />
      </Timeline>
    </YStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <YStack width={320}>
      <Timeline>
        <TimelineItem size="sm" title="Pequeno" />
        <TimelineItem size="md" title="Médio" />
        <TimelineItem size="lg" title="Grande" />
      </Timeline>
    </YStack>
  ),
};
