const MovieService = require('../services/MovieService');
const movieRepository = require('../repositories/MovieRepository');
const showtimeRepository = require('../repositories/ShowtimeRepository');

const movieService = new MovieService(movieRepository, showtimeRepository);

class MovieController {
  async createMovie(req, res) {
    try {
      const movieData = req.body;
      if (req.file) {
        movieData.poster_url = `/images/${req.file.filename}`; // Save the file path
      }
      const movie = await movieService.createMovie(movieData);
      res.status(201).json(movie);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllMovies(req, res) {
    try {
      const movies = await movieService.getAllMovies();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMovieById(req, res) {
    try {
      const movie = await movieService.getMovieById(req.params.id);
      res.json(movie);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateMovie(req, res) {
    try {
      const updatedMovie = await movieService.updateMovie(req.params.id, req.body);
      res.json(updatedMovie);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async deleteMovie(req, res) {
    try {
      await movieService.deleteMovie(req.params.id);
      res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getMovieShowtimes(req, res) {
    try {
      const showtimes = await movieService.getMovieShowtimes(req.params.id);
      res.json(showtimes);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new MovieController();