
import React, { useEffect, useState } from "react";
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const getAllCountries = async () => {
    const response = await axios.get("https://restcountries.eu/rest/v2/all");
    return response.data;
  }

  useEffect(() => {
    (async () => setCountries(await getAllCountries()))();
  }, []);

  const filterChanged = (newValue) => {
    setFilter(newValue);
  }

  const show = (country) => {
    filterChanged(country.name);
  }

  function caseInsensitivelyIncludes(a, b) {
    return a.toLowerCase().includes(b.toLowerCase());
  }

  function filterCountries(countries, filter) {
    return countries.filter((country) => caseInsensitivelyIncludes(country.name, filter))
  }


  return (
    <>
      <p>Find countries</p>
      <input type="text" onChange={e => filterChanged(e.target.value)} />
      <Countries show={show} countries={filterCountries(countries, filter)}></Countries>
      {(filterCountries(countries, filter)).length === 1 ? <Weather country={filterCountries(countries, filter)[0]}></Weather> : null}
    </>
  )
}
export default App;

const Countries = ({ countries, show }) => {
  const count = countries.length
  if (count <= 0) {
    return (
      <p>No matching countries found.</p>
    )
  }
  if (count === 1) {
    return (
      <Country country={countries[0]}></Country>
    )
  }
  if (count > 1 && count < 10) {
    return (
      countries.map((country) => <li>{country.name} <button onClick={() => show(country)}>show</button> </li>)
    )
  }
  if (count > 10) {
    return (
      <p>Too many hits.</p>
    )
  }

}

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>

      <h2>languages</h2>
      {country.languages.map((language) => <li>{language.name}</li>)}

      <img src={country.flag} alt={country.alpha3code} width="80" />
    </>
  )
}

const Weather = ({ country }) => {

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!country || !country.name) return;
    (async () => setWeather(await getWeatherFor(country)))();
  }, [country]);

  const getWeatherFor = async (country) => {
    const access_key = process.env.REACT_APP_ACCESS_KEY;
    const query = country.name;
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${query}`;
    const response = await axios.get(url);
    return response.data;
  }

  if (!weather || !country) return null;
  return (
    <div>
      <h2>Weather in {country.name}</h2>
      <p><b>Temperature</b>: {weather.current.temperature} Celsius</p>
      <img src={weather.current.weather_icons[0]} alt={weather.current.weather_description} />
      <p><b>Wind:</b> {weather.current.wind_speed} km/h, <b>direction</b> {weather.current.wind_dir}</p>
    </div>
  );

}