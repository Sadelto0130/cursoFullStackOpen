const InfoCountry = ({ country, climate }) => {
  const { name, languages, capital, area, flags } = country;
  const { current } = climate

  return (
    <div className="country-details">
      <h1>{name?.common}</h1>
      <p>Capital {capital?.[0]}</p>
      <p>Area {area} Km2</p>

      <h2>Languages</h2>
      <ul>
        {country?.languages &&
          Object.entries(languages).map(([code, language]) => (
            <li key={code}>{language}</li>
          ))}
      </ul>
      <img src={flags?.png} alt={flags?.alt} />
      <p>
        Temperature: {current?.temp_c} ºC
      </p>
      <img src={current?.condition?.icon} alt={current?.condition?.text}/>
      <p>Wind: {current?.wind_mph} m/h</p>
    </div>
  );
};

export default InfoCountry;
