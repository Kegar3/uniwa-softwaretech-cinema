const MovieRepository = require('../repositories/MovieRepository');

class MovieService {
  // Δημιουργία νέας ταινίας
  async createMovie(movieData) {
    if (!movieData.title || !movieData.genre || !movieData.duration) {
      throw new Error('Missing required fields: title, genre, duration');
    }
    return await MovieRepository.createMovie(movieData);
  }

  // Ανάκτηση όλων των ταινιών
  async getAllMovies() {
    return await MovieRepository.getAllMovies();
  }

  // Ανάκτηση ταινίας βάσει ID
  async getMovieById(movieId) {
    const movie = await MovieRepository.getMovieById(movieId);
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie;
  }

  // Ενημέρωση ταινίας
  async updateMovie(movieId, updatedData) {
    const updatedMovie = await MovieRepository.updateMovie(movieId, updatedData);
    if (!updatedMovie) {
      throw new Error('Movie not found');
    }
    return updatedMovie;
  }

  // Διαγραφή ταινίας
  async deleteMovie(movieId) {
    const result = await MovieRepository.deleteMovie(movieId);
    if (!result) {
      throw new Error('Movie not found');
    }
    return result;
  }
}

module.exports = new MovieService();
