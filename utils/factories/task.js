export function Task(columnId) {
  return {
    title: 'Add a title...',
    note: '',
    createdOn: Date.now(),
    columnId
  }
}
