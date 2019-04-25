import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { googleLoginAction } from '../store/actions/authActions/socialLoginAction';

export const GoogleLogin = ({ googleLogin, component }) => (
  <Button id="googleBtn" onClick={googleLogin} variant="outline-secondary" className="btn-auth social-button google" block>
    <i className="fab fa-google" />
    {component === 'register' ? 'Register ' : 'Login '}
    with Google
  </Button>
);

GoogleLogin.propTypes = {
  googleLogin: PropTypes.func.isRequired,
  component: PropTypes.string.isRequired,
};

export const mapStateToProps = (state) => {
  const { component } = state.modalState;
  return {
    component,
  };
};

export const mapDispatchToProps = dispatch => ({
  googleLogin: () => dispatch(googleLoginAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLogin);
