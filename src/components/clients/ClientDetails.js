import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import 'firebase/firestore';
import classnames from 'classnames';

class ClientDetails extends Component
{
  state =
  {
    newBalance: '',
    editBalance: false
  }
  
  //Update balance
  onSubmitForm = (event, clientId) =>
  {
    event.preventDefault();
    let {firstName, lastName, email, phone} = this.props.clients[clientId-1];
        
    let updatedClient = 
    {
        "balance": {"stringValue": this.state.newBalance},
        "lastName": lastName,
        "firstName": firstName,
        "email": email,
        "phone": phone
    }

    const data = 
    {
      "fields": updatedClient
    }
    let docID = this.props.clients[clientId-1].id;
    const baseURL = "https://firestore.googleapis.com/v1beta1/" + docID;
    const config = {headers: {'Authorization': "Bearer " + this.props.token }};
    
    axios.patch(baseURL, data, config).then(res => this.props.history.push('/'));
  }

  //Delete client
  onDeleteClient = (clientId) =>
  {
    let docID = this.props.clients[clientId-1].id;
    
    axios.defaults.baseURL = "https://firestore.googleapis.com/v1beta1/" + docID;
    axios.defaults.headers.common = {'Authorization': "Bearer " + this.props.token};
    axios.delete().then(res => this.props.history.push('/'));
  }   
  
  onClickBalance = () =>
  {
    this.setState({editBalance: !this.state.editBalance});
  }

  onChangeInput = (event) =>
  {
    this.setState({[event.target.name]: event.target.value});
  }

  render()
  {
    let id = this.props.match.params.id;
    let balanceForm = null;

    if (this.state.editBalance)
    {
      balanceForm = (
        <form onSubmit={(event) => this.onSubmitForm(event, id)}>
          <div className="input-group">
            <input
             type="text"
             className="form-control"
             name="newBalance"
             placeholder="Add New Balance"
             value={this.state.newBalance}
             onChange={this.onChangeInput}/>
            <div className="input-group-append">
              <input type="submit" value="Update"
                className="btn btn-outline-dark"/>
            </div>
          </div>
        </form>
          )
    }
    

    let balance = parseFloat(this.props.clients[id-1].balance.stringValue);
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" />Back to Dashboard
            </Link>
          </div>
          <div className="col-md-6">
            <div className="btn-group float-right">
              <Link to={`/client/edit/${id}`} className="btn btn-dark">
                Edit
              </Link>
              <button onClick={() => this.onDeleteClient(id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
        <hr/>
        <div className="card">
          <h3 className="card-header">
            {this.props.clients[id-1].firstName.stringValue} {this.props.clients[id-1].lastName.stringValue}
          </h3>
          <div className="card-body">
            <div className="row">
              <div className="col-md-8 col-sm-6">
                <h4>Client ID:{' '}
                  <span className="text-secondary">{id}</span>
                </h4>
              </div>
              <div className="col-md-4 col-sm-6">
                <h3 className="pull-right">
                 Balance:
                 <span className={classnames({
                                  'text-danger': balance > 0,
                                  'text-success': balance === 0})}>
                 ${balance.toFixed(2)}
                 </span>
                 <small>
                   <a href="#!" onClick={this.onClickBalance}>
                    <i className="fas fa-pencil-alt ml-1" />
                   </a>
                 </small>
                </h3>
                {balanceForm}
              </div>
            </div>
            
            <hr/>
            <ul className="list-group">
              <li className="list-group-item">
                Contact Email: {this.props.clients[id-1].email.stringValue}
              </li>
              <li className="list-group-item">
                Contact Phone: {this.props.clients[id-1].phone.stringValue}
              </li>
            </ul>
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
        token: state.token
    };
}

export default connect(mapStateToProps)(ClientDetails);
