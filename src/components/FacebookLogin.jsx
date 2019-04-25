import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { facebookLoginAction } from '../store/actions/authActions/socialLoginAction';


export const FacebookLogin = ({ facebookLogin, component }) => (
  <Button onClick={facebookLogin} variant="outline-secondary" className="btn-auth social-button facebook" block>
    <i className="fab fa-facebook" />
    {component === 'register' ? 'Register ' : 'Login '}
    with Facebook
  </Button>
);

FacebookLogin.propTypes = {
  facebookLogin: PropTypes.func.isRequired,
  component: PropTypes.string.isRequired,
};

export const mapStateToProps = (state) => {
  const { component } = state.modalState;
  return {
    component,
  };
};

export const mapDispatchToProps = dispatch => ({
  facebookLogin: () => dispatch(facebookLoginAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FacebookLogin);
