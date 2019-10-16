/**
 * @author Wokoro Douye Samuel
 */

import { check, validationResult } from 'express-validator';
import { InputValidationError } from '../../utils/error.spec';


/**
 * @description An array that holds all user signup input validations.
 */
export const inputValidation = [
  check('name', 'Name must be present')
    .isString()
    .trim()
    .escape(),
  check('name', 'Name must not be an integer')
    .not()
    .isNumeric(),
  check('name', 'Name must contain atleast three letters')
    .isLength({ min: 3 }),

  check('email', 'Email must be present')
    .trim()
    .escape()
    .isEmail(),

  check(
    'password', 'Invalid password, password must be present'
  )
    .isString()
    .trim()
    .escape(),

  check(
    'password', 'Invalid password, password must be atleast five characters'
  )
    .isLength({ min: 5 }),

  (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array();
      let errorDetails = errors.reduce((errorValues, current, i)=>{
        let invalidInput = current.value;
        let location = current.param;
        let msg = `${current.msg}, got "${invalidInput}"`
        errorValues[i] = { location, msg };
        return errorValues;
      }, []);
      throw new InputValidationError(errorDetails)
    }
    next();
  },
];
