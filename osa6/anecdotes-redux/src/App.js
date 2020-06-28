import React, { useEffect } from 'react'
import CreateAnecdote from './components/CreateAnecdote'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <Notification></Notification>
      <CreateAnecdote></CreateAnecdote>
      <Filter></Filter>
      <Anecdotes></Anecdotes>
    </div>
  )
}

export default App