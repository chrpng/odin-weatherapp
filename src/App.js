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
  const [ error404Flag, setError404Flag ] = useState(false);

  const fetchWeather = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`, { mode: 'cors' });

    if(response.ok) {
      const json = await response.json();
      setWeather(json);
      setTime(getLocalHour(json.dt, json.timezone));
    } else if(response.status) {
      switch(response.status) {
        case 404:
          let e = new Error(response.statusText);
          e.name = 'HTTP Error';
          throw e;
        default:
          throw new Error(response.statusText);
      }
    } else {
      throw new Error(response);
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
    } else if(response.status === 404) {
      let e = new Error(response.statusText);
      e.name = 'HTTP Error';
      throw e;
    } else {
      throw new Error(response);
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
    try {
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
      setError404Flag(false);
    } catch(err) {
      if(err.name === 'HTTP Error') setError404Flag(true);
      console.log(err)
    }
    setLoadingFlag(false);
  }

  const handleChange = (e) => {
    setCityInput(e.target.value)
  }

  // Only for testing
  // useEffect(() => {
  //   fetchWeather('Seoul');
  //   fetchForecast5('Seoul');
  // }, [])

  const mainContainer = !error404Flag ? (
    <MainContainer time={time} loadingFlag={loadingFlag}></MainContainer>
  ) : (
    <div className="loading">Invalid entry</div>
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
