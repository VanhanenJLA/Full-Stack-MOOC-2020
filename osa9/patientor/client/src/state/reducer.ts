import { State } from "./state";
import { Patient, Entry, Diagnosis } from "../types";

export type Action =
  | {
    type: "SET_PATIENTS";
    payload: Patient[];
  }
  | {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  }
  | {
    type: "ADD_ENTRY";
    payload: { id: string; entry: Entry };
  }

export const setPatients = (patients: Patient[]): Action => {
  return { type: "SET_PATIENTS", payload: patients }
}

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSES", payload: diagnoses }
}

export const addPatient = (patient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: patient }
}

export const updatePatient = (patient: Patient): Action => {
  return { type: "UPDATE_PATIENT", payload: patient };
};

export const addEntry = (id: string, entry: Entry): Action => {
  return { type: "ADD_ENTRY", payload: { id, entry } };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {

    case "SET_PATIENTS":
      return {
        ...state, patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }), {}),
          ...state.patients
        }
      };

    case "SET_DIAGNOSES":
      return {
        ...state, diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }), {}),
          ...state.diagnoses
        }
      };

    case "ADD_PATIENT":
      return {
        ...state, patients: {
          ...state.patients, [action.payload.id]: action.payload
        }
      };

    case "UPDATE_PATIENT":
      return {
        ...state, patients: {
          ...state.patients, [action.payload.id]: action.payload
        }
      };

    case "ADD_ENTRY":
      const patient = state.patients[action.payload.id];
      if (!patient.entries) {
        patient.entries = [action.payload.entry];
      } else {
        patient.entries.push(action.payload.entry);
      }
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: patient
        }
      };

    default:
      return state;
  }
};
