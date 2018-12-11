import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './not-found.css';

class NotFound extends Component {
  render() {
    var token = localStorage.getItem('token');
    let auth = token === null ? false : true;
    return (
      <div className="not-found">
        <h3>Sorry, page not found!</h3>
        {auth ? <Link to="/dashboard">Dashboard</Link> : <Link to="/">Home</Link>}
      </div>
    );
  }
}
export default NotFound;
