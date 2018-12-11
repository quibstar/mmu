import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './home';
import Dashboard from './dashboard';
import Profile from './profile';
import Search from './search';
import Register from './auth/register';
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
      body.classList.add('admin');
    } else {
      body.classList.remove('admin');
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
        <div className="main-content">
          <Switch>
            <AuthenticatedRoute exact path="/search" props={childProps} component={Search} />
            <AuthenticatedRoute exact path="/profile" props={childProps} component={Profile} />
            <AuthenticatedRoute exact path="/dashboard" props={childProps} component={Dashboard} />
            <UnauthenticatedRoute exact path="/sign-in" props={childProps} component={Signin} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <UnauthenticatedRoute exact path="/reset-password/:id" props={childProps} component={ResetPassword} />
            <UnauthenticatedRoute exact path="/register" props={childProps} component={Register} />
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
