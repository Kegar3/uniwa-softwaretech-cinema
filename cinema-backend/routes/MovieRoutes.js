const express = require('express');
const MovieController = require('../controllers/MovieController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Save files to the public/images directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Δημιουργία νέας ταινίας (Μόνο οι Admin μπορούν να δημιουργήσουν)
router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, upload.single('poster'),MovieController.createMovie);

// Ανάκτηση όλων των ταινιών (Ανοιχτό σε όλους)
router.get('/', MovieController.getAllMovies);

// Ανάκτηση μιας ταινίας βάσει ID (Ανοιχτό σε όλους)
router.get('/:id', MovieController.getMovieById);

// Ενημέρωση ταινίας (Μόνο Admins)
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, MovieController.updateMovie);

// Διαγραφή ταινίας (Μόνο Admins)
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, MovieController.deleteMovie);

// Ανάκτηση προβολών μιας ταινίας (Ανοιχτό σε όλους)
router.get('/:id/showtimes', MovieController.getMovieShowtimes);

module.exports = router;
