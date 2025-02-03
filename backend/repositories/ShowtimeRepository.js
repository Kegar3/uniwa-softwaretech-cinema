const Showtime = require('../models/Showtime');

class ShowtimeRepository {
  async createShowtime(showtimeData) {
    return await Showtime.create(showtimeData);
  }

  async getAllShowtimes() {
    return await Showtime.findAll();
  }

  async getShowtimeById(showtimeId) {
    return await Showtime.findByPk(showtimeId);
  }

  async updateShowtime(showtimeId, updatedData) {
    const showtime = await Showtime.findByPk(showtimeId);
    if (!showtime) return null;

    await showtime.update(updatedData);
    return showtime;
  }

  async deleteShowtime(showtimeId) {
    const showtime = await Showtime.findByPk(showtimeId);
    if (!showtime) return null;

    await showtime.destroy();
    return { message: 'Showtime deleted successfully' };
  }

  async getShowtimesByMovieId(movieId) {
    return await Showtime.findAll({ where: { movie_id: movieId } });
  }
}

module.exports = new ShowtimeRepository();
