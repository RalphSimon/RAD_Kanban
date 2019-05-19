import { LISTEN_FOR_BOARDS } from './actionTypes'

export const boardsReducer = (state, action) => {
  switch (action.type) {
    case LISTEN_FOR_BOARDS:
      return action.payload
    default:
      return state
  }
}
