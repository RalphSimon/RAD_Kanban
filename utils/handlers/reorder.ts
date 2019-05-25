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

export const reorderBetween = (
  collection: [],
  startIndex: number,
  endIndex: number,
  finish: []
): { start: []; finish: [] } | [] => {
  const start = Array.from(collection)
  const [move] = start.splice(startIndex, 1)

  if (finish) {
    const dest = Array.from(finish)
    dest.splice(endIndex, 0, move)
    return {
      start,
      finish: dest
    }
  }
  start.splice(endIndex, 0, move)
  return start
}

export const reorderItems = (collection: [], dragResult: {}): [] => {
  const { destination, source } = dragResult

  /* When a task has moved outside of the board */
  if (!destination) return collection

  /* When a task hasn't moved at all */
  if (
    destination.droppableId === source.droppableId &&
		destination.index === source.index
  )
    return collection

  /* Determine start and finish column */
  const [start] = collection.filter(item => item.id === source.droppableId)
  const [finish] = collection.filter(
    item => item.id === destination.droppableId
  )

  /*
    If the task has not moved from one column to the next,
    reorder in place
  */
  if (destination.droppableId === source.droppableId) {
    const updatedTaskOrder = reorderBetween(
      start.taskIds,
      source.index,
      destination.index
    )
    console.log(updatedTaskOrder)

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

  const newOrders = reorderBetween(
    start.taskIds,
    source.index,
    destination.index,
    finish.taskIds
  )

  const newCollection = produce(collection, draft => {
    draft[collection.indexOf(start)].taskIds = newOrders.start
    draft[collection.indexOf(finish)].taskIds = newOrders.finish
  })

  return newCollection
}

/* Used when the collection received has the shape of an object */
export const reorderTaskMap = (collection: {}, dragResult: {}): [] => {
  const { destination, source } = dragResult

  /* When a task has moved outside of the board */
  if (!destination) return collection

  /* When a task hasn't moved at all */
  if (
    destination.droppableId === source.droppableId &&
		destination.index === source.index
  )
    return collection

  /* Determine start and finish columns */
  const start = collection[source.droppableId]
  const finish = collection[destination.droppableId]

  if (destination.droppableId === source.droppableId) {
    const updatedTaskOrder = reorder(
      start.taskIds,
      source.index,
      destination.index
    )

    return {
      ...collection,
      [source.droppableId]: {
        ...start,
        taskIds: [...updatedTaskOrder]
      }
    }
  }

  const newOrders = reorderBetween(
    start.taskIds,
    source.index,
    destination.index,
    finish.taskIds
  )

  return {
    ...collection,
    [source.droppableId]: {
      ...start,
      taskIds: newOrders.start
    },
    [destination.droppableId]: {
      ...finish,
      taskIds: newOrders.finish
    }
  }
}
