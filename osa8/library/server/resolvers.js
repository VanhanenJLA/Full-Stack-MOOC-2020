const { addBook, createUser, editAuthor, login } = require('./mutations')
const { Book, Author } = require('./models')
const { PubSub } = require('apollo-server')

const pubsub = new PubSub()

const allBooks = async (root, args) => {

  const { author: name, genre } = args
  let filters = {}

  if (name) {
    const author = await Author.findOne({ name })
    if (author)
      filters.author = author._id
  }

  if (genre)
    filters.genres = genre

  return await Book.find(filters).populate('author', { name: 1 })
}

const allGenres = async (root, args) => new Set((await Book.find({})).map(b => b.genres).flat())


const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks,
    allAuthors: () => Author.find(),
    allGenres,
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => root.bookCount ? root.bookCount : 0
  },
  Mutation: {
    addBook,
    editAuthor,
    createUser,
    login,
  },
  Subscription: {
    bookAdded: {
      subscribe: () => {
        console.log("A new subscription!")
        return pubsub.asyncIterator(['BOOK_ADDED'])
      }
    },
  },
}

module.exports = resolvers  