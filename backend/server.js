const express = require('express'); // Εισάγουμε το Express framework, το οποίο χρησιμοποιείται για τη δημιουργία του διακομιστή (server)
const sequelize = require('./config/config'); // Εισάγουμε τη σύνδεση της βάσης δεδομένων χρησιμοποιώντας το Sequelize
const User = require('./models/User'); // Εισάγουμε το μοντέλο User για αλληλεπίδραση με τον πίνακα χρηστών στη βάση δεδομένων
const Reservation = require('./models/Reservation'); // Εισάγουμε το μοντέλο Reservation για αλληλεπίδραση με τον πίνακα κρατήσεων στη βάση δεδομένων

const app = express(); // Δημιουργούμε μια Express εφαρμογή (instance του Express framework)
app.use(express.json()); // Χρησιμοποιούμε middleware για να επιτρέψουμε στην εφαρμογή να διαχειρίζεται JSON δεδομένα στο σώμα των αιτημάτων

// Συγχρονισμός της βάσης δεδομένων με τα μοντέλα
sequelize
  .sync({ force: false }) // Δημιουργία των πινάκων (αν δεν υπάρχουν) χωρίς να γίνει επαναδημιουργία τους (force: false)
  .then(() => {
    console.log('Database & tables synced!'); // Εμφάνιση μηνύματος όταν ο συγχρονισμός ολοκληρωθεί με επιτυχία
  })
  .catch((error) => console.error('Unable to sync database:', error)); // Εμφάνιση μηνύματος σε περίπτωση αποτυχίας

// Δημιουργία νέου χρήστη
app.post('/users', async (req, res) => { // Χρήση της HTTP μεθόδου POST για την προσθήκη νέου χρήστη
  try {
    const user = await User.create(req.body); // Δημιουργία νέου χρήστη με βάση τα δεδομένα που παρέχονται στο σώμα του αιτήματος
    res.json(user); // Αποστολή του νέου χρήστη ως απάντηση σε μορφή JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Αποστολή μηνύματος λάθους σε περίπτωση αποτυχίας
  }
});

// Επιστροφή όλων των χρηστών
app.get('/users', async (req, res) => { // Χρήση της HTTP μεθόδου GET για να λάβουμε όλους τους χρήστες
  try {
    const users = await User.findAll(); // Εύρεση όλων των χρηστών από τον πίνακα Users
    res.json(users); // Αποστολή όλων των χρηστών ως απάντηση σε μορφή JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Αποστολή μηνύματος λάθους σε περίπτωση αποτυχίας
  }
});

// Επιστροφή χρήστη βάσει του ID
app.get('/users/:id', async (req, res) => { // Χρήση της HTTP μεθόδου GET για να λάβουμε έναν συγκεκριμένο χρήστη βάσει του ID του
  try {
    const user = await User.findByPk(req.params.id); // Εύρεση χρήστη με βάση το primary key (ID) που παρέχεται στη διαδρομή
    if (user) {
      res.json(user); // Αποστολή του χρήστη σε μορφή JSON
    } else {
      res.status(404).json({ error: 'User not found' }); // Αποστολή μηνύματος αν ο χρήστης δεν βρεθεί
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Αποστολή μηνύματος λάθους σε περίπτωση αποτυχίας
  }
});

// Ενημέρωση χρήστη βάσει του ID
app.put('/users/:id', async (req, res) => { // Χρήση της HTTP μεθόδου PUT για να ενημερώσουμε έναν χρήστη βάσει του ID του
  try {
    const user = await User.findByPk(req.params.id); // Εύρεση χρήστη με βάση το primary key (ID)
    if (user) {
      await user.update(req.body); // Ενημέρωση του χρήστη με βάση τα δεδομένα που παρέχονται στο σώμα του αιτήματος
      res.json(user); // Αποστολή του ενημερωμένου χρήστη σε μορφή JSON
    } else {
      res.status(404).json({ error: 'User not found' }); // Αποστολή μηνύματος αν ο χρήστης δεν βρεθεί
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Αποστολή μηνύματος λάθους σε περίπτωση αποτυχίας
  }
});

// Διαγραφή χρήστη βάσει του ID
app.delete('/users/:id', async (req, res) => { // Χρήση της HTTP μεθόδου DELETE για να διαγράψουμε έναν χρήστη βάσει του ID του
  try {
    const user = await User.findByPk(req.params.id); // Εύρεση χρήστη με βάση το primary key (ID)
    if (user) {
      await user.destroy(); // Διαγραφή του χρήστη
      res.json({ message: 'User deleted successfully' }); // Αποστολή μηνύματος επιτυχούς διαγραφής
    } else {
      res.status(404).json({ error: 'User not found' }); // Αποστολή μηνύματος αν ο χρήστης δεν βρεθεί
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Αποστολή μηνύματος λάθους σε περίπτωση αποτυχίας
  }
});

// Καθορισμός του port που θα ακούει ο διακομιστής
const PORT = 3000;
app.listen(PORT, () => { // Εκκίνηση του διακομιστή
  console.log(`Server is running on http://localhost:${PORT}`); // Εμφάνιση μηνύματος όταν ο διακομιστής εκκινήσει
});
