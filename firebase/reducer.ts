import { FETCH_COLLECTION } from './actionTypes'

export const firebaseReducer = (state, action) => {
  switch (action.type) {
    case FETCH_COLLECTION:
      console.log(action.collection)
      return action.collection
    default:
      return state
  }
}
