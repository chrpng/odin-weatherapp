import React, { useContext } from 'react';
import { Context } from './../../App';
import moment from 'moment';
import './Forecast.css';

const Forecast = () => {
  const { forecast } = useContext(Context);

  const forecastDisplay = forecast.map((instance, idx) => {
    let relTime = moment.unix(instance.time).calendar(null, {
      sameDay: '[Today]',
      nextDay: 'ddd',
      nextWeek: 'ddd',
    })
    let tempC = Math.round(instance.temp - 273);
    return (
      <li key={idx}>
        <div>{tempC}°C</div>
        <div>{instance.conditions}</div>
        <img src={`http://openweathermap.org/img/wn/${instance.icon}.png`} alt={instance.conditions}/>
        <div>{relTime}</div>
      </li>
    )
  })

  return forecast ? (
    <ul className="forecast-panel">
      {forecastDisplay}
    </ul>
  ) : null
}
 
export default Forecast;