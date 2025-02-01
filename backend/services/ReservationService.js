const ReservationRepository = require('../repositories/ReservationRepository');
const User = require('../models/User');

class ReservationService {
  // Δημιουργία νέας κράτησης με ελέγχους
  async createReservation(reservationData) {
    const { movie, seat, user_id, showtime } = reservationData;

    // 1️⃣ Έλεγχος αν λείπουν υποχρεωτικά πεδία
    if (!movie || !seat || !user_id || !showtime) {
      throw new Error('Missing required fields: movie, seat, user_id, showtime');
    }

    // 2️⃣ Έλεγχος αν υπάρχει ήδη κράτηση για την ίδια θέση στην ίδια ταινία
    const existingReservation = await ReservationRepository.getReservationByMovieAndSeat(movie, seat);
    if (existingReservation) {
      throw new Error('This seat is already booked for this movie.');
    }

    // 3️⃣ Έλεγχος αν ο χρήστης υπάρχει
    const user = await User.findByPk(user_id);
    if (!user) {
      throw new Error('User not found.');
    }

    // 4️⃣ Έλεγχος αν το showtime είναι στο μέλλον
    const showtimeDate = new Date(showtime);
    const now = new Date();
    if (showtimeDate <= now) {
      throw new Error('Showtime must be in the future.');
    }

    // 5️⃣ Δημιουργία νέας κράτησης
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
  async updateReservation(reservationId, updatedData) {
    const updatedReservation = await ReservationRepository.updateReservation(reservationId, updatedData);
    if (!updatedReservation) {
      throw new Error('Reservation not found');
    }
    return updatedReservation;
  }

  // Διαγραφή κράτησης
  async deleteReservation(reservationId) {
    const result = await ReservationRepository.deleteReservation(reservationId);
    if (!result) {
      throw new Error('Reservation not found');
    }
    return result;
  }
}

module.exports = new ReservationService();