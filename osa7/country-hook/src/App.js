import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(response => setCountry({ ...response.data[0], found: true }))
      .catch(setCountry({ found: false }))
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  const { found, name, capital, population, flag } = country

  if (!found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{name} </h3>
      <div>capital {capital} </div>
      <div>population {population}</div>
      <img src={flag} height='100' alt={`flag of ${name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App