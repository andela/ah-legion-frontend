import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { facebookLoginAction } from '../store/actions/authActions/socialLoginAction';


export const FacebookLogin = ({ facebookLogin, isRegister }) => (
  <Button onClick={facebookLogin} variant="outline-secondary" className="btn-auth social-button facebook" block>
    <i className="fab fa-facebook" />
    {isRegister ? 'Register ' : 'Login '}
    with Facebook
  </Button>
);

FacebookLogin.propTypes = {
  facebookLogin: PropTypes.func.isRequired,
  isRegister: PropTypes.bool.isRequired,
};

export const mapStateToProps = (state) => {
  const { isRegister } = state.modalState;
  return {
    isRegister,
  };
};

export const mapDispatchToProps = dispatch => ({
  facebookLogin: () => dispatch(facebookLoginAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FacebookLogin);
