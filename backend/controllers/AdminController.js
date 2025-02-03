const AdminService = require('../services/AdminService');

exports.getAdminStats = async (req, res) => {
  try {
    const stats = await AdminService.getAdminStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
