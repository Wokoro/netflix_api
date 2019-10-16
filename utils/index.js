import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

dotenv.config();
/**
 * A function to load all high level middlewares
 * @param {Object} middlewares
 * @param {Object} router
 * @returns {Void} no return value
 */
export const middlewareLoader = (middlewares, router) => {
  for (const middleware of middlewares) {
    middleware(router);
  }
};

/**
 * A function to load all routes
 * @param {Object} routes
 * @param {Object} router
 * @returns {Void} null
 */
export const routesLoader = (routes, router) => {
  for (const route of routes) {
    const { path, handlers, method } = route;
    (router)[method](path, handlers);
  }
};

/**
 * @description A Function to generate JWT
 * @param {Object} payload 
 * @return {String} the jwt generated
 */
export const generateToken = payload => jwt.sign(payload, process.env.PRI_TOKEN_KEY);

/**
 * function to verify user token
 * @param {Object} token 
 * @returns {Void} returns nothings
 */
export const verifyToken = token => jwt.verify(token, process.env.PRI_KEY);

/**
 * Fuction to verify token
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * @returns {Void} returns void
 */
export const passToken = async (req, res, next) => {
  const rawToken = req.headers.authorization 
  || req.headers['x-access-token'] 
  || req.body.token;
  
  const token = rawToken ? rawToken.split(' ')[1] : false;
  if (token) {
    try {
      const issureToken = verifyToken(token);
      if (issureToken) {
        req.body.token = issureToken;
        return next();
      }
    } catch (err) {
      return res.status(400).json({ status: 400, error: 'Invalid token' });
    }
  }
  return res.status(400).json({ 
    status: 400, 
    error: 'Authorization Failed' 
  });  
};

/**
 * @description Hashes user password
 * 
 * @param {string} password
 * 
 * @returns {string} returns encryted password
 */
export const hashPassword = password => bcrypt.hashSync(password, 10);


/**
 * @description A function to get specific details of a user.
 * 
 * @param {object} user - User object to get details from.
 * 
 * @returns {object} Returns specified user detials.
 */
export const userInfo = (user) => {
  const { uuid, name, email } = user;
  return { uuid, name, email };
};

/**
 * @description A function to send client success message
 * 
 * @param {obejct} res - HTTP response object
 * 
 * @param {integer} code - HTTP status code to send
 * 
 * @param {string} data - Data to send to the client
 * 
 * @returns {object} Returns status code and data to client
 */
export const sendSuccessMessage = (res, code, data) => {
  return res.status(code).send({
    status: 'success',
    data
  })
};

/**
 * @description A function to send client error message.
 * 
 * @param {object} res - HTTP response object
 * 
 * @param {integer} code - HTTP status code to send
 * 
 * @param {string} message - Data to send to the client
 * 
 * @returns {object} Returns status code and data to client
 */
export const sendErrorMessage = (res, code, message) => {
  return res.status(code).send({
    status: 'error',
    message
  })
};
