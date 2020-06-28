import axios from 'axios';

const baseUrl = "/api/persons"

const addPerson = async (person) => {
    const response = await axios.post(baseUrl, person);
    return response.data;
}

const getPersons = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const updatePerson = async (person) => {
  const response = await axios.put(`${baseUrl}/${person.id}`, person);
  return response.data;
}

const deletePerson = async (person) => {
  const response = await axios.delete(`${baseUrl}/${person.id}`, person);
  return response.data;
}

export default {
  addPerson,
  getPersons,
  updatePerson,
  deletePerson
}