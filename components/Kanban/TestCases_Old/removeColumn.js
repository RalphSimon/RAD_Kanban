import db from '../../../mock_api/public/db.json'
import { typesKanban } from '../components/Kanban/state'

const { REMOVE_COLUMN } = typesKanban
const board = db.boards[0]

const selectColumn = (columnId = 'column-1') => {
  const [column] = board.columns.filter(c => c.id === columnId)
  return column
}

const secondBoard = {
  ...board,
  columns: [selectColumn(), selectColumn('column-2')],
  order: [selectColumn().id, selectColumn('column-2').id]
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
        columns: [selectColumn('column-2')],
        order: [selectColumn('column-2').id]
      }
    }
  }
}
