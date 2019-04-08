/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import AuthenticationModal from './AuthenticationModal';
import store from '../store/store';
import { LOGIN, REGISTER } from '../store/actions/actionTypes';
import AlertModal from './AlertModal';


class Header extends React.Component {
  render() {
    return (
      <Navbar expand="lg" className="navbar-custom">
        <NavLink exact to="/" className="brand">
          Author&apos;s Haven
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item
              onClick={() => store.dispatch({ type: LOGIN })}
              className="nav-link auth-btn "
            >
              Login
            </Nav.Item>
            <Nav.Item
              onClick={() => store.dispatch({ type: REGISTER })}
              className="nav-link auth-btn get-started"
            >
              Get Started
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        <AuthenticationModal />
        <AlertModal />
      </Navbar>
    );
  }
}

export default Header;
