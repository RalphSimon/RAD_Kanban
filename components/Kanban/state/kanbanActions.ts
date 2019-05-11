import { typesKanban } from './actionTypes'

const {
  ADD_COLUMN,
  ADD_TO_COLUMN,
  MOVE_TASK,
  REMOVE_COLUMN,
  REMOVE_FROM_COLUMN,
  REORDER_COLUMNS,
  REORDER_TASKS,
  UPDATE_BOARD_TITLE,
  UPDATE_COLUMN_TITLE
} = typesKanban

/* Operates on board.columns */
export const reorderTasks = (
  columns: {},
  result: {}
): { type: string; payload: {} } => {
  const { source, destination, draggableId } = result
  const column = columns[source.droppableId]

  const copyIds = Array.from(column.taskIds)

  copyIds.splice(source.index, 1)
  copyIds.splice(destination.index, 0, draggableId)

  const newColumn = {
    ...column,
    taskIds: copyIds
  }

  return {
    type: REORDER_TASKS,
    payload: {
      [newColumn.id]: newColumn
    }
  }
}

/* Operates on board.columns */
export const moveTask = (
  columns: {},
  result: {}
): { type: string; payload: {} } => {
  const { source, destination, draggableId } = result
  const start = columns[source.droppableId]
  const finish = columns[destination.droppableId]

  const startTaskIds = Array.from(start.taskIds)
  startTaskIds.splice(source.index, 1)

  const newStartColumn = {
    ...start,
    taskIds: startTaskIds
  }

  const finishedTaskIds = Array.from(finish.taskIds)
  finishedTaskIds.splice(destination.index, 0, draggableId)

  const newFinishColumn = {
    ...finish,
    taskIds: finishedTaskIds
  }

  return {
    type: MOVE_TASK,
    payload: {
      ...columns,
      [newStartColumn.id]: newStartColumn,
      [newFinishColumn.id]: newFinishColumn
    }
  }
}

/* Handles logig for dragging tasks */
export const handleDragEndAction = (
  columns: {},
  result: {}
): { type: string; payload: {} } => {
  const { destination, source } = result

  if (!destination) return columns

  if (
    destination.droppableId === source.droppableId &&
		destination.index === source.index
  )
    return columns

  const start = columns[source.droppableId]
  const finish = columns[destination.droppableId]

  if (start === finish) {
    console.log('reorderTasks')
    return reorderTasks(columns, result)
  }

  return moveTask(columns, result)
}

/* Operates on board.order */
export const reorderColumns = (
  order: string[],
  result: {}
): { type: string; payload: string[] } => {
  const { source, destination, draggableId } = result

  const newColumnOrder = Array.from(order)
  newColumnOrder.splice(source.index, 1)
  newColumnOrder.splice(destination.index, 0, draggableId)

  return {
    type: REORDER_COLUMNS,
    payload: newColumnOrder
  }
}

/* Operates on board */
export const addColumn = (
  board: {},
  column: {}
): { type: string; payload: {} } => {
  return {
    type: ADD_COLUMN,
    payload: {
      ...board,
      columns: {
        ...board.columns,
        [column.id]: column
      },
      order: [...board.order, column.id]
    }
  }
}

/* Operates on board */
export const removeColumn = (
  board: {},
  columnId: string | number
): { type: string; payload: {} } => {
  const newOrder = board.order.filter(id => id !== columnId)
  const newColumns = board.columns

  delete newColumns[columnId]

  return {
    type: REMOVE_COLUMN,
    payload: {
      ...board,
      columns: newColumns,
      order: newOrder
    }
  }
}

/* Operates on board.column[id] */
export const addToColumn = (
  column: {},
  taskId: string | number
): { type: string; payload: {} } => {
  const newTaskIds = Array.from(column.taskIds)

  newTaskIds.splice(0, 0, taskId)

  return {
    type: ADD_TO_COLUMN,
    payload: {
      ...column,
      taskIds: newTaskIds
    }
  }
}

/* Operates on board.column[id].taskIds */
export const removeFromColumn = (
  column: {},
  taskId: string | number
): { type: string; payload: {} } => {
  return {
    type: REMOVE_FROM_COLUMN,
    payload: {
      ...column,
      taskIds: column.taskIds.filter(id => id !== taskId)
    }
  }
}

/* Operates on board.title */
export const updateBoardTitle = (
  title: string
): { type: string; payload: string } => {
  return {
    type: UPDATE_BOARD_TITLE,
    payload: title
  }
}

export const updateColumnTitle = (
  columnId: string,
  title: string
): { type: string; columnId: string; title: string } => ({
  type: UPDATE_COLUMN_TITLE,
  columnId,
  title
})
