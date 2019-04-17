import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import store from '../store/store';
import { PASSWORD_RESET } from '../store/actions/actionTypes';

export class ConnectedResetPassword extends React.Component {
  componentDidMount() {
    store.dispatch({ type: PASSWORD_RESET });
  }

  render() {
    const { redirect } = this.props;
    return (<>{redirect && <Redirect to="/" />}</>);
  }
}

ConnectedResetPassword.propTypes = {
  redirect: PropTypes.bool.isRequired,
};

export const mapStateToProps = state => state.resetPasswordState;

const ResetPassword = connect(mapStateToProps)(ConnectedResetPassword);
export default ResetPassword;
