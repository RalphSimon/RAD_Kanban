import { LISTEN_FOR_COLLECTION, LISTEN_FOR_DOCUMENT } from './actionTypes'

export const firebaseReducer = (state, action) => {
  switch (action.type) {
    case LISTEN_FOR_COLLECTION:
      return action.payload
    case LISTEN_FOR_DOCUMENT:
      return action.payload
    default:
      return state
  }
}
