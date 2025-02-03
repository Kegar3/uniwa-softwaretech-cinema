const express = require('express');
const ShowtimeController = require('../controllers/ShowtimeController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Δημιουργία νέας προβολής (μόνο Admins)
router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, ShowtimeController.createShowtime);

// Ανάκτηση όλων των προβολών
//router.get('/', ShowtimeController.getAllShowtimes);

// Ανάκτηση συγκεκριμένης προβολής βάσει ID
router.get('/:id', ShowtimeController.getShowtimeById);

// Ενημέρωση προβολής (μόνο Admins)
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, ShowtimeController.updateShowtime);

// Διαγραφή προβολής (μόνο Admins)
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, ShowtimeController.deleteShowtime);

// Ανάκτηση προβολών βάσει ID ταινίας
router.get('/',authMiddleware.verifyToken, authMiddleware.isOwnerOrAdmin, ShowtimeController.getPaginatedShowtimes);

module.exports = router;
