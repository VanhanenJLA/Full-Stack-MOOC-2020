const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const {PORT} = config;
const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})