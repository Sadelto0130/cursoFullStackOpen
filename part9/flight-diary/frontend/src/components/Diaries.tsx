import React from 'react'
import type { DiaryEntry } from '../types/type'

interface Props {
  diaries: DiaryEntry[]
}

const Diaries = ({ diaries }: Props) => {

  return (
    <>
      <h2>Diary Entries</h2>
      {diaries
        .slice()
        .reverse()
        .map(diary => (
        <div key={diary.id} style={{marginBottom: '1em', padding: '0.5em'}}>
          <strong>{diary.date}</strong>
          <p style={{margin: 0}}>visibility: {diary.visibility}</p>
          <p style={{margin: 0}}>weather: {diary.weather}</p>
        </div>
      ))}
    </>
  )
}

export default Diaries