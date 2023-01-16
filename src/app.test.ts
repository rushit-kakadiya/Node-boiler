import request from 'supertest';

import app from './app';

describe('app', () => {
  it('responds with a not found message', async () => {
    request(app).get('/what-is-this-even').set('Accept', 'application/json').expect('Content-Type', /json/).expect(404);
  });
});

describe('GET /', () => {
  it('responds with a json message', async () => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { status: 1, message: 'Backend is up.' });
  });
});
