import { typesColumn } from './actionTypes'

const {
  ADD_COLUMN,
  ADD_TASK,
  REMOVE_COLUMN,
  REORDER_TASKS,
  REMOVE_TASK,
  UPDATE_COLUMN_TITLE
} = typesColumn

export const addColumn = (column: {}): { type: string; column: {} } => ({
  type: ADD_COLUMN,
  column
})

export const addTaskToColumn = (
  taskId: string | number,
  columnId: string | number
): { type: string; taskId: string; columnId: string } => ({
  type: ADD_TASK,
  taskId,
  columnId
})

export const removeColumn = (
  columnId: string | number
): { type: string; payload: string } => ({
  type: REMOVE_COLUMN,
  payload: columnId
})

export const removeTaskFromColumn = (
  taskId: string | number,
  columnId: string | number
): { type: string; taskId: string; columnId: string } => ({
  type: REMOVE_TASK,
  taskId,
  columnId
})

export const reorderTasks = (columns: []): { type: string; columns: [] } => ({
  type: REORDER_TASKS,
  columns
})

export const updateColumnTitle = (
  columnId: string,
  title: string
): { type: string; columnId: string; title: string } => ({
  type: UPDATE_COLUMN_TITLE,
  columnId,
  title
})
