const ShowtimeRepository = require('../repositories/ShowTimeRepository');
const MovieRepository = require('../repositories/MovieRepository');

class ShowtimeService {
  // Δημιουργία νέας προβολής με ελέγχους
  async createShowtime(showtimeData) {
    const { movie_id, hall, start_time } = showtimeData;

    // 1. Έλεγχος αν υπάρχουν τα απαραίτητα δεδομένα
    if (!movie_id || !start_time) {
      throw new Error('Missing required fields: movie_id, start_time');
    }

    // 2. Έλεγχος αν η ταινία υπάρχει στη βάση
    const movie = await MovieRepository.getMovieById(movie_id);
    if (!movie) {
      throw new Error('Movie not found.');
    }

    // 3. Έλεγχος αν το start_time είναι στο μέλλον
    const startTimeDate = new Date(start_time);
    const now = new Date();
    if (startTimeDate <= now) {
      throw new Error('Start time must be in the future.');
    }

    // 4. Έλεγχος αν το hall είναι είτε "1" είτε "2"
    if (!["1", "2"].includes(hall)) {
        throw new Error('Invalid hall number. Allowed values are 1 or 2.');
      }

    // 5. Δημιουργία της προβολής
    return await ShowtimeRepository.createShowtime(showtimeData);
  }

  // // Ανάκτηση όλων των προβολών
  // async getAllShowtimes() {
  //   return await ShowtimeRepository.getAllShowtimes();
  // }

  // Ανάκτηση προβολής βάσει ID
  async getShowtimeById(showtimeId) {
    const showtime = await ShowtimeRepository.getShowtimeById(showtimeId);
    if (!showtime) {
      throw new Error('Showtime not found.');
    }
    return showtime;
  }

  // Ενημέρωση προβολής
  async updateShowtime(showtimeId, updatedData) {
    const showtime = await ShowtimeRepository.getShowtimeById(showtimeId);
    if (!showtime) {
      throw new Error('Showtime not found.');
    }

    // Αν αλλάζει το start_time, να ελέγξουμε ότι είναι στο μέλλον
    if (updatedData.start_time) {
      const newStartTime = new Date(updatedData.start_time);
      const now = new Date();
      if (newStartTime <= now) {
        throw new Error('Start time must be in the future.');
      }
    }

    return await ShowtimeRepository.updateShowtime(showtimeId, updatedData);
  }

  // Διαγραφή προβολής
  async deleteShowtime(showtimeId) {
    const showtime = await ShowtimeRepository.getShowtimeById(showtimeId);
    if (!showtime) {
      throw new Error('Showtime not found.');
    }

    return await ShowtimeRepository.deleteShowtime(showtimeId);
  }

  // Ανάκτηση προβολών βάσει ID ταινίας
  async getShowtimesByMovie(movieId) {
    const showtimes = await ShowtimeRepository.getShowtimesByMovieId(movieId);
    if (!showtimes.length) {
      throw new Error('No showtimes found for this movie.');
    }
    return showtimes;
  }

  // Ανάκτηση προβολών με παγιωμένη σειρά και δυνατότητα παγιωμένου limit και offset
  async getPaginatedShowtimes(page, limit) {
    return await ShowtimeRepository.getPaginatedShowtimes(page, limit);
  }

  // Ανάκτηση μελλοντικών προβολών βάσει ID ταινίας
  async getAllShowtimes(query) {
    return await ShowtimeRepository.getAllShowtimes(query);
  }
  
  // Ανάκτηση διαθέσιμων θέσεων για συγκεκριμένη προβολή
  async getAvailableSeats(showtimeId) {
    return await ShowtimeRepository.getAvailableSeats(showtimeId);
  }

  // Ανάκτηση κρατήσεων για συγκεκριμένη προβολή
  async getReservationsForShowtime (showtimeId) {
    return await ShowtimeRepository.getReservationsForShowtime(showtimeId);
  }
}

module.exports = new ShowtimeService();
