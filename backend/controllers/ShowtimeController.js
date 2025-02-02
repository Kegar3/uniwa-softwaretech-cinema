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
      const showtimes = await ShowtimeService.getAllShowtimes();
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
}

module.exports = new ShowtimeController();
