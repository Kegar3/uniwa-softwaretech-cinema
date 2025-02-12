// services/UserService.js
const userRepository = require('../repositories/UserRepository'); // Εισαγωγή του UserRepository για αλληλεπίδραση με τη βάση δεδομένων

// Δημιουργία νέου χρήστη
exports.createUser = async (userData) => {
  return userRepository.createUser(userData); // Κλήση του UserRepository για τη δημιουργία χρήστη
};

// Ανάκτηση όλων των χρηστών
exports.getAllUsers = async () => {
  return userRepository.getAllUsers(); // Κλήση του UserRepository για την ανάκτηση όλων των χρηστών
};

// Ανάκτηση χρήστη βάσει ID
exports.getUserById = async (userId) => {
  const user = await userRepository.getUserById(userId); // Κλήση του UserRepository για την ανάκτηση χρήστη με συγκεκριμένο ID
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// Ενημέρωση χρήστη βάσει ID
exports.updateUser = async (userId, updatedData) => {
  const user = await userRepository.getUserById(userId); // Ανάκτηση του χρήστη από τη βάση δεδομένων
  if (user) {
    return await userRepository.updateUser(user, updatedData); // Ενημέρωση του χρήστη εφόσον υπάρχει
  }
  return null; // Επιστρέφει null αν ο χρήστης δεν βρεθεί
};

// Διαγραφή χρήστη βάσει ID
exports.deleteUser = async (userId) => {
  const user = await userRepository.getUserById(userId); // Ανάκτηση του χρήστη από τη βάση δεδομένων
  if (user) {
    await userRepository.deleteUser(user); // Διαγραφή του χρήστη εφόσον υπάρχει
    return true; // Επιτυχής διαγραφή
  }
  return false; // Επιστρέφει false αν ο χρήστης δεν βρεθεί
};

// Ανάκτηση χρήστη βάσει ID
exports.getUserDetails = async (userId) => {
  const user = await userRepository.findById(userId); // Κλήση του UserRepository για την ανάκτηση χρήστη με συγκεκριμένο ID
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
