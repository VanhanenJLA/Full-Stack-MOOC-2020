const { UserInputError, AuthenticationError, PubSub } = require("apollo-server")
const { User, Author, Book } = require('./models')
const jwt = require('jsonwebtoken')

const pubsub = new PubSub()
const addBook = async (root, args, context) => {

  const currentUser = context.currentUser

  if (!currentUser)
    throw new AuthenticationError("Unauthenticated.")

  const name = args.author;

  let author = await Author.findOne({ name })

  if (!author)
    author = new Author({ name })

  author.bookCount += 1
  author = await author.save()

  const savedBook =
    await new Book({ ...args, author: author._id })
      .populate('author', { name: 1 })
      .save()

  const book = await savedBook.execPopulate()
  pubsub.publish("BOOK_ADDED", { bookAdded: book })
  console.log("Published \"BOOK ADDED\"", { bookAdded: book });
  return book
}

const editAuthor = async (root, args, context) => {
  const currentUser = context.currentUser
  const { name, setBornTo } = args

  if (!currentUser)
    throw new AuthenticationError("Unauthenticated.")

  let author = await Author.findOne({ name: args.name })

  if (!author)
    throw new UserInputError(`Author of name: ${name} not found.`)

  if (!setBornTo)
    throw new UserInputError(`Invalid argument setBornTo: ${setBornTo}.`)

  author.born = setBornTo

  return await author.save()
}

const createUser = async (root, args) => {
  const { username, favoriteGenre } = args;
  return await new User({ username, favoriteGenre }).save()
}

const login = async (root, args) => {

  const { username, password, _id } = args;
  const user = await User.findOne({ username })

  if (!user)
    throw new UserInputError("No such user.")
  if (password !== 'salasana')
    throw new UserInputError("Invalid password.")

  const value = jwt.sign({ username, id: _id }, process.env.SECRET)
  return { value };
}

module.exports = {
  addBook,
  login,
  createUser,
  editAuthor
}