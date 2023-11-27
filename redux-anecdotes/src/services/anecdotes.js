import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    // id: getId(),
    votes: 0,
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const newContent = asObject(content)
  const response = await axios.post(baseUrl, newContent)
  return response.data
}

const getAnecdoteId = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const vote = async (id) => {
  const anecdote = await getAnecdoteId(id)
  const response = await axios.put(`${baseUrl}/${id}`, {
    ...anecdote,
    votes: anecdote.votes + 1,
  })
  return response.data
}

export default { getAll, createNew, vote }
