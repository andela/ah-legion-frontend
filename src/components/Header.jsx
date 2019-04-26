import React from 'react';
import { Navbar, Nav, OverlayTrigger, Popover } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthenticationModal from './AuthenticationModal';
import store from '../store/store';
import { LOGIN, REGISTER, LOGOUT } from '../store/actions/actionTypes';
import AlertModal from './AlertModal';
import { getUserBookmarks } from '../store/actions/bookmarkActions';

export class Header extends React.Component {
  dispatchLogin = () => {
    store.dispatch({ type: LOGIN });
  };

  dispatchRegister = () => {
    store.dispatch({ type: REGISTER });
  };

  dispatchLogout = () => {
    localStorage.clear();
    store.dispatch({ type: LOGOUT, payload: false });
  }

  render() {
    const { loginUser, GetUserBookmarks } = this.props;
    const authenticated = loginUser.loggedIn;
    GetUserBookmarks();
    return (
      <Navbar expand="lg" className="navbar-custom">
        <NavLink exact to="/" className="brand">
          Author&apos;s Haven
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {authenticated ? (

            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={(
                <Popover className="user-profile-container ml-auto">
                  <Link to="/article/create" className="nav-dropdown">New Article</Link>
                  <br />
                  <br />
                  <Link to="/articles/drafts" className="nav-dropdown">Drafts</Link>
                  <hr />
                  <Link to="/profile" className="nav-dropdown">Profile</Link>

                </Popover>
)}
              rootClose
            >
              <span className="user-profile ml-auto"><img className="rounded-circle" src="https://marriedbiography.com/wp-content/uploads/2018/01/Enrique-Iglesias.jpg" alt="user" /></span>
            </OverlayTrigger>
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

Header.propTypes = {
  loginUser: PropTypes.bool.isRequired,
  GetUserBookmarks: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    GetUserBookmarks: () => dispatch(getUserBookmarks()),
  };
}

export const mapStateToProps = (state) => {
  const { loginUser } = state;
  return { loginUser };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
