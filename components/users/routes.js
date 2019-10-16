/**
 * @auther Wokoro Douye Samuel
 */

import { inputValidation } from './validation';
import userControllers from './controller';

/**
 * @description Variable to hold user routes.
 */
export default [
  {
    path: '/signup',
    handlers: [...inputValidation, userControllers.create],
    method: 'post',
  }
];
