import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Badge, List, ListItem } from '../index';

const meta: Meta = {
  title: 'Componentes/List',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <List width={380}>
      <ListItem
        title="Ana Silva"
        subtitle="ana@empresa.com"
        leading={<Avatar size="sm" initials="AS" />}
        trailing={<Badge intent="success">Ativo</Badge>}
      />
      <ListItem
        title="Bruno Costa"
        subtitle="bruno@empresa.com"
        leading={<Avatar size="sm" initials="BC" intent="secondary" />}
        trailing={<Badge intent="warning">Pendente</Badge>}
      />
    </List>
  ),
};

export const Clickable: Story = {
  render: () => (
    <List width={380}>
      <ListItem title="Abre alguma coisa" subtitle="vira um button" onPress={() => {}} />
      <ListItem title="Só leitura" subtitle="fica como div" />
    </List>
  ),
};
