import * as request from 'supertest';
import   { app } from '../src/app';

/**
* Ruta por defecto
*/
describe('Ruta por defecto', () => {
  it('Should be not implemented', async () => {
    await request(app).get('').send().expect(501);
  });
});