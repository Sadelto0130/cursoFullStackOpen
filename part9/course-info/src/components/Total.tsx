import type { CoursePart } from '../type'

export const Total = (props: {total: CoursePart[]}) => {
  const totalExercises = props.total.reduce((sum, part) => sum + part.exerciseCount, 0)

  return (
    <p>Number of exercises {totalExercises}</p>
  )
}
