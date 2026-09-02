import type { Meta, StoryObj } from '@storybook/react';
import { Badge, DataTable, YStack } from '../index';
import type { ColumnDef } from '../index';

const meta: Meta = {
  title: 'Componentes/DataTable',
};

export default meta;

type Story = StoryObj;

type Order = { id: string; customer: string; status: 'pago' | 'pendente'; total: string };

const ORDERS: Order[] = [
  { id: 'PED-1042', customer: 'Ana Silva', status: 'pago', total: 'R$ 1.280,50' },
  { id: 'PED-1041', customer: 'Bruno Costa', status: 'pendente', total: 'R$ 340,00' },
  { id: 'PED-1040', customer: 'Carla Nunes', status: 'pago', total: 'R$ 89,90' },
  { id: 'PED-1039', customer: 'Diego Alves', status: 'pago', total: 'R$ 2.450,00' },
  { id: 'PED-1038', customer: 'Elisa Prado', status: 'pendente', total: 'R$ 615,25' },
];

const COLUMNS: ColumnDef<Order>[] = [
  { accessorKey: 'id', header: 'Pedido' },
  { accessorKey: 'customer', header: 'Cliente' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const s = getValue<Order['status']>();
      return <Badge intent={s === 'pago' ? 'success' : 'warning'}>{s}</Badge>;
    },
  },
  { accessorKey: 'total', header: 'Total' },
];

export const Full: Story = {
  render: () => (
    <YStack width={760}>
      <DataTable
        label="Pedidos"
        data={ORDERS}
        columns={COLUMNS}
        sortable
        filterable
        selectable
        pageSize={4}
      />
    </YStack>
  ),
};

export const Empty: Story = {
  render: () => (
    <YStack width={760}>
      <DataTable label="Pedidos" data={[]} columns={COLUMNS} filterable />
    </YStack>
  ),
};
