import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {logout} from '../actions/Actions';

class AppNavBar extends Component
{
 
  render()
  {
    let register = null;
    if (!this.props.isAuth)
    {
      register = (
            <div className="collapse navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                  </li>
                </ul>
            </div>)
    }

    let dashboard = null;            
    if (this.props.isAuth)
    {
        dashboard = (
        <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
               <Link to="/" className="nav-link">
                 Dashboard
               </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="#!" className="nav-link">
                  {this.props.email}
                </a>
              </li>
              <li className="nav-item">
               <Link to="/settings" className="nav-link">
                 Settings
               </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link"  onClick={this.props.logout}>
                  Logout
                </Link>
              </li>
            </ul>
        </div>);
    }
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="container">
            <Link to="/" className="navbar-brand">
                ClientPanel
            </Link>
            <button 
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarMain">
                <span className="navbar-toggler-icon"></span>
            </button>
            {dashboard}
            {register}
        </div>
      </nav>
      )
  }
}

const mapStateToProps = state =>
{
    return {
        isAuth: state.isAuthenticated,
        email: state.email
    };
}

const mapDispatchToProps = dispatch =>
{
    return {
        logout: () => dispatch(logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar);