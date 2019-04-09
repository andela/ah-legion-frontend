import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { twitterLoginAction } from '../store/actions/authActions/socialLoginAction';

const { REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_AUTH_DOMAIN } = process.env;

firebase.initializeApp({
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
});

export const TwitterLogin = ({ twitterLogin, isRegister }) => (

  <Button onClick={twitterLogin} variant="outline-secondary" className="btn-auth social-button twitter" block>
    <i className="fab fa-twitter" />
    {' '}
    {isRegister ? 'Register ' : 'Login '}
     with Twitter
  </Button>
);

TwitterLogin.propTypes = {
  twitterLogin: PropTypes.func.isRequired,
  isRegister: PropTypes.bool.isRequired,
};

export const mapStateToProps = (state) => {
  const { isRegister } = state.modalState;
  return {
    isRegister,
  };
};

export const mapDispatchToProps = dispatch => ({
  twitterLogin: () => dispatch(twitterLoginAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TwitterLogin);
