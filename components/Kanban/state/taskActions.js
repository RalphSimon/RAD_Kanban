import { typesTasks } from './actionTypes'

const { ADD_TASK, REMOVE_TASK, UPDATE_TASK } = typesTasks

export const addTask = task => ({
  type: ADD_TASK,
  task
})

export const removeTask = taskId => ({
  type: REMOVE_TASK,
  taskId
})

export const updateTask = (task, payload) => ({
  type: UPDATE_TASK,
  task: { ...task, payload }
})
