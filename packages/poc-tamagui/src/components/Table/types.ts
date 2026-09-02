export type TableColumn<T> = {
  key: keyof T;
  header: string;
  width?: number;
};

export type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
};
