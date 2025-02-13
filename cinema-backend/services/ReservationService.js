class ReservationService {
  constructor(reservationRepository, showtimeRepository) {
    this.reservationRepository = reservationRepository;
    this.showtimeRepository = showtimeRepository;
  }

  async createReservation(reservationData) {
    const { showtime_id, seat, user_id } = reservationData;

    if (!showtime_id || !seat || !user_id) {
      throw new Error('Missing required fields: showtime_id, seat, user_id');
    }

    const seatRegex = /^[A-E][1-9]$|^[A-E]10$/;
    if (!seatRegex.test(seat)) {
      throw new Error('Invalid seat format. Expected format is A1-E10.');
    }

    const showtime = await this.showtimeRepository.getShowtimeById(showtime_id);
    if (!showtime) {
      throw new Error('Showtime not found.');
    }

    const existingReservation = await this.reservationRepository.getReservationByShowtimeAndSeat(showtime_id, seat);
    if (existingReservation) {
      throw new Error('This seat is already booked for this showtime.');
    }

    if (showtime.available_seats <= 0) {
      throw new Error('No available seats for this showtime.');
    }

    await showtime.update({ available_seats: showtime.available_seats - 1 });

    return await this.reservationRepository.createReservation(reservationData);
  }

  async getAllReservations() {
    return await this.reservationRepository.getAllReservations();
  }

  async getReservationById(reservationId) {
    const reservation = await this.reservationRepository.getReservationById(reservationId);
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    return reservation;
  }

  async getReservationsByUserId(userId) {
    const reservations = await this.reservationRepository.getReservationsByUserId(userId);
    return reservations.map(res => ({
      id: res.id,
      movie: res.Showtime.Movie.title,
      showtime: res.Showtime.start_time,
      seat: res.seat
    }));
  }

  async updateReservation(reservationId, userId, updatedData) {
    const reservation = await this.reservationRepository.getReservationById(reservationId);
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    if (updatedData.seat) {
      const existingReservation = await this.reservationRepository.getReservationByShowtimeAndSeat(
        reservation.showtime_id,
        updatedData.seat
      );

      if (existingReservation && existingReservation.id !== reservationId) {
        throw new Error('This seat is already booked for this showtime');
      }
    }

    return await this.reservationRepository.updateReservation(reservationId, updatedData);
  }

  async cancelReservation(reservationId, user) {
    const reservation = await this.reservationRepository.getReservationById(reservationId);
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    const showtime = await this.showtimeRepository.getShowtimeById(reservation.showtime_id);
    if (!showtime) {
      throw new Error('Showtime not found.');
    }

    if (new Date(showtime.start_time) <= new Date()) {
      throw new Error('Cannot cancel a past or ongoing reservation.');
    }

    await showtime.update({ available_seats: showtime.available_seats + 1 });

    return await this.reservationRepository.deleteReservation(reservationId);
  }

  async getReservationsByUser(userId, requestUser) {
    const reservations = await this.reservationRepository.getReservationsByUserId(userId);
    if (!reservations.length) {
      throw new Error('No reservations found for this user.');
    }

    return reservations;
  }

  async getPaginatedReservations(page, limit, filters) {
    const reservations = await this.reservationRepository.getPaginatedReservations(page, limit, filters);
    return reservations;
  }
}

module.exports = ReservationService;