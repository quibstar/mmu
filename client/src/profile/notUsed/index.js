import React, { Component } from 'react';
import Network from '../../services/network';
import EditProfile from '../edit';
import { Link } from 'react-router-dom';
import './profile.css';
import Card from '../card';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };
  }

  componentDidMount() {
    this.fetchProfile();
  }

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

  renderAddress = profile => {
    if (profile.address) {
      return (
        <span>
          {profile.address}
          {profile.city} {profile.state} {profile.zip}
        </span>
      );
    } else {
      return 'N/A';
    }
  };

  /**
   * render profile
   */
  renderProfile = () => {
    if (this.state.profile != null) {
      let profile = this.state.profile;
      return <Card profile={profile} />;
    }
  };

  /**
   * render profile
   */
  renderEditForm = () => {
    if (this.state.profile != null) {
      return <EditProfile closeDrawerAndUpdateView={this.closeDrawerAndUpdateView} profile={this.state.profile} />;
    }
    return;
  };

  /**
   *  SideBar
   */
  sidebar = () => {
    if (this.state.profile) {
      let id = this.state.profile._id;
      return (
        <React.Fragment>
          <Link to={`/profile/${id}/me`}>This is me</Link>
          <Link to={`/profile/${id}/my-perfect-mommy-friend`}>Someone like</Link>
          <Link to={`/profile/${id}/account-settings`}>Account Settings</Link>
          <Link to={`/profile/${id}/change-password`}>Change Password</Link>
        </React.Fragment>
      );
    }
  };

  /**
   * Main view
   */
  mainView = () => {
    if (this.state.profile !== null) {
      let profile = this.state.profile;
      return (
        <React.Fragment>
          {this.renderProfile()}
          {/* <Me profile={profile} />
          <EditProfile profile={profile} />
          <MommyFriend profile={profile} />
          <AccountSettings profile={profile} />
          <ChangePassword profile={profile} /> */}
        </React.Fragment>
      );
    }
  };
  render() {
    return (
      <div id="profile">
        {/* <div id="sidebar">{this.sidebar()}</div> */}
        <div>{this.renderProfile()}</div>
      </div>
    );
  }
}
export default Profile;
