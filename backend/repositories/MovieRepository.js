const Movie = require('../models/Movie');

class MovieRepository {
  // Δημιουργία νέας ταινίας
  async createMovie(movieData) {
    return await Movie.create(movieData);
  }

  // Ανάκτηση όλων των ταινιών
  async getAllMovies() {
    return await Movie.findAll();
  }

  // Ανάκτηση ταινίας με βάση το ID
  async getMovieById(movieId) {
    return await Movie.findByPk(movieId);
  }

  // Ενημέρωση ταινίας
  async updateMovie(movieId, updatedData) {
    const movie = await Movie.findByPk(movieId);
    if (!movie) return null;

    await movie.update(updatedData);
    return movie;
  }

  // Διαγραφή ταινίας
  async deleteMovie(movieId) {
    const movie = await Movie.findByPk(movieId);
    if (!movie) return null;

    await movie.destroy();
    return { message: 'Movie deleted successfully' };
  }
}

module.exports = new MovieRepository();
