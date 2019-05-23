import { typesBoard } from './actionTypes'
import { updateDoc } from '../../../firebase'

const {
  ADD_COLUMN,
  REMOVE_COLUMN,
  REORDER_COLUMNS,
  UPDATE_BOARD_TITLE
} = typesBoard

export const addColumnToBoard = (
  ref: {},
  order: []
): { type: string; payload: string } => {
  updateDoc(ref, { order })

  return {
    type: ADD_COLUMN,
    payload: order
  }
}

export const removeColumnFromBoard = (
  ref: {},
  columnId: string,
  order: []
): { type: string; payload: string[] } => {
  const newColumnOrder = order.filter(id => id !== columnId)

  updateDoc(ref, { order: newColumnOrder })

  return {
    type: REMOVE_COLUMN,
    payload: newColumnOrder
  }
}

export const reorderColumns = (
  order: []
): {
  type: string;
  payload: [];
} => ({
  type: REORDER_COLUMNS,
  payload: order
})

export const updateBoardTitle = (
  ref: {},
  title: string
): { type: string; payload: string } => {
  updateDoc(ref, { title })

  return {
    type: UPDATE_BOARD_TITLE,
    payload: title
  }
}
