/* eslint-disable no-undef */

import cases from 'jest-in-case'

import { reorder, reorderTasks } from '../Handlers/handleReorder'
import db from '../../../mock_api/public/db.json'

const [board] = db.boards
const printDndResult = (index, id) => ({ index, droppableId: id })

describe('Reorder', () => {
  cases(
    'reorder reorders an array in place',
    opts => {
      expect(reorder(opts.collection, opts.startIndex, opts.endIndex)).toEqual(
        opts.output
      )
    },
    {
      'can reorder columns': {
        collection: board.order,
        startIndex: 0,
        endIndex: 2,
        output: ['column-2', 'column-3', 'column-1']
      },
      'can reorder taskIds': {
        collection: board.columns[0].taskIds,
        startIndex: 1,
        endIndex: 2,
        output: [
          '8f5b2880-74a2-4d60-98a8-a228821e730d',
          '2bc999ba-4869-4138-9a3d-c50a9dd16729',
          '1b9ecf2e-458f-4770-9ff2-fa45f0f8a7ee',
          'a1af323c-c064-44ed-86f6-3c88e4a6d702'
        ]
      }
    }
  )
})

describe('Reorder tasks', () => {
  cases(
    'move item from one list to the next',
    opts => {
      // const result = reorderTasks(opts.collection, opts.dragResult)
      // expect(result.length).toBe(board.columns.length)
      expect(reorderTasks(opts.collection, opts.dragResult)).toEqual(
        opts.output
      )
    },
    {
      'handles dropping item in place': {
        collection: board.columns,
        dragResult: {
          source: printDndResult(0, 'column-1'),
          destination: printDndResult(0, 'column-1')
        },
        output: board.columns
      },
      'handles movement within the same list': {
        collection: board.columns,
        dragResult: {
          source: printDndResult(0, 'column-1'),
          destination: printDndResult(1, 'column-1')
        },
        output: [
          {
            id: 'column-1',
            title: 'Open',
            taskIds: [
              '1b9ecf2e-458f-4770-9ff2-fa45f0f8a7ee',
              '8f5b2880-74a2-4d60-98a8-a228821e730d',
              '2bc999ba-4869-4138-9a3d-c50a9dd16729',
              'a1af323c-c064-44ed-86f6-3c88e4a6d702'
            ]
          },
          {
            id: 'column-2',
            title: 'In Progress',
            taskIds: [
              '862c4579-63bb-48f4-a408-2db19f30ebbc',
              '0b1a024c-a5f3-4a59-b5d3-a668a05945df',
              'f3fff7ce-54a0-4284-94d8-76571db28200',
              '5c5fa4b9-c016-49fe-9770-1626dafae3c0',
              'f69cadb6-d197-4390-876a-6ea2c16ac14f'
            ]
          },
          { id: 'column-3', title: 'Done', taskIds: [] }
        ]
      },
      'handles movement from 1st to 2nd': {
        collection: board.columns,
        dragResult: {
          source: printDndResult(2, 'column-1'),
          destination: printDndResult(1, 'column-2')
        },
        output: [
          {
            id: 'column-1',
            title: 'Open',
            taskIds: [
              '8f5b2880-74a2-4d60-98a8-a228821e730d',
              '1b9ecf2e-458f-4770-9ff2-fa45f0f8a7ee',
              'a1af323c-c064-44ed-86f6-3c88e4a6d702'
            ]
          },
          {
            id: 'column-2',
            title: 'In Progress',
            taskIds: [
              '862c4579-63bb-48f4-a408-2db19f30ebbc',
              '2bc999ba-4869-4138-9a3d-c50a9dd16729', // <-
              '0b1a024c-a5f3-4a59-b5d3-a668a05945df',
              'f3fff7ce-54a0-4284-94d8-76571db28200',
              '5c5fa4b9-c016-49fe-9770-1626dafae3c0',
              'f69cadb6-d197-4390-876a-6ea2c16ac14f'
            ]
          },
          { id: 'column-3', title: 'Done', taskIds: [] }
        ]
      },
      'handles movement from 1st to last': {
        collection: board.columns,
        dragResult: {
          source: printDndResult(3, 'column-1'),
          destination: printDndResult(0, 'column-3')
        },
        output: [
          {
            id: 'column-1',
            title: 'Open',
            taskIds: [
              '8f5b2880-74a2-4d60-98a8-a228821e730d',
              '1b9ecf2e-458f-4770-9ff2-fa45f0f8a7ee',
              '2bc999ba-4869-4138-9a3d-c50a9dd16729'
            ]
          },
          {
            id: 'column-2',
            title: 'In Progress',
            taskIds: [
              '862c4579-63bb-48f4-a408-2db19f30ebbc',
              '0b1a024c-a5f3-4a59-b5d3-a668a05945df',
              'f3fff7ce-54a0-4284-94d8-76571db28200',
              '5c5fa4b9-c016-49fe-9770-1626dafae3c0',
              'f69cadb6-d197-4390-876a-6ea2c16ac14f'
            ]
          },
          {
            id: 'column-3',
            title: 'Done',
            taskIds: ['a1af323c-c064-44ed-86f6-3c88e4a6d702']
          }
        ]
      },
      'handles movement from 2nd to 1st': {
        collection: board.columns,
        dragResult: {
          source: printDndResult(3, 'column-2'),
          destination: printDndResult(2, 'column-1')
        },
        output: [
          {
            id: 'column-1',
            title: 'Open',
            taskIds: [
              '8f5b2880-74a2-4d60-98a8-a228821e730d',
              '1b9ecf2e-458f-4770-9ff2-fa45f0f8a7ee',
              '5c5fa4b9-c016-49fe-9770-1626dafae3c0',
              '2bc999ba-4869-4138-9a3d-c50a9dd16729',
              'a1af323c-c064-44ed-86f6-3c88e4a6d702'
            ]
          },
          {
            id: 'column-2',
            title: 'In Progress',
            taskIds: [
              '862c4579-63bb-48f4-a408-2db19f30ebbc',
              '0b1a024c-a5f3-4a59-b5d3-a668a05945df',
              'f3fff7ce-54a0-4284-94d8-76571db28200',
              'f69cadb6-d197-4390-876a-6ea2c16ac14f'
            ]
          },
          { id: 'column-3', title: 'Done', taskIds: [] }
        ]
      }
    }
  )
})
