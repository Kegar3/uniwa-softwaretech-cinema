import { expect } from 'chai';
import sinon from 'sinon';
import userService from '../services/UserService.js';
import { getUserById } from '../repositories/UserRepository.js';

describe('UserService', () => {
  describe('getUserById', () => {
    it('should return user when user exists', async () => {
      const user = { id: 1, username: 'testuser' };
      sinon.stub(getUserById, 'returns').returns(Promise.resolve(user));

      const result = await userService.getUserById(1);
      expect(result).to.equal(user);

      getUserById.restore();
    });

    it('should throw an error when user does not exist', async () => {
      sinon.stub(getUserById, 'returns').returns(Promise.resolve(null));

      try {
        await userService.getUserById(1);
      } catch (error) {
        expect(error.message).to.equal('User not found');
      }

      getUserById.restore();
    });
  });
});