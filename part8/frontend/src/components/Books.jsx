import { useLazyQuery, useQuery } from "@apollo/client/react";
import { useEffect, useMemo, useState } from "react"
import { ALL_BOOKS } from "../queries/queries";

const Books = ({show, bookData}) => {
  const [books, setBooks] = useState([])
  const [getBooks, { data, loading }] = useLazyQuery(ALL_BOOKS)
  
  useEffect(() => {
    if (bookData?.allBooks) {
      setBooks(bookData.allBooks);
    }
  }, [bookData]);

  const genres = useMemo(() => {
    if(!bookData?.allBooks) return []
    return [...new Set(bookData.allBooks.flatMap(b => b.genres))]
  }) 

  const handleFilter = async (e) => {
    e.preventDefault()
    const genreFilter = e.target.value

    try {
      const {data} = await getBooks({variables: {genre: genreFilter || null}}) 
      if(data?.allBooks) {
        setBooks(data.allBooks)
      }
    } catch (error) {
      console.error("Error fetching books:", error)
    }
  }

  if (!show) return null

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{display: "flex", gap: "8px", flexWrap: "wrap"}}>
        {[...new Set(genres)].map((g) => (
            <button key={g} value={g} onClick={handleFilter}>{g}</button>
          ))}
          <button onClick={() => setBooks(bookData.allBooks)}>All genres</button>
      </div>
    </div>
  )
}

export default Books
