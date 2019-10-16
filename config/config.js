/**
 * @author Sequelize, Wokoro Douye Samuel
 */
 
 module.exports = {
   development: {
     use_env_variable: 'DATABASE_URL',
     dialect: 'postgres',
   },
   test: {
     use_env_variable: 'database_test',
     dialect: 'postgres',
   },
   production: {
     use_env_variable: 'database_production',
     dialect: 'postgres',
     host: '127.0.0.1',    
   },
 };
 