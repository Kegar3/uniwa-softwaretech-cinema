const { Op } = require('sequelize'); 
const Showtime = require('../models/Showtime');
const Reservation = require('../models/Reservation');

class ShowtimeRepository {

  // Δημιουργία προβολής με βάση τα δεδομένα που δίνονται στην showtimeData
  async createShowtime(showtimeData) {
    return await Showtime.create(showtimeData);
  }

  // Επιστρέφει την προβολή με βάση το showtimeId
  async getShowtimeById(showtimeId) {
    return await Showtime.findByPk(showtimeId);
  }

  // Ενημέρωση προβολής με βάση το showtimeId και τα νέα δεδομένα
  async updateShowtime(showtimeId, updatedData) {
    const showtime = await Showtime.findByPk(showtimeId);
    if (!showtime) return null;

    await showtime.update(updatedData);
    return showtime;
  }

  // Διαγραφή προβολής με βάση το showtimeId
  async deleteShowtime(showtimeId) {
    const showtime = await Showtime.findByPk(showtimeId);
    if (!showtime) return null;

    await showtime.destroy();
    return { message: 'Showtime deleted successfully' };
  }

  // Επιστρέφει τις προβολές με βάση το movie_id
  async getShowtimesByMovieId(movieId) {
    return await Showtime.findAll({ where: { movie_id: movieId } });
  }

  // Επιστρέφει τις προβολές με παγιωμένη σειρά και δυνατότητα παγιωμένου limit και offset
  async getPaginatedShowtimes(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    return await Showtime.findAndCountAll({
      limit,
      offset,
      order: [['start_time', 'ASC']], // Ταξινόμηση με βάση την ώρα
    });
  }

  // Επιστρέφει τις προβολές με βάση το movie_id και την ώρα που είναι μεγαλύτερη από την τρέχουσα
  async getUpcomingShowtimesByMovie(movieId) {
    const now = new Date();
    return await Showtime.findAll({
        where: {
            movie_id: movieId,
            start_time: { [Op.gt]: now }, // Μόνο μελλοντικές προβολές
        },
        order: [['start_time', 'ASC']], // Ταξινόμηση χρονικά
        attributes: ['id', 'hall', 'start_time', 'available_seats'],
    });
  }

  // Επιστρέφει τις προβολές με βάση το movie_id και την ώρα που είναι μεγαλύτερη από την τρέχουσα
  async getAllShowtimes({ page = 1, limit = 10, movie_id, hall, date }) {
    const offset = (page - 1) * limit;
    const whereClause = {};

    if (movie_id) whereClause.movie_id = movie_id;
    if (hall) whereClause.hall = hall.toString();
    if (date) whereClause.start_time = { [Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`] };

    const showtimes = await Showtime.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['start_time', 'ASC']],
    });

    return {
      totalShowtimes: showtimes.count,
      totalPages: Math.ceil(showtimes.count / limit),
      currentPage: parseInt(page),
      showtimes: showtimes.rows,
    };
  }

  // Επιστρέφει τις διαθέσιμες θέσεις για μια συγκεκριμένη προβολή
  async getAvailableSeats(showtimeId) {
    // Βρίσκουμε το Showtime
    const showtime = await Showtime.findByPk(showtimeId);
    if (!showtime) return null;

    // Παίρνουμε τις κρατημένες θέσεις
    const reservations = await Reservation.findAll({
        where: { showtime_id: showtimeId },
        attributes: ['seat']
    });

    // Δημιουργούμε έναν πίνακα με τις κρατημένες θέσεις
    const reservedSeats = reservations.map(res => res.seat);

    // Υποθέτουμε ότι κάθε αίθουσα έχει 50 θέσεις
    const totalSeats = 50;
    const availableSeats = [];

    for (let i = 1; i <= totalSeats; i++) {
        if (!reservedSeats.includes(`S${i}`)) {
            availableSeats.push(`S${i}`);
        }
    }

    return { showtime_id: showtimeId, availableSeats };
  }
  

  // Επιστρέφει τις κρατήσεις για μια συγκεκριμένη προβολή
  async getReservationsForShowtime(showtimeId) {
    return await Reservation.findAll({
      where: { showtime_id: showtimeId },
      attributes: ['seat', 'user_id']
    });
  }

}

module.exports = new ShowtimeRepository();
