/**
 * @author Wokoro Douye Samuel
 */

import Models from '../../database/models';

const { User } = Models;

/**
 * User repository class
 * 
 * @class
 */
class UserRepository {
  /**
   * @constructor
   */
  constructor() {
    this.model = User;
  }

  /**
   * @description Create new user with the provided parameters
   * 
   * @param {string} param0 - Name of the user
   * 
   * @param {string} param1 - Password of the user
   * 
   * @param {string} param2 - token of the user
   *  
   * @return {object} Returns newly created user
   */
  create({
    name, password, email
  }) {
    return this.model.create({
      name, email, password
    });
  }

    /**
   * @description Returns user details based on the provided parameters.
   *
   * @param {object} condition - Condition to find user with.
   *
   * @param {string} include - Optional fields to attach to user details.
   *
   * @return {object} Returns user details with with optional fields.
   */
  getOne(condition = {}, include = '') {
    return this.model.findOne({ where: condition, include });
  }
}

export default new UserRepository();
