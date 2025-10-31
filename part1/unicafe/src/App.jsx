import { useState } from 'react'
import { Button } from './Button'
import { Statistic } from './Statistics'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleIncreaseGood = () => setGood(good + 1)
  const handleIncreaseNeutral = () => setNeutral(neutral + 1)
  const handleIncreaseBad = () => setBad(bad + 1)

  return (
    <>
      <h1>Give Feedback</h1>
      <Button text={'Good'} onClick={handleIncreaseGood}/>
      <Button text={'Neutral'} onClick={handleIncreaseNeutral}/>
      <Button text={'Bad'} onClick={handleIncreaseBad}/>
      <Statistic good={good} bad={bad} neutral={neutral}/>
    </>
  )
}

export default App