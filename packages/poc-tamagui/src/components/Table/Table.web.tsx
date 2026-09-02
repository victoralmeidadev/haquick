// Implementação exclusiva de web: uma <table> HTML real, com hover/zebra.
// Não existe equivalente nativo decente para uma grid densa como essa, então
// esse componente só é exportado no entry point de web.
import type { TableProps } from './types';

export function Table<T extends Record<string, unknown>>({ data, columns }: TableProps<T>) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'system-ui' }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              style={{
                textAlign: 'left',
                padding: '8px 12px',
                borderBottom: '2px solid #E4E4E7',
                width: col.width,
              }}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : '#FAFAFA' }}>
            {columns.map((col) => (
              <td
                key={String(col.key)}
                style={{ padding: '8px 12px', borderBottom: '1px solid #EDEDEF' }}
              >
                {String(row[col.key] ?? '')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
