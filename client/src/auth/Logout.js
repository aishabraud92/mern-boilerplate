import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Logout extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    //TO Do: delte token form local storage
    //go back to home page

      }
  render(){
    return(
      <Link to="/" onClick={this.handleLogout}>Logout</Link>
    );
  }
}
export default Logout;
