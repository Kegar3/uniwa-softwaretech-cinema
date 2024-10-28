const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cinema_db', 'root', '0203', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
