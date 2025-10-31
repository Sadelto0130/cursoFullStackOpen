import { StatisticLine } from "./StatisticLine"

export const Statistic = ({good, bad, neutral}) => {

  const all = bad + neutral + good
  const average = Math.round(((good * 1) + (bad * -1) + (neutral * 0))/all * 100) / 100
  const percent = Math.round((good / (good+neutral+bad)) * 100)
  return (
    <>
        <h1>Statistics</h1>
      {
        all <= 0 ? <p>No feedback given</p>
        : <table>
            <tbody>
              <StatisticLine text="Good" value={good}/>
              <StatisticLine text="Neutral" value={neutral}/>
              <StatisticLine text="Bad" value={bad}/>
              <StatisticLine text="All" value={all}/>
              <StatisticLine text="Average" value={average}/>
              <StatisticLine text="Positive" value={percent}/>
            </tbody>
        </table>
      }
    </>
  )
}