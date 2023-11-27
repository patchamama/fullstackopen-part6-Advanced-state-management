import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) =>
    filter
      ? anecdotes.filter((item) =>
          item.content.toLowerCase().includes(filter.toLowerCase())
        )
      : anecdotes
  )

  const vote = async ({ id, content }) => {
    console.log('vote', id)
    dispatch({ type: 'anecdote/addVote', payload: id })
    dispatch(setNotification(`you has voted '${content}'`, 5))
    const updatedAnecdote = await anecdoteService.vote(id)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
