import nanoid from 'nanoid'

export function Column(columnId, boardId) {
  return {
    id: nanoid(),
    title: 'Add a title...',
    taskIds: [],
    createdOn: Date.now(),
    boardId
  }
}
