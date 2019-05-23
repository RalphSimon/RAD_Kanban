import db from '../../../mock_api/public/db.json'
import { typesKanban } from '../components/Kanban/state'
import { Column } from '../utils'

const { ADD_COLUMN } = typesKanban
const board = db.boards[0]

const firstColumn = Column(board.id)
const secondColumn = Column(board.id)

const secondBoard = {
  ...board,
  columns: [...board.columns, firstColumn],
  order: [...board.order, firstColumn.id]
}

export const CASE_ADD_COLUMN = {
  'add 1 column to initial state': {
    init: board,
    newColumn: firstColumn,
    output: {
      type: ADD_COLUMN,
      payload: firstColumn
    }
  },
  'add 2nd column to previous state': {
    init: secondBoard,
    newColumn: secondColumn,
    output: {
      type: ADD_COLUMN,
      payload: secondColumn
    }
  }
}
