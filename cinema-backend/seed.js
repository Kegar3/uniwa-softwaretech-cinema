const sequelize = require('./config/config');
const User = require('./models/User');
const Movie = require('./models/Movie');
const Showtime = require('./models/Showtime');
const Reservation = require('./models/Reservation');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
  await sequelize.sync({ force: true }); // **ΔΙΑΓΡΑΦΕΙ ΚΑΙ ΞΑΝΑΦΤΙΑΧΝΕΙ ΟΛΑ ΤΑ TABLES**
  console.log('Database synced!');

  // **1️⃣ Προσθήκη χρηστών (admin & κανονικοί χρήστες)**
  const hashedPassword = await bcrypt.hash('0203', 10);
  const users = await User.bulkCreate([
    { username: 'admin', email: 'admin@example.com', password: hashedPassword, role: 'admin' },
    { username: 'byron', email: 'byron@example.com', password: hashedPassword, role: 'user' },
    { username: 'stelios', email: 'stelios@example.com', password: hashedPassword, role: 'user' }
  ]);
  console.log('Users seeded!');

  // **2️⃣ Προσθήκη Ταινιών**
  const movies = await Movie.bulkCreate([
    { title: 'The Matrix', duration: 136, genre: 'Sci-Fi', release_date: '1999-03-31', poster_url: '/images/matrix.jpg' },
    { title: 'Inception', duration: 148, genre: 'Sci-Fi', release_date: '2010-07-16', poster_url: '/images/inception.jpg' },
    { title: 'Interstellar', duration: 169, genre: 'Sci-Fi', release_date: '2014-11-07', poster_url: '/images/interstellar.jpg' }
  ]);
  console.log('Movies seeded!');

  // **3️⃣ Προσθήκη Προβολών (Showtimes)**
  const showtimes = await Showtime.bulkCreate([
    { movie_id: 1, hall: '1', start_time: '2025-06-10 18:00:00', available_seats: 50 },
    { movie_id: 1, hall: '2', start_time: '2025-06-10 21:00:00', available_seats: 50 },
    { movie_id: 2, hall: '1', start_time: '2025-06-11 17:30:00', available_seats: 50 },
    { movie_id: 3, hall: '2', start_time: '2025-06-12 20:30:00', available_seats: 50 }
  ]);
  console.log('Showtimes seeded!');

  // **4️⃣ Προσθήκη Κρατήσεων**
  const reservations = await Reservation.bulkCreate([
    { showtime_id: 1, seat: 'A5', user_id: 2 },
    { showtime_id: 1, seat: 'A6', user_id: 3 },
    { showtime_id: 2, seat: 'B10', user_id: 2 },
    { showtime_id: 3, seat: 'C3', user_id: 3 }
  ]);
  console.log('Reservations seeded!');

  // **5️⃣ Ενημέρωση διαθέσιμων θέσεων για κάθε προβολή**
  for (const showtime of showtimes) {
    const reservedSeatsCount = await Reservation.count({ where: { showtime_id: showtime.id } });
    await showtime.update({ available_seats: 50 - reservedSeatsCount });
  }
  console.log('Available seats updated!');

  console.log('Seeding completed successfully!');
  process.exit();
};

// **Εκτέλεση του Seed Script**
seedDatabase();