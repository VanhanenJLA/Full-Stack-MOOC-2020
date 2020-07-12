import logger from './logger';

const requestLogger = (request: any, _response: any, next: any) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (_request: any, response: any) => {
  response.status(404).send('unknown endpoint');
};

const errorHandler = (error: any, _request: any, response: any, next: any) => {

  logger.error(error.message);

  if (error.name === 'CastError')
    return response.status(400).json(error);

  if (error.name === 'ValidationError')
    return response.status(400).json(error);

  if (error.name === 'MongoError')
    return response.status(400).json(error);

  if (error.name === 'JsonWebTokenError')
    return response.status(401).json(error);

  if (error.name === 'TestError')
    return response.status(200).json(error);

  if (error.name === 'AuthenticationError')
    return response.status(401).json(error);

  if (error.name === 'LoginError')
    return response.status(401).json(error);

  logger.error(error.message);

  next(error);
};

const tokenExtractor = (request: any, _response: any, next: any) => {
  request.token = getTokenFrom(request);
  next();

  function getTokenFrom(request: any) {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer '))
      return authorization.substring(7);
  }
};

export default { tokenExtractor, requestLogger, errorHandler, unknownEndpoint };