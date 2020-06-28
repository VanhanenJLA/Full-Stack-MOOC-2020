import React, { useState, useEffect } from 'react'

import Add from './components/Add'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Toast from './components/Toast'
import PhonebookService from './phonebook-service'
import './index.css'

const Phonebook = () => {

  const [person, setPerson] = useState({})
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [toast, setToast] = useState(null)

  useEffect(() => {
    (async () => setPersons(await PhonebookService.getPersons()))()
  }, [])

  const addPerson = async (person) => {
    const exists = persons.find(p => p.name === person.name);
    if (exists) {
      if (window.confirm(`Phonebook already contains ${person.name}.\nDo you want to update the number instead?`)) {
        await PhonebookService.updatePerson({ ...exists, number: person.number });
        showToast({ message: `${person.name} was updated.`, style: 'success' });
        setPersons(await PhonebookService.getPersons());
      }
      return;
    }
    await PhonebookService.addPerson(person)
    showToast({ message: `${person.name} was added.`, style: 'success' });
    setPersons(await PhonebookService.getPersons());
    setPerson({});
  }

  const deletePerson = async (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      try {
        await PhonebookService.deletePerson(person);
        showToast({ message: `${person.name} was deleted.`, style: 'success' });
      } catch (error) {
        showToast({ message: `${person.name} was already deleted from the server.`, style: 'error' });
      }
    }
    setPersons(await PhonebookService.getPersons());
  }

  const caseInsensitivelyIncludes = (s, o) => {
    return s.toLowerCase().includes(o.toLowerCase());
  }

  const showToast = (toast, duration) => {
    if (!duration) duration = 4000;
    setToast(toast)
    setTimeout(() => {
      setToast(null)
    }, duration);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter}
        filterChanged={(newValue) => setFilter(newValue)}>
      </Filter>

      <Toast toast={toast}></Toast>

      <Add addPerson={addPerson}
        person={person}
        nameChanged={e => setPerson({ ...person, name: e.target.value })}
        numberChanged={e => setPerson({ ...person, number: e.target.value })}>
      </Add>

      <Persons deletePerson={deletePerson} persons={persons.filter((c) =>
        caseInsensitivelyIncludes(c.name, filter))}>
      </Persons>
    </div>
  )

}
export default Phonebook;