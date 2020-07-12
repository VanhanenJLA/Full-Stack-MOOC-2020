import express from 'express';
import patientService from '../services/patients';

const router = express.Router();

router.get('/', (_request, response) => {
  const patients = patientService.getPatients();
  response
    .status(200)
    .json(patients);
});

router.post('/', (request, response) => {
  const patient = request.body;
  const { name, dateOfBirth, ssn, gender, occupation } = patient;

  if (!name || !dateOfBirth || !ssn || !gender || !occupation)
    return response
      .status(400)
      .send("Missing parameters!");

  const createdPatient = patientService.create(patient);
  return response
    .status(200)
    .json(createdPatient);
});



export default router;