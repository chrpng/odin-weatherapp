import React, { useState, useEffect, createContext } from 'react';
import Temperature from './components/main/Temperature';
import Conditions from './components/main/Conditions';
import Details from './components/details/Details';
import Forecast from './components/forecast/Forecast';

export const Context = createContext();

function App() {
  const [ cityInput, setCityInput ] = useState('');
  const [ main, setMain ] = useState({});
  const [ details, setDetails ] = useState({});
  const [ forecast, setForecast ] = useState([]);

  // Only for testing
  useEffect(() => {
    fetchWeather('London');
    fetchForecast5('London');
  }, [])

  const fetchWeather = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`, { mode: 'cors' });
    if(response.ok) {
      const json = await response.json();
      setWeather(json);
    }
  }

  const setWeather = (json) => {
    setMain({
      conditions: json.weather[0].main,
      location: json.name,
      temp: json.main.temp,
      icon: json.weather[0].icon,
    })
    setDetails({
      high: json.main.temp_max,
      low: json.main.temp_min,
      wind: json.wind.speed,
      humidity: json.main.humidity,
      visibility: json.visibility
    })
  }

  const fetchForecast5 = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`, { mode: 'cors' });
    if(response.ok) {
      const json = await response.json();
      setForecast5(json);
    }
  }

  const setForecast5 = (json) => {
    let forecastArr = [];
    for (let i = 0; i < 40; i = i + 8) {
      forecastArr.push(getForecastInfo(json.list[i]));
    }
    setForecast(forecastArr)
  }

  const getForecastInfo = (day) => {
    return {
      time: day.dt,
      conditions: day.weather[0].main,
      temp: day.main.temp,
      icon: day.weather[0].icon,
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(cityInput);
    fetchForecast5(cityInput);
  }

  const handleChange = (e) => {
    setCityInput(e.target.value)
  }

  return (
    <Context.Provider value={{ main, details, forecast }}>
      <header>Weather App, by chrpng</header>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange}/>
        <button><i className="fas fa-search"></i></button>
      </form>
      <main>
        <Temperature></Temperature>
        <Conditions></Conditions>
        <Details></Details>
        <Forecast></Forecast>
      </main>
    </Context.Provider>
  );
}

export default App;
