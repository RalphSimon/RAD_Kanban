import { FETCH_COLLECTION } from './actionTypes'

export const firebaseReducer = (state, action) => {
  switch (action.type) {
    case FETCH_COLLECTION:
      return action.collection
    default:
      return state
  }
}
