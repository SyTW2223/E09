import * as request from 'supertest';
import   { app } from '../src/app';
import { User } from '../src/models/user';
//import { expect } from 'chai';

const firstUser = {
    name: "user1",
    email: "user1@example.com",
    password: "Password1",
    description: "description1",
    following: 0,
    followres: 0,
    likes: 0,
    age: 0,
}

before(async () => {
  await User.deleteMany();
  await new User(firstUser).save();
});
  

/**
 * User SIGN UP
 */
describe('POST /api/signup', () => {
  it('Should successfully create a new user', async () => {
    await request(app).post('/api/signup').send({
      name: "user2",
      email: "user2@example.com",
      password: "Password2",
      description: "description2",
      folowing: 0,
      followers: 0,
      likes: 0,
      age: 0,
    }).expect(201);
  });

  it('Should get an error', async () => {
    await request(app).post('/api/signup').send(firstUser).expect(400);
  });
});

/**
 * User SIGN IN
 */
 describe('POST /api/signin', () => {
  it('Should successfully login a new user', async () => {
    await request(app).post('/api/signin').send({
      email: "user2@example.com",
      password: "Password2",
    }).expect(200);
  });


  it('Should get an error', async () => {
    await request(app).post('/api/signin').send({
      email: "undefined@email.com",
      password: "UndefinedPwd0",
    }).expect(404);
  });
});


/**
 * User GET

describe('GET /api/user', () => {
  it('Should get a user by name', async () => {
    await request(app).get('/api/user', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }}).expect(200);
    })
  });
});
*/