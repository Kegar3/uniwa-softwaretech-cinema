class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData) {
    return this.userRepository.createUser(userData);
  }

  async getAllUsers() {
    return this.userRepository.getAllUsers();
  }

  async getUserById(userId) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(userId, updatedData) {
    const user = await this.userRepository.getUserById(userId);
    if (user) {
      return await this.userRepository.updateUser(user, updatedData);
    }
    return null;
  }

  async deleteUser(userId) {
    const user = await this.userRepository.getUserById(userId);
    if (user) {
      await this.userRepository.deleteUser(user);
      return true;
    }
    return false;
  }

  async getUserDetails(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

module.exports = UserService;