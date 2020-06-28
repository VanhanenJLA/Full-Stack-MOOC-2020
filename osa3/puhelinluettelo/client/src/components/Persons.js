import React from 'react';
import Person from './Person'

const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      <h2>Contacts</h2>
      {persons.map((person) => <Person key={person.name} person={person} deletePerson={deletePerson} />)}
    </>
  )
}

export default Persons;