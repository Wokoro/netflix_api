/**
 * @author Wokoro Douye Samuel
 */

import userRepository from './repository';
import { sendSuccessMessage, generateToken, userInfo} from '../../utils';

export default {
  /**
   * @description Controller method to create new user.
   * 
   * @param {object} param0 - HTTP request body object.
   * 
   * @param {object} res - HTTP response object.
   * 
   * @param {function} next - Function to call next function.
   * 
   * @returns {object} Returns created user and status code 
   */
  async create({ body }, res, next) {
    try {
      const result = await userRepository.create(body);
      const userInfos = userInfo(result);
      const token = generateToken(userInfos);
      userInfos.token = token;
      sendSuccessMessage(res, 201, userInfos);
    } catch (err) {
      next(err);
    }
  },

  /** 
   * @description Controller method to sign in user.
   * 
   * @param {object} param0 - HTTP request body object.
   * 
   * @param {object} res - HTTP response object.
   * 
   * @returns {object} Returns sucess message and user token 
  */
  async signin ({ body }, res, next){
    try{
      const userInfos = userInfo(body);
      const token = generateToken(userInfos);
      userInfos.token = token;
      sendSuccessMessage(res, 200, userInfos)
    } catch(err) {
      next(err);
    }
  }
};
