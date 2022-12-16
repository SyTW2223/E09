import * as request from 'supertest';
import { User } from '../src/models/user';

/**
 * Eliminación de todos los usuarios
 */
beforeEach(async () => {
    await User.deleteMany();
});

/**
 * 
 */
describe('POST USER /api/signup', () => {
  it('Should successfully create a new user', async () => {
    await request(User).post('/api/signup').send({
      name: "userExample",
      email: "user@example.com",
      password: "passwordExample",
      description: "descriptionExample",
      folowing: 0,
      followers: 0,
      likes: 0,
      age: 0,
    }).expect(201);
  });
});