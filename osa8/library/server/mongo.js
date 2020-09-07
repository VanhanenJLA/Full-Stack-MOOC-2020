const mongoose = require('mongoose')
const { MONGO_URI } = require('./config')
const { createUser } = require('./mutations')
const { User, Author, Book } = require('./models')
const { books, authors } = require('./mock-data')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MONGO: Connected to MongoDB')
    // Author.insertMany(authors)
    // Book.insertMany(books)
    // createUser(null, { username: "Admin", favoriteGenre: "Horror" })
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const toJSON = (document, returnedObject) => {
  returnedObject.id = returnedObject._id.toString()
  delete returnedObject._id
  delete returnedObject.__v
}

module.exports = toJSON;