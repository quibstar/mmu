import React, { Component } from 'react';
import GeoSuggest from '../geosuggest';
import './home.css';

class Home extends Component {
  componentDidMount() {
    document.body.classList.remove('admin');
    localStorage.removeItem('token');
  }

  render() {
    return (
      <div id="home">
        <div className="center intro-text">
          <h1>Meet a mommy in your area</h1>
          <div>
            Heading out and want some company? <br /> Need some social time? <br />
            Need new friends?
          </div>
        </div>
        <GeoSuggest />
      </div>
    );
  }
}
export default Home;
