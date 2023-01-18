import * as request from 'supertest';
import   { app } from '../src/app';
import { Juice } from '../src/models/juice';
import { User } from '../src/models/user';

const testUser = {
  name: "test",
  email: "test@test.com",
  password: "Password1",
  description: "description1",
  following: 0,
  followres: 0,
  age: 0,
}

let token: string = '';
let id: string = ';'

before(async () => {
  await Juice.deleteMany();
  await new User(testUser).save();
  const response = await request(app).post('/api/signin').send({
    email: "test@test.com",
    password: "Password1",
  });
  token = response.body.token;
});

/**
 * Juice POST
 */
describe('POST /api/juice', () => {
  it('Should get an error for token not provided', async () => {
    await request(app).post('/api/juice').send({
      userName: 'user2',
      text: 'Hola, estoy usando juicer',
      date: '31/12/2023 12:00',
      likes: ['user1']
    }).expect(400);
  });
  it('Should get an error for expired session', async () => {
    await request(app).post('/api/juice').set({
      Authorization:'Bearer ' + '1234'
    }).send({
      userName: 'user2',
      text: 'Hola, estoy usando juicer',
      date: '31/12/2023 12:00',
      likes: ['user1']
    }).expect(403);
  });  
  it('Should get an error for bad request', async () => {
    await request(app).post('/api/juice').set({
      Authorization:'Bearer ' + token
    }).expect(400);
  });
  it('Should successfully create a new juice', async () => {
    const response = await request(app).post('/api/juice').set({
      Authorization:'Bearer ' + token
    }).send({
        userName: 'user2',
        text: 'Hola, estoy usando juicer',
        date: '31/12/2023 12:00',
        likes: ['user1']
    }).expect(201);
    id = response.body._id;
  });
});

/**
* Juice GET
*/
describe('GET /api/juices', () => {
  it('Should get an error for not found', async () => {
    await request(app).get('/api/juices?id=1234').expect(404);
  });
  it('Should successfully get juices list', async () => {
    await request(app).get('/api/juices').expect(200);
  });
});

/**
* Juice PATCH
*/
describe('PATCH /api/juice/like', () => {
  it('Should get an error for update not permitted', async () => {
    await request(app).patch(`/api/juice/like?id=${id}`).set({
      Authorization:'Bearer ' + token
    }).send({
      userName: 'testing'
    }).expect(400);
  });
  it('Should get an error for id not provided', async () => {
    await request(app).patch('/api/juice/like').set({
      Authorization:'Bearer ' + token
    }).send({
      likes: ['test']
    }).expect(400);
  });
  it('Should get an error for token not provided', async () => {
    await request(app).patch(`/api/juice/like?id=${id}`).send({
      likes: ['test']
    }).expect(400);
  });
  it('Should get an error for not found', async () => {
    await request(app).patch('/api/juice/like?id=41224d776a326fb40f000001').set({
      Authorization:'Bearer ' + token
    }).send({
      likes: ['test']
    }).expect(404);
  });
  it('Should get an error for bad request', async () => {
    await request(app).patch('/api/juice/like?id=1234').set({
      Authorization:'Bearer ' + token
    }).send({
      likes: ['test']
    }).expect(400);
  });
  it('Should successfully update a juice', async () => {
    await request(app).patch(`/api/juice/like?id=${id}`).set({
      Authorization:'Bearer ' + token
    }).send({
      likes: ['test']
    }).expect(200);
  });
});

/**
* Juice DELETE
*/
describe('DELETE /api/juices', () => {
  it('Should get an error for expired session', async () => {
    await request(app).delete(`/api/juices?id=${id}`).set({
      Authorization:'Bearer 1234'
    }).expect(403);
  });
  it('Should get an error for token not provided', async () => {
    await request(app).delete(`/api/juices?id=${id}`).expect(400);
  });
  it('Should get an error for not found', async () => {
    await request(app).delete('/api/juices?id=41224d776a326fb40f000001').set({
      Authorization:'Bearer ' + token
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

  
