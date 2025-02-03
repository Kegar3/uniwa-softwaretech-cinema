const AdminRepository = require('../repositories/AdminRepository');

class AdminService {
  async getAdminStats() {
    const totalReservations = await AdminRepository.getTotalReservations();
    const reservationsByMovie = await AdminRepository.getReservationsByMovie();
    const mostPopularMovies = await AdminRepository.getMostPopularMovies();
    const availableSeatsByShowtime = await AdminRepository.getAvailableSeatsByShowtime();

    return {
      totalReservations,
      reservationsByMovie,
      mostPopularMovies,
      availableSeatsByShowtime
    };
  }
}

module.exports = new AdminService();
