export function Task(columnId, boardId) {
  return {
    title: 'Add a title...',
    note: '',
    completed: false,
    columnId,
    boardId
  }
}
