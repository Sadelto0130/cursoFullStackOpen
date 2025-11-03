import { useEffect } from "react";
import axios from "./services/axios.js";
import { useState } from "react";
import "./index.css";
import InfoCountry from "./components/InfoCountry.jsx";

function App() {
  const [countries, setCountries] = useState([]);
  const [findCountries, setFindCountries] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [country, setCountry] = useState({});
  const [showCountry, setShowCountry] = useState(false)
  const [climate, setClimate] = useState({})

  useEffect(() => {
    axios.getAllCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  const handleChangeFind = (e) => {
    const value = e.target.value;
    setFindCountries(value);

    const filteredList = countries.filter((country) =>
      country.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filteredList);
  };

  useEffect(() => {
    setShowCountry(false)
    if (filtered.length === 1) {
      axios.getCountry(filtered[0]).then((data) => {
        setCountry(data);
      });
    } else {
      setCountry({});
    }
  }, [filtered]);

  const handleName = (countryName) => {
    axios.getCountry(countryName).then((data) => {
      setCountry(data);
      
      axios.getClimate(countryName).then((data) => setClimate(data))
    });
    setShowCountry(true)
  }

  return (
    <>
      <div>
        Find countries:{" "}
        <input value={findCountries} onChange={handleChangeFind} />
      </div>

      {filtered.length > 1 && filtered.length <= 10 && (
        <ol className="no-style">
          {filtered.map((country, i) => (            
            <li key={i}>
              {country} {" "}
              <button onClick={() => handleName(country)}>Show</button>
            </li>            
          ))}
        </ol>
      )}
      {showCountry  &&  <InfoCountry country={country} climate={climate}/>}
      {filtered.length === 1  && <InfoCountry country={country} climate={climate}/>}
    </>
  );
}

export default App;
