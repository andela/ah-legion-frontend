import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown} from 'reactstrap'

const Header = () => (
  <Navbar expand="lg" className="navbar-custom">
    <NavLink exact to="/" className="brand">
        Author&apos;s Haven
    </NavLink>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <NavLink to="/login" className="nav-link">
            Login
        </NavLink>
      </Nav>
          {localStorage.loggedin ? 
          <div>
            <img  className="photo" alt="..." src={require("../assets/img/alien.png")} />
          <b className="caret d-none d-lg-block d-xl-block" />
          <p className="d-lg-none">Log out</p> </div> : "dckjdnhcd"} 
    </Navbar.Collapse>
  </Navbar>
);
export default Header;
