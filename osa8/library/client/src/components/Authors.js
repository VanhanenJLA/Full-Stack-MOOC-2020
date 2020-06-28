
import React, { useState } from 'react'
import Select from 'react-select'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS } from '../graphql/queries'
import { EDIT_AUTHOR } from '../graphql/mutations'

const Authors = ({ show, token }) => {

  const result = useQuery(ALL_AUTHORS)

  if (!show) return null
  if (result.loading) return <div>loading...</div>
  if (result.error) return <div>{result.error.message}</div>

  const authors = result.data.allAuthors

  return (
    <div>

      <h2>authors</h2>
      <table>

        <tbody>
          <tr>
            <th></th>

            <th>
              born
            </th>

            <th>
              books
            </th>
          </tr>

          {authors.map(
            ({ name, born, bookCount }) =>
              <tr key={name}>
                <td>{name}</td>
                <td>{born}</td>
                <td>{bookCount}</td>
              </tr>
          )}

        </tbody>

      </table>

      <BirthYearForm authors={authors}></BirthYearForm>

    </div>

  )
}

const BirthYearForm = ({ authors }) => {

  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [changeBirthYear] = useMutation(
    EDIT_AUTHOR, { refetchQueries: [{ query: ALL_AUTHORS }] }
  )

  const submit = (event) => {
    event.preventDefault()
    changeBirthYear({
      variables: {
        name: selectedAuthor.name,
        setBornTo: parseInt(birthYear)
      }
    })
    setBirthYear('')
  }

  const isValidInput = () => {
    if (!birthYear) return false
    if (!selectedAuthor) return false
    if (!parseInt(birthYear, 10)) return false
    return true
  }

  return (
    <div>

      <h3>Set birthyear</h3>
      <Select
        placeholder="Click to select an author."
        onChange={(option) => setSelectedAuthor(option.value)}
        options={authors.map((author) => ({ value: author, label: author.name }))}
      />

      <form onSubmit={submit}>
        <input value={birthYear} placeholder="Enter birth year (e.g. 1942)"
          onChange={(e) => setBirthYear(e.target.value)} />
        <button
          type="submit"
          disabled={!isValidInput()}>
          update author
        </button>
      </form>

    </div>
  )
}

export default Authors
