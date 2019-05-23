import { typesTasks } from './actionTypes'

const { ADD_TASK, COMPLETE_TASK, REMOVE_TASK, UPDATE_TASK } = typesTasks

export const taskReducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload]
    case REMOVE_TASK:
      return state.filter(task => task.id !== action.payload)
    case UPDATE_TASK: {
      const [task] = state.filter(t => t.id === action.id)
      const copyTasks = state.filter(t => t.id !== action.id)

      const updatedTask = {
        ...task,
        ...action.payload
      }

      return [...copyTasks, updatedTask]
    }
    default:
      return state
  }
}
