require('dotenv').config()

let PORT = process.env.PORT || 3001
let MONGO_URI = process.env.MONGO_URI
let SECRET = process.env.SECRET

module.exports = {
  MONGO_URI,
  PORT,
  SECRET
}