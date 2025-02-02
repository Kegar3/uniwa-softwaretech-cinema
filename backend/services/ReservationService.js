const ReservationRepository = require('../repositories/ReservationRepository');
const User = require('../models/User');
const Movie = require('../models/Movie');

class ReservationService {
  // Δημιουργία νέας κράτησης με ελέγχους
  async createReservation(reservationData) {
    const { movie_id, seat, user_id, showtime } = reservationData;

    // 1 Έλεγχος αν λείπουν υποχρεωτικά πεδία
    if (!movie_id || !seat || !user_id || !showtime) {
      throw new Error('Missing required fields: movie_id, seat, user_id, showtime');
    }

    // 2 Έλεγχος αν υπάρχει ήδη κράτηση για την ίδια θέση στην ίδια ταινία
    const existingReservation = await ReservationRepository.getReservationByMovieAndSeat(movie_id, seat);
    if (existingReservation) {
      throw new Error('This seat is already booked for this movie.');
    }

    // 3 Έλεγχος αν ο χρήστης υπάρχει
    const user = await User.findByPk(user_id);
    if (!user) {
      throw new Error('User not found.');
    }

    // 4 Έλεγχος αν η ταινία υπάρχει στη βάση
    const movie = await Movie.findByPk(movie_id);
    if (!movie) {
      throw new Error('Movie not found.');
    }

    // 5 Έλεγχος αν το showtime είναι στο μέλλον
    const showtimeDate = new Date(showtime);
    const now = new Date();
    if (showtimeDate <= now) {
      throw new Error('Showtime must be in the future.');
    }

    // 6 Δημιουργία νέας κράτησης
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