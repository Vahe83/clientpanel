import React from 'react';
import Radium from 'radium';

import './Spinner.css';

const spinner = () =>
{
    return <div className="loader"></div>
    
}

export default Radium(spinner);