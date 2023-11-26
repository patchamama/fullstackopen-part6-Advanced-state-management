import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    console.log('addAnecdote', event.target.anecdote.value)
    const action = {
      type: 'ADD_ANECDOTE',
      payload: {
        content: event.target.anecdote.value,
      },
    }
    event.target.anecdote.value = ''
    dispatch(action)
  }

  const vote = (id) => {
    console.log('vote', id)
    const action = {
      type: 'ADD_VOTE',
      payload: {
        id,
      },
    }
    dispatch(action)
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
