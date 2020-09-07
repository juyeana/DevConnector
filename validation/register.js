const Validator = require('validator');
const isEmpty = require('./is-empty');
//'data' parameter  = req.body
module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters.';
  }

  if (isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (isEmpty(data.email)) {
    errors.email = 'email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'email is not valid';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'password must be between 2 and 30 characters.';
  }

  if (isEmpty(data.password)) {
    errors.password = 'password field is required';
  }

  if (isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match.';
  }

  //NOTE: Validator.isEmpty(data) only checks 'undefined' of string value not objects so you need to come up with your own isEmpty method.
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
