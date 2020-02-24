import React, { useContext } from 'react';
import { Context } from './../../App';
import './Conditions.scss';

const Conditions = () => {
  const { main } = useContext(Context);
  const { conditions } = main;

  const sunConditionsArr = [
    'Clear',
  ]
  const cloudConditionsArr = [
    'Thunderstorm',
    'Drizzle',
    'Rain',
    'Snow',
    'Clouds',
  ]
  const rainConditionsArr = [
    'Thunderstorm',
    'Drizzle',
    'Rain',
  ]

  const conditionsSun = sunConditionsArr.includes(conditions) ? (
    <div className="conditions-sun"></div>
  ) : null;
  const conditionsClouds = cloudConditionsArr.includes(conditions) ? (
    <div className="conditions-clouds"></div>
  ) : null;
  const conditionsRain = rainConditionsArr.includes(conditions) ? (
    <div className="conditions-rain"></div>
  ) : null;

  return conditions ? (
    <div className="conditions-panel">
      <div className="conditions-gradient">
        {conditionsSun}
        {conditionsClouds}
        {conditionsRain}
        <div className="conditions-mountains"></div>
      </div>
    </div>
  ) : null
}

export default Conditions;