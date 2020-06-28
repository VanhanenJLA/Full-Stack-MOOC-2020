import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatients, setDiagnoses } from "./state";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import PatientDetailsPage from "./PatientDetailsPage";

const App: React.FC = () => {

  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const getPatients = async () => {
      try {
        const patients =
          (await axios.get<Patient[]>(`${apiBaseUrl}/patients`)).data;
        dispatch(setPatients(patients));
      } catch (error) {
        console.error(error);
      }
    };
    getPatients();

    const getDiagnoses = async () => {
      try {
        const diagnoses =
          (await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)).data;
        dispatch(setDiagnoses(diagnoses));
      } catch (error) {
        console.error(error);
      }
    }
    getDiagnoses();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id" render={() => <PatientDetailsPage />} />
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
