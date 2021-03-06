const proxyquire = require('proxyquire')
const {
  usersIdTest,
  UsersControllerMock
} = require('../utils/mocks/users')
const testServer = require('../utils/testServer')

describe('Users - Routes', () => {
  const router = proxyquire('../components/users/routes', {
    './controller': UsersControllerMock
  })
  const request = testServer(router)
  describe('GET /api/users', () => {
    it('Should respond with status 200', (done) => {
      request.get('/api/users').expect(200, done)
    })
    it('Should respond with a content-type json', (done) => {
      request.get('/api/users').expect('Content-type', /json/, done)
    })
  })
  describe('GET /api/users/userId', () => {
    it('Should respond with status 200', (done) => {
      request.get(`/api/users/${usersIdTest}`).expect(200, done)
    })
    it('Should respond with a content-type json', (done) => {
      request
        .get(`/api/users/${usersIdTest}`)
        .expect('Content-type', /json/, done)
    })
  })
  describe('DELETE /api/users/userId', () => {
    it('Should respond with status 200', (done) => {
      request.delete(`/api/users/${usersIdTest}`).expect(200, done)
    })
    it('Should respond with a content-type json', (done) => {
      request
        .delete(`/api/users/${usersIdTest}`)
        .expect('Content-type', /json/, done)
    })
  })
})
