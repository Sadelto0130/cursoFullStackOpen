
export default function PersonsToShow({persons, filter, onDelete}) {
  
const personsToShow = filter 
    ? persons.filter(
        person => person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons

  return (
  personsToShow.map((person, i) => (
        <div key={person.id}>
          {person.name} - {person.number} 
          <button onClick={()=>onDelete(person.id)}> 
            Delete
          </button>
        </div>
      ))
  )
}
