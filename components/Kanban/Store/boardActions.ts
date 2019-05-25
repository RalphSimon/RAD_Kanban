import { typesBoard } from './actionTypes'
const {
  ADD_COLUMN,
  REMOVE_COLUMN,
  REORDER_COLUMNS,
  UPDATE_BOARD_TITLE
} = typesBoard

export const addColumnToBoard = (
  columnId: string
): { type: string; payload: string } => ({
  type: ADD_COLUMN,
  payload: columnId
})

export const removeColumnFromBoard = (
  columnId: string
): { type: string; payload: string } => ({
  type: REMOVE_COLUMN,
  payload: columnId
})

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
  title: string
): { type: string; payload: string } => ({
  type: UPDATE_BOARD_TITLE,
  payload: title
})
