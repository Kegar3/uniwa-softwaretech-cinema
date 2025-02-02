const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./User');
const Movie = require('./Movie');

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Movie,
      key: 'id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  seat: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  showtime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

User.hasMany(Reservation, { foreignKey: 'user_id' });
Reservation.belongsTo(User, { foreignKey: 'user_id' });

Movie.hasMany(Reservation, { foreignKey: 'movie_id' });
Reservation.belongsTo(Movie, { foreignKey: 'movie_id' });

module.exports = Reservation;