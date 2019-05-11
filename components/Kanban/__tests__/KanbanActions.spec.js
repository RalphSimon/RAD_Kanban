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
      expect(reorderTasks(opts.init, opts.dragResult)).toEqual(opts.output)
    },
    CASE_REORDER_COLUMN_TASKS
  )

  cases(
    'moveTask properly moves a task between columns',
    opts => {
      expect(moveTask(opts.init, opts.dragResult)).toEqual(opts.output)
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
      expect(addColumn(opts.init, opts.newColumn)).toEqual(opts.output)
    },
    CASE_ADD_COLUMN
  )

  cases(
    'can remove columns from board',
    opts => {
      expect(removeColumn(opts.init, opts.columnToRemove)).toEqual(opts.output)
    },
    CASE_REMOVE_COLUMN
  )

  cases(
    'can add task to column',
    opts => {
      expect(addToColumn(opts.column, opts.taskId)).toEqual(opts.output)
    },
    CASE_ADD_TO_COLUMN
  )

  cases(
    'can remove task from column',
    opts => {
      expect(removeFromColumn(opts.column, opts.taskId)).toEqual(opts.output)
    },
    CASE_REMOVE_FROM_COLUMN
  )
})
