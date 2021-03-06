const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username: username })

  if (!user)
    throw {
      name: 'LoginError',
      message: `No user for username: ${username} found.`
    }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
  if (!passwordCorrect)
    throw {
      name: 'LoginError',
      message: 'Invalid password.'
    }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter