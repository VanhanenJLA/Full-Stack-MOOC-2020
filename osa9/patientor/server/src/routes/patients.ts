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

router.get('/:id', async (request, response) => {
  const id = request.params.id;
  const patient = patientService.getPatient(id);
  console.log(patient);
  response.status(200).json(patient);
});

router.post('/:id/entries', (request, response) => {
  const id = request.params.id;
  const patient = patientService.getPatient(id);
  if (!patient)
    return response.status(400)
      .send(`Patient ${id} not found.`);

  const entry = patientService.createEntry(patient, request.body);
  return response
    .status(200)
    .send(entry);

});



export default router;