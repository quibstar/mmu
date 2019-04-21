import React, { Component } from 'react';
import ProfilePrefs from '../../profile-prefs';
class MommyFriend extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section>
        <h2>My perfect mommy friend</h2>
        <ProfilePrefs />
      </section>
    );
  }
}
export default MommyFriend;
