import {
  LISTEN_FOR_BOARD,
  LISTEN_FOR_COLUMNS,
  LISTEN_FOR_TASKS,
  HANDLE_LOADING_ERROR,
  SET_LOADING,
  SET_ORIGIN,
  UPDATE_COLUMN_ORDER,
  UPDATE_TASK_ORDER,
  UPDATE_BOARD_FIELD,
  UPDATE_COLUMN_FIELD,
  REMOVE_TASK
} from './actionTypes'

export const listenForBoard = payload => ({
  type: LISTEN_FOR_BOARD,
  board: payload
})

export const listenForColumns = payload => ({
  type: LISTEN_FOR_COLUMNS,
  columns: payload
})

export const listenForTasks = payload => ({
  type: LISTEN_FOR_TASKS,
  tasks: payload
})

export const handleLoadingError = payload => ({
  type: HANDLE_LOADING_ERROR,
  error: payload
})

export const removeTask = payload => ({
  type: REMOVE_TASK,
  columnId: payload.columnId,
  taskIds: payload.taskIds
})

export const setLoading = payload => ({
  type: SET_LOADING,
  isLoading: payload
})

export const setOrigin = payload => ({
  type: SET_ORIGIN,
  origin: payload
})

export const updateColumnOrder = payload => ({
  type: UPDATE_COLUMN_ORDER,
  order: payload
})

export const updateBoardField = ({ field, value }) => ({
  type: UPDATE_BOARD_FIELD,
  field,
  value
})

export const updateColumnField = ({ id, field, value }) => ({
  type: UPDATE_COLUMN_FIELD,
  id,
  field,
  value
})

export const updateTaskOrder = payload => ({
  type: UPDATE_TASK_ORDER,
  columns: payload
})
