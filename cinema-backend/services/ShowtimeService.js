class ShowtimeService {
  constructor(showtimeRepository, movieRepository) {
    this.showtimeRepository = showtimeRepository;
    this.movieRepository = movieRepository;
  }

  async createShowtime(showtimeData) {
    const { movie_id, hall, start_time } = showtimeData;

    if (!movie_id || !start_time) {
      throw new Error('Missing required fields: movie_id, start_time');
    }

    const movie = await this.movieRepository.getMovieById(movie_id);
    if (!movie) {
      throw new Error('Movie not found.');
    }

    const startTimeDate = new Date(start_time);
    const now = new Date();
    if (startTimeDate <= now) {
      throw new Error('Start time must be in the future.');
    }

    if (!["1", "2"].includes(hall)) {
      throw new Error('Invalid hall number. Allowed values are 1 or 2.');
    }

    return await this.showtimeRepository.createShowtime(showtimeData);
  }

  async getShowtimeById(showtimeId) {
    const showtime = await this.showtimeRepository.getShowtimeById(showtimeId);
    if (!showtime) {
      throw new Error('Showtime not found.');
    }
    return showtime;
  }

  async updateShowtime(showtimeId, updatedData) {
    const showtime = await this.showtimeRepository.getShowtimeById(showtimeId);
    if (!showtime) {
      throw new Error('Showtime not found.');
    }

    if (updatedData.start_time) {
      const newStartTime = new Date(updatedData.start_time);
      const now = new Date();
      if (newStartTime <= now) {
        throw new Error('Start time must be in the future.');
      }
    }

    return await this.showtimeRepository.updateShowtime(showtimeId, updatedData);
  }

  async deleteShowtime(showtimeId) {
    const showtime = await this.showtimeRepository.getShowtimeById(showtimeId);
    if (!showtime) {
      throw new Error('Showtime not found.');
    }

    return await this.showtimeRepository.deleteShowtime(showtimeId);
  }

  async getShowtimesByMovie(movieId) {
    const showtimes = await this.showtimeRepository.getShowtimesByMovieId(movieId);
    if (!showtimes.length) {
      throw new Error('No showtimes found for this movie.');
    }
    return showtimes;
  }

  async getPaginatedShowtimes(page, limit) {
    return await this.showtimeRepository.getPaginatedShowtimes(page, limit);
  }

  async getAllShowtimes(query) {
    return await this.showtimeRepository.getAllShowtimes(query);
  }

  async getAvailableSeats(showtimeId) {
    return await this.showtimeRepository.getAvailableSeats(showtimeId);
  }

  async getReservationsForShowtime(showtimeId) {
    return await this.showtimeRepository.getReservationsForShowtime(showtimeId);
  }
}

module.exports = ShowtimeService;