/**
 * @author Wokoro Douye Samuel
 */

import Models from '../../database/models';

const { Favorite } = Models;

/**
 * User repository class
 * 
 * @class
 */
class FavoriteRepository {
  /**
   * @constructor
   */
  constructor() {
    this.model = Favorite;
  }

  /**
   * @description Create new favorite movie with the provided parameters
   * 
   * @param {string} param0 - Name of the user
   * 
   * @param {string} param1 - Password of the user
   * 
   * @param {string} param2 - token of the user
   *  
   * @return {object} Returns newly created favorite movie
   */
  create({ token:{ uuid: user_uuid }, url }) {
    return this.model.create({ user_uuid, url });
  }

    /**
   * @description Returns Favorite movie details based on the provided parameters.
   *
   * @param {object} condition - Condition to find user with.
   *
   * @param {string} include - Optional fields to attach to user details.
   *
   * @return {object} Returns favorite movie details with with optional fields.
   */
  getOne(condition = {}, include = '') {
    return this.model.findOne({ where: condition, include });
  }
}

export default new FavoriteRepository();
