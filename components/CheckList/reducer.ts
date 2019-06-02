export const ON_ADD = 'ON_ADD'
export const ON_INIT = 'ON_INIT'
export const ON_REMOVE = 'ON_REMOVE'
export const ON_REORDER = 'ON_REORDER'
export const ON_UPDATE = 'ON_UPDATE'

export const reducer = (state, action) => {
  switch (action.type) {
    case ON_INIT: {
      return action.payload
    }
    case ON_ADD: {
      const prevOrder = state.order ? Array.from(state.order) : []
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: action.payload
        },
        order: [...prevOrder, action.payload.id]
      }
    }
    case ON_REMOVE: {
      delete state.items[action.id]

      return {
        ...state,
      }
    }
    case ON_REORDER: {
      return {
        ...state,
        order: action.payload
      }
    }
    case ON_UPDATE: {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.field]: action.payload
        }
      }
    }
    default:
      return state
  }
}