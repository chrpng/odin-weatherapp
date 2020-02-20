import React, { Component } from 'react';
import './reset.css';

class App extends Component {
  state = {
    cityInput: '',
    current: {},
    forecast: [],
  }

  fetchWeather = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`, { mode: 'cors' });
    if(response.ok) {
      const json = await response.json();
      console.log(json);
      this.setWeather(json);
    }
  }

  setWeather = (json) => {
    this.setState({
      current: {
        main: {
          condition: json.weather[0].main,
          location: json.name,
          temp: json.main.temp,
        },
        details: {
          high: json.main.temp_max,
          low: json.main.temp_min,
          wind: json.wind.speed,
          humidity: json.main.humidity,
          visibility: json.visibility
        },
      }
    })
  }

  fetchForecast5 = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`, { mode: 'cors' });
    if(response.ok) {
      const json = await response.json();
      console.log(json);
      this.setForecast5(json);
    }
  }

  setForecast5 = (json) => {
    let forecast = [];
    for (let i = 0; i < 40; i = i + 8) {
      forecast.push(this.getForecastInfo(json.list[i]));
    }
    this.setState({
      forecast
    })
  }

  getForecastInfo = (day) => {
    return {
      time: day.dt,
      condition: day.weather[0].main,
      temp: day.main.temp,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.fetchWeather(this.state.cityInput);
    this.fetchForecast5(this.state.cityInput);
  }

  handleChange = (e) => {
    this.setState({
      cityInput: e.target.value
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">Weather App</header>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange}/>
          <button><i className="fas fa-search"></i></button>
        </form>
      </div>
    );
  }
}

export default App;
