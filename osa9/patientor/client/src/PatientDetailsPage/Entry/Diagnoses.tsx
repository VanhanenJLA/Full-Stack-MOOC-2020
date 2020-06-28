import React from 'react';
import { useStateValue } from '../../state';
import { Segment, Icon, List, Header } from 'semantic-ui-react';

const Diagnoses: React.FC<({ codes: string[] | undefined })> = ({ codes }) => {

  const [{ diagnoses }] = useStateValue();
  if (!codes) return null;

  return (
    <Segment>

      <Header as="h4">Diagnoses <Icon name="clipboard" /></Header>

      <List>
        {Object.values(codes).map(c =>
          <List.Item key={c}>
            <span>
              <b>{c}</b> {diagnoses[c] ? diagnoses[c].name : null}
            </span>
          </List.Item>
        )}
      </List>

    </Segment>
  );
};

export default Diagnoses;