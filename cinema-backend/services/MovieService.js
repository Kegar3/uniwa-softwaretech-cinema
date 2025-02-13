class MovieService {
  constructor(movieRepository, showtimeRepository) {
    this.movieRepository = movieRepository;
    this.showtimeRepository = showtimeRepository;
  }

  async createMovie(movieData) {
    if (!movieData.title || !movieData.genre || !movieData.duration) {
      throw new Error('Missing required fields: title, genre, duration');
    }
    return await this.movieRepository.createMovie(movieData);
  }

  async getAllMovies() {
    return await this.movieRepository.getAllMovies();
  }

  async getMovieById(movieId) {
    const movie = await this.movieRepository.getMovieById(movieId);
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie;
  }

  async updateMovie(movieId, updatedData) {
    const updatedMovie = await this.movieRepository.updateMovie(movieId, updatedData);
    if (!updatedMovie) {
      throw new Error('Movie not found');
    }
    return updatedMovie;
  }

  async deleteMovie(movieId) {
    const result = await this.movieRepository.deleteMovie(movieId);
    if (!result) {
      throw new Error('Movie not found');
    }
    return result;
  }

  async getMovieShowtimes(movieId) {
    const showtimes = await this.showtimeRepository.getUpcomingShowtimesByMovie(movieId);
    if (showtimes.length === 0) {
      throw new Error('No upcoming showtimes for this movie');
    }
    return showtimes;
  }
}

module.exports = MovieService;