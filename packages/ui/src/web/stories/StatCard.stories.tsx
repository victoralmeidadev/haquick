import type { Meta, StoryObj } from '@storybook/react';
import { StatCard, XStack } from '../index';

const meta: Meta = {
  title: 'Componentes/StatCard',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  decorators: [
    (Story) => (
      <XStack gap={3} wrap>
        <Story />
      </XStack>
    ),
  ],
  render: () => (
    <>
      <StatCard label="Receita" value="R$ 128k" hint="+12% vs. mês anterior" intent="success" />
      <StatCard label="Pedidos" value="1.284" hint="+3%" />
      <StatCard label="Cancelamentos" value="37" hint="+8%" intent="error" />
    </>
  ),
};
