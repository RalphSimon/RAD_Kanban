import produce from 'immer'

import { typesColumn } from './actionTypes'
import { LISTEN_FOR_COLLECTION, LISTEN_FOR_DOCUMENT } from '../../../firebase'

const {
  ADD_COLUMN,
  ADD_TASK,
  REMOVE_COLUMN,
  REORDER_TASKS,
  REMOVE_TASK,
  UPDATE_COLUMN_TITLE
} = typesColumn

export const columnReducer = (state, action) => {
  switch (action.type) {
    case LISTEN_FOR_COLLECTION: {
      return action.payload
    }
    case LISTEN_FOR_DOCUMENT: {
      return action.payload
    }
    case ADD_COLUMN: {
      return [...state, action.column]
    }
    case ADD_TASK: {
      // const newState = state.filter(column => column.id !== action.payload.id)
      const newState = state.reduce((acc, curr, i, arr) => {
        if (curr.id === action.columnId) {
          const ids = Array.from(curr.taskIds)

          curr.taskIds = [action.taskId, ...ids]
          return acc
        } else {
          return acc
        }
      }, state)
      console.log(newState)
      return state
    }
    case REMOVE_COLUMN: {
      const columns = state.filter(column => column.id !== action.payload)
      return [...columns]
    }
    case REORDER_TASKS: {
      return [...action.payload]
    }
    case UPDATE_COLUMN_TITLE: {
      const updatedColumns = state.map(column => {
        if (column.id === action.id) {
          column.title = action.title
        }

        return column
      })

      return [...updatedColumns]
    }
    default:
      return state
  }
}
