import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import GoogleLogin from './GoogleLogin';
import FacebookLogin from './FacebookLogin';
import TwitterLogin from './TwitterLogin';
import '../css/SocialButton.css';


export const SocialAccount = ({ socialLoginError, provider }) => (
  <div className="main-container">
    <hr />
    <Alert variant="danger" show={socialLoginError}>
      Sorry, something went wrong with
      {' '}
      {provider}
      {' '}
        login!
    </Alert>
    <GoogleLogin />
    <FacebookLogin />
    <TwitterLogin />
  </div>
);

SocialAccount.propTypes = {
  provider: PropTypes.string.isRequired,
  socialLoginError: PropTypes.bool.isRequired,
};

export const mapStateToProps = (state) => {
  const { provider, socialLoginError } = state.loginUser;
  return {
    provider,
    socialLoginError,
  };
};

export default connect(mapStateToProps)(SocialAccount);
