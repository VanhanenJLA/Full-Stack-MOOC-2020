import React from 'react';
import { Diagnosis, Discharge, HealthCheckRating, Entry } from '../types';
import { Formik, Field, Form } from 'formik';

import { useStateValue } from '../state';
import { Grid, Button } from 'semantic-ui-react';
import { TextField, DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';

export interface EntryForm {
  type: string;
  description: string;
  date: Date;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  discharge: Discharge;
  healthCheckRating: HealthCheckRating;
  employerName: string;
  sickLeave: {
    start: Date,
    end: Date
  };
}

interface SelectField {
  name: string;
  label: string;
  options: TypeOption[];
}

export type ValidationType = string | undefined

export const SelectField: React.FC<SelectField> = ({
  name,
  label,
  options
}) => (
    <>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </>
  );

export type TypeOption = {
  value: Entry["type"];
  label: string;
};

const typeOptions: TypeOption[] = [
  { value: "Hospital", label: "Hospital visit" },
  { value: "OccupationalHealthcare", label: "Occupational healthcare" },
  { value: "HealthCheck", label: "Health check" }
];

// DD-MM-YYYY
// https://www.regextester.com/97612
const DATE_REGEX = /^\s*(3[01]|[12][0-9]|0?[1-9])\-(1[012]|0?[1-9])\-((?:19|20)\d{2})\s*$/;

interface AddEntryForm {
  onSubmit: () => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<AddEntryForm> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const validate = (input: string): string | undefined => {
    if (!input) return "Field is required";
  };

  const validateDate = (input: string): string | undefined => {
    if (!input) return "Field is required";
    if (!DATE_REGEX.test(input)) return "Incorrect format";
  };

  const emptyFormValues: EntryForm = {
    type: "Hospital",
    description: "",
    date: new Date(),
    specialist: "",
    diagnosisCodes: undefined,
    discharge: {
      date: "",
      criteria: ""
    },
    healthCheckRating: 3,
    employerName: "",
    sickLeave: {
      start: new Date(),
      end: new Date()
    }
  }

  return (
    <Formik initialValues={emptyFormValues} onSubmit={onSubmit}>
      {
        ({ isValid, dirty, setFieldValue, setFieldTouched, values }) =>

          <Form className="form ui">

            <SelectField
              label="Type"
              name="type"
              options={typeOptions}
            />

            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
              validate={validate}
            />

            <Field
              label="Date"
              placeholder="DD-MM-YYYY"
              name="date"
              component={TextField}
              validate={validateDate}
            />

            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
              validate={validate}
            />

            {
              values.type !== "HealthCheck" &&
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />

            }

            {
              values.type === "HealthCheck" &&
              <Field
                label="Health Check Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />

            }

            {
              values.type === "Hospital" &&
              <Hospital
                validate={validate}
                validateDate={validateDate}
              />
            }

            {
              values.type === "OccupationalHealthcare" &&
              <OccupationalHealthCare
                validate={validate}
                validateDate={validateDate}
              />
            }

            <Grid>

              <Grid.Column floated="left" width={5}>
                <Button
                  type="button"
                  onClick={onCancel}
                  color="red">
                  Cancel
                </Button>
              </Grid.Column>

              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}>
                  Add
                </Button>
              </Grid.Column>

            </Grid>

          </Form>

      }
    </Formik>
  );
};

export default AddEntryForm;

const Hospital: React.FC<ValidationProps> = ({ validate, validateDate }) => {
  return (
    <>
      <Field
        label="Discharge date"
        placeholder="DD-MM-YYYY"
        name="discharge.date"
        component={TextField}
        validate={validateDate}
      />
      <Field
        label="Discharge criteria"
        placeholder="Criteria"
        name="discharge.criteria"
        component={TextField}
        validate={validate}
      />
    </>
  )
}

interface ValidationProps {
  validate: (value: string) => ValidationType;
  validateDate: (value: string) => ValidationType;
}

const OccupationalHealthCare: React.FC<ValidationProps> = ({ validate, validateDate }) => {
  return (
    <>
      <Field
        label="Employer name"
        placeholder="Employer name"
        name="employerName"
        component={TextField}
        validate={validate}
      />
      <h3>Sick leave</h3>
      <Field
        label="Start date"
        placeholder="DD-MM-YYYY"
        name="sickLeave.startDate"
        component={TextField}
        validate={validateDate}
      />
      <Field
        label="End date"
        placeholder="DD-MM-YYYY"
        name="sickLeave.endDate"
        component={TextField}
        validate={validateDate}
      />
    </>
  )
}