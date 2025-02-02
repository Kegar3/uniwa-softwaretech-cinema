const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Movie = require('./Movie');

const Showtime = sequelize.define('Showtime', {
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
    onDelete: 'CASCADE', // Αν διαγραφεί μια ταινία, διαγράφονται και τα showtimes της
  },
  hall: {
    type: DataTypes.ENUM('1', '2'), // Υποστηρίζουμε μόνο 2 αίθουσες
    allowNull: false,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  available_seats: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 50, // Θεωρούμε ότι κάθε αίθουσα έχει 50 θέσεις
  },
}, {
  timestamps: true, // Ενεργοποίηση timestamps για createdAt & updatedAt
});

Movie.hasMany(Showtime, { foreignKey: 'movie_id', onDelete: 'CASCADE' });
Showtime.belongsTo(Movie, { foreignKey: 'movie_id' });

module.exports = Showtime;
