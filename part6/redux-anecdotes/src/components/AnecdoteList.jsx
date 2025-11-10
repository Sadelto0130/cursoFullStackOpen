import { useSelector, useDispatch } from 'react-redux'
import { initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes?.filtered)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(createNotification(`You voted ${anecdote.content}`, 5))
  }
  return (
    <div>
      {
        [...anecdotes]
          .sort((a, b) => b.votes - a.votes)
          .map((anecdote, i) => (
        <div key={anecdote?.id || i}>
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

export default AnecdoteList