const ReservationRepository = require('../repositories/ReservationRepository');
const User = require('../models/User');
const Movie = require('../models/Movie');

class ReservationService {
  // Δημιουργία νέας κράτησης με ελέγχους
  async createReservation(reservationData) {
    const { showtime_id, seat, user_id } = reservationData;

    // 1. Έλεγχος αν λείπουν υποχρεωτικά πεδία
    if (!showtime_id || !seat || !user_id) {
      throw new Error('Missing required fields: showtime_id, seat, user_id');
    }

    // 2. Έλεγχος αν υπάρχει η προβολή
    const showtime = await Showtime.findByPk(showtime_id);
    if (!showtime) {
      throw new Error('Showtime not found.');
    }

    // 3. Έλεγχος αν η θέση είναι ήδη κρατημένη για αυτή την προβολή
    const existingReservation = await ReservationRepository.getReservationByShowtimeAndSeat(showtime_id, seat);
    if (existingReservation) {
      throw new Error('This seat is already booked for this showtime.');
    }

    // 4. Έλεγχος αν υπάρχουν διαθέσιμες θέσεις
    if (showtime.available_seats <= 0) {
      throw new Error('No available seats for this showtime.');
    }

    // 5. Μείωση διαθέσιμων θέσεων
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
      const existingReservation = await ReservationRepository.getReservationByMovieAndSeat(reservation.movie_id, updatedData.seat);
      if (existingReservation && existingReservation.id !== reservationId) {
        throw new Error('This seat is already booked for this movie');
      }
    }

    return await ReservationRepository.updateReservation(reservationId, updatedData);
  }

  // Διαγραφή κράτησης
  async deleteReservation(reservationId, userId, isAdmin) {
    const reservation = await ReservationRepository.getReservationById(reservationId);
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    return await ReservationRepository.deleteReservation(reservationId);
  }
}

module.exports = new ReservationService();