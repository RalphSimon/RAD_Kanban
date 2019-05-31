import {
  ON_LISTEN_ERROR,
  ON_LISTEN_SUCCESS
} from '../handlers/actionTypes'

export const snapshotReducer = (state, action) => {
  switch (action.type) {
    case ON_LISTEN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        source: action.source,
        data: action.data
      }
    }
    case ON_LISTEN_ERROR: {
      return {
        isLoading: false,
        error: action.error,
        source: action.source,
        data: null
      }
    }
    default:
      return state
  }
}
