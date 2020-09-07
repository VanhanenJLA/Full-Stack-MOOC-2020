import React from 'react';
import { HospitalEntry } from '../../types';
import { Icon, Segment } from 'semantic-ui-react';
import Diagnoses from './Diagnoses';

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {

  return (
    <Segment>
      <h3>{entry.date} <Icon name="hospital" /></h3>
      <div>{entry.description}</div>
      <Diagnoses codes={entry.diagnosisCodes} />
      <Segment>
        <h4>Discharge <Icon name="sign-out" /></h4>
        <div><b>Date:</b> {entry.discharge.date}</div>
        <div><b>Criteria:</b> {entry.discharge.criteria}</div>
      </Segment>
    </Segment>
  );
};

export default Hospital;