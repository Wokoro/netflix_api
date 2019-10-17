/**
 * @auther Wokoro Douye Samuel
 */

import { favoriteMoviesCreateValidations } from './validation';
import favoriteController from './controller';
import {passToken} from '../../utils'

/**
 * @description Variable to hold user routes.
 */
export default [
  {
    path: '/favorite/create',
    handlers: [passToken, ...favoriteMoviesCreateValidations, favoriteController.create],
    method: 'post'
  }
];
