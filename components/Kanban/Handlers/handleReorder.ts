import produce from 'immer'

/*
  EventHandler:
  Determine whether to reorder a column's tasks in place
  or move a task from one column to the next

  Cheating:
  https://github.com/atlassian/react-beautiful-dnd/blob/master/stories/src/reorder.js
*/

export const reorder = (
  collection: [],
  startIndex: number,
  endIndex: number
): [] => {
  const result = Array.from(collection)
  const [move] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, move)

  return result
}

export const reorderTasks = (collection: [], dragResult: {}): [] => {
  const { destination, source } = dragResult
  const [start] = collection.filter(item => item.id === source.droppableId)
  const [finish] = collection.filter(
    item => item.id === destination.droppableId
  )
  const target = start.taskIds[source.index]

  /* When a task has moved outside of the board */
  if (!destination) return collection

  /* When a task hasn't moved at all */
  if (
    destination.droppableId === source.droppableId &&
		destination.index === source.index
  )
    return collection

  /*
    If the task has not moved from one column to the next,
    reorder in place
  */
  if (destination.droppableId === source.droppableId) {
    const updatedTaskOrder = reorder(
      start.taskIds,
      source.index,
      destination.index
    )

    const newCollection = produce(collection, draft => {
      draft[collection.indexOf(start)].taskIds = updatedTaskOrder
    })

    return newCollection
  }

  /*
    When the task has moved from one column to another:
    - remove from source list
    - add to destination list
  */

  const startTaskIds = Array.from(start.taskIds)
  startTaskIds.splice(source.index, 1)

  const finishedTaskIds = Array.from(finish.taskIds)
  finishedTaskIds.splice(destination.index, 0, target)

  const newCollection = produce(collection, draft => {
    draft[collection.indexOf(start)].taskIds = startTaskIds
    draft[collection.indexOf(finish)].taskIds = finishedTaskIds
  })

  return newCollection
}
