import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesService from '../services/anecdotes.js'
import { useNotification } from '../context/notificationContext.jsx'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const {setNotification}= useNotification()

  const newAnecdote = useMutation({
    mutationFn: anecdotesService.createNew,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries(['anecdotes'], (old) => [
        ...old,
        newAnecdote
      ])
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if(content.length < 5 ) {
      setNotification('too short anecdote, must have length 5 or more', 3)
    }
    newAnecdote.mutate(content)
    setNotification(`anecdote ${content} created`, 3)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
