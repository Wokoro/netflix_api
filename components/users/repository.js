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
}

export default new UserRepository();
