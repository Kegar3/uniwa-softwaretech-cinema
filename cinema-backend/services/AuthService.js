const bcrypt = require('bcryptjs'); // Add this line
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class AuthService {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async login(username, password) {
      const user = await this.userRepository.findByUsername(username);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }
  
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      return { token, user };
    }
  
    async register(username, email, password) {
      const user = await this.userRepository.createUser({ username, email, password });
  
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, user };
    }
  }
  
  module.exports = AuthService;