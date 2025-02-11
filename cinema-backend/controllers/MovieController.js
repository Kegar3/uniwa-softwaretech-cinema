const MovieService = require('../services/MovieService');
const ShowtimeService = require('../services/ShowtimeService');

class MovieController {
  // Δημιουργία νέας ταινίας
  async createMovie(req, res) {
    try {
      const movie = await MovieService.createMovie(req.body);
      res.status(201).json(movie);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Ανάκτηση όλων των ταινιών
  async getAllMovies(req, res) {
    try {
      const movies = await MovieService.getAllMovies();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Ανάκτηση ταινίας βάσει ID
  async getMovieById(req, res) {
    try {
      const movie = await MovieService.getMovieById(req.params.id);
      res.json(movie);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Ενημέρωση ταινίας
  async updateMovie(req, res) {
    try {
      const updatedMovie = await MovieService.updateMovie(req.params.id, req.body);
      res.json(updatedMovie);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Διαγραφή ταινίας
  async deleteMovie(req, res) {
    try {
      await MovieService.deleteMovie(req.params.id);
      res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Ανάκτηση προβολών μιας ταινίας
  async getMovieShowtimes(req, res) {
    try {
      const showtimes = await ShowtimeService.getShowtimesByMovie(req.params.id);
      res.json(showtimes);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Ανάκτηση μελλοντικών προβολών μιας ταινίας
  async getMovieShowtimes(req, res) {
    try {
        const movieId = req.params.id;
        const showtimes = await MovieService.getMovieShowtimes(movieId);
        res.json(showtimes);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
  }

}

module.exports = new MovieController();
