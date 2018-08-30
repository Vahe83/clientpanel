import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {setDisableBalanceOnAdd, setDisableBalanceOnEdit, setAllowRegistration, setCheckBox} from '../actions/Actions';

class Settings extends Component
{
  componentWillMount()
  {
    if (localStorage.getItem('settings') == null)
    {
      let defaultSettings =
      {
        disableBalanceOnAdd: false,
        disableBalanceOnEdit: true,
        allowRegistration: false
      }

      //set to localStorage
      localStorage.setItem('settings', JSON.stringify(defaultSettings))
    }

    let settings = JSON.parse(localStorage.getItem('settings'));
    this.props.setSettings(settings);
  }

  render()
  {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Edit Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow Registration</label>{' '}
                <input type="checkbox"
                       name="allowRegistration"
                       checked={this.props.allowRegistration}
                       onChange={this.props.allowReg}/>
              </div>
              <div className="form-group">
                <label>Disable Balance On Add</label>{' '}
                <input type="checkbox"
                       name="disableBalanceOnAdd"
                       checked={this.props.disableBalanceOnAdd}
                       onChange={this.props.disBalAdd}/>
              </div>
              <div className="form-group">
                <label>Disable Balance On Edit</label>{' '}
                <input type="checkbox"
                       name="disableBalanceOnEdit"
                       checked={this.props.disableBalanceOnEdit}
                       onChange={this.props.disBalEdit}/>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = state =>
{
    return {
        disableBalanceOnAdd: state.settings.disableBalanceOnAdd,
        disableBalanceOnEdit:state.settings.disableBalanceOnEdit,
        allowRegistration: state.settings.allowRegistration
    };
}

const mapDispatchToProps = dispatch =>
{
    return {
        disBalAdd: () => dispatch(setDisableBalanceOnAdd()),
        disBalEdit: () => dispatch(setDisableBalanceOnEdit()),
        allowReg: () => dispatch(setAllowRegistration()),
        setSettings: (settings) => dispatch(setCheckBox(settings))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
