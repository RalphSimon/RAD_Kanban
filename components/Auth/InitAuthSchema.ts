import { validate } from '@babel/types'

export interface ValidatorSchema {
  values: {};
  errors: {};
  isValid: { boolean };
  canSubmit: boolean;
}

export const InitAuthSchema = (schema: {}): ValidatorSchema => {
  let validator = {
    values: schema,
    errors: {},
    isValid: {},
    canSubmit: false
  }
  const fields = Object.keys(schema)

  for (let i = 0; i < fields.length; i++) {
    validator.values = {
      ...validator.values,
      [fields[i]]: ''
    }
    validator.errors = {
      ...validator.errors,
      [fields[i]]: ''
    }
    validator.isValid = {
      ...validator.isValid,
      [fields[i]]: false
    }
  }
  return validator
}
