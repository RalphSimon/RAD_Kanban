import db from '../../../mock_api/public/db.json'
import { typesKanban } from '../state'

const { REMOVE_COLUMN } = typesKanban
const board = db.boards[0]

const secondBoard = {
  ...board,
  columns: {
    [board.columns['column-1'].id]: board.columns['column-1'],
    [board.columns['column-2'].id]: board.columns['column-2']
  },
  order: [board.columns['column-1'].id, board.columns['column-2'].id]
}

export const CASE_REMOVE_COLUMN = {
  'remove 1 column from initial state': {
    init: board,
    columnToRemove: 'column-3',
    output: {
      type: REMOVE_COLUMN,
      payload: secondBoard
    }
  },
  'remove a 2nd column from previous state': {
    init: secondBoard,
    columnToRemove: 'column-1',
    output: {
      type: REMOVE_COLUMN,
      payload: {
        ...board,
        columns: {
          [board.columns['column-2'].id]: board.columns['column-2']
        },
        order: [board.columns['column-2'].id]
      }
    }
  }
}
