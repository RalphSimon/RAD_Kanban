import db from '../../../mock_api/public/db.json'
import { typesKanban } from '../state'

const { REORDER_TASKS } = typesKanban
const { columns } = db.boards[0]
const printDndResult = (index, id) => ({ index, droppableId: id })
const selectTask = (column = 'column-1', taskIndex = 0) =>
  columns[column].taskIds[taskIndex]

export const CASE_REORDER_COLUMN_TASKS = {
  'first task in place': {
    init: columns,
    dragResult: {
      source: printDndResult(0, 'column-1'),
      destination: printDndResult(0, 'column-1'),
      draggableId: selectTask(),
      reason: 'DROP'
    },
    output: {
      type: REORDER_TASKS,
      payload: {
        'column-1': columns['column-1']
      }
    }
  },
  'first task to 2nd position': {
    init: columns,
    dragResult: {
      source: printDndResult(0, 'column-1'),
      destination: printDndResult(1, 'column-1'),
      draggableId: selectTask(),
      reason: 'DROP'
    },
    output: {
      type: REORDER_TASKS,
      payload: {
        'column-1': {
          ...columns['column-1'],
          taskIds: [
            '8b1c3f05-2582-465f-863f-928e9a2df705',
            '0cd8bae6-68bb-4abc-abc9-b393388b9d32',
            '6ae035ee-c4b1-49d2-a72d-33b217cbf2fe',
            '8cc7174b-7b0a-4fff-b0fa-736d9fc6b927'
          ]
        }
      }
    }
  },
  'first task to 3th position': {
    init: columns,
    dragResult: {
      source: printDndResult(0, 'column-1'),
      destination: printDndResult(2, 'column-1'),
      draggableId: selectTask(),
      reason: 'DROP'
    },
    output: {
      type: REORDER_TASKS,
      payload: {
        'column-1': {
          ...columns['column-1'],
          taskIds: [
            '8b1c3f05-2582-465f-863f-928e9a2df705',
            '6ae035ee-c4b1-49d2-a72d-33b217cbf2fe',
            '0cd8bae6-68bb-4abc-abc9-b393388b9d32',
            '8cc7174b-7b0a-4fff-b0fa-736d9fc6b927'
          ]
        }
      }
    }
  },
  '2nc task to last position': {
    init: columns,
    dragResult: {
      source: printDndResult(1, 'column-1'),
      destination: printDndResult(3, 'column-1'),
      draggableId: selectTask('column-1', 1),
      reason: 'DROP'
    },
    output: {
      type: REORDER_TASKS,
      payload: {
        'column-1': {
          ...columns['column-1'],
          taskIds: [
            '0cd8bae6-68bb-4abc-abc9-b393388b9d32',
            '6ae035ee-c4b1-49d2-a72d-33b217cbf2fe',
            '8cc7174b-7b0a-4fff-b0fa-736d9fc6b927',
            '8b1c3f05-2582-465f-863f-928e9a2df705'
          ]
        }
      }
    }
  }
}
