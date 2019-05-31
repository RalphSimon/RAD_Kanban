import {
  LISTEN_FOR_COLLECTION,
  LISTEN_FOR_DOCUMENT
} from '../handlers/actionTypes'

export const firebaseReducer = (state, action) => {
  switch (action.type) {
    case LISTEN_FOR_COLLECTION: {
      return {
        ...state,
        data: action.payload
      }
    }
    case LISTEN_FOR_DOCUMENT: {
      return {
        ...state,
        data: action.payload
      }
    }
    default:
      return state
  }
}
