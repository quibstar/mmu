import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Network from '../services/network';
import { Dropdown, Avatar, Menu } from 'antd';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.fetchProfile();
    }
  }

  componentDidUpdate = prevProps => {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated && this.props.isAuthenticated) {
      this.fetchProfile();
    }
  };

  fetchProfile = () => {
    var id = this.state.id;
    Network.get('/profile', this.setUpProfile, id);
  };

  setUpProfile = res => {
    if (res.status === 200) {
      const profile = res.data.user;
      this.setState({ profile });
    }
  };

  menu = () => {
    let id = this.state.profile ? this.state.profile._id : '';
    return (
      <Menu>
        <Menu.Item>
          <Link to={`/profile/${id}`}>Profile</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`/profile/${id}/persona`}>This is me</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`/profile/${id}/account-settings`}>Account Settings</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`/profile/${id}/change-password`}>Change Password</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Link to="/" onClick={() => this.props.signOut()} id="sign-out-btn">
            Sign Out
          </Link>
        </Menu.Item>
      </Menu>
    );
  };

  renderHeader = () => {
    if (this.props.isAuthenticated) {
      return (
        <div className="nav-link-container">
          <Link to="/matches">Matches</Link>
          <Link to="/search">Search</Link>
          <div id="avatar">
            <Dropdown overlay={this.menu()}>
              <Avatar style={{ backgroundColor: '#efefef' }}>Kris</Avatar>
            </Dropdown>
          </div>
        </div>
      );
    } else {
      return (
        <div className="nav-link-container">
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </div>
      );
    }
  };

  logoLink = () => {
    if (this.props.isAuthenticated) {
      return <Link to="/matches">[LOGO]</Link>;
    } else {
      return <Link to="/">[LOGO]</Link>;
    }
  };

  render() {
    return (
      <div id="header">
        <div className="container">
          {this.logoLink()}
          {this.renderHeader()}
        </div>
      </div>
    );
  }
}
export default Header;
