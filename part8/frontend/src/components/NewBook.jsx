import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries/queries'

const NewBook = (props) => {
  if (!props.show) {
    return null
  }
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      console.log(error.graphQLErrors)
    },
    onCompleted: (data) => {
      const newBook = data.addBook
      alert(`📚 Nuevo libro agregado: "${newBook.title}" por ${newBook.author.name}`)
    },
    refetchQueries: [{query: ALL_BOOKS}]
  })

  const submit = async (event) => {
    event.preventDefault()

    const finalGenres = genres.length > 0 ? genres : genre ? [genre] : []
    try {
      await createBook({
        variables: {
          title,
          published: Number(published),
          author,
          genres: finalGenres,
        },
      });
    } catch (error) {
      console.error("GraphQL Error:", error);
      alert(error.message)
      return
    }

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = (e) => {
    e.preventDefault()
    if (!genre.trim()) return;

    setGenres(prev => [...prev, genre])
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook