
import express from 'express';
const router = express.Router();

import diagnoses from '../data/diagnoses.json';
import { Diagnosis } from '../types';

router.get('/', (_request, response) => {

  const data: Diagnosis[] = diagnoses;
  response
    .status(200)
    .json(data);
});


export default router;