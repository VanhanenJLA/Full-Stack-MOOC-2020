import express from 'express';
import cors from 'cors';
import middleware from './utils/middleware';
import patientsRouter from './routes/patients';

// require('express-async-errors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/patients', patientsRouter);

app.get('/api/ping', (_request, response) => {
  response.send('pong');
});

export default app;