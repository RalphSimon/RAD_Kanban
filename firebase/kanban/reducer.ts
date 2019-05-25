import {
  LISTEN_FOR_BOARD,
  LISTEN_FOR_COLUMNS,
  LISTEN_FOR_TASKS,
  HANDLE_LOADING_ERROR,
  SET_LOADING,
  UPDATE_COLUMN_ORDER,
  UPDATE_TASK_ORDER
} from './actionTypes'

export const mapToKeys = (collection, item) => {
  return item !== undefined
    ? {
      ...collection,
      [item.id]: item
		  }
    : {}
}

export const reducer = (state, action) => {
  switch (action.type) {
    case LISTEN_FOR_BOARD: {
      return {
        ...state,
        ...action.board
      }
    }
    case LISTEN_FOR_COLUMNS: {
      const asMap = action.columns.reduce(mapToKeys, {})
      return {
        ...state,
        columns: asMap
      }
    }
    case LISTEN_FOR_TASKS: {
      return {
        ...state,
        tasks: action.tasks.reduce(mapToKeys, {})
      }
    }
    case HANDLE_LOADING_ERROR: {
      return {
        ...state,
        error: action.error
      }
    }
    case SET_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading
      }
    }
    case UPDATE_COLUMN_ORDER: {
      return {
        ...state,
        order: action.order
      }
    }
    case UPDATE_TASK_ORDER: {
      return {
        ...state,
        columns: action.columns
      }
    }
    default:
      return state
  }
}