import db from '../../../mock_api/public/db.json'
import { typesKanban } from '../components/Kanban/state'

const { REORDER_TASKS } = typesKanban
const { columns } = db.boards[0]
const printDndResult = (index, id) => ({ index, droppableId: id })
const selectColumn = (columnId = 'column-1') => {
  const [column] = columns.filter(c => c.id === columnId)
  return column
}
const selectTask = (columnId = 'column-1', taskIndex = 0) => {
  // columns[column].taskIds[taskIndex]
  const [column] = columns.filter(c => c.id === columnId)
  return column.taskIds[taskIndex]
}

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
      payload: [
        selectColumn(),
        selectColumn('column-2'),
        selectColumn('column-3')
      ]
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
      payload: [
        {
          ...selectColumn(),
          taskIds: [
            '1b9ecf2e-458f-4770-9ff2-fa45f0f8a7ee',
            '8f5b2880-74a2-4d60-98a8-a228821e730d',
            '2bc999ba-4869-4138-9a3d-c50a9dd16729',
            'a1af323c-c064-44ed-86f6-3c88e4a6d702'
          ]
        },
        selectColumn('column-2'),
        selectColumn('column-3')
      ]
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
      payload: [
        {
          ...selectColumn(),
          taskIds: [
            '1b9ecf2e-458f-4770-9ff2-fa45f0f8a7ee',
            '2bc999ba-4869-4138-9a3d-c50a9dd16729',
            '8f5b2880-74a2-4d60-98a8-a228821e730d',
            'a1af323c-c064-44ed-86f6-3c88e4a6d702'
          ]
        },
        selectColumn('column-2'),
        selectColumn('column-3')
      ]
    }
  },
  '2nd task to last position': {
    init: columns,
    dragResult: {
      source: printDndResult(1, 'column-1'),
      destination: printDndResult(3, 'column-1'),
      draggableId: selectTask('column-1', 1),
      reason: 'DROP'
    },
    output: {
      type: REORDER_TASKS,
      payload: [
        {
          ...selectColumn(),
          taskIds: [
            '8f5b2880-74a2-4d60-98a8-a228821e730d',
            '2bc999ba-4869-4138-9a3d-c50a9dd16729',
            'a1af323c-c064-44ed-86f6-3c88e4a6d702',
            '1b9ecf2e-458f-4770-9ff2-fa45f0f8a7ee'
          ]
        },
        selectColumn('column-2'),
        selectColumn('column-3')
      ]
    }
  },
  '2nd task to 4th position in 2nd column': {
    init: columns,
    dragResult: {
      source: printDndResult(1, 'column-2'),
      destination: printDndResult(3, 'column-2'),
      draggableId: selectTask('column-2', 1),
      reason: 'DROP'
    },
    output: {
      type: REORDER_TASKS,
      payload: [
        selectColumn('column-1'),
        {
          ...selectColumn('column-2'),
          taskIds: [
            '862c4579-63bb-48f4-a408-2db19f30ebbc',
            'f3fff7ce-54a0-4284-94d8-76571db28200',
            '5c5fa4b9-c016-49fe-9770-1626dafae3c0',
            '0b1a024c-a5f3-4a59-b5d3-a668a05945df',
            'f69cadb6-d197-4390-876a-6ea2c16ac14f'
          ]
        },
        selectColumn('column-3')
      ]
    }
  }
}
