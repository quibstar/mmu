import React, { Component } from 'react';
import Network from '../services/network';
import EditProfile from './edit';
import moment from 'moment';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };
  }

  componentDidMount() {
    this.fetchProfile();
    document.body.classList.add('profile');
  }

  componentWillUnmount() {
    document.body.classList.remove('profile');
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
      return (
        <div className="user-info">
          <div className="label">Name</div>
          <div className="data">
            {profile.firstName} {profile.lastName}
          </div>
          <div className="label">Email:</div>
          <div className="data"> {profile.email}</div>
          <div className="label">Address:</div>
          <div className="data">{this.renderAddress(profile)}</div>
          <div className="label">DOB:</div>
          <div className="data">{profile.dateOfBirth ? moment(profile.dateOfBirth).format('MM/DD/YYYY') : 'N/A'}</div>
        </div>
      );
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

  render() {
    return <div className="container">{this.renderProfile()}</div>;
  }
}
export default Profile;
