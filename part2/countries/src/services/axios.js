import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const api_key = import.meta.env.VITE_WEATHER_KEY


const getAllCountries = () => {
  return axios
    .get(`${baseUrl}/all`)
    .then((resp) => resp.data.map((country) => country.name.common)) 
}

const getCountry = (country) => {
  const req = axios.get(`${baseUrl}/name/${country}`)
  return req.then(resp => resp.data)
}

const getClimate = (countryName) => {
  const climate = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${countryName}&aqi=no`
  return axios
    .get(climate)
    .then((resp) => resp.data)
}


export default {
  getAllCountries,
  getCountry,
  getClimate
}