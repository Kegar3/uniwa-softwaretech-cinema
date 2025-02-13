class AdminService {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async getAdminStats() {
    const totalReservations = await this.adminRepository.getTotalReservations();
    const reservationsByMovie = await this.adminRepository.getReservationsByMovie();
    const mostPopularMovies = await this.adminRepository.getMostPopularMovies();
    const availableSeatsByShowtime = await this.adminRepository.getAvailableSeatsByShowtime();

    return {
      totalReservations,
      reservationsByMovie,
      mostPopularMovies,
      availableSeatsByShowtime
    };
  }
}

module.exports = AdminService;