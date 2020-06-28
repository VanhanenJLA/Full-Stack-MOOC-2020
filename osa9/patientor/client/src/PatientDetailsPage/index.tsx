import React from "react";
import axios from "axios";
import { Container, Header, Icon, List, Button } from "semantic-ui-react";

import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient, addEntry } from "../state";
import { useParams } from "react-router-dom";
import EntryView from "./Entry/EntryView";
import { toGenderIconName } from "../util";
import AddEntryModal from "../AddEntryModal/AddEntryModal";
import { EntryForm } from "../AddEntryModal/AddEntryForm";

const PatientDetailsPage: React.FC = () => {

  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const show = (): void => setIsOpen(true);
  const close = (): void => setIsOpen(false);

  const submit = async (input: EntryForm) => {
    try {
      const createdEntry = (await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        input
      )).data;
      dispatch(addEntry(id, createdEntry));
      close();
    } catch (error) {
      console.error(error)
      setError(error.response.data.error);
    }
  };

  React.useEffect(() => {

    if (!patient || !patient.ssn)
      getPatient(id);

    async function getPatient(id: string) {
      const patient = (await axios
        .get<Patient>(`${apiBaseUrl}/patients/${id}`)).data;
      dispatch(updatePatient(patient));
    };

  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!patient) return null;

  return (
    <div className="App">
      <Container>

        <Header as="h3">
          {patient.name}
          <Icon name={toGenderIconName(patient.gender)} />
        </Header>

        <p>SSN: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>

        <Header as="h4">Entries</Header>
        {!patient.entries ? <p>No entries.</p> : (
          <List>
            {patient.entries.map(entry => (
              <List.Item key={entry.id}>
                <EntryView entry={entry} />
              </List.Item>
            ))}
          </List>
        )}

        <AddEntryModal
          onSubmit={submit}
          onClose={close}
          modalOpen={isOpen}
          error={error}
        />
        <Button onClick={() => show()}>Add New Entry</Button>

      </Container>
    </div>
  );
};

export default PatientDetailsPage;
