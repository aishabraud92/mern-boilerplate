import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }
    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('form was submitted!');
        //TODO use axios to call server and attempt to login
        axios.post('/auth/login', {
          email: this.state.email,
          password: this.state.password
        }).then(result => {
          console.log('success', result);
        }).catch(error => {
          console.log('error from server', error);
      })
        //NOTE: expect to receive a token back if it was successful
        //NOTE: make sure to handle error messages on failure
        //TODO: Redirect to profile? Maybe?
    }
    render(){
        return(
            //this. is refrencing the handleFormSubmit function that was written above
            <form onSubmit={this.handleFormSubmit}>
            <div>
            <label>Email:</label>
                <input type="text" name="Email" placeholder="Your Email" value={this.state.email} onChange={this.handleEmailChange} />
            <div>
            <label>Password:</label>
                <input type="password" name="Password" placeholder="Enter Password" value={this.state.password} onChange={this.handlePasswordChange} />
            </div>
                <input type="submit" value="Login" />
            </div>
            </form>
        );
    }
}
export default Login;
