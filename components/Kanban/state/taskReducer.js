import { typesTasks } from './actionTypes'

const { ADD_TASK, COMPLETE_TASK, REMOVE_TASK, UPDATE_TASK } = typesTasks

export const taskReducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        [action.task.id]: action.task
      }
    case COMPLETE_TASK:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          completed: action.isComplete
        }
      }
    case REMOVE_TASK:
      const prevTasks = state
      delete prevTasks[action.id]

      return prevTasks
    case UPDATE_TASK:
      return {
        ...state,
        [action.task.id]: action.task
      }
    default:
      return state
  }
}
