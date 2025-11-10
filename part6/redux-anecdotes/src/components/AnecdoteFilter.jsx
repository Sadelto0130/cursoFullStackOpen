import React from 'react'
import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const filterText = e.target.value
    dispatch(filterAnecdotes(filterText))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default AnecdoteFilter