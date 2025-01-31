const express = require('express'); // Φόρτωση του Express
const sequelize = require('./config/config'); // Φόρτωση της σύνδεσης βάσης δεδομένων
const userController = require('./controllers/UserController'); // Εισαγωγή του UserController για διαχείριση αιτημάτων χρηστών
const AuthController = require('./controllers/AuthController'); 
const authMiddleware = require('./middlewares/authMiddleware');

const app = express(); // Δημιουργία Express εφαρμογής
app.use(express.json()); // Middleware για διαχείριση JSON δεδομένων αιτημάτων

// Συγχρονισμός της βάσης δεδομένων
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database & tables synced!');
  })
  .catch((error) => console.error('Unable to sync database:', error));

// Routes χρηστών, που χρησιμοποιούν το UserController
// Προστατεύουμε τα endpoints με authentication
app.post('/users', userController.createUser);
app.get('/users', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.getAllUsers);
app.get('/users/:id', authMiddleware.verifyToken, userController.getUserById);
app.put('/users/:id', authMiddleware.verifyToken, userController.updateUser);
app.delete('/users/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.deleteUser);

app.post('/login', AuthController.login);

// authMiddleware.verifyToken → Όλοι οι χρήστες πρέπει να έχουν έγκυρο JWT token για να κάνουν requests
// authMiddleware.isAdmin → Μόνο οι Admins μπορούν να βλέπουν ΟΛΟΥΣ τους χρήστες και να διαγράφουν χρήστες.

// Εκκίνηση του διακομιστή
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});