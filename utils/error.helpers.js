/**
 * @author Wokoro Douye Samuel
 */

import { Http400Error, HttpClientError } from './error.spec';
import { sendErrorMessage } from '.'

/**
 * @description Route not found error helper method.
 * 
 * @param {object} router - Express router to be passed.
 * 
 * @return {void} Returns nothing.
 */
export const notFoundError = (router) => {
  router.use(() => {
    throw new Http400Error();
  });
};

/**
 * @description Client error helper method.
 * 
 * @param {object} router - Express router to be passed.
 * 
 * @return {void} Returns nothing.
 */
export const clientError = (router) => {
  router.use((err, req, res, next) => {
    if (err instanceof HttpClientError) {
      console.log(err);
      sendErrorMessage(res, err.status, err.message)
    }
    next(err);
  });
};

/**
 * @description Server error helper method.
 * 
 * @param {object} router - Express router to be passed.
 * 
 * @return {void} Returns nothing.
 */
export const serverError = (router) => {
  router.use((err, req, res, next) => {
    if (err.name === 'SequelizeUniqueConstraintError') {
      console.log(err);
      return sendErrorMessage(res, 409, 'User already exists')
    } else {
      console.log(err);
      return sendErrorMessage(res, 500, 'Internal server error')
    }
  });
};
