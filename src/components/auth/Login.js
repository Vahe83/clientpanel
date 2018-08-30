import React, { Component } from 'react';
import {connect} from 'react-redux';

import setToken from '../actions/SetToken';


class Login extends Component
{
    state =
    {
        email: '',
        password: ''
    };

    onChange = event =>
    {
      this.setState({[event.target.name]: event.target.value});
      
    }

    onSubmitForm = event =>
    {
        event.preventDefault();
        let userAuth = 
        {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true 
        }
        let route = this.props.history.push;
        this.props.sendUser(userAuth, route);
        
    }

  render()
  {
    
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
            <div className="card">
                <div className="card-body">
                    <h1 className="text-center pb-4 pt-3">
                        <span className="text-primary">
                            <i className="fas fa-lock mr-1" />
                            Login
                        </span>
                    </h1>
                    <form onSubmit={this.onSubmitForm}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input  type="email"
                                    className="form-control"
                                    name="email"
                                    required
                                    value={this.state.email}
                                    onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input  type="password"
                                    className="form-control"
                                    name="password"
                                    required
                                    value={this.state.password}
                                    onChange={this.onChange}/>
                        </div>
                        <input type="submit" value="Login" className="btn btn-primary btn-block"/>
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state =>
{
    return {
        clients: state.clients,
        isAuth: state.isAuthenticated
    };
}

const mapDispatchToProps = dispatch =>
{
    return {
        sendUser: (user, route) => dispatch(setToken(user, route, 'login'))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
