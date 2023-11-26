import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, addVote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    console.log('addAnecdote', event.target.anecdote.value)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(event.target.anecdote.value))
  }

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
