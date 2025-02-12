const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController'); // Εισαγωγή του AuthController

// Ορισμός των διαδρομών για τον χειρισμό των αιτημάτων
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

module.exports = router; // Εξαγωγή των διαδρομών