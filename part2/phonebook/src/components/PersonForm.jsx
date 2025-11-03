export const PersonForm = ({
  onSubmit, 
  setNewName, 
  setNewNumber, 
  newName, 
  newNumber
}) => {
  const handleChangeName = (e) => setNewName(e.target.value);
  const handleChangeNumber = (e) => setNewNumber(e.target.value);

  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={handleChangeName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
