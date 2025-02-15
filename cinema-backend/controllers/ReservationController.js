const ReservationService = require('../services/ReservationService');
const reservationRepository = require('../repositories/ReservationRepository');
const showtimeRepository = require('../repositories/ShowtimeRepository');

const reservationService = new ReservationService(reservationRepository, showtimeRepository);

class ReservationController {
  async createReservation(req, res) {
    try {
      const reservation = await reservationService.createReservation(req.body);
      res.status(201).json(reservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllReservations(req, res) {
    try {
      const reservations = await reservationService.getAllReservations();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getReservationById(req, res) {
    try {
      const reservation = await reservationService.getReservationById(req.params.id);
      res.json(reservation);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getReservationsByUserId(req, res) {
    try {
      const userId = req.params.userId;
      const reservations = await reservationService.getReservationsByUserId(userId);
      res.json(reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateReservation(req, res) {
    try {
      const updatedReservation = await reservationService.updateReservation(req.params.id, req.user.id, {
        ...req.body,
        user_role: req.user.role,
      });
      res.json(updatedReservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async cancelReservation(req, res) {
    try {
      await reservationService.cancelReservation(parseInt(req.params.id), req.user);
      res.json({ message: 'Reservation cancelled successfully.' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserReservations(req, res) {
    try {
      const reservations = await reservationService.getReservationsByUser(parseInt(req.params.id), req.user);
      res.json(reservations);
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  }

  async getPaginatedReservations(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const filters = {};

      if (req.query.user_id) filters.user_id = req.query.user_id;
      if (req.query.showtime_id) filters.showtime_id = req.query.showtime_id;

      const { count, rows } = await reservationService.getPaginatedReservations(page, limit, filters);

      res.json({
        total: count,
        page,
        limit,
        reservations: rows
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ReservationController();