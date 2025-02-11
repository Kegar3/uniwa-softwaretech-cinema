const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/stats', authMiddleware.verifyToken, authMiddleware.isAdmin, AdminController.getAdminStats);

module.exports = router;
