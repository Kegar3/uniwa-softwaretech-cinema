const { Sequelize } = require('sequelize');
const Reservation = require('../models/Reservation');
const Showtime = require('../models/Showtime');
const Movie = require('../models/Movie');

class AdminRepository {
  // Συνολικός αριθμός κρατήσεων
  async getTotalReservations() {
    return await Reservation.count();
  }

  // Κρατήσεις ανά ταινία
  async getReservationsByMovie() {
    return await Reservation.findAll({
      attributes: [
        'showtime_id',
        [Sequelize.fn('COUNT', Sequelize.col('Reservation.id')), 'total_reservations']
      ],
      group: ['showtime_id'],
      include: [{ model: Showtime, include: [{ model: Movie }] }]
    });
  }

  // Ταινίες με τις περισσότερες προβολές
  async getMostPopularMovies() {
    return await Showtime.findAll({
      attributes: [
        'movie_id',
        [Sequelize.fn('COUNT', Sequelize.col('Showtime.id')), 'total_showtimes']
      ],
      group: ['movie_id'],
      include: [{ model: Movie }]
    });
  }

  // Διαθέσιμες θέσεις ανά προβολή
  async getAvailableSeatsByShowtime() {
    return await Showtime.findAll({
      attributes: [
        ['id', 'showtime_id'],  // Δίνουμε alias για αποφυγή αμφισημίας
        'available_seats',
        'start_time'
      ],
      order: [['start_time', 'ASC']]
    });
  }
}

module.exports = new AdminRepository();
