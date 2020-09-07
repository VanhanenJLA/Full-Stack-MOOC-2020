const { ApolloServer, AuthenticationError, PubSub } = require('apollo-server')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongo = require('./mongo.js')
const { User } = require('./models')
const { SECRET } = require('./config')
const jwt = require('jsonwebtoken')

const context = async ({ req: request }) => {

  if (!request || !request.headers)
    return

  const token = request.headers.authorization

  if (!token)
    return
  if (!token.toLowerCase().startsWith('bearer '))
    new Error("Malformed token.")

  const decodedToken = jwt.verify(token.substring(7), SECRET)
  const currentUser = await User.findOne({ username: decodedToken.username })
  return { currentUser }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`SERVER: Server ready at ${url}`)
  console.log(`SERVER: Subscriptions ready at ${subscriptionsUrl}`)
})

