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

  // Ανάκτηση όλων των κρατήσεων (Μόνο Admins - έλεγχος μέσω middleware)
  async getAllReservations(req, res) {
    try {
      const reservations = await ReservationService.getAllReservations();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Ανάκτηση μιας κράτησης με βάση το ID (Μόνο ο κάτοχος ή Admins - έλεγχος μέσω middleware)
  async getReservationById(req, res) {
    try {
      const reservation = await ReservationService.getReservationById(req.params.id);
      res.json(reservation);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Ανάκτηση κρατήσεων συγκεκριμένου χρήστη (Μόνο ο ίδιος ο χρήστης ή Admins - middleware)
  async getReservationsByUserId(req, res) {
    try {
      const reservations = await ReservationService.getReservationsByUserId(req.params.userId);
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Ενημέρωση κράτησης (Μόνο ο κάτοχος ή Admins - middleware)
  async updateReservation(req, res) {
    try {
      const updatedReservation = await ReservationService.updateReservation(req.params.id, req.user.id, {
        ...req.body,
        user_role: req.user.role, // **Προσθέτουμε το role στο request**
      });
      res.json(updatedReservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Διαγραφή κράτησης (Μόνο ο κάτοχος ή Admins - middleware)
  async deleteReservation(req, res) {
    try {
      await ReservationService.deleteReservation(req.params.id);
      res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ReservationController();
