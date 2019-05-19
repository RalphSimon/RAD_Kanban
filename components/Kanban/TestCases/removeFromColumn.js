import db from '../../../mock_api/public/db.json'
import { typesKanban } from '../state'

const { REMOVE_FROM_COLUMN } = typesKanban
const { columns } = db.boards[0]

const selectColumn = (columnId = 'column-1') => {
  const [column] = columns.filter(c => c.id === columnId)
  return column
}

export const CASE_REMOVE_FROM_COLUMN = {
  'remove task from 1st column': {
    input: selectColumn(),
    taskId: selectColumn().taskIds[1],
    output: {
      type: REMOVE_FROM_COLUMN,
      payload: {
        ...selectColumn(),
        taskIds: [
          '8f5b2880-74a2-4d60-98a8-a228821e730d',
          '2bc999ba-4869-4138-9a3d-c50a9dd16729',
          'a1af323c-c064-44ed-86f6-3c88e4a6d702'
        ]
      }
    }
  },
  'remove task from 2nd column': {
    input: selectColumn('column-2'),
    taskId: selectColumn('column-2').taskIds[2],
    output: {
      type: REMOVE_FROM_COLUMN,
      payload: {
        ...selectColumn('column-2'),
        taskIds: [
          '862c4579-63bb-48f4-a408-2db19f30ebbc',
          '0b1a024c-a5f3-4a59-b5d3-a668a05945df',
          '5c5fa4b9-c016-49fe-9770-1626dafae3c0',
          'f69cadb6-d197-4390-876a-6ea2c16ac14f'
        ]
      }
    }
  }
}
