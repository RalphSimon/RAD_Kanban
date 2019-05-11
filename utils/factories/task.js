import nanoid from 'nanoid'

export function Task(columnId) {
  return {
    id: nanoid(),
    title: 'Add a title...',
    body: '',
    createdOn: Date.now(),
    columnId
  }
}
