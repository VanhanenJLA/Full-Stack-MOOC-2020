import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { show, hide } from '../reducers/notificationReducer'

const Anecdotes = () => {

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) return anecdotes

    const sisaltyyko = (a, b) =>
      a.content.toLowerCase().includes(b.toLowerCase())

    return anecdotes.filter(a => sisaltyyko(a, filter))
  })

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes)
        .map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote}></Anecdote>)}
    </>
  )
}


const Anecdote = ({ anecdote }) => {

  const dispatch = useDispatch()
  const handleVote = () => {
    dispatch(vote(anecdote))
    dispatch(show({ message: `You voted for: '${anecdote.content}'` }))
  }

  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote()}>vote</button>
      </div>
    </div>
  )
}

export default Anecdotes
