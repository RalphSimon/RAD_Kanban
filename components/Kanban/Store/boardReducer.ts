import { typesBoard } from './actionTypes'
import { LISTEN_FOR_DOCUMENT, LISTEN_FOR_COLLECTION } from '../../../firebase'

const {
  ADD_COLUMN,
  REMOVE_COLUMN,
  REORDER_COLUMNS,
  UPDATE_BOARD_TITLE
} = typesBoard

export const boardReducer = (state: {}, action: {}): {} => {
  switch (action.type) {
    case LISTEN_FOR_COLLECTION: {
      const [board] = action.payload
      return board
    }
    case LISTEN_FOR_DOCUMENT: {
      const board = action.payload
      return {
        ...board,
        order: board.order ? board.order : []
      }
    }
    case ADD_COLUMN: {
      return {
        ...state,
        order: action.payload
      }
    }
    case REMOVE_COLUMN: {
      return {
        ...state,
        order: action.payload
      }
    }
    case REORDER_COLUMNS: {
      return {
        ...state,
        order: action.payload
      }
    }
    case UPDATE_BOARD_TITLE: {
      return {
        ...state,
        title: action.payload
      }
    }
    default:
      return state
  }
}
