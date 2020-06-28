import { Patient, PublicPatient, Entry } from './../types';
import patients from '../data/patients';
import { generateUniqueId } from '../utils/uuid';

const getPatients = (): PublicPatient[] => patients.map(p => convert(p));

const getPatient = (id: string): Patient | undefined =>
  patients.find(p => id === p.id);

const create = (patient: Patient): PublicPatient => {
  patient.id = generateUniqueId();
  patients.push(patient);
  return convert(patient);
}

const createEntry = (patient: Patient, entry: Entry): Entry => {
  entry.id = generateUniqueId();
  patient.entries.push(entry)
  return entry;
}

const convert = (patient: Patient): PublicPatient => {
  const { dateOfBirth, gender, id, name, occupation } = patient
  return { dateOfBirth, gender, id, name, occupation }
}

export default { getPatient, getPatients, create, createEntry };