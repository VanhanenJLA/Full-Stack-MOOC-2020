import { getAnecdotes, createAnecdote, updateAnecdote } from "../services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote =>
        anecdote.id === action.anecdote.id ?
          action.anecdote : anecdote)

    case 'NEW_ANECDOTE':
      console.log(action.anecdote);
      return state.concat(action.anecdote)

    case 'INIT_ANECDOTES':
      return action.anecdotes

    default:
      break;
  }

  return state
}

export const vote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await updateAnecdote({ ...anecdote, votes: anecdote.votes + 1 })
    return dispatch({
      type: 'VOTE', anecdote: updatedAnecdote
    })

  }
}

export const newAnecdote = anecdote => {
  return async dispatch => {
    dispatch({
      type: 'NEW_ANECDOTE',
      anecdote: await createAnecdote(anecdote)
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAnecdotes()
    dispatch({ type: 'INIT_ANECDOTES', anecdotes })
  }
}

export default anecdoteReducer