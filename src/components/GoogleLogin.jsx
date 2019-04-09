import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { googleLoginAction } from '../store/actions/authActions/socialLoginAction';

export const GoogleLogin = ({ googleLogin, isRegister }) => (
  <Button id="googleBtn" onClick={googleLogin} variant="outline-secondary" className="btn-auth social-button google" block>
    <i className="fab fa-google" />
    {isRegister ? 'Register ' : 'Login '}
    with Google
  </Button>
);

GoogleLogin.propTypes = {
  googleLogin: PropTypes.func.isRequired,
  isRegister: PropTypes.bool.isRequired,
};

export const mapStateToProps = (state) => {
  const { isRegister } = state.modalState;
  return {
    isRegister,
  };
};

export const mapDispatchToProps = dispatch => ({
  googleLogin: () => dispatch(googleLoginAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLogin);
