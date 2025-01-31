const jwt = require('jsonwebtoken');
require('dotenv').config(); // Βεβαιωνόμαστε ότι φορτώνουμε το .env


// Middleware για έλεγχο αν ο χρήστης είναι authenticated
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Παίρνουμε το token

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Χρησιμοποιούμε το JWT_SECRET από το .env
        req.user = decoded; // Προσθέτουμε τον χρήστη στο request
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
  };
  
  // Middleware για έλεγχο αν ο χρήστης έχει ADMIN role
  exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
        next();
  };