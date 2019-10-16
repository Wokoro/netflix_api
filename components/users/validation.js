/**
 * @author Wokoro Douye Samuel
 */

import { check, validationResult } from 'express-validator';
import { InputValidationError } from '../../utils/error.spec';
import { sendErrorMessage } from '../../utils';

import UserRepository from './repository'


/**
 * @description An array that holds all user signup input validations.
 */
export const signupInputValidation = [
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

/**
 * An array that holds all user signup iput validations
 */
export const userSigninInputValidations = [

  check('email', 'Invalid email value')
    .isEmail()
    .normalizeEmail()
    .exists(),

  check('password', 'Password must contain a value')
    .isString(),
  check('password', 'Password can\'t be empty')
    .not().isEmpty(),

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

/**
 * Function to check if the user exists on database.
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * @returns {Void} returns nothing
 */
export const checkUserExistence = async (req, res, next) => {
  const { body } = req;
  const { email, password: rawPassword } = body;
  const result = await UserRepository.getOne({email});
  if (result) {
    const { dataValues } = result;
    const userPassword = result
      ? rawPassword == dataValues.password
      : false;
    if (!userPassword) {
      return sendErrorMessage(res, 400, 'Wrong username or password');
    }
    req.body = dataValues;
    return next();
  }
  return sendErrorMessage(res, 400, 'Wrong username or password');
};
