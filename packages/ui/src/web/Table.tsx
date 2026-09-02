import { flexRender } from '@tanstack/react-table';
import { applyTheme } from './theme';
import { useDataTable, sortLabel, type DataTableProps } from './useDataTable';
import { Input } from './controls';
import { Typography } from './primitives';
import './components.css';

export function DataTable<T>(props: DataTableProps<T>) {
  applyTheme();

  const {
    sortable,
    filterable,
    filterPlaceholder = 'Buscar...',
    pageSize,
    selectable,
    onRowPress,
    size = 'md',
    stickyHeader,
    empty,
    label,
  } = props;

  const { table, filter, setFilter, isEmpty, isFiltered } = useDataTable(props);
  const columnCount = table.getAllLeafColumns().length + (selectable ? 1 : 0);

  return (
    <div className="haquick-table-wrap" data-size={size}>
      {filterable ? (
        <div className="haquick-table-toolbar">
          <Input value={filter} onChangeText={setFilter} placeholder={filterPlaceholder} label="Buscar na tabela" />
        </div>
      ) : null}

      <div className="haquick-table-scroll" data-sticky={stickyHeader ? 'true' : undefined}>
        <table className="haquick-table" aria-label={label}>
          <thead>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {selectable ? (
                  <th scope="col" className="haquick-table-check">
                    <input
                      type="checkbox"
                      aria-label="Selecionar todas as linhas"
                      checked={table.getIsAllRowsSelected()}
                      ref={(el) => {
                        if (el) el.indeterminate = table.getIsSomeRowsSelected();
                      }}
                      onChange={table.getToggleAllRowsSelectedHandler()}
                    />
                  </th>
                ) : null}

                {group.headers.map((header) => {
                  const canSort = sortable && header.column.getCanSort();
                  const direction = header.column.getIsSorted();
                  const title = String(header.column.columnDef.header ?? header.id);

                  return (
                    <th
                      key={header.id}
                      scope="col"
                      style={{ width: header.getSize() === 150 ? undefined : header.getSize() }}
                      aria-sort={
                        !canSort ? undefined : direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : 'none'
                      }
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          className="haquick-table-sort"
                          aria-label={sortLabel(title, direction)}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <span aria-hidden="true" className="haquick-table-arrow" data-dir={direction || 'none'}>
                            {direction === 'desc' ? '↓' : '↑'}
                          </span>
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {isEmpty ? (
              <tr>
                <td colSpan={columnCount} className="haquick-table-empty">
                  {empty ?? (
                    <Typography variant="body2" intent="neutral" align="center">
                      {isFiltered ? 'Nenhum resultado para essa busca.' : 'Nada por aqui ainda.'}
                    </Typography>
                  )}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-selected={row.getIsSelected() ? 'true' : undefined}
                  data-clickable={onRowPress ? 'true' : undefined}
                  onClick={onRowPress ? () => onRowPress(row.original) : undefined}
                >
                  {selectable ? (
                    <td className="haquick-table-check">
                      <input
                        type="checkbox"
                        aria-label="Selecionar linha"
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        onClick={(e) => e.stopPropagation()}
                        onChange={row.getToggleSelectedHandler()}
                      />
                    </td>
                  ) : null}

                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pageSize ? (
        <div className="haquick-table-pager">
          <Typography variant="caption" intent="neutral">
            {`Página ${table.getState().pagination.pageIndex + 1} de ${Math.max(table.getPageCount(), 1)}`}
          </Typography>
          <div className="haquick-table-pager-buttons">
            <button
              type="button"
              className="haquick-table-page"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </button>
            <button
              type="button"
              className="haquick-table-page"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Próxima
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
