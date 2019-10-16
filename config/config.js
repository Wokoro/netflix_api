/**
 * @author Sequelize, Wokoro Douye Samuel
 */
 
import dotenv from 'dotenv';

dotenv.config();

 module.exports = {
   development: {
     use_env_variable: 'DATABASE_URL',
     dialect: 'postgres'
   },
   test: {
     use_env_variable: 'database_test',
     dialect: 'postgres'
   },
   production: {
     use_env_variable: 'database_production',
     dialect: 'postgres',
     host: '127.0.0.1'   
   }
 };
 