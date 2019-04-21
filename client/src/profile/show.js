import React, { Component } from 'react';
import Network from '../services/network';
import './show.css';

import proImage from '../assets/profile.jpg';

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

  componentDidUpdate = prevProps => {
    if (prevProps.profile !== this.props.profile) {
      this.fetchProfile();
    }
  };

  fetchProfile = () => {
    var id = this.state.id; // not working
    Network.get('/profile', this.setUpProfile, id);
  };

  setUpProfile = res => {
    if (res.status === 200) {
      const profile = res.data.user;
      this.setState({ profile });
    }
  };

  /**
   * render profile
   */
  renderProfile = () => {
    if (this.state.profile != null) {
      let profile = this.state.profile;
      return (
        <div>
          <div className="p-top">
            <div>
              <img src={proImage} className="p-image" alt="profile image" />
            </div>
            <div>
              <h1>Jane Doe</h1>
            </div>
          </div>
          <div className="p-interest">
            Interest: <span>Skiing</span> <span>Cooking</span>
          </div>
          <div>I am: Straight</div>
          <div>Want to hang out with people between: 20-35 years old</div>
          <div>Children: 4 Girs and 1 boy</div>
          <div>
            My Story:
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div id="profile">
        <div>{this.renderProfile()}</div>
      </div>
    );
  }
}
export default Profile;
