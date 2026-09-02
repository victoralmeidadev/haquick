import type { Meta, StoryObj } from '@storybook/react';
import { Button, EmptyState, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/EmptyState',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <YStack width={480}>
      <EmptyState
        icon="🔍"
        intent="primary"
        title="Nenhum resultado"
        description="Tente outro termo de busca ou limpe os filtros."
        action={<Button>Limpar filtros</Button>}
      />
    </YStack>
  ),
};
