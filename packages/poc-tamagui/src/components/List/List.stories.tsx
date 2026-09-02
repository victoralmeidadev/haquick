import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';
import { ListItem } from './ListItem';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';

const meta: Meta<typeof List> = {
  title: 'Common/List',
  component: List,
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: () => (
    <List width={320}>
      <ListItem
        title="Ana Silva"
        subtitle="ana@empresa.com"
        leading={<Avatar size="sm" initials="AS" />}
        trailing={<Badge intent="success">Ativo</Badge>}
      />
      <ListItem
        title="Bruno Costa"
        subtitle="bruno@empresa.com"
        leading={<Avatar size="sm" initials="BC" />}
        trailing={<Badge intent="warning">Pendente</Badge>}
      />
      <ListItem
        title="Carla Nunes"
        subtitle="carla@empresa.com"
        leading={<Avatar size="sm" initials="CN" />}
        trailing={<Badge intent="neutral">Férias</Badge>}
      />
    </List>
  ),
};
