import { typesTasks } from './actionTypes'
import { addAsyncDoc, deleteAsyncDoc, updateAsyncDoc } from '../../../firebase'

const { ADD_TASK, REMOVE_TASK, UPDATE_TASK } = typesTasks

export const addTask = (ref, task, dispatch) => {
  addAsyncDoc(ref, task)
    .then(() =>
      dispatch({
        type: ADD_TASK,
        payload: { ...task, id: ref.id }
      })
    )
    .catch(err => console.log('Error writing task: ', err))
}

export const removeTask = (ref, taskId) => {
  deleteAsyncDoc(ref, task)

  return {
    type: REMOVE_TASK,
    payload: taskId
  }
}

export const updateTask = (ref, id, payload) => {
  updateAsyncDoc(ref, payload)
  return {
    type: UPDATE_TASK,
    payload: payload,
    id
  }
}
