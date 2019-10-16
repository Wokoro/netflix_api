/**
 * @auther Wokoro Douye Samuel
 */

import { signupInputValidation, userSigninInputValidations, checkUserExistence } from './validation';
import userController from './controller';

/**
 * @description Variable to hold user routes.
 */
export default [
  {
    path: '/signup',
    handlers: [...signupInputValidation, userController.create],
    method: 'post',
  },
  {
    path: '/signin',
    handlers: [
      ...userSigninInputValidations, 
      checkUserExistence,
      userController.signin
    ],
    method: 'post'
  },
];
