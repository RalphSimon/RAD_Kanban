import { FETCH_COLLECTION } from './actionTypes'

export const fetchTasks = payload => ({
  type: FETCH_COLLECTION,
  collection: payload
})
