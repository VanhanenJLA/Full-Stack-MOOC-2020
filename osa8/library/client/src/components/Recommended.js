import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, BOOKS_BY_GENRE } from '../graphql/queries'

const Recommended = ({ show }) => {
  const result = useQuery(ME)
  const [booksByGenre, { data }] = useLazyQuery(BOOKS_BY_GENRE, { fetchPolicy: "no-cache" })
  const [books, setBooks] = useState('')

  useEffect(() => {
    if (result.data)
      booksByGenre({ variables: { genre: result.data.me.favoriteGenre } })
  }, [result, booksByGenre])

  useEffect(() => {
    if (data && data.allBooks) {
      setBooks(data.allBooks)
    }
  }, [data, books])

  if (!show) return null

  if (result.loading || !result.data) {
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
    <div>

      <h2>recommendations</h2>

      <p>books in your favorite genre <b>{result.data.me.favoriteGenre}</b>:</p>

      <table>

        <tbody>
          <tr>

            <th></th>
            <th>
              author
            </th>

            <th>
              published
            </th>

          </tr>

          {books.map(
            ({ title, published, author }) =>
              <tr key={title}>
                <td>{title}</td>
                <td>{author.name}</td>
                <td>{published}</td>
              </tr>
          )}

        </tbody>

      </table>

    </div>
  )
}

export default Recommended