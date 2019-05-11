import { typesKanban } from './actionTypes'

const {
  ADD_COLUMN,
  ADD_TO_COLUMN,
  MOVE_TASK,
  REMOVE_COLUMN,
  REORDER_COLUMNS,
  REORDER_TASKS,
  REMOVE_FROM_COLUMN,
  UPDATE_BOARD_TITLE,
  UPDATE_COLUMN_TITLE
} = typesKanban

export const kanbanReducer = (state, action) => {
  switch (action.type) {
    case ADD_COLUMN:
      return action.payload
    case ADD_TO_COLUMN:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.id]: action.payload
        }
      }
    case MOVE_TASK:
      return {
        ...state,
        columns: action.payload
      }
    case REMOVE_COLUMN:
      return action.payload
    case REORDER_COLUMNS:
      return {
        ...state,
        order: action.payload
      }
    case REORDER_TASKS:
      return {
        ...state,
        columns: {
          ...state.columns,
          ...action.payload
        }
      }
    case REMOVE_FROM_COLUMN:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.id]: action.payload
        }
      }
    case UPDATE_BOARD_TITLE:
      const someState = {
        ...state,
        title: action.payload
      }
      console.log(someState)
      return someState
    case UPDATE_COLUMN_TITLE:
      const column = state.columns[action.columnId]
      const updatedColumn = {
        ...column,
        title: action.title
      }
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [action.columnId]: updatedColumn
        }
      }

      return newState
    default:
      return state
  }
}
