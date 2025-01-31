// repositories/UserRepository.js
const User = require('../models/User'); // Εισαγωγή του μοντέλου User για αλληλεπίδραση με τον πίνακα χρηστών

// Δημιουργία νέου χρήστη
exports.createUser = async (userData) => {
  return await User.create({
    username: userData.username,
    password: userData.password,
    email: userData.email,
    role: userData.role || 'user', // Προεπιλεγμένος ρόλος αν δεν δοθεί από το request
  }); // Δημιουργεί και αποθηκεύει ένα νέο χρήστη στη βάση δεδομένων
};

// Ανάκτηση όλων των χρηστών
exports.getAllUsers = async () => {
  return await User.findAll(); // Επιστρέφει όλους τους χρήστες από τον πίνακα
};

// Ανάκτηση χρήστη βάσει ID
exports.getUserById = async (userId) => {
  return await User.findByPk(userId); // Επιστρέφει το χρήστη με το συγκεκριμένο ID
};

// Ενημέρωση δεδομένων χρήστη
exports.updateUser = async (user, updatedData) => {
  return await user.update(updatedData); // Ενημερώνει τον χρήστη με τα νέα δεδομένα
};

// Διαγραφή χρήστη
exports.deleteUser = async (user) => {
  return await user.destroy(); // Διαγράφει τον χρήστη από τον πίνακα
};

// Ανάκτηση χρήστη βάσει username
exports.findByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};