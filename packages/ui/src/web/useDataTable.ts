import { useMemo, useState, type ReactNode } from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
  type Table,
} from '@tanstack/react-table';

export type { ColumnDef };

export type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  /** Ordenação ao clicar no cabeçalho. */
  sortable?: boolean;
  /** Campo de busca que filtra todas as colunas. */
  filterable?: boolean;
  filterPlaceholder?: string;
  /** Quantidade de linhas por página. Sem isto, renderiza tudo. */
  pageSize?: number;
  /** Caixa de seleção por linha. */
  selectable?: boolean;
  onSelectionChange?: (rows: T[]) => void;
  onRowPress?: (row: T) => void;
  /** Densidade. */
  size?: 'sm' | 'md';
  /** Mantém o cabeçalho visível durante a rolagem. */
  stickyHeader?: boolean;
  /** O que mostrar quando não há linha alguma. */
  empty?: ReactNode;
  /** Rótulo acessível da tabela. */
  label?: string;
};

export type DataTableState<T> = {
  table: Table<T>;
  filter: string;
  setFilter: (value: string) => void;
  /** Verdadeiro quando não há linhas *depois* do filtro. */
  isEmpty: boolean;
  /** Verdadeiro quando o vazio veio de um filtro, não de dados ausentes. */
  isFiltered: boolean;
};

/**
 * Monta a instância do TanStack a partir das props do DataTable.
 *
 * Os row models entram condicionalmente: incluir `getSortedRowModel` sem
 * precisar de ordenação faz o TanStack percorrer as linhas à toa.
 */
export function useDataTable<T>({
  data,
  columns,
  sortable,
  filterable,
  pageSize,
  selectable,
  onSelectionChange,
}: DataTableProps<T>): DataTableState<T> {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filter, setFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable<T>({
    data,
    columns,
    state: {
      ...(sortable ? { sorting } : null),
      ...(filterable ? { globalFilter: filter } : null),
      ...(selectable ? { rowSelection } : null),
    },
    ...(sortable ? { onSortingChange: setSorting } : null),
    ...(filterable ? { onGlobalFilterChange: setFilter } : null),
    ...(selectable
      ? {
          enableRowSelection: true,
          onRowSelectionChange: (updater) => {
            const next = typeof updater === 'function' ? updater(rowSelection) : updater;
            setRowSelection(next);
            onSelectionChange?.(
              table.getCoreRowModel().rows.filter((r) => next[r.id]).map((r) => r.original)
            );
          },
        }
      : null),
    getCoreRowModel: getCoreRowModel(),
    ...(sortable ? { getSortedRowModel: getSortedRowModel() } : null),
    ...(filterable ? { getFilteredRowModel: getFilteredRowModel() } : null),
    ...(pageSize
      ? {
          getPaginationRowModel: getPaginationRowModel(),
          initialState: { pagination: { pageSize, pageIndex: 0 } },
        }
      : null),
  });

  const rows = table.getRowModel().rows;

  return useMemo(
    () => ({
      table,
      filter,
      setFilter,
      isEmpty: rows.length === 0,
      isFiltered: filter.trim().length > 0,
    }),
    [table, filter, rows.length]
  );
}

/** Rótulo de acessibilidade do cabeçalho ordenável, nos dois lados. */
export function sortLabel(title: string, direction: false | 'asc' | 'desc'): string {
  if (direction === 'asc') return `${title}, ordenado crescente`;
  if (direction === 'desc') return `${title}, ordenado decrescente`;
  return `${title}, ordenar`;
}
