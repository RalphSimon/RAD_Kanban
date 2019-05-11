import db from '../../../mock_api/public/db.json'
import { typesKanban } from '../state'

const { REMOVE_FROM_COLUMN } = typesKanban
const { columns } = db.boards[0]

export const CASE_REMOVE_FROM_COLUMN = {
  'remove task from 1st column': {
    column: columns['column-1'],
    taskId: columns['column-1'].taskIds[1],
    output: {
      type: REMOVE_FROM_COLUMN,
      payload: {
        ...columns['column-1'],
        taskIds: [
          '0cd8bae6-68bb-4abc-abc9-b393388b9d32',
          '6ae035ee-c4b1-49d2-a72d-33b217cbf2fe',
          '8cc7174b-7b0a-4fff-b0fa-736d9fc6b927'
        ]
      }
    }
  },
  'remove task from 2nd column': {
    column: columns['column-2'],
    taskId: columns['column-2'].taskIds[1],
    output: {
      type: REMOVE_FROM_COLUMN,
      payload: {
        ...columns['column-2'],
        taskIds: [
          'fd2ed3bc-b7a9-4af8-998d-e48cec47e7b9',
          '7d3e9feb-d20e-4e72-989e-8733cd35a616',
          'a14bae36-7d8a-4513-aa01-5f582059ea3b',
          '6f13fb41-e9a9-42a1-9260-2e60254fb0b7'
        ]
      }
    }
  }
}
