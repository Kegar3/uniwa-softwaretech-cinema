const ReservationService = require('../services/ReservationService');

class ReservationController {
  // Δημιουργία νέας κράτησης
  async createReservation(req, res) {
    try {
      const reservation = await ReservationService.createReservation(req.body);
      res.status(201).json(reservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Ανάκτηση όλων των κρατήσεων (Μόνο Admins)
  async getAllReservations(req, res) {
    try {
      const reservations = await ReservationService.getAllReservations();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Ανάκτηση μιας κράτησης με βάση το ID
  async getReservationById(req, res) {
    try {
      const reservation = await ReservationService.getReservationById(req.params.id);
      res.json(reservation);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Ανάκτηση κρατήσεων συγκεκριμένου χρήστη (Μόνο ο ίδιος ο χρήστης ή Admins)
  async getReservationsByUserId(req, res) {
    try {
      if (req.user.role !== 'admin' && req.user.id !== parseInt(req.params.userId)) {
        return res.status(403).json({ error: 'Access denied' });
      }
      const reservations = await ReservationService.getReservationsByUserId(req.params.userId);
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Ενημέρωση κράτησης (Μόνο ο ίδιος ο χρήστης ή Admins)
  async updateReservation(req, res) {
    try {
      if (req.user.role !== 'admin' && req.user.id !== parseInt(req.body.user_id)) {
        return res.status(403).json({ error: 'Access denied' });
      }
      const updatedReservation = await ReservationService.updateReservation(req.params.id, req.body);
      res.json(updatedReservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Διαγραφή κράτησης (Μόνο Admins)
  async deleteReservation(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
      }
      await ReservationService.deleteReservation(req.params.id);
      res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ReservationController();
