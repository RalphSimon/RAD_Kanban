import db from '../../../mock_api/public/db.json'
import { typesKanban } from '../state'
import { Task } from '../../../utils'

const { ADD_TO_COLUMN } = typesKanban
const { columns } = db.boards[0]

const selectColumn = (columnId = 'column-1') => {
  const [column] = columns.filter(c => c.id === columnId)
  return column
}

const newTask = Task('column-1')

export const CASE_ADD_TO_COLUMN = {
  'add task to 1st column': {
    input: selectColumn(),
    taskId: newTask.id,
    output: {
      type: ADD_TO_COLUMN,
      payload: {
        ...selectColumn(),
        taskIds: [newTask.id, ...selectColumn().taskIds]
      }
    }
  },
  'add task to 2nd column': {
    input: selectColumn('column-2'),
    taskId: newTask.id,
    output: {
      type: ADD_TO_COLUMN,
      payload: {
        ...selectColumn('column-2'),
        taskIds: [newTask.id, ...selectColumn('column-2').taskIds]
      }
    }
  },
  'add task to 3rd column': {
    input: selectColumn('column-3'),
    taskId: newTask.id,
    output: {
      type: ADD_TO_COLUMN,
      payload: {
        ...selectColumn('column-3'),
        taskIds: [newTask.id, ...selectColumn('column-3').taskIds]
      }
    }
  }
}
