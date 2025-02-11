// controllers/UserController.js
const userService = require('../services/UserService'); // Εισαγωγή του UserService για χρήση της επιχειρησιακής λογικής
const authService = require('../services/AuthService'); // Εισαγωγή του AuthService για χρήση της επιχειρησιακής λογικής

// Δημιουργία νέου χρήστη
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Ανάκτηση δεδομένων από το request body
    const {token, user} = await authService.register(username, email, password); // Κλήση του service για δημιουργία χρήστη
    
    res.status(201).json({token, user}); // Επιστροφή του δημιουργημένου χρήστη
  } catch (error) {
    res.status(500).json({ error: error.message }); // Χειρισμός σφάλματος
  }
};

// Ανάκτηση όλων των χρηστών
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers(); // Κλήση του service για ανάκτηση χρηστών
    res.status(200).json(users); // Επιστροφή της λίστας χρηστών
  } catch (error) {
    res.status(500).json({ error: error.message }); // Χειρισμός σφάλματος
  }
};

// Ανάκτηση χρήστη βάσει ID
exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id); // Κλήση του service για ανάκτηση χρήστη με ID
    if (user) {
      res.status(200).json(user); // Επιστροφή του χρήστη αν βρεθεί
    } else {
      res.status(404).json({ error: 'User not found' }); // Αν ο χρήστης δεν βρεθεί, επιστρέφει σφάλμα 404
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Χειρισμός σφάλματος
  }
};

// Ενημέρωση χρήστη βάσει ID
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body); // Κλήση του service για ενημέρωση χρήστη
    if (updatedUser) {
      res.status(200).json(updatedUser); // Επιστροφή του ενημερωμένου χρήστη
    } else {
      res.status(404).json({ error: 'User not found' }); // Αν ο χρήστης δεν βρεθεί, επιστρέφει σφάλμα 404
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Χειρισμός σφάλματος
  }
};

// Διαγραφή χρήστη βάσει ID
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await userService.deleteUser(req.params.id); // Κλήση του service για διαγραφή χρήστη
    if (deleted) {
      res.status(200).json({ message: 'User deleted successfully' }); // Επιστροφή μηνύματος επιτυχίας
    } else {
      res.status(404).json({ error: 'User not found' }); // Αν ο χρήστης δεν βρεθεί, επιστρέφει σφάλμα 404
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Χειρισμός σφάλματος
  }
};
