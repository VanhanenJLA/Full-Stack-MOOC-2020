import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/mutations'

const Login = ({ setToken, setPage, show }) => {

  const [username, setUsername] = useState('Admin')
  const [password, setPassword] = useState('salasana')
  const [error, setError] = useState('')

  const [login, { data }] = useMutation(LOGIN,
    { onError: (e) => { setError(e.message) } })

  useEffect(() => {
    if (data && data.login && data.login.value) {
      const token = `bearer ${data.login.value}`
      setToken(token)
      localStorage.token = token
      clear()
      setPage('authors')
    }
    function clear() {
      setUsername('')
      setPassword('')
    }
  }, [data, setToken])

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  if (!show) return null

  return (
    <>

      <h2>Login</h2>

      <form onSubmit={submit}>
        <div>
          username:
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password:
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type='submit'>Login</button>
      </form>

      <div>
        {error}
      </div>

    </>
  )
}

export default Login