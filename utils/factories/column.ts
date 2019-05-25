interface Column {
  title: string;
  taskIds: [];
  boardId: string;
}

export function Column(boardId: string): Column {
  return {
    title: 'Add a title...',
    taskIds: [],
    boardId
  }
}
