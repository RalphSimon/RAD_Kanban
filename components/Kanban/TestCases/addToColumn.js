import db from '../../../mock_api/public/db.json'
import { typesKanban } from '../state'
import { Task } from '../../../utils'

const { ADD_TO_COLUMN } = typesKanban
const { columns } = db.boards[0]

const newTask = Task('column-1')

export const CASE_ADD_TO_COLUMN = {
  'add task to 1st column': {
    column: columns['column-1'],
    taskId: newTask.id,
    output: {
      type: ADD_TO_COLUMN,
      payload: {
        ...columns['column-1'],
        taskIds: [newTask.id, ...columns['column-1'].taskIds]
      }
    }
  },
  'add task to 2nd column': {
    column: columns['column-2'],
    taskId: newTask.id,
    output: {
      type: ADD_TO_COLUMN,
      payload: {
        ...columns['column-2'],
        taskIds: [newTask.id, ...columns['column-2'].taskIds]
      }
    }
  },
  'add task to 3rd column': {
    column: columns['column-3'],
    taskId: newTask.id,
    output: {
      type: ADD_TO_COLUMN,
      payload: {
        ...columns['column-3'],
        taskIds: [newTask.id, ...columns['column-3'].taskIds]
      }
    }
  }
}
