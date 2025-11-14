import { useMutation } from '@apollo/client/react'
import React, { useEffect, useState } from 'react'
import { LOGIN, USER } from '../queries/queries.js'


const Login = (props) => {
  const {show, setError, setToken} = props
  if (!show) {
    return null
  }
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })
 
  useEffect(() => {
    if(result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login({variables: {username, password}})
    } catch (error) {
      console.error("GraphQL Error:", error);
    }
  }

  return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      </div>
  )
}

export default Login