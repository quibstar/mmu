import React, { Component } from 'react';

class Dashboard extends Component {
  componentDidMount() {
    document.body.classList.add('dashboard');
  }

  componentWillUnmount() {
    document.body.classList.remove('dashboard');
  }

  render() {
    return <div id="dashboard">Dashboard</div>;
  }
}
export default Dashboard;
