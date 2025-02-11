const jwt = require('jsonwebtoken');
require('dotenv').config();
const Reservation = require('../models/Reservation'); 

// Middleware για έλεγχο αν ο χρήστης είναι authenticated
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

// Middleware για έλεγχο αν ο χρήστης έχει ADMIN role
exports.isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
};

// Middleware για έλεγχο αν ο χρήστης είναι Admin ή ο ιδιοκτήτης της κράτησης
exports.isOwnerOrAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        // Αν είναι admin, του επιτρέπουμε πρόσβαση
        if (req.user.role === 'admin') {
            return next();
        }

        // Αν προσπαθεί να δει τις δικές του κρατήσεις με βάση το `userId`
        if (req.params.userId && parseInt(req.params.userId) === req.user.id) {
            return next();
        }

        // Αν προσπαθεί να προσπελάσει μια συγκεκριμένη κράτηση
        if (req.params.id) {
            const reservation = await Reservation.findByPk(req.params.id);
            
            if (!reservation) {
                return res.status(404).json({ error: 'Reservation not found' });
            }

            // Αν η κράτηση ανήκει στον χρήστη, επιτρέπεται
            if (reservation.user_id === req.user.id) {
                return next();
            }
        }

        return res.status(403).json({ error: 'Access denied. You can only access your own reservations.' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
