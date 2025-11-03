import axios from 'axios'
const baseUrl = 'http://localhost:3000/persons'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(resp => resp.data)
}

const addNew = (newPerson) => {
  const req = axios.post(baseUrl, newPerson)
  return req.then(resp => resp.data)
}

const deletePerson = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then(resp => resp.data)
}

const updatePerson = (id, updatePerson) => {
  const req = axios.put(`${baseUrl}/${id}`, updatePerson)
  return req.then(res => res.data)
}

export default {
  getAll,
  addNew,
  deletePerson,
  updatePerson
}