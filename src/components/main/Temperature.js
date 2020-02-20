import React, { useContext } from 'react';
import { Context } from './../../App';
import './Temperature.css'

const Temperature = () => {
  const { main } = useContext(Context);
  const { temp, location, icon } = main;
  let tempC = Math.round(temp - 273);
  return temp ? (
    <div className="temp-panel">
      <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt=""/>
      <div>{location}</div>
      { tempC ? <div className="temp">{tempC}°C</div> : null }
    </div>
  ) : null
}

export default Temperature;