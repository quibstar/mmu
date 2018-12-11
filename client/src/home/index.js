import React, { Component } from 'react';
class Home extends Component {
  componentDidMount() {
    document.body.classList.remove('admin');
    localStorage.removeItem('token');
  }

  render() {
    return <div>Home</div>;
  }
}
export default Home;
