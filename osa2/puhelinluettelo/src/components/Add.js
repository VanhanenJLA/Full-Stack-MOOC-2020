import React from 'react';

const Add = ({ addPerson, person, nameChanged, numberChanged }) => {
  return (
    <>
      <h2>Add contacts</h2>
      <form>
        <div>
          <p>name: <input onChange={nameChanged} /> </p>
          <p>number: <input onChange={numberChanged} /> </p>
        </div>
        <button onClick={() => addPerson(person)}>Add</button>
      </form>
    </>
  )
}

export default Add;