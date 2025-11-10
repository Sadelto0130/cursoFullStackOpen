import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleCreateAnecdote = async (e) => {
    e.preventDefault()
    if(!content.trim()) return
    dispatch(createAnecdote(content))
    dispatch(createNotification("Anecdote added", 5))
    setContent('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div>
          <input 
            value={content}
            onChange={e=> setContent(e.target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm