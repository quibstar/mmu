import React, { Component } from 'react';
import './card.css';
import Profile from '../assets/profile.jpg';
class ProfileCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let profile = this.props.profile;
    return (
      <div className="profile-card">
        <div className="card-top">
          <img src={Profile} className="profile-image" />
        </div>
        <div className="card-bottom">
          {profile.firstName} {profile.lastName}
        </div>
      </div>
    );
  }
}
export default ProfileCard;
