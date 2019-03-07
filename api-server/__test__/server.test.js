'use strict';

const {server} = require('../../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('web server', () => {

  it('should respond with a 500 on an error', () => {

    return mockRequest
      .put('/posts/0')
      .then(results => {
        expect(results.status).toBe(500);
      });

  });

  it('should respond with a 404 on an invalid route', () => {

    return mockRequest
      .get('/foobar')
      .then(results => {
        expect(results.status).toBe(404);
      });

  });

  it('should respond with a 404 on an invalid method', () => {

    return mockRequest
      .post('/')
      .then(results => {
        expect(results.status).toBe(404);
      });

  });

  it('should respond properly on request to /posts', () => {

    return mockRequest
      .get('/posts')
      .then(results => {
        expect(results.status).toBe(200);
      });

  });

});
