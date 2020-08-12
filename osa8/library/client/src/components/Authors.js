
import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    id
    born
    bookCount
  }
}`

const Authors = (props) => {

  const result = useQuery(ALL_AUTHORS)

  if (!props.show) return null
  if (result.loading) return <div>loading...</div>

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

          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}

        </tbody>

      </table>

      <BirthYearForm authors={authors}></BirthYearForm>

    </div>

  )
}

const BirthYearForm = ({ authors }) => {

  const SET_BIRTHYEAR = gql`
  mutation setBirthYear($name: String!, $setBornTo: Int!) {
    setBirthYear(
      name: $name
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }`

  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [changeBirthYear] = useMutation(
    SET_BIRTHYEAR, { refetchQueries: [{ query: ALL_AUTHORS }] }
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
