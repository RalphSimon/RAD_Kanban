import { LISTEN_FOR_BOARDS, LISTEN_FOR_DOCUMENT } from './actionTypes'

export const boardsReducer = (state, action) => {
  switch (action.type) {
    case LISTEN_FOR_BOARDS:
      return action.payload
    case LISTEN_FOR_DOCUMENT:
      return action.payload
    default:
      return state
  }
}
