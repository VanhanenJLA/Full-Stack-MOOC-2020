import React from 'react';

const Filter = ({ filterChanged }) => {
  return (
    <p>Filter contacts: <input onChange={e => filterChanged(e.target.value)} /> </p>
  )
}
export default Filter;