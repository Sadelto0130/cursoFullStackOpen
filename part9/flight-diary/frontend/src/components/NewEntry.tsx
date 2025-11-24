import { useEffect, useState } from 'react'
import type { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../types/type'
import diariesServices from '../services/diaries'

interface Props {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

export const NewEntry = ({setDiaries}: Props) => {

  const [date, setDate ] = useState('')
  const [visibility, setVisibility ] = useState<Visibility | ''>('')
  const [weather, setWeather ] = useState<Weather | ''>('')
  const [comment, setComment ] = useState('')
  const [error, setError ] = useState<string | null>(null)

  const handlerAddEntry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newEntry: NewDiaryEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment
    }

    try {
      const data = await diariesServices.createDiary(newEntry)
      setDiaries(prevDiaries => [...prevDiaries, data])
      setDate('')
      setVisibility('')
      setWeather('')
      setComment('')
    } catch (error: any) {
      setError(error.response.data)
      console.log(error.response);
    }
  }

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  return (
    <>
      <h2>Add New Entry</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handlerAddEntry}>
        <div>
          <label htmlFor="date">Date:</label>
          <input 
            type="date" 
            id="date" 
            value={date}
            onChange={e => setDate(e.target.value)} 
          />
        </div>

        <fieldset style={{display: 'flex', gap: '1rem'}}>
          <legend>Visibility</legend>
          {['great', 'good', 'ok', 'poor'].map(option => (
            <div key={option}>
              <input 
                type="radio" 
                name="visibility" 
                id={option}
                value={option}
                checked={visibility === option}
                onChange={() => setVisibility(option as Visibility)} 
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </fieldset>

        <fieldset style={{display: 'flex', gap: '1rem'}}>
          <legend>Weather</legend>
          {['sunny', 'rainy', 'stormy', 'cloudy', 'windy'].map(option => (
            <div key={option}>
              <input 
              type="radio" 
              name="weather" 
              id={option}
              value={option}
              checked={weather === option}
              onChange={() => setWeather(option as Weather)}
            />
            <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </fieldset>

        <div style={{marginTop: '1em'}}>
          <label htmlFor="Comment">Comment:</label>
          <input 
            type="text" 
            id="Comment" 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type='submit'>Add</button>
      </form>
    </>
  )
}
