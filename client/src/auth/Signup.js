import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component{
  constructor(props){
  super(props);
  this.state = {
    email: '',
    password: '',
    name: ''
    }
  }

  handleChange = (e) => {
    this.setState({[ e.target.name]: e.target.value });

  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('form was submitted', this.state);
    //use axios
    axios.post('/auth/signup', {
          name: this.state.password,
          email: this.state.email,
          password: this.state.password
    }).then(result => {
        console.log('response from server', result);
        localStorage.setItem('mernItem', result.data.token);
      //update parent object
        this.props.updateUser();
    }).catch(error =>{
        console.log('response', error);
    });

  }
  render(){
      if(this.props.user){
        return(<Redirect to="/profile" />)
      }
      else{
        return(
            <form onSubmit={this.handleFormSubmit}>
              <div>
                <label>Email: </label>
                <input type="text" name="email" placeholder='Your Email' value={this.state.email} onChange={this.handleChange} />
              </div>
              <div>
                  <label>Name: </label>
                  <input type="text" name="name" placholder="Your name" value={this.state.name} onChange={this.handleChange} />
              </div>
              <div>
                  <label>Password: </label>
                  <input type="password" name="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} />
              </div>
                  <input type="submit" value="Login" className="btn" />
              </form>
        );
      }
    }
}

export default Signup;
