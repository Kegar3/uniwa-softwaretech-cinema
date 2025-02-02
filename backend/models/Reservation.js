const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./User');
const Showtime = require('./Showtime');

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  showtime_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Showtime,
      key: 'id',
    },
  },
  seat: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});

User.hasMany(Reservation, { foreignKey: 'user_id' });
Reservation.belongsTo(User, { foreignKey: 'user_id' });

Showtime.hasMany(Reservation, { foreignKey: 'showtime_id' });
Reservation.belongsTo(Showtime, { foreignKey: 'showtime_id' });

module.exports = Reservation;
