const sinon = require('sinon');
const userService = require('../services/UserService.js');
const userRepository = require('../repositories/UserRepository.js');

describe('UserService', () => {
  describe('getUserById', () => {
    it('should return user when user exists', async () => {
      const { expect } = await import('chai');
      const user = { id: 1, username: 'testuser' };
      sinon.stub(userRepository, 'getUserById').returns(Promise.resolve(user));

      const result = await userService.getUserById(1);
      expect(result).to.equal(user);

      userRepository.getUserById.restore();
    });

    it('should throw an error when user does not exist', async () => {
      const { expect } = await import('chai');
      sinon.stub(userRepository, 'getUserById').returns(Promise.resolve(null));

      try {
        await userService.getUserById(1);
      } catch (error) {
        expect(error.message).to.equal('User not found');
      }

      userRepository.getUserById.restore();
    });
  });
});