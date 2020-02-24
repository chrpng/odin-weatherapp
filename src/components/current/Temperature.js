import React, { useContext } from 'react';
import { Context } from './../../App';
import './Temperature.scss'

const Temperature = () => {
  const { main, celsiusFlag, setCelsiusFlag } = useContext(Context);
  const { temp, location, conditions } = main;

  let tempC = Math.round(temp - 273);
  let tempF = Math.round((temp - 273) * 1.8) + 32;

  const useC = () => {
    setCelsiusFlag(true);
  }
  const useF = () => {
    setCelsiusFlag(false);
  }

  const tempElement = celsiusFlag ? <div className="temp">{tempC}°C</div> 
                                  : <div className="temp">{tempF}°F</div>

  return temp ? (
    <div className="temp-panel">
      {/* <img className="temp-conditions-icon" src={`http://openweathermap.org/img/wn/${icon}.png`} alt=""/> */}
      <div className="temp-convert">
        <button className={`temp-convertC${celsiusFlag ? " active" : ""}`} onClick={useC}>C</button>
        <button className={`temp-convertF${!celsiusFlag ? " active" : ""}`} onClick={useF}>F</button>
      </div>
      <div className="temp-location">{location}</div>
      {tempElement}
      <div className="temp-conditions">{conditions}</div>
    </div>
  ) : null
}

export default Temperature;