const AdminService = require('../services/AdminService');
const adminRepository = require('../repositories/AdminRepository');

const adminService = new AdminService(adminRepository);

exports.getAdminStats = async (req, res) => {
  try {
    const stats = await adminService.getAdminStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};