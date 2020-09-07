import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES, BOOKS_BY_GENRE } from '../graphql/queries'

const Books = ({ show }) => {

  const [books, setBooks] = useState([])
  const allBooksResult = useQuery(ALL_BOOKS)
  const genresResult = useQuery(ALL_GENRES)
  const [getFilteredBooks, filteredBooksResult] = useLazyQuery(BOOKS_BY_GENRE, { fetchPolicy: "no-cache" })

  useEffect(() => {
    if (allBooksResult.data && allBooksResult.data.allBooks) {
      setBooks(allBooksResult.data.allBooks)
    }
  }, [allBooksResult])

  useEffect(() => {
    if (filteredBooksResult.data && filteredBooksResult.data.allBooks) {
      setBooks(filteredBooksResult.data.allBooks)
    }
  }, [filteredBooksResult.loading, filteredBooksResult.data])

  if (!show) return null
  if (allBooksResult.loading) return <div>loading...</div>
  if (genresResult.loading) return <div>loading...</div>
  if (allBooksResult.error) return <div>{allBooksResult.error.message}</div>

  const genres = genresResult.data.allGenres

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(
            ({ title, author: { name }, published }) =>
              <tr key={title}>
                <td>{title}</td>
                <td>{name}</td>
                <td>{published}</td>
              </tr>
          )}
        </tbody>
      </table>

      <h3>filter by genre</h3>
      {genres.map((genre) => (
        <button key={genre} onClick={() => getFilteredBooks({ variables: { genre } })}>
          {genre}
        </button>
      ))}
      <button onClick={() => getFilteredBooks({ variables: { genre: '' } })}>all</button>

    </div>
  )
}

export default Books