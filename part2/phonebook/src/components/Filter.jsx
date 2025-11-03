export const Filter = ({ value, setFilter }) => {
  const handleChangeFilter = (e) => setFilter(e.target.value)
  return (
    <div>
      filter shown with <input value={value} onChange={handleChangeFilter} />
    </div>
  );
};
