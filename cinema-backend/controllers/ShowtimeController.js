const ShowtimeService = require('../services/ShowtimeService');

class ShowtimeController {
  // Δημιουργία νέας προβολής (Μόνο Admins)
  async createShowtime(req, res) {
    try {
      const showtime = await ShowtimeService.createShowtime(req.body);
      res.status(201).json(showtime);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Ανάκτηση όλων των προβολών
  async getAllShowtimes(req, res) {
    try {
      //console.log("Controller: Received query params", req.query);
      const showtimes = await ShowtimeService.getAllShowtimes(req.query);
      res.json(showtimes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Ανάκτηση συγκεκριμένης προβολής βάσει ID
  async getShowtimeById(req, res) {
    try {
      const showtime = await ShowtimeService.getShowtimeById(req.params.id);
      res.json(showtime);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Ενημέρωση προβολής (Μόνο Admins)
  async updateShowtime(req, res) {
    try {
      const updatedShowtime = await ShowtimeService.updateShowtime(req.params.id, req.body);
      res.json(updatedShowtime);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Διαγραφή προβολής (Μόνο Admins)
  async deleteShowtime(req, res) {
    try {
      await ShowtimeService.deleteShowtime(req.params.id);
      res.json({ message: 'Showtime deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Ανάκτηση προβολών βάσει ID ταινίας
  async getPaginatedShowtimes(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      
      const { count, rows } = await ShowtimeService.getPaginatedShowtimes(page, limit);
  
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

  // Ανάκτηση θέσεων για συγκεκριμένη προβολή
  async getAvailableSeats(req, res) {
    try {
      const { id } = req.params;
      const result = await ShowtimeService.getAvailableSeats(id);

      if (!result) {
          return res.status(404).json({ error: 'Showtime not found' });
      }

      res.json(result);
    } catch (error) {
        console.error('Error fetching available seats:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Ανάκτηση κρατήσεων για συγκεκριμένη προβολή
  async getReservationsForShowtime(req, res) {
    try {
      const { id } = req.params;
      const reservations = await ShowtimeService.getReservationsForShowtime(id);

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
