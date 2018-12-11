import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div id="header">
        <div style={{ float: 'right' }}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/search">Search</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
    );
  }
}
export default Header;
