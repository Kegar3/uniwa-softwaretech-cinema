const express = require('express'); // Φόρτωση του Express
const sequelize = require('./config/config'); // Φόρτωση της σύνδεσης βάσης δεδομένων
const authMiddleware = require('./middlewares/authMiddleware');

const UserRoutes = require('./routes/UserRoutes');
const ReservationRoutes = require('./routes/ReservationRoutes'); // Εισαγωγή νέων routes για reservations
const AuthController = require('./controllers/AuthController');


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
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});