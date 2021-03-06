const User = require('./../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const login = async (user) => {
  const response = await api
    .post('/api/login')
    .send(user)

  return response.body.token
}

const createUser = async (user) => {
  const response = await api
    .post('/api/users')
    .send(user)

  return response.body
}

const dummyUser = { username: 'dummy', name: 'tyhäm', password: 'xxx' }

module.exports = {
  usersInDb,
  login,
  createUser,
  dummyUser
}