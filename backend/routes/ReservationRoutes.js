const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/ReservationController');
const authMiddleware = require('../middlewares/authMiddleware');

// Δημιουργία νέας κράτησης (χρειάζεται authentication)
router.post('/', authMiddleware.verifyToken, ReservationController.createReservation);

// Ανάκτηση όλων των κρατήσεων (μόνο για admins)
router.get('/', authMiddleware.verifyToken, authMiddleware.isAdmin, ReservationController.getAllReservations);

// Ανάκτηση κρατήσεων για συγκεκριμένο χρήστη (μόνο ο ίδιος ή ένας admin)
router.get('/user/:userId', authMiddleware.verifyToken, authMiddleware.isOwnerOrAdmin, ReservationController.getReservationsByUserId);

// Ανάκτηση κράτησης με ID (μόνο αν είναι ο ιδιοκτήτης ή admin)
router.get('/:id', authMiddleware.verifyToken, authMiddleware.isOwnerOrAdmin, ReservationController.getReservationById);

// Ενημέρωση κράτησης (μόνο ο ιδιοκτήτης ή admin)
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isOwnerOrAdmin, ReservationController.updateReservation);

// Διαγραφή κράτησης (μόνο ο ιδιοκτήτης ή admin)
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isOwnerOrAdmin, ReservationController.deleteReservation);

module.exports = router;
