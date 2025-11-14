import { useEffect, useState } from 'react'
import { useSubscription } from '@apollo/client/react'
import { BOOK_ADDED } from './queries'

function Notification() {
  const { data, error } = useSubscription(BOOK_ADDED)

  useEffect(() => {
    if (data) {
      const newBook = data.addBook

      alert(`📚 Nuevo libro agregado: "${newBook.title}" por ${newBook.author.name}`)

      // Quitar alerta después de 5 segundos
      const timer = setTimeout(() => setAlert(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [data])

  if (error) return <p>Error al recibir libros: {error.message}</p>

}

export default Notification
