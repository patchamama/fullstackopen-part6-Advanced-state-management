import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateVoteAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const newVoteMutation = useMutation({
    mutationFn: updateVoteAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      // const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      // queryClient.setQueryData(
      //   { queryKey: ['anecdotes'] },
      //   anecdotes.map((anecdote) =>
      //     newAnecdote.id === anecdote.id ? newAnecdote : anecdote
      //   )
      // )
    },
  })
  const handleVote = (anecdote) => {
    console.log('vote')
    newVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
    // return <div>Error: {result.error.message}</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
