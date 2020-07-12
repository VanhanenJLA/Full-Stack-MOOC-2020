import { Patient, PatientWithoutSsn } from './../types';
import patients from '../data/patients.json';

const getPatients = (): Array<PatientWithoutSsn> => {
  return patients.map(p => {
    delete p.ssn;
    return p as PatientWithoutSsn;
  });
};

const create = (patient: Patient): PatientWithoutSsn => {
  const id = Math.floor((Math.random() * 1e10));
  patient.id = id.toString()
  patients.push(patient);
  delete patient.ssn;
  return patient;
};

export default { getPatients, create };