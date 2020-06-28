import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { show } from '../reducers/notificationReducer'

const CreateAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    let content = event.target.anecdote.value
    dispatch(newAnecdote(content))
    dispatch(show({ message: `Created new anecdote: '${content}'` }))
    content = ''
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default CreateAnecdote