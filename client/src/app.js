import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './home';
import Matches from './matches';
import Profile from './profile/show';
import Persona from './profile/persona';
import AccountSettings from './profile/account-settings';
import ChangePassword from './profile/change-password';
import Search from './search';
import SignUp from './auth/signup';
import Signin from './auth/signin';
import ForgotPassword from './auth/forgot-passowrd';
import Header from './header';
import Footer from './footer';
import ResetPassword from './auth/reset-password';
import NotFound from './not-found';
import AuthenticatedRoute from './auth/authenticated-routes';
import UnauthenticatedRoute from './auth/unauthenticated-routes';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
    };
  }
  componentDidMount = () => {
    var token = localStorage.getItem('token');
    let auth = token === null ? false : true;
    this.setState({ isAuthenticated: auth });
    this.addClassToBodyIfLoggedIn();
  };
  componentDidUpdate = () => {
    this.addClassToBodyIfLoggedIn();
  };

  addClassToBodyIfLoggedIn = () => {
    var token = localStorage.getItem('token');
    var body = document.body;
    if (token) {
      body.classList.add('private');
    } else {
      body.classList.remove('private');
    }
  };

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  signOut = () => {
    this.userHasAuthenticated(false);
    localStorage.clear();
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    };

    return (
      <Fragment>
        <Header isAuthenticated={childProps.isAuthenticated} signOut={this.signOut} />
        <div id="main">
          <div className="container">
            <Switch>
              <AuthenticatedRoute exact path="/search" props={childProps} component={Search} />
              <AuthenticatedRoute exact path="/profile/:id" props={childProps} component={Profile} />
              <AuthenticatedRoute exact path="/profile/:id/persona" props={childProps} component={Persona} />
              <AuthenticatedRoute
                exact
                path="/profile/:id/account-settings"
                props={childProps}
                component={AccountSettings}
              />
              <AuthenticatedRoute
                exact
                path="/profile/:id/change-password"
                props={childProps}
                component={ChangePassword}
              />
              <AuthenticatedRoute exact path="/matches" props={childProps} component={Matches} />
              <UnauthenticatedRoute exact path="/sign-in" props={childProps} component={Signin} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <UnauthenticatedRoute exact path="/reset-password/:id" props={childProps} component={ResetPassword} />
              <UnauthenticatedRoute exact path="/sign-up" props={childProps} component={SignUp} />
              <Route exact path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
