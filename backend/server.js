const express = require('express'); // Φόρτωση του Express
const sequelize = require('./config/config'); // Φόρτωση της σύνδεσης βάσης δεδομένων

const UserRoutes = require('./routes/UserRoutes');
const ReservationRoutes = require('./routes/ReservationRoutes'); // Εισαγωγή νέων routes για reservations
const AuthController = require('./controllers/AuthController');

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
  
// Routes χρηστών & κρατήσεων
app.use('/users', UserRoutes);
app.use('/reservations', ReservationRoutes);

// Authentication route
app.post('/login', AuthController.login);

// Εκκίνηση του διακομιστή
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});