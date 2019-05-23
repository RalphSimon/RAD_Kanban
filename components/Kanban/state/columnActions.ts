import produce from 'immer'

import { typesColumn } from './actionTypes'
import {
  addDoc,
  deleteDoc,
  updateDoc,
  updateMultipleDocs
} from '../../../firebase'
import { updateArray } from '../../../utils'

const {
  ADD_COLUMN,
  ADD_TASK,
  MOVE_TASK, // run from transaction
  REMOVE_COLUMN,
  REORDER_TASKS, // run from transaction
  REMOVE_TASK,
  UPDATE_COLUMN_TITLE
} = typesColumn

interface DragHandler {
  db: {};
  boardId: string;
  columns: [];
  result: {};
}

export const addColumn = (
  ref: {},
  column: {}
): { type: string; payload: {} } => {
  addDoc(ref, column)

  return {
    type: ADD_COLUMN,
    payload: column
  }
}

export const reorderTasks = ({
  db,
  boardId,
  columns,
  dragResult
}: DragHandler): { type: string; payload: {} } => {
  const { source, destination, draggableId } = dragResult
  const [column] = columns.filter(column => column.id === source.droppableId)
  const copyColumns = columns.filter(column => column.id !== source.droppableId)

  const copyIds = Array.from(column.taskIds)
  console.log('ORIGINAL', {
    copyIds: column.taskIds,
    dragResult
  })
  copyIds.splice(source.index, 1)
  copyIds.splice(destination.index, 0, draggableId)
  console.log('UPDATED: ', {
    copyIds,
    dragResult
  })
  const newColumn = {
    ...column,
    taskIds: copyIds
  }

  copyColumns.splice(columns.indexOf(column), 0, newColumn)

  // const columnRef = db.doc(`BOARDS/${boardId}/COLUMNS/${source.droppableId}`)

  // updateDoc(columnRef, newColumn)

  return {
    type: REORDER_TASKS,
    payload: copyColumns
  }
}

/* Operates on board.columns */
export const moveTask = ({
  db,
  boardId,
  columns,
  dragResult
}: DragHandler): { type: string; payload: {} } => {
  const { source, destination, draggableId } = dragResult
  const [start] = columns.filter(column => column.id === source.droppableId)
  const [finish] = columns.filter(
    column => column.id === destination.droppableId
  )

  const copyColumns = Array.from(columns)

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

  copyColumns.splice(columns.indexOf(start), 1, newStartColumn)
  copyColumns.splice(columns.indexOf(finish), 1, newFinishColumn)

  // updateMultipleDocs(db, `BOARDS/${boardId}/COLUMNS`, copyColumns)

  return {
    type: MOVE_TASK,
    payload: copyColumns
  }
}

/*
  EventHandler:
  Determine whether to reorder a column's tasks in place
  or move a task from one column to the next */
export const handleDragEndAction = ({
  db,
  boardId,
  columns,
  dragResult
}: DragHandler): { type: string; payload: {} } => {
  const { destination, source, draggableId } = dragResult

  if (!destination) return columns

  if (
    destination.droppableId === source.droppableId &&
		destination.index === source.index
  )
    return columns

  const [start] = columns.filter(column => column.id === source.droppableId)
  const [finish] = columns.filter(
    column => column.id === destination.droppableId
  )

  if (start === finish) {
    // console.log('Index of start: ', columns.indexOf(start))
    // return reorderTasks({ db, boardId, columns, dragResult })
    console.log('before', start.taskIds)
    const updatedColumn = produce(start, draft => {
      draft.taskIds[source.index] = draft.taskIds[destination.index]
      draft.taskIds[destination.index] = draggableId
    })
    console.log('after', updatedColumn.taskIds)
    return {
      type: REORDER_TASKS,
      payload: produce(columns, draft => {
        draft[columns.indexOf(start)] = updatedColumn
      })
    }
  }

  return moveTask({ db, boardId, columns, dragResult })
}

/* Operates on board */
export const removeColumn = (
  ref: {},
  columnId: string | number
): { type: string; payload: string } => {
  deleteDoc(ref)

  return {
    type: REMOVE_COLUMN,
    payload: columnId
  }
}

/* Operates on board.column[id] */
export const addTaskToColumn = (
  ref: {},
  column: {},
  taskId: string | number
): { type: string; payload: {} } => {
  const newTaskIds = Array.from(column.taskIds ? column.taskIds : [])

  newTaskIds.splice(0, 0, taskId)

  updateDoc(ref, { taskIds: newTaskIds })

  return {
    type: ADD_TASK,
    payload: {
      ...column,
      taskIds: newTaskIds
    }
  }
}

/* Operates on board.column[id].taskIds */
export const removeTaskFromColumn = (
  column: {},
  taskId: string | number
): { type: string; payload: {} } => {
  return {
    type: REMOVE_TASK,
    payload: {
      ...column,
      taskIds: column.taskIds.filter(id => id !== taskId)
    }
  }
}

export const updateColumnTitle = (
  ref: {},
  columnId: string,
  title: string
): { type: string; columnId: string; title: string } => {
  updateDoc(ref, { title })
  return {
    type: UPDATE_COLUMN_TITLE,
    id: columnId,
    title
  }
}
