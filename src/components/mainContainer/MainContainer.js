import React from 'react';
import Temperature from './../current/Temperature';
import Conditions from './../current/Conditions';
import Details from './../details/Details';
import Forecast from './../forecast/Forecast';

function MainContainer({ time }) {
  return (
    <main className={time > 6 && time <=15 ? "day" : ( time > 15 && time < 18 ? "evening" : "night" )}>
      <Temperature></Temperature>
      <Conditions></Conditions>
      <Details></Details>
      <Forecast></Forecast>
    </main>
  )
}

export default MainContainer;