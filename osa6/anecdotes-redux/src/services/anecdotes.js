import axios from 'axios'
import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  return (await axios.get(baseUrl)).data
}

export const createAnecdote = async anecdote => {
  return (await axios.post(baseUrl, asObject(anecdote))).data
}

export const updateAnecdote = async anecdote => {
  return (await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)).data
}