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
describe('POST /notes', () => {
  it('Should successfully insert a new note', async () => {
    await request(User).post('/notes').send({
      title: "Note",
      body: "This is a note",
      color: "red",
    }).expect(201);
  });
});