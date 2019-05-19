import db from '../../../mock_api/public/db.json'
import { typesKanban } from '../state'

const { REORDER_COLUMNS } = typesKanban
const { order } = db.boards[0]
const printDndResult = (index, id) => ({ index, droppableId: id })

export const CASE_REORDER_COLUMNS = {
  'move 1st column to 2nd place': {
    init: order,
    dragResult: {
      source: printDndResult(0, 'kanban-canvas'),
      destination: printDndResult(1, 'kanban-canvas'),
      draggableId: 'column-1',
      reason: 'DROP'
    },
    output: {
      type: REORDER_COLUMNS,
      payload: ['column-2', 'column-1', 'column-3']
    }
  },
  'move 1st column to last place': {
    init: order,
    dragResult: {
      source: printDndResult(0, 'kanban-canvas'),
      destination: printDndResult(2, 'kanban-canvas'),
      draggableId: 'column-1',
      reason: 'DROP'
    },
    output: {
      type: REORDER_COLUMNS,
      payload: ['column-2', 'column-3', 'column-1']
    }
  },
  'move last column to first place': {
    init: order,
    dragResult: {
      source: printDndResult(2, 'kanban-canvas'),
      destination: printDndResult(0, 'kanban-canvas'),
      draggableId: 'column-3',
      reason: 'DROP'
    },
    output: {
      type: REORDER_COLUMNS,
      payload: ['column-3', 'column-1', 'column-2']
    }
  },
  'move 2nd column to first place': {
    init: order,
    dragResult: {
      source: printDndResult(1, 'kanban-canvas'),
      destination: printDndResult(0, 'kanban-canvas'),
      draggableId: 'column-2',
      reason: 'DROP'
    },
    output: {
      type: REORDER_COLUMNS,
      payload: ['column-2', 'column-1', 'column-3']
    }
  }
}
