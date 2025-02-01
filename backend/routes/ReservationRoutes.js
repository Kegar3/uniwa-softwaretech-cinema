const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/ReservationController');
const authMiddleware = require('../middlewares/authMiddleware');

// Δημιουργία νέας κράτησης (Πρέπει να είναι συνδεδεμένος ο χρήστης)
router.post('/', authMiddleware.verifyToken, ReservationController.createReservation);

// Ανάκτηση όλων των κρατήσεων (Μόνο Admins)
router.get('/', authMiddleware.verifyToken, authMiddleware.isAdmin, ReservationController.getAllReservations);

// Ανάκτηση συγκεκριμένης κράτησης βάσει ID (Οποιοσδήποτε χρήστης με έγκυρο token)
router.get('/:id', authMiddleware.verifyToken, ReservationController.getReservationById);

// Ανάκτηση κρατήσεων συγκεκριμένου χρήστη (Μόνο ο ίδιος ή Admins)
router.get('/user/:userId', authMiddleware.verifyToken, ReservationController.getReservationsByUserId);

// Ενημέρωση κράτησης (Μόνο ο ίδιος ή Admins)
router.put('/:id', authMiddleware.verifyToken, ReservationController.updateReservation);

// Διαγραφή κράτησης (Μόνο Admins)
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, ReservationController.deleteReservation);

module.exports = router;
