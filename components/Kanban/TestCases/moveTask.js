import db from '../../../mock_api/public/db.json'
import { typesKanban } from '../state'

const { MOVE_TASK } = typesKanban
const { columns } = db.boards[0]
const printDndResult = (index, id) => ({ index, droppableId: id })
const selectTask = (column = 'column-1', taskIndex = 0) =>
  columns[column].taskIds[taskIndex]

export const CASE_MOVE_TASKS = {
  'move task from 1st to 2nd column': {
    init: columns,
    dragResult: {
      source: printDndResult(0, 'column-1'),
      destination: printDndResult(0, 'column-2'),
      draggableId: selectTask(),
      reason: 'DROP'
    },
    output: {
      type: MOVE_TASK,
      payload: {
        'column-1': {
          id: 'column-1',
          title: 'Open',
          taskIds: [
            '8b1c3f05-2582-465f-863f-928e9a2df705',
            '6ae035ee-c4b1-49d2-a72d-33b217cbf2fe',
            '8cc7174b-7b0a-4fff-b0fa-736d9fc6b927'
          ]
        },
        'column-2': {
          id: 'column-2',
          title: 'In Progress',
          taskIds: [
            '0cd8bae6-68bb-4abc-abc9-b393388b9d32',
            'fd2ed3bc-b7a9-4af8-998d-e48cec47e7b9',
            '49f1fb61-e8a3-404a-a8c0-738de652fed9',
            '7d3e9feb-d20e-4e72-989e-8733cd35a616',
            'a14bae36-7d8a-4513-aa01-5f582059ea3b',
            '6f13fb41-e9a9-42a1-9260-2e60254fb0b7'
          ]
        },
        'column-3': {
          id: 'column-3',
          title: 'Done',
          taskIds: []
        }
      }
    }
  },
  'move task from 1st to 3th column': {
    init: columns,
    dragResult: {
      source: printDndResult(2, 'column-2'),
      destination: printDndResult(0, 'column-3'),
      draggableId: selectTask('column-2', 2),
      reason: 'DROP'
    },
    output: {
      type: MOVE_TASK,
      payload: {
        'column-1': {
          id: 'column-1',
          title: 'Open',
          taskIds: [
            '0cd8bae6-68bb-4abc-abc9-b393388b9d32',
            '8b1c3f05-2582-465f-863f-928e9a2df705',
            '6ae035ee-c4b1-49d2-a72d-33b217cbf2fe',
            '8cc7174b-7b0a-4fff-b0fa-736d9fc6b927'
          ]
        },
        'column-2': {
          id: 'column-2',
          title: 'In Progress',
          taskIds: [
            'fd2ed3bc-b7a9-4af8-998d-e48cec47e7b9',
            '49f1fb61-e8a3-404a-a8c0-738de652fed9',
            'a14bae36-7d8a-4513-aa01-5f582059ea3b',
            '6f13fb41-e9a9-42a1-9260-2e60254fb0b7'
          ]
        },
        'column-3': {
          id: 'column-3',
          title: 'Done',
          taskIds: ['7d3e9feb-d20e-4e72-989e-8733cd35a616']
        }
      }
    }
  }
}
