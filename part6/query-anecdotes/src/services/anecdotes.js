import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => axios.get(baseUrl).then(res => res.data)

const createNew = async (content) => {
  if(content.length < 5) return console.error("Content short");
  const object = {
    content: content, 
    id: Math.random().toString(36).slice(2, 6).toUpperCase(),
    votes: 0
  }
  const resp = await axios.post(baseUrl, object)
  return resp.data
}

const voteAnecdote = async (anecdote) =>  {
  const {id} = anecdote
  const votes = {votes: anecdote.votes +1}
  const resp = await axios.patch(`${baseUrl}/${id}`, votes)
  return resp.data
}

export default {getAll, createNew, voteAnecdote}