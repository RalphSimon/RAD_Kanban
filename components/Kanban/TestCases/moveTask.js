import db from '../../../mock_api/public/db.json'
import { typesKanban } from '../state'

const { MOVE_TASK } = typesKanban
const { columns } = db.boards[0]
const printDndResult = (index, id) => ({ index, droppableId: id })
// const selectTask = (column = 'column-1', taskIndex = 0) =>
//   columns[column].taskIds[taskIndex]

const selectColumn = (columnId = 'column-1') => {
  const [column] = columns.filter(c => c.id === columnId)
  return column
}
const selectTask = (columnId = 'column-1', taskIndex = 0) => {
  // columns[column].taskIds[taskIndex]
  const [column] = columns.filter(c => c.id === columnId)
  return column.taskIds[taskIndex]
}

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
      payload: [
        {
          ...selectColumn(),
          taskIds: [
            '1b9ecf2e-458f-4770-9ff2-fa45f0f8a7ee',
            '2bc999ba-4869-4138-9a3d-c50a9dd16729',
            'a1af323c-c064-44ed-86f6-3c88e4a6d702'
          ]
        },
        {
          ...selectColumn('column-2'),
          taskIds: [
            '8f5b2880-74a2-4d60-98a8-a228821e730d',
            '862c4579-63bb-48f4-a408-2db19f30ebbc',
            '0b1a024c-a5f3-4a59-b5d3-a668a05945df',
            'f3fff7ce-54a0-4284-94d8-76571db28200',
            '5c5fa4b9-c016-49fe-9770-1626dafae3c0',
            'f69cadb6-d197-4390-876a-6ea2c16ac14f'
          ]
        },
        {
          ...selectColumn('column-3'),
          taskIds: []
        }
      ]
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
      payload: [
        {
          ...selectColumn(),
          taskIds: [
            '8f5b2880-74a2-4d60-98a8-a228821e730d',
            '1b9ecf2e-458f-4770-9ff2-fa45f0f8a7ee',
            '2bc999ba-4869-4138-9a3d-c50a9dd16729',
            'a1af323c-c064-44ed-86f6-3c88e4a6d702'
          ]
        },
        {
          ...selectColumn('column-2'),
          taskIds: [
            '862c4579-63bb-48f4-a408-2db19f30ebbc',
            '0b1a024c-a5f3-4a59-b5d3-a668a05945df',
            '5c5fa4b9-c016-49fe-9770-1626dafae3c0',
            'f69cadb6-d197-4390-876a-6ea2c16ac14f'
          ]
        },
        {
          ...selectColumn('column-3'),
          taskIds: ['f3fff7ce-54a0-4284-94d8-76571db28200']
        }
      ]
    }
  }
}
