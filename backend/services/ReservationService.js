const ReservationRepository = require('../repositories/ReservationRepository');
const Showtime = require('../models/Showtime'); //κανονικα θα επρεπε να ειναι με καποιο service

class ReservationService {
  // Δημιουργία νέας κράτησης με ελέγχους
  async createReservation(reservationData) {
    const { showtime_id, seat, user_id } = reservationData;

    // 1. Έλεγχος αν λείπουν υποχρεωτικά πεδία
    if (!showtime_id || !seat || !user_id) {
      throw new Error('Missing required fields: showtime_id, seat, user_id');
    }

    // 2. Έλεγχος αν η θέση έχει έγκυρο τύπο δεδομένων
    const seatRegex = /^[A-E][1-9]$|^[A-E]10$/;
    if (!seatRegex.test(seat)) {
      throw new Error('Invalid seat format. Expected format is "A1-E10".');
    }

    // 3. Έλεγχος αν υπάρχει η προβολή
    const showtime = await Showtime.findByPk(showtime_id);
    if (!showtime) {
      throw new Error('Showtime not found.');
    }

    // 4. Έλεγχος αν η θέση είναι ήδη κρατημένη για αυτή την προβολή
    const existingReservation = await ReservationRepository.getReservationByShowtimeAndSeat(showtime_id, seat);
    if (existingReservation) {
      throw new Error('This seat is already booked for this showtime.');
    }

    // 5. Έλεγχος αν υπάρχουν διαθέσιμες θέσεις
    if (showtime.available_seats <= 0) {
      throw new Error('No available seats for this showtime.');
    }

    // 6. Μείωση διαθέσιμων θέσεων
    await showtime.update({ available_seats: showtime.available_seats - 1 });

    return await ReservationRepository.createReservation(reservationData);
  }

    // Ανάκτηση όλων των κρατήσεων
  async getAllReservations() {
    return await ReservationRepository.getAllReservations();
  }

  // Ανάκτηση μιας κράτησης με βάση το ID
  async getReservationById(reservationId) {
    const reservation = await ReservationRepository.getReservationById(reservationId);
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    return reservation;
  }

  // Ανάκτηση κρατήσεων συγκεκριμένου χρήστη
  async getReservationsByUserId(userId) {
    return await ReservationRepository.getReservationsByUserId(userId);
  }

  // Ενημέρωση κράτησης
  async updateReservation(reservationId, userId, updatedData) {
    const reservation = await ReservationRepository.getReservationById(reservationId);
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    // Αν υπάρχει νέα θέση, ελέγχει αν είναι διαθέσιμη
    if (updatedData.seat) {
      const existingReservation = await ReservationRepository.getReservationByShowtimeAndSeat(
        reservation.showtime_id,
        updatedData.seat
      );

      if (existingReservation && existingReservation.id !== reservationId) {
        throw new Error('This seat is already booked for this showtime');
      }
    }

    return await ReservationRepository.updateReservation(reservationId, updatedData);
  }

  // Διαγραφή κράτησης
  async cancelReservation(reservationId, user) {
    const reservation = await ReservationRepository.getReservationById(reservationId);
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    const showtime = await Showtime.findByPk(reservation.showtime_id);
    if (!showtime) {
      throw new Error('Showtime not found.');
    }

    if (new Date(showtime.start_time) <= new Date()) {
      throw new Error('Cannot cancel a past or ongoing reservation.');
    }

    // Επιστροφή της θέσης στο Showtime
    await showtime.update({ available_seats: showtime.available_seats + 1 });

    return await ReservationRepository.deleteReservation(reservationId);
  }

  // Ανάκτηση κρατήσεων συγκεκριμένου χρήστη
  async getReservationsByUser(userId, requestUser) {
    const reservations = await ReservationRepository.getReservationsByUserId(userId);
    if (!reservations.length) {
      throw new Error('No reservations found for this user.');
    }

    return reservations;
  }

  // Ανάκτηση παγιωμένων κρατήσεων με δυνατότητα φιλτραρίσματος
  async getPaginatedReservations(page, limit, filters) {
    return await ReservationRepository.getPaginatedReservations(page, limit, filters);
  }
  
}

module.exports = new ReservationService();