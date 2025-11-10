import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import anecdotesService from './services/anecdotes.js'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotification } from './context/notificationContext.jsx'

const App = () => {
  const {setNotification} = useNotification()
  const queryClient = useQueryClient()
  const {data: anecdotes, isLoading, error} = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAll
  })

  const addVote = useMutation({
    mutationFn: anecdotesService.voteAnecdote,
    onSuccess: (addVote) => {
      queryClient.invalidateQueries(['anecdotes'], (old) => [
        ...old,
        addVote
      ])
    }
  })
  
  const handleVote = (anecdote) => {
    addVote.mutate(anecdote)
    setNotification(`anecdote '${anecdote.content}' voted`, 3)
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading anecdotes</p>

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
