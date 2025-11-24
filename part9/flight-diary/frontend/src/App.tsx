import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiBaseUrl } from './constants'
import diariesServices from './services/diaries'
import type { DiaryEntry } from './types/type'
import Diaries from './components/Diaries'
import { NewEntry } from './components/NewEntry'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  useEffect(() => {
    axios.get<string>(`${apiBaseUrl}/ping`);
    
    const fetchDiaries = async () => {
      const data = await diariesServices.getAllDiaries();
      setDiaries(data);
    }
    fetchDiaries()
  }, [])
  return (
    <>
      <h1>Flight diary</h1>
      <NewEntry setDiaries={setDiaries} />
      <Diaries diaries={diaries} />
    </>
  )
}

export default App
