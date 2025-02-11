const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

// authMiddleware.verifyToken → Όλοι οι χρήστες πρέπει να έχουν έγκυρο JWT token για να κάνουν requests
// authMiddleware.isAdmin → Μόνο οι Admins μπορούν να βλέπουν ΟΛΟΥΣ τους χρήστες και να διαγράφουν χρήστες.

// Δημιουργία νέου χρήστη (Registration)
router.post('/', UserController.createUser);

// Ανάκτηση όλων των χρηστών (Μόνο Admins)
router.get('/', authMiddleware.verifyToken, authMiddleware.isAdmin, UserController.getAllUsers);

// Ανάκτηση συγκεκριμένου χρήστη βάσει ID (Μόνο authenticated χρήστες)
router.get('/:id', authMiddleware.verifyToken, UserController.getUserById);

// Ενημέρωση χρήστη (Μόνο authenticated χρήστες)
router.put('/:id', authMiddleware.verifyToken, UserController.updateUser);

// Διαγραφή χρήστη (Μόνο Admins)
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, UserController.deleteUser);

module.exports = router;