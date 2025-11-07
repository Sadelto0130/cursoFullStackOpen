import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import { createUser, loginUser } from './services/user'
import NewBlog from './components/NewBlog'
import "./index.css"

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [register, setRegister] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUserBlog')
    if(loggedUser) {
      const userLocal = JSON.parse(loggedUser)
      setUser(userLocal)
      blogService.setToken(userLocal.token)
    }
  }, [])

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type })

    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const login = async (e) => {
    e.preventDefault()

    if(register) {
      try {
        const newUser = await createUser(userName, name, password)
        const userLogin = await loginUser(userName, password)
        blogService.setToken(userLogin.token)
        setUser(newUser)
        showMessage('User Login successful', 'success' )
      } catch (error) {
        showMessage('wrong username or password', 'error' )
        console.log(error)
      }
    } else {
      try {
        const userLogin = await loginUser(userName, password)
        window.localStorage.setItem('loggedUserBlog', JSON.stringify(userLogin))
        blogService.setToken(userLogin.token)
        setUser(userLogin)
        setUserName('')
        setPassword('')
      } catch (error) {
        showMessage('wrong username or password', 'error' )
        console.log(error)
      }
    }
  }

  const createBlog = async(title, author, url) => {
    e.preventDefault()
    try {
      const newBlog = {title, author, url, likes: 0}
      const saveBlogs = await blogService.create(newBlog)
      setBlogs([...blogs, saveBlogs])
      setTitle("")
      setAuthor("")
      setUrl("")
      showMessage(`a new blog ${title} by ${author} added`, 'success')
    } catch (error) {
      showMessage(`error added blog`, 'error')
      console.log(error)
    }
  }

  const updateLikes = async (id, blogUpdate) => {
    try {
      const updatedBlog = await blogService.updateBlog(id, blogUpdate)
      const newBlogs = blogs.map((blog) => 
        blog.id === id ? updatedBlog : blog
      )
      setBlogs(newBlogs)
    } catch (error) {
      showMessage("error" + error.response.data.error, "error");
      console.error(error)
    }
  }

  const removeBlog = async(id) => {
    try {
      await blogService.deleteBlog(id)

      const updateBlogs = blogs.filter((blog) => blog.id !== id)
      setBlogs(updateBlogs)
      showMessage("Blog removed")
    } catch (error) {
      setMessage("error" + error.response.data.error);
      console.error(error)
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      <h1>Blog App</h1>
      {message && <p className={`message ${message.type}`}>{message.text}</p>}
      {
        user === null 
        ? <>
              <Login 
                  userName={userName}
                  setUserName={setUserName}
                  name={name} 
                  setName={setName} 
                  password={password} 
                  setPassword={setPassword}
                  onSubmit={login}
                  setRegister={setRegister}
                  register={register}
                />
            </> 
          : <>
              <h2>blogs</h2>
              <p>{user.name} logged in <button onClick={logout}>logout</button></p>
              <NewBlog createBlog={createBlog} showMessage={showMessage}/>
              {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map(blog =>
                  <Blog 
                    key={blog?.id || blog?._id} 
                    blog={blog} 
                    updateLikes={updateLikes}
                    removeBlog={removeBlog}
                    userName={user.name}
                  />
                  )
              }
            </> 
      }
    </div>
  )
}

export default App