/**
 * @author Wokoro Douye Samuel
 */

import favoriteRepository from './repository';
import { sendSuccessMessage } from '../../utils';

export default {
  /**
   * @description Controller method to create new favorite movie.
   * 
   * @param {object} param0 - HTTP request body object.
   * 
   * @param {object} res - HTTP response object.
   * 
   * @param {function} next - Function to call next function.
   * 
   * @returns {object} Returns created favorite movie and status code 
   */
  async create({ body }, res, next) {
    try {
      const result = await favoriteRepository.create(body);
      sendSuccessMessage(res, 201, result);
    } catch (err) {
      next(err);
    }
  }
};
