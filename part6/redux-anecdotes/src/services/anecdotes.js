import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async() => {
  const resp = await axios.get(baseUrl)
  return resp.data
}

const createNew = async(content) => {
  const object = {content, votes: 0}
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