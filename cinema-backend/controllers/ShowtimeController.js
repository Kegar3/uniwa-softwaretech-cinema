const ShowtimeService = require('../services/ShowtimeService');
const showtimeRepository = require('../repositories/ShowtimeRepository');
const movieRepository = require('../repositories/MovieRepository');

const showtimeService = new ShowtimeService(showtimeRepository, movieRepository);

class ShowtimeController {
  async createShowtime(req, res) {
    try {
      const showtime = await showtimeService.createShowtime(req.body);
      res.status(201).json(showtime);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllShowtimes(req, res) {
    try {
      const showtimes = await showtimeService.getAllShowtimes(req.query);
      res.json(showtimes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getShowtimeById(req, res) {
    try {
      const showtime = await showtimeService.getShowtimeById(req.params.id);
      res.json(showtime);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateShowtime(req, res) {
    try {
      const updatedShowtime = await showtimeService.updateShowtime(req.params.id, req.body);
      res.json(updatedShowtime);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteShowtime(req, res) {
    try {
      await showtimeService.deleteShowtime(req.params.id);
      res.json({ message: 'Showtime deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPaginatedShowtimes(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const { count, rows } = await showtimeService.getPaginatedShowtimes(page, limit);

      res.json({
        total: count,
        page,
        limit,
        showtimes: rows
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAvailableSeats(req, res) {
    try {
      const { id } = req.params;
      const result = await showtimeService.getAvailableSeats(id);

      if (!result) {
        return res.status(404).json({ error: 'Showtime not found' });
      }

      res.json(result);
    } catch (error) {
      console.error('Error fetching available seats:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getReservationsForShowtime(req, res) {
    try {
      const { id } = req.params;
      const reservations = await showtimeService.getReservationsForShowtime(id);

      if (!reservations) {
        return res.status(404).json({ error: 'No reservations found for this showtime' });
      }

      res.json(reservations);
    } catch (error) {
      console.error('Error fetching reservations for showtime:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new ShowtimeController();