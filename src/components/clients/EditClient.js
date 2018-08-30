import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import 'firebase/firestore';
import axios from 'axios';

class EditClient extends Component
{
  state =
  {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: '',
    
  }

  componentWillMount()
  {
    let clientId = this.props.match.params.id;
    let {firstName, lastName, email, phone, balance} = this.props.clients[clientId-1];
    this.setState({
            firstName: firstName.stringValue,
            lastName: lastName.stringValue,
            email: email.stringValue,
            phone: phone.stringValue,
            balance: balance.stringValue
            });
  }

  onChange = event =>
  {
    this.setState({[event.target.name]: event.target.value});
    
  }

  onSubmitForm = (event, clientId) =>
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
    let docID = this.props.clients[clientId-1].id;
    console.log(docID);
    const baseURL = "https://firestore.googleapis.com/v1beta1/" + docID;
    const config = {headers: {'Authorization': "Bearer " + this.props.token }};
    
    axios.patch(baseURL, data, config).then(res => this.props.history.push('/'));
      
  }

  render()
  {
    let id = this.props.match.params.id;
        
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
            <form onSubmit={event => this.onSubmitForm(event, id)}>
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
                        disabled={this.props.disEdit} />
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
        clients: state.clients,
        token: state.token,
        disEdit: state.settings.disableBalanceOnEdit
    };
}

export default connect(mapStateToProps)(EditClient);
