/**
 * @author Wokoro Douye Samuel
 */

import { check, validationResult } from 'express-validator';
import { InputValidationError } from '../../utils/error.spec';
import { sendErrorMessage } from '../../utils';

import UserRepository from './repository'

/**
 * An array that holds all user signup iput validations
 */
export const favoriteMoviesCreateValidations = [

  check('url', 'Invalid url value')
    .isString()
    .exists(),

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

    async ({body}, res, next) => {
      const { url } = body;
      try {
        const result = await UserRepository.getOne({url});
        if (result) {
          return sendErrorMessage(res, 409, 'Movie already a favorite movie');
        }
        return next();
      } catch (error) {
        next(err)
      }
    }
];
