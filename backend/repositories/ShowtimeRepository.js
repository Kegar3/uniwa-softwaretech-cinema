const Showtime = require('../models/Showtime');

class ShowtimeRepository {

  // Δημιουργία προβολής με βάση τα δεδομένα που δίνονται στην showtimeData
  async createShowtime(showtimeData) {
    return await Showtime.create(showtimeData);
  }

  // Επιστρέφει όλες τις προβολές
  async getAllShowtimes() {
    return await Showtime.findAll();
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
}

module.exports = new ShowtimeRepository();
