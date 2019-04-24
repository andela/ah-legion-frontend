import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import store from '../store/store';
import { PASSWORD_RESET, SET_TOKEN } from '../store/actions/actionTypes';

class ResetPassword extends React.Component {
  componentDidMount() {
    store.dispatch({ type: PASSWORD_RESET });
    const { match: { params } } = this.props;
    const { resetToken } = params;
    store.dispatch({ type: SET_TOKEN, payload: { token: resetToken } });
  }

  render() {
    return (<Redirect to="/" />);
  }
}

ResetPassword.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default ResetPassword;
