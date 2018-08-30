import React, { Component, Fragment } from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import 'firebase/firestore';

class Clients extends Component
{
    componentDidMount()
    {   
        if (this.props.token)
        {
            let arr = [];
            let clientData = null;

            axios.defaults.baseURL = "https://firestore.googleapis.com/v1beta1/projects/reactjs-client-panel/databases/(default)/documents/clients/"
            axios.defaults.headers.common = {'Authorization': "Bearer " + this.props.token}
            axios.get().then(doc => 
                    {                    
                        doc.data.documents.forEach(user => 
                            {
                                clientData = user.fields;
                                clientData['id'] = user.name;
                                arr.push(clientData);
                            });
                        this.props.getClient(arr);
                    });
        }
    }

    render()
    {
        let totalBalance = 0;
        if (this.props.token)
        {
            totalBalance = this.props.clients.reduce((sum, el) => sum + parseFloat(el.balance.stringValue), 0);     
            return (
                <Fragment>
                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <h2>
                                   <i className="fas fa-users" /> Clients
                                </h2>
                            </div>
                            <div className="col-md-6">
                                <h5 className="text-right text-secondary">
                                Total Owed
                                    <span className="text-primary ml-1">
                                    ${totalBalance.toFixed(2)}
                                    </span>
                                </h5>
                            </div>
                        </div>
                    </div>

                    <table className="table table-striped">
                        <thead className="thead-inverse">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Balance</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.clients.map((client, index) => (
                                <tr key={index}>
                                    <td>{client.firstName.stringValue} {client.lastName.stringValue}</td>
                                    <td>{client.email.stringValue}</td>
                                    
                                    <td>${parseFloat(client.balance.stringValue).toFixed(2)}</td>
                                    <td>
                                        <Link to={`/client/${index+1}`} className="btn btn-secondary btn-sm">
                                            <i className="fas fa-arrow-circle-right" /> Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Fragment>
            );
        }
        else 
            return <Redirect to="/login" />
    }
}

const mapStateToProps = state =>
{
    return {
        clients: state.clients,
        token: state.token,
        isAuth: state.isAuthenticated
    };
}

const mapDispatchToProps = dispatch =>
{
    return {
        getClient: (clientData) => dispatch({type: 'GET_CLIENT', value: clientData})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients);

