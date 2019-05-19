/* eslint-disable no-undef */

import cases from 'jest-in-case'

import {
  addColumn,
  addToColumn,
  moveTask,
  removeColumn,
  removeFromColumn,
  reorderColumns,
  reorderTasks
} from '../state'
import { CASE_REORDER_COLUMN_TASKS } from '../TestCases/reorderColumnTasks'
import { CASE_MOVE_TASKS } from '../TestCases/moveTask'
import { CASE_REORDER_COLUMNS } from '../TestCases/reorderColumns'
import { CASE_ADD_COLUMN } from '../TestCases/addColumn'
import { CASE_REMOVE_COLUMN } from '../TestCases/removeColumn'
import { CASE_ADD_TO_COLUMN } from '../TestCases/addToColumn'
import { CASE_REMOVE_FROM_COLUMN } from '../TestCases/removeFromColumn'

describe('Kanban Actions', () => {
  cases(
    'reorderColumnTasks properly reorders tasks',
    opts => {
      const total = reorderTasks(opts.init, opts.dragResult).payload.length
      expect(reorderTasks(opts.init, opts.dragResult)).toEqual(opts.output)
      expect(total).toBe(opts.init.length)
    },
    CASE_REORDER_COLUMN_TASKS
  )

  cases(
    'moveTask properly moves a task between columns',
    opts => {
      const total = moveTask(opts.init, opts.dragResult).payload.length
      expect(moveTask(opts.init, opts.dragResult)).toEqual(opts.output)
      expect(total).toBe(opts.init.length)
    },
    CASE_MOVE_TASKS
  )

  cases(
    'reorderColumns properly reorders columns',
    opts => {
      expect(reorderColumns(opts.init, opts.dragResult)).toEqual(opts.output)
    },
    CASE_REORDER_COLUMNS
  )

  cases(
    'can add columns to board',
    opts => {
      const totalColumns = addColumn(opts.init, opts.newColumn).payload.columns
        .length
      const totalOrder = addColumn(opts.init, opts.newColumn).payload.order
        .length
      expect(addColumn(opts.init, opts.newColumn)).toEqual(opts.output)
      expect(totalColumns).toBe(opts.output.payload.columns.length)
      expect(totalOrder).toBe(opts.output.payload.order.length)
    },
    CASE_ADD_COLUMN
  )

  cases(
    'can remove columns from board',
    opts => {
      const totalColumns = removeColumn(opts.init, opts.columnToRemove).payload
        .columns.length
      const totalOrder = removeColumn(opts.init, opts.columnToRemove).payload
        .order.length
      expect(removeColumn(opts.init, opts.columnToRemove)).toEqual(opts.output)
      expect(totalColumns).toBe(opts.output.payload.columns.length)
      expect(totalOrder).toBe(opts.output.payload.order.length)
    },
    CASE_REMOVE_COLUMN
  )

  cases(
    'can add task to column',
    opts => {
      const totalTasks = addToColumn(opts.input, opts.taskId).payload.taskIds
        .length
      expect(addToColumn(opts.input, opts.taskId)).toEqual(opts.output)
      expect(totalTasks).toBe(opts.output.payload.taskIds.length)
    },
    CASE_ADD_TO_COLUMN
  )

  cases(
    'can remove task from column',
    opts => {
      const totalTasks = removeFromColumn(opts.input, opts.taskId).payload
        .taskIds.length
      expect(removeFromColumn(opts.input, opts.taskId)).toEqual(opts.output)
      expect(totalTasks).toBe(opts.output.payload.taskIds.length)
    },
    CASE_REMOVE_FROM_COLUMN
  )
})
