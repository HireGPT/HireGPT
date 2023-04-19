//import { request } from 'supertest';
const request = require('supertest');
const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/api/login', () => {
    describe('POST', () => {
      const loginInfo = {email: 'nancy@hiregpt.com', password: 'ilovechatgpt'};
      
      it('responds with 200 status if using valid credentials', () => {
        return request(server)
          .post('/api/login')
          .send(loginInfo)
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });
});