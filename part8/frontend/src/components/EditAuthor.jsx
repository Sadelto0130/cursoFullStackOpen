import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client/react'
import Select from 'react-select'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries/queries'

const EditAuthor = ({author, setShowEdit}) => {
  const [born, setBorn] = useState(author.born ?? '')

  const [authorEdit] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  useEffect(() => {
    setBorn(author.born ?? '')
  }, [author])

  const handleEdit = (e) => {
    e.preventDefault()
    
    authorEdit({
      variables: {
        name: author.name,
        born: Number(born)
      }
    })
    setBorn('')
    setShowEdit(false)
  }
  
  return (
    <div>
      <h1>Set birthyear</h1>
      <form onSubmit={handleEdit}>
        <Select
          value={{value: author.name, label: author.name}}
          isDisabled={true}
        />

        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  )
}

export default EditAuthor