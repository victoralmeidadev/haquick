import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

type Row = { name: string; role: string; status: string };

const data: Row[] = [
  { name: 'Ana', role: 'Engenheira', status: 'Ativo' },
  { name: 'Bruno', role: 'Designer', status: 'Ativo' },
  { name: 'Carla', role: 'PM', status: 'Férias' },
];

// Story só existe no Storybook web porque o Table.web.tsx é implementação
// exclusiva de web (ver Table.native.tsx para a versão mobile). Fica sob
// "Web Only" para deixar claro, na sidebar, que esse componente não existe
// (com essa implementação) no app mobile.
const meta: Meta<typeof Table<Row>> = {
  title: 'Web Only/Table',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table<Row>>;

export const Default: Story = {
  args: {
    data,
    columns: [
      { key: 'name', header: 'Nome' },
      { key: 'role', header: 'Cargo' },
      { key: 'status', header: 'Status' },
    ],
  },
};
