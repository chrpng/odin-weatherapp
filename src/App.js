import React, { useState, useEffect, createContext } from 'react';
import MainContainer from './components/mainContainer/MainContainer';
import moment from 'moment';

import './App.scss';

export const Context = createContext();

function App() {
  const [ cityInput, setCityInput ] = useState('');
  const [ main, setMain ] = useState({});
  const [ details, setDetails ] = useState({});
  const [ forecast, setForecast ] = useState([]);
  const [ time, setTime ] = useState('');
  const [ celsiusFlag, setCelsiusFlag ] = useState(true);
  const [ loadingFlag, setLoadingFlag ] = useState(false);

  const fetchWeather = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`, { mode: 'cors' });
      
      //try catch?
      if(response.ok) {
        const json = await response.json();
        setWeather(json);
        console.log(json);
        setTime(getLocalHour(json.dt, json.timezone));
      }
    } catch(err) {
      console.log(err);
    }
  }

  const setWeather = (json) => {
    setMain({
      conditions: json.weather[0].main,
      location: json.name,
      temp: json.main.temp,
      icon: json.weather[0].icon,
    });
    setDetails({
      high: json.main.temp_max,
      low: json.main.temp_min,
      wind: json.wind.speed,
      humidity: json.main.humidity,
      visibility: json.visibility
    });
  }
  
  const getLocalHour = (unix, shift) => {
    return moment.unix(unix + shift).utc().hours();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingFlag(true);

    //await? Promise.all
    //check why .then doesn't seesn't seem to wait
    await Promise.all([
      fetchWeather(cityInput),
      fetchForecast5(cityInput),
      // new Promise(resolve => {
      //   setTimeout(() => {
      //     console.log('waiting')
      //     resolve()
      //   }, 5000)
      // })
    ])

    setLoadingFlag(false)
  }

  const handleChange = (e) => {
    setCityInput(e.target.value)
  }

  // Only for testing
  useEffect(() => {
    fetchWeather('Seoul');
    fetchForecast5('Seoul');
  }, [])

  const mainContainer = !loadingFlag ? (
    <MainContainer time={time}></MainContainer>
  ) : (
    <div className="loading">loading...</div>
  );

  return (
    <Context.Provider value={{ main, details, forecast, celsiusFlag, setCelsiusFlag }}>
      <header>Weather App, by chrpng</header>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange}/>
        <button><i className="fas fa-search"></i></button>
      </form>
      { mainContainer }
    </Context.Provider>
  );
}

export default App;
