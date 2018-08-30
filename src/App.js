import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {StyleRoot} from 'radium';
import {connect} from 'react-redux';

import AppNavBar from './components/layout/AppNavBar';
import Dashboard from './components/layout/Dashboard';
import AddClient from './components/clients/AddClient';
import EditClient from './components/clients/EditClient';
import ClientDetails from './components/clients/ClientDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Settings from './components/settings/Settings';
import {passToken} from './components/actions/Actions';

class App extends Component
{
  componentWillMount()
  {
    let token = localStorage.getItem('token');
    let email = localStorage.getItem('email');
    if (token)
    {
      let data = 
      {
        token: token,
        email: email
      }
      this.props.sendToken(data);
    }
  }

  render()
  {
    return (
      <StyleRoot>
        <Router>
          <div className="App">
            <AppNavBar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/client/add" component={AddClient} />
                  <Route exact path="/client/edit/:id" component={EditClient} />
                  <Route exact path="/client/:id" component={ClientDetails} />
                  <Route exact path="/settings" component={Settings} />
                </Switch>
              </div>
          </div>
        </Router>
      </StyleRoot>
    );
  }
}

const mapDispatchToProps = dispatch =>
{
    return {
        sendToken: (data) => dispatch(passToken(data))
    };
}

export default connect(null, mapDispatchToProps)(App);
