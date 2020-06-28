
import React, { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'

import { BOOK_ADDED } from './graphql/subscriptions'
import Login from './components/Login'

const App = () => {

  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.token
    if (token) {
      setToken(token)
    }
  }, [])

  useSubscription(BOOK_ADDED,
    {
      onSubscriptionData: ({ subscriptionData }) => {
        console.log(subscriptionData);
        const { title, author } = subscriptionData.data.bookAdded
        window.alert(`[${title}] by [${author.name}] was added.`)
      }
    }
  )

  const logout = () => {
    localStorage.clear()
    client.resetStore()
    setToken(null)
    setPage('login')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('newbook')} hidden={!token}>add book</button>
        <button onClick={() => setPage('recommended')} hidden={!token}>recommended</button>
        <button onClick={() => setPage('login')} hidden={token}>login</button>
        <button onClick={() => logout()} hidden={!token}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'newbook'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <Recommended
        show={page === 'recommended'}
      />

    </div>
  )
}

export default App