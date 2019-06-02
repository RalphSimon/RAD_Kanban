import { ValidatorSchema } from './InitAuthSchema'

interface Action {
  type: string;
  payload: {};
}

const VALIDATE_FIELD = 'VALIDATE_FIELD'
const RESET_VALIDATION = 'RESET_VALIDATION'

export const AuthReducer = (
  state: ValidatorSchema,
  action: Action
): ValidatorSchema => {
  switch (action.type) {
    case VALIDATE_FIELD: {
      const { field, value, error, isValid } = action.payload
      return {
        values: {
          ...state.values,
          [field]: value
        },
        errors: {
          ...state.errors,
          [field]: error
        },
        isValid: {
          ...state.isValid,
          [field]: isValid
        }
      }
    }
    case RESET_VALIDATION: {
      return initSchema(action.payload)
    }
    default: {
      return state
    }
  }
}
