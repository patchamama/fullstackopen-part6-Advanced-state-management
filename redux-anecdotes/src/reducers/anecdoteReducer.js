import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'
import { setNotification } from './notificationReducer'

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const { id } = action.payload
      return state
        .map((anecdote) => (anecdote.id !== id ? anecdote : action.payload))
        .sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      console.log('anecdote', action)
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes.sort((a, b) => b.votes - a.votes)))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const updateVote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.vote(id)
    dispatch(addVote(updatedAnecdote))
    dispatch(setNotification(`you has voted '${updatedAnecdote.content}'`, 5))
  }
}

export default anecdoteSlice.reducer
