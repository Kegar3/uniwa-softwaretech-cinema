const { Sequelize } = require('sequelize');
require('dotenv').config(); // Φορτώνει τα περιβάλλοντα variables από το .env αρχείο

module.exports = {
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
};

const sequelize = new Sequelize('cinema_db', 'root', '0203', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
