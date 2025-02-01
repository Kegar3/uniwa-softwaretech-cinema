const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./User');

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  movie: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  seat: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  showtime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

User.hasMany(Reservation, { foreignKey: 'user_id' });
Reservation.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Reservation;
