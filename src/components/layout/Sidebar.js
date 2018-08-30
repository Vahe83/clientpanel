import React from 'react';
import {Link} from 'react-router-dom';

const sidebar = () =>
{
  return (
    <Link to="/client/add" className="btn btn-success btn-block">
        <i className="fas fa-plus mr-1"/>New Client
    </Link>
  )
}

export default sidebar;