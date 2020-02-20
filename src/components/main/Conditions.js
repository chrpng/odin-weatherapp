import React, { useContext } from 'react';
import { Context } from './../../App';
import './Conditions.css';

const Conditions = () => {
  const { main } = useContext(Context);
  const { conditions } = main;

  return conditions ? (
    <div className="conditions-panel">
      <div className="conditions-text">
        {conditions}
      </div>
    </div>
  ) : null
}

export default Conditions;