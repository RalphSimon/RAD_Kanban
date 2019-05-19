import { typesTasks } from './actionTypes'

const { ADD_TASK, COMPLETE_TASK, REMOVE_TASK, UPDATE_TASK } = typesTasks

export const addTask = task => ({
  type: ADD_TASK,
  payload: task
})

export const completeTask = (id, isComplete) => ({
  type: COMPLETE_TASK,
  id,
  isComplete
})

export const removeTask = taskId => ({
  type: REMOVE_TASK,
  payload: taskId
})

export const updateTask = (id, field, payload) => ({
  type: UPDATE_TASK,
  payload: { [field]: payload },
  id
})
