import axios from 'axios';

const setToken = (user, route, type) =>
{
    return dispatch =>
    {
        let URL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAoRbb4qX6b8IqfA18mcblCjtTOrsFZles";
        if (type === 'register')
            URL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAoRbb4qX6b8IqfA18mcblCjtTOrsFZles";
        
        axios.post(URL, user)
                .then(res => 
                {
                    localStorage.setItem('token', res.data.idToken);
                    localStorage.setItem('email', res.data.email);
                    let data = 
                    {
                        token: res.data.idToken,
                        email: res.data.email
                    }
                    
                    dispatch({ type: 'SET_TOKEN', value: data });
                    route('/');
                })
                .catch(error => alert("Email/password error"));
    }
}

export default setToken;
