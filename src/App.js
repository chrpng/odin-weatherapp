import React, { Component } from 'react';
import './reset.css';

class App extends Component {
  state = {
    cityInput: '',
  }

  fetchWeather = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`, { mode: 'cors' });
    if(response.ok) {
      const json = await response.json();
      console.log(json);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.fetchWeather(this.state.cityInput)
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
