import React, { useEffect } from 'react'
import CreateAnecdote from './components/CreateAnecdote'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'

const App = (props) => {

  useEffect(() => {
    props.initializeAnecdotes()
  }, [props])

  return (
    <div>
      <Notification></Notification>
      <CreateAnecdote></CreateAnecdote>
      <Filter></Filter>
      <Anecdotes></Anecdotes>
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App) 