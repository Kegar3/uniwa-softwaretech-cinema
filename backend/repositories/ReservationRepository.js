const Reservation = require('../models/Reservation');

class ReservationRepository {
  // Δημιουργία νέας κράτησης
  async createReservation(reservationData) {
    return await Reservation.create(reservationData);
  }

  // Ανάκτηση όλων των κρατήσεων
  async getAllReservations() {
    return await Reservation.findAll();
  }

  // Ανάκτηση μιας κράτησης με βάση το ID
  async getReservationById(reservationId) {
    return await Reservation.findByPk(reservationId);
  }

  // Επιστροφή κράτησης βάσει ταινίας και θέσης (για έλεγχο μοναδικότητας)
  async getReservationByMovieAndSeat(movie, seat) {
    return await Reservation.findOne({ where: { movie, seat } });
  }

  // Ανάκτηση κρατήσεων συγκεκριμένου χρήστη
  async getReservationsByUserId(userId) {
    return await Reservation.findAll({ where: { user_id: userId } });
  }

  // Ενημέρωση κράτησης
  async updateReservation(reservationId, updatedData) {
    const reservation = await Reservation.findByPk(reservationId);
    if (!reservation) return null;

    await reservation.update(updatedData);
    return reservation;
  }

  // Διαγραφή κράτησης
  async deleteReservation(reservationId) {
    const reservation = await Reservation.findByPk(reservationId);
    if (!reservation) return null;

    await reservation.destroy();
    return { message: 'Reservation deleted successfully' };
  }
}

module.exports = new ReservationRepository();
