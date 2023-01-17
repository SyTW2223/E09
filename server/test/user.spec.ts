import * as request from 'supertest';
import   { app } from '../src/app';
import { User } from '../src/models/user';
import { expect } from 'chai';

const firstUser = {
  name: "user1",
  email: "user1@example.com",
  password: "Password1",
  description: "description1",
  following: 0,
  followres: 0,
  age: 0,
}

let token: string = "";
let id: string = "";

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
      age: 0,
    }).expect(201);
  });

  it('Should get an error because the user was already created', async () => {
    const response = await request(app).post('/api/signup').send(firstUser).expect(409);
    expect(response.body.error).to.be.eq('Ya existe una cuenta con ese nombre.');
  });

  it('Should get an error because the password is too short', async () => {
    const response = await request(app).post('/api/signup').send({
      name: "user3",
      email: "user3@example.com",
      password: "short",
      description: "description3",
      folowing: 0,
      followers: 0,
      age: 0,
    }).expect(400);
    expect(response.body.error).to.be.eq("La contraseña debe contener al menos ocho caracteres, un número y una mayúscula");
    expect(response.body.fields).to.be.eq("password");
  });

});

/**
 * User SIGN IN
 */
 describe('POST /api/signin', () => {
  it('Should successfully login a new user', async () => {
    const response = await request(app).post('/api/signin').send({
      email: "user2@example.com",
      password: "Password2",
    }).expect(200);
    token = response.body.token;
    id = response.body.user._id;
  });

  it('Should get an error because the user does not exist', async () => {
    await request(app).post('/api/signin').send({
      email: "undefined@email.com",
      password: "UndefinedPwd0",
    }).expect(404);
  });
});

/**
 * Users GET
*/
describe('GET /api/users', () => {
  it('Should successfully get all registered users', async () => {
    await request(app).get('/api/users').set({
      Authorization:'Bearer ' + token
    }).send().expect(200);
  });
  it('The number of registered users must be 2', async () => {
    const response = await request(app).get('/api/users').set({
      Authorization:'Bearer ' + token
    }).send().expect(200);
    expect(response.body.length).to.be.eq(2);
  });
});

/**
 * GET authenticated user
*/
describe('GET /api/user', () => {
  it('Should successfully get a created user', async () => {
    const response = await request(app).get('/api/user').set({
      Authorization:'Bearer ' + token
    }).expect(200);
    expect(response.body.element).to.include({
      name: "user2",
      email: "user2@example.com",
      password: "Password2",
      description: "description2",
      following: 0,
      followers: 0,
      age: 0,
    });
  });
  it('Should get an error because token doesnt exist', async () => {
    await request(app).get('/api/user').set({
      Authorization:'Bearer ' + 'wrongTokenDefinition'
    }).expect(403);
  });
  it('Should get an error because token is not provided', async () => {
    const response = await request(app).get('/api/user').expect(400);
    expect(response.body.error).to.be.eq('Debe proporcionarse un token');
  });
});

/**
 * PATCH user
 */
describe('PATCH user description', () => {
  it('Should successfully change a user description',async () => {
    const response = await request(app).patch(`/api/users?id=${id}`).send({
      description: "description2",
    }).set({
      Authorization:'Bearer ' + token
    }).expect(200);
    expect(response.body.description).to.be.eq('description2');
  });
  it('Should get an error because the token does not exist',async () => {
    await request(app).patch(`/api/users?id=${id}`).send({
      description: "description2",
    }).set({
      Authorization:'Bearer ' + 'undefinedToken'
    }).expect(403);
  });
});

/**
 * PATCH password reset
 */
describe('PATCH password reset', () => {
  it('Should get an error for bad request',async () => {
    await request(app).patch('/api/password-reset').send({
      description: "description2",
    }).set({
      Authorization:'Bearer ' + token
    }).expect(400);
  });
  it('Should get an error for token not provided', async () => {
    await request(app).patch('/api/password-reset').expect(400);
  });
  it('Should get an error for not found', async () => {
    await request(app).patch('/api/password-reset').set({
      Authorization:'Bearer 41224d776a326fb40f000001'
    }).expect(404);
  });
  it('Should get an error for bad request', async () => {
    await request(app).delete('/api/juices?id=1234').set({
      Authorization:'Bearer ' + token
    }).expect(400);
  });
  it('Should successfully delete a juice', async () => {
    await request(app).delete(`/api/juices?id=${id}`).set({
      Authorization:'Bearer ' + token
    }).expect(200);
  });
});


/**
 * POST password reset
*/
describe('POST password-reset', () => {
  it('Should successfully send an email to the user who is reseting his password', async () => {
    const response = await request(app).post('/api/password-reset').send({
      email: "user2@example.com",
    }).set({
      Authorization:'Bearer ' + token
    }).expect(200);
    expect(response.body.mssg).to.be.eq('email sent successfully');
  });
  it('Should get an error because the email does not exist', async () => {
    const response = await request(app).post('/api/password-reset').send({
      email: "notExist@email.com",
    }).expect(404);
    expect(response.body.error).to.be.eq('Correo electrónico no registrado');
  });
});

