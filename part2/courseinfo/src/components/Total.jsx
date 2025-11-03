const Total = ({parts}) => {

  const total = parts.reduce((accumulator, part) => accumulator + part.exercises, 0)
  return (
    <p><b>Total of exercise {total}</b></p>
  )
}

export default Total