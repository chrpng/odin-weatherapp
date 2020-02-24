import React, { useContext } from 'react';
import { Context } from './../../App';
import moment from 'moment';
import './Forecast.scss';

const Forecast = () => {
  const { forecast, celsiusFlag } = useContext(Context);

  const forecastDisplay = forecast.map((instance, idx) => {
    let relTime = moment.unix(instance.time).calendar(null, {
      sameDay: '[Today]',
      nextDay: 'ddd',
      nextWeek: 'ddd',
    })
    
    let tempC = Math.round(instance.temp - 273);
    let tempF = Math.round((instance.temp - 273) * 1.8) + 32;

    const tempElement = celsiusFlag ? <div className="forecast-temp">{tempC}°C</div> 
                                    : <div className="forecast-temp">{tempF}°F</div>

    return (
      <li key={idx}>
        {tempElement}
        <div className="forecast-conditions">{instance.conditions}</div>
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