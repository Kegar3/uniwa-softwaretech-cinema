const express = require('express'); // Φόρτωση του Express
const sequelize = require('./config/config'); // Φόρτωση της σύνδεσης βάσης δεδομένων
const cors = require('cors');

const UserRoutes = require('./routes/UserRoutes'); // Εισαγωγή νέων routes για χρήστες
const ReservationRoutes = require('./routes/ReservationRoutes'); // Εισαγωγή νέων routes για reservations
const MovieRoutes = require('./routes/MovieRoutes'); // Εισαγωγή νέων routes για ταινίες
const ShowtimeRoutes = require('./routes/ShowtimeRoutes'); // Εισαγωγή νέων routes για προβολές
const AdminRoutes = require('./routes/AdminRoutes'); // Εισαγωγή νέων routes για διαχειριστές
const AuthController = require('./controllers/AuthController'); // Εισαγωγή του AuthController

require('dotenv').config(); // Load environment variables from .env file

const app = express(); // Δημιουργία Express εφαρμογής
app.use(express.json()); // Middleware για διαχείριση JSON δεδομένων αιτημάτων

// Συγχρονισμός της βάσης δεδομένων
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database & tables synced!');
  })
  .catch((error) => console.error('Unable to sync database:', error));

app.use(cors()); // Επιτρέπει όλα τα origins γιατι δεν δεχοταν το frontend
  
// Χρήση των routes
app.use('/users', UserRoutes);
app.use('/reservations', ReservationRoutes);
app.use('/movies', MovieRoutes);
app.use('/showtimes', ShowtimeRoutes);
app.use('/admin', AdminRoutes);

// Authentication route
app.post('/login', AuthController.login);

// Εκκίνηση του διακομιστή
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});