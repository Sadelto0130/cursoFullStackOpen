import { useQuery } from '@apollo/client/react'
import React, { useEffect, useState } from 'react'
import { USER } from '../queries/queries'

const Recommended = ({show, bookData}) => {
  const {data: userData, loading} = useQuery(USER)
  
  if (!show) return null
  if (loading) return <div>Loading...</div>

  const books = (bookData?.allBooks || []).filter(
    b => b.genres.includes(userData.me.favoriteGenre) 
  )

  console.log(bookData)
  return (
    <div>
      <h2>Recommended</h2>

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
    </div>
  )
}

export default Recommended