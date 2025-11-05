import { useState } from "react";
import axios from "./services/axios.js";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import PersonsToShow from "./components/PersonsToShow";
import { useEffect } from "react";
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filterPerson, setFilterPerson] = useState([]);
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    axios.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  const addPerson = (e) => {
    e.preventDefault();
    const existPerson = persons.find((person) => person.name === newName);
    if (existPerson) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){

        const updatePerson = {...existPerson, number: newNumber}

        axios
          .updatePerson(existPerson.id, updatePerson)
          .then((returnPerson) => {
            setPersons(persons.map(p=> p.id !== existPerson.id ? p : returnPerson));
            setSuccessMessage(`Updated ${newName}`)
          })
          .catch(error => {
            console.log("Error updating person:", error)
            setErrorMessage(error.response.data.error);
            setPersons(persons.filter((p) => p.id !== existPerson.id));
          })
      }
      return   
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    axios
      .addNew(newPerson)
      .then((returnPerson) => {
        setPersons(persons.concat(returnPerson));
        setSuccessMessage(`Added ${newName}`);
      })
      .catch(error => {
        console.log("Error add person:", error)
        setErrorMessage("Error adding person")
      })
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (!person) return alert("Person not found.");

    if (window.confirm(`Delete ${person.name}?`)) {
      axios
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setSuccessMessage(`Deleted ${person.name}`)
        })
        .catch((err) => {
          console.error("Error deleting:", err);
          setErrorMessage(`Error deleting ${person.name}`)
        });
    }
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} setFilter={setFilter} />

      {successMessage && <div className="notification success">{successMessage}</div>}
      {errorMessage && <div className="notification error">{errorMessage}</div>}

      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        setNewNumber={setNewNumber}
        setNewName={setNewName}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <PersonsToShow 
        persons={persons} 
        filter={filter} 
        onDelete={deletePerson} 
      />
    </div>
  );
};

export default App;
