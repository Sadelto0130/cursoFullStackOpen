import { useState } from "react"
import blogService from '../services/blogs.js'

const NewBlog = ({createBlog, showMessage}) => {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState("")
  const [author,setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleTitle = (e) => setTitle(e.target.value)
  const handleAuthor = (e) => setAuthor(e.target.value)
  const handleUrl = (e) => setUrl(e.target.value)

  const handleCreateBlog = () => {
    createBlog(title, author, url)
  }  

  const handleCancel = () => {
    setVisible(false)
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  const hideVisible = {display: visible ? 'none' : ''}
  const showVisible = {display: visible ? '' : 'none'}

  return (
    <div>
      <div style={hideVisible}>
        <button onClick={() => setVisible(true)}>Create Blog</button>
      </div>
      <div style={showVisible}>
        <h2>Create New</h2>
        <form onSubmit={handleBlog}>
          <p>Title: <input value={title} onChange={handleTitle}/></p>
          <p>Author: <input type="text" value={author} onChange={handleAuthor}/></p>
          <p>url: <input type="text" value={url} onChange={handleUrl}/></p>
          <button type="button" onClick={handleCreateBlog}>Create</button>
          <button type="button" onClick={handleCancel}>cancel</button>
        </form>
      </div>
    </div>
  )
}

export default NewBlog