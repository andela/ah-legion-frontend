import React from 'react';
import { Navbar, Nav, OverlayTrigger, Popover } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthenticationModal from './AuthenticationModal';
import store from '../store/store';
import { LOGIN, REGISTER, LOGOUT, REMOVE_REACTION } from '../store/actions/actionTypes';
import AlertModal from './AlertModal';
import SearchForm from './SearchForm';

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
    store.dispatch({ type: REMOVE_REACTION });
  }

  render() {
    const { loginUser } = this.props;
    const authenticated = loginUser.loggedIn;
    return (
      <Navbar expand="lg" className="navbar-custom">
        <NavLink exact to="/" className="brand">
          Author&apos;s Haven
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item className="search-placement">
              <SearchForm />
            </Nav.Item>
            {authenticated ? (
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={(
                  <Popover className="user-profile-container ml-auto">
                    <Link
                      to="/article/create"
                      href="/article/create"
                      className="nav-dropdown"
                    >
                      New Article
                    </Link>
                    <hr />
                    <Link
                      to="/articles/drafts"
                      href="/article/create"
                      className="nav-dropdown"
                    >
                      Drafts
                    </Link>
                    <hr />
                    <Link
                      to="/profile"
                      href="/profile"
                      className="nav-dropdown"
                    >
                      Profile
                    </Link>
                    <hr />
                    <span
                      className="logout nav-dropdown"
                      onClick={this.dispatchLogout}
                      role="presentation"
                    >
                      Logout
                    </span>
                  </Popover>
              )}
                rootClose
              >
                <img className="rounded-circle float-right space-icon" src="https://marriedbiography.com/wp-content/uploads/2018/01/Enrique-Iglesias.jpg" alt="user" />
              </OverlayTrigger>
            ) : (
              <React.Fragment>
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
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
        <AuthenticationModal />
        <AlertModal />
      </Navbar>
    );
  }
}

Header.propTypes = {
  loginUser: PropTypes.bool.isRequired,
};


export const mapStateToProps = (state) => {
  const { loginUser } = state;
  return { loginUser };
};

export default connect(mapStateToProps)(Header);
