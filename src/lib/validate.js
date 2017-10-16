import { get, forEach } from 'lodash';
import Joi from 'joi-browser';

export default function validate(fieldSchema, state) {
  const errors = {};

  forEach(fieldSchema, (field, name) => {
    if (typeof field === 'string') {
      if (state.field && state.field.length) {
        return;
      }
      errors.field = `${field} is required!`;
      return;
    }

    if (typeof field === 'object') {
      if (field.required && !state[name]) {
        errors[name] = `${field.name} is required!`;
        return;
      }

      if (field.schema) {
        const validation = Joi.validate(state[name], field.schema);
        if (validation.error) {
          const error = get(validation, 'error.details[0].message').replace(/"value"/, field.name);
          errors[name] = error;
        }
      }
    }
  });

  return errors;
}
