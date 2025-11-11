import React, { useState } from 'react'
import { useField } from '../hooks'

const FormAnecdote = ({addNew}) => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.content,
      votes: 0
    })
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetContent();
    resetAuthor();
    resetInfo();
  }


  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input type={content.type} value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input type={author.type} value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input type={info.type} value={info.value} onChange={info.onChange} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>Reset</button>
      </form>
    </div>
  )
}

export default FormAnecdote