import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import 'firebase/firestore';

class AddClient extends Component
{
  state =
  {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  }

  onChange = event =>
  {
    this.setState({[event.target.name]: event.target.value});
    
  }

  onSubmit = (event) =>
  {
    event.preventDefault();
               
    let updatedClient = 
    {
        "phone": {"stringValue": this.state.phone},
        "balance": {"stringValue": this.state.balance},
        "lastName": {"stringValue": this.state.lastName},
        "firstName": {"stringValue": this.state.firstName},
        "email": {"stringValue": this.state.email}
    }  
    
    const data = 
    {
      "fields": updatedClient
    }

    let docID = "projects/reactjs-client-panel/databases/(default)/documents/clients";

    const baseURL = "https://firestore.googleapis.com/v1beta1/" + docID;
    const config = {headers: {'Authorization': "Bearer " + this.props.token }};
    
    axios.post(baseURL, data, config).then(res => this.props.history.push('/'));
      
  }

  render()
  {
    return (
      <div>
        <div className="row">
            <div className="col-md-6">
                <Link to="/" className="btn btn-link">
                    <i className="fas fa-arrow-circle-left" />
                    Back to Dashboard
                </Link>
            </div>
        </div>
        <div className="card">
            <div className="card-header">Add Client</div>
            <div className="card-body">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text"
                        className="form-control"
                        name="firstName"
                        minLength="2"
                        required
                        onChange={this.onChange}
                        value={this.state.firstName} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text"
                        className="form-control"
                        name="lastName"
                        minLength="2"
                        required
                        onChange={this.onChange}
                        value={this.state.lastName} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={this.onChange}
                        value={this.state.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input 
                        type="tel"
                        className="form-control"
                        name="phone"
                        minLength="10"
                        required
                        onChange={this.onChange}
                        value={this.state.phone} />
                </div>
                <div className="form-group">
                    <label htmlFor="balance">Balance</label>
                    <input 
                        type="text"
                        className="form-control"
                        name="balance"
                        onChange={this.onChange}
                        value={this.state.balance}
                        disabled={this.props.disAdd} />
                </div>
                <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
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
        token: state.token,
        disAdd: state.settings.disableBalanceOnAdd
    };
}


export default connect(mapStateToProps)(AddClient);