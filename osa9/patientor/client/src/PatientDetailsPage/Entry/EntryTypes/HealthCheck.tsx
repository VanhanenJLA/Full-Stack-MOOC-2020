import React from 'react';
import { HealthCheckRating, HealthCheckEntry } from '../../../types';
import { Segment, Icon } from 'semantic-ui-react';
import Diagnoses from '../Diagnoses';

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {

  const getHeartColor = (rating: HealthCheckRating): string => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return "green";
      case HealthCheckRating.LowRisk:
        return "yellow";
      case HealthCheckRating.HighRisk:
        return "orange";
      case HealthCheckRating.CriticalRisk:
        return "red";
    }
  };

  return (
    <Segment>
      <h3>{entry.date} <Icon name="user doctor" /></h3>
      <p className="description">{entry.description}</p>
      <Icon className={getHeartColor(entry.healthCheckRating)} name="heart" />
      <Diagnoses codes={entry.diagnosisCodes} />
    </Segment>
  );
};

export default HealthCheck;