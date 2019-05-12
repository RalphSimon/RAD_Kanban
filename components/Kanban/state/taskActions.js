import { typesTasks } from './actionTypes'

const { ADD_TASK, COMPLETE_TASK, REMOVE_TASK, UPDATE_TASK } = typesTasks

export const addTask = task => ({
  type: ADD_TASK,
  task
})

export const completeTask = (id, isComplete) => ({
  type: COMPLETE_TASK,
  id,
  isComplete
})

export const removeTask = taskId => ({
  type: REMOVE_TASK,
  taskId
})

export const updateTask = (task, field, payload) => ({
  type: UPDATE_TASK,
  task: { ...task, [field]: payload }
})
