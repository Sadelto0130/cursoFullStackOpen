import { useEffect, useState } from "react";
import axios from "./services/axios.js";
import "./index.css";
import InfoCountry from "./components/InfoCountry.jsx";
import { useCountry, useField } from "./hooks/index.js";

function App() {
  const findField = useField("text");

  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showCountry, setShowCountry] = useState(false);
  const [climate, setClimate] = useState({});

  const selectedCountryName =
    filtered.length === 1 ? filtered[0] : showCountry ? filtered[0] : null;

  const countryData = useCountry(selectedCountryName);

  useEffect(() => {
    axios.getAllCountries().then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    const value = findField.value.trim();
    if (value === "") {
      setFiltered([]);
      setShowCountry(false);
      return;
    }

    const filteredList = countries.filter((country) =>
      country.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filteredList);
    setShowCountry(false);
  }, [findField.value, countries]);

  const handleName = async (countryName) => {
    const climateData = await axios.getClimate(countryName);
    setClimate(climateData);
    setFiltered([countryName]); 
    setShowCountry(true);
  };

  return (
    <>
      <div>
        Find countries: <input {...findField} />
      </div>

      {filtered.length > 1 && filtered.length <= 10 && (
        <ol className="no-style">
          {filtered.map((country, i) => (
            <li key={i}>
              {country}{" "}
              <button onClick={() => handleName(country)}>Show</button>
            </li>
          ))}
        </ol>
      )}

      {countryData && (showCountry || filtered.length === 1) && (
        <InfoCountry country={countryData} climate={climate} />
      )}
    </>
  );
}

export default App;
