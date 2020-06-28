import React from 'react';
import { Segment, Icon, Header } from 'semantic-ui-react';
import Diagnoses from '../Diagnoses';
import { OccupationalHealthcareEntry } from '../../../types';

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {

  return (
    <Segment>

      <Header as="h3">{entry.date}
        <Icon name="stethoscope" /> {entry.employerName}
      </Header>

      <p className="description">{entry.description}</p>

      <Diagnoses codes={entry.diagnosisCodes} />

      {entry.sickLeave && (
        <Segment>
          <h4>Sick leave <Icon name="calendar alternate outline" /></h4>
          <div><b>Start date:</b> {entry.sickLeave.startDate}</div>
          <div><b>End date:</b> {entry.sickLeave.endDate}</div>
        </Segment>
      )}

    </Segment>
  );
};

export default OccupationalHealthcare;