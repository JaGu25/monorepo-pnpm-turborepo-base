import { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'No data available',
}: TableProps<T>) {
  if (data.length === 0) {
    return <div className="empty-state">{emptyMessage}</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={keyExtractor(item)}>
            {columns.map((column) => (
              <td key={column.key}>
                {column.render
                  ? column.render(item)
                  : (item as Record<string, unknown>)[column.key]?.toString()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
