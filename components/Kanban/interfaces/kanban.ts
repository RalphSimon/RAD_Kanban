export interface Column {
  id: string;
  title?: string;
  taskIds: string[];
}

export interface Board {
  id: string;
  title?: string;
  columns: {};
  order: string[];
}
