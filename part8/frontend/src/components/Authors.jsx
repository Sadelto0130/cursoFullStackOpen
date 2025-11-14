import { useState } from "react"
import EditAuthor from "./EditAuthor"

const Authors = ({show, authorsData}) => {
  if (!show) {
    return null
  }

  const [dataEdit, setDataEdit] = useState(null)
  const [showEdit, setShowEdit] = useState(false)

  const authors = [...authorsData.allAuthors]

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr 
              key={a.name}
              onClick={() => { 
                setDataEdit(a)
                setShowEdit(true)
              }}
              style={{ cursor: "pointer" }}
            >
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEdit && <EditAuthor author={dataEdit} setShowEdit={setShowEdit}/>}
    </div>
  )
}

export default Authors
