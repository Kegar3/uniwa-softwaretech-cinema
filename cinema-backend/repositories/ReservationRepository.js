const Reservation = require('../models/Reservation');
const Showtime = require('../models/Showtime');
const Movie = require('../models/Movie');

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

  // Ανάκτηση κρατήσεων συγκεκριμένου χρήστη
  async getReservationsByUserId(userId) {
    return await Reservation.findAll({
      where: { user_id: userId },
      include: [
          {
              model: Showtime,
              attributes: ['start_time'],
              include: [
                  {
                      model: Movie,
                      attributes: ['title']
                  }
              ]
          }
      ],
      attributes: ['id', 'seat']
  });
}

  // Ανάκτηση μιας κράτησης με βάση το ID προβολής και τη θέση
  async getReservationByShowtimeAndSeat(showtime_id, seat) {
    return await Reservation.findOne({ where: { showtime_id, seat } });
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

  // Ανάκτηση παγιωμένων κρατήσεων με δυνατότητα φιλτραρίσματος
  async getPaginatedReservations(page = 1, limit = 10, filters = {}) {
    const offset = (page - 1) * limit;
    return await Reservation.findAndCountAll({
      where: filters,
      limit,
      offset,
      order: [['createdAt', 'DESC']], // Ταξινόμηση με βάση την ημερομηνία κράτησης
      include: [
        {
            model: Showtime,
            attributes: ['start_time'],
            include: [
                {
                    model: Movie,
                    attributes: ['title']
                }
            ]
        }
      ],
    attributes: ['id', 'seat']
    });
  }
}

module.exports = new ReservationRepository();
