import axios from 'axios'
const baseUrl = '/api'

// /login -> login solamente
export const loginUser = async (userName, password) => {
if(!userName || !password) {
    throw new Error("missing data")
  }

  const loginUser = { userName, password}

  const res = await axios.post(`${baseUrl}/login`, loginUser)
  return res.data
}

// /users -> registrar
export const createUser = async (userName, name, password) => {
  if(!userName || !name || !password) {
    throw new Error("missing data")
  }

  const newUser = { userName, name, password}

  const res = await axios.post(`${baseUrl}/users`, newUser)
  return res.data
}


