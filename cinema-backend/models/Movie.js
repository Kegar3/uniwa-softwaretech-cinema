const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Movie = sequelize.define('Movie', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true, // Το όνομα της ταινίας πρέπει να είναι μοναδικό
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    poster_url: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
  
  module.exports = Movie;