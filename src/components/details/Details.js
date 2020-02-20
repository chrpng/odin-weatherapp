import React, { useContext } from 'react';
import { Context } from './../../App';
import './Details.css';

const Details = () => {
  const { details } = useContext(Context);

  let highC = Math.round(details.high - 273);
  let lowC = Math.round(details.low - 273);
  let vis = details.visibility / 1000;
  return Object.entries(details).length !== 0 ? (
    <ul className="details-panel">
      <li>
        <div>High/Low</div>
        <div>{highC}°C/{lowC}°C</div>
      </li>
      <li>
        <div>Wind</div>
        <div>{details.wind} km/h</div>
      </li>
      <li>
        <div>Humidity</div>
        <div>{details.humidity}%</div>
      </li>
      <li>
        <div>Visibility</div>
        <div>{vis} km</div>
      </li>
    </ul>
  ) : null
}
 
export default Details;