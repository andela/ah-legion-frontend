import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import AuthenticationModal from './AuthenticationModal';
import store from '../store/store';
import { LOGIN, REGISTER } from '../store/actions/actionTypes';
import AlertModal from './AlertModal';
import { isLoggedIn } from '../utils/tokenValidator';

class Header extends React.Component {
  state = {
    LoggedIn: isLoggedIn,
  };

  dispatchLogin = () => {
    store.dispatch({ type: LOGIN });
  };

  dispatchRegister = () => {
    store.dispatch({ type: REGISTER });
  };

  render() {
    const { LoggedIn } = this.state;
    return (
      <Navbar expand="lg" className="navbar-custom">
        <NavLink exact to="/" className="brand">
          Author&apos;s Haven
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {LoggedIn ? (
            <Nav className="ml-auto">
              <Nav.Item className="nav-link profile-dropdown">
                Your Profile
              </Nav.Item>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Item
                onClick={this.dispatchLogin}
                className="nav-link auth-btn login"
              >
                Login
              </Nav.Item>
              <Nav.Item
                onClick={this.dispatchRegister}
                className="nav-link auth-btn get-started"
              >
                Get Started
              </Nav.Item>
            </Nav>
          )}
        </Navbar.Collapse>
        <AuthenticationModal />
        <AlertModal />
      </Navbar>
    );
  }
}

export default Header;
