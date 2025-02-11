const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController'); // Εισαγωγή του AuthController

// Ορισμός των διαδρομών για τον χειρισμό των αιτημάτων
router.post('/login', AuthController.login);

module.exports = router; // Εξαγωγή των διαδρομών