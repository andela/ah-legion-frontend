import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ButtonSpinner from './ButtonSpinner';
import { initiateReset } from '../store/actions/passwordResetActions';
import validate from '../utils/registerFormValidator';
import store from '../store/store';
import { IS_LOADING } from '../store/actions/actionTypes';

const { REACT_APP_FRONTEND_URL } = process.env;
const callbackUrl = `${REACT_APP_FRONTEND_URL}reset-password`;

export class ConnectedInitiateResetForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      errors: {},
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    const { email } = this.state;
    const { InitiateReset } = this.props;
    event.preventDefault();
    const errors = validate('', email, '', '');
    if (!('email' in errors)) {
      const payload = {
        payload: {
          email,
          callback_url: callbackUrl,
        },
      };
      InitiateReset(payload);
      store.dispatch({ type: IS_LOADING, payload: { isLoading: true } });
    } else {
      const emailError = errors.email;
      this.setState({ errors: { email: emailError } });
    }
  };

  render() {
    const { isLoading } = this.props;
    const { errors } = this.state;
    return (
      <div className="center" id="initiate-reset-form">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Enter your email to get started.</Form.Label>
            <Form.Text className="error-text">{errors.email}</Form.Text>
            <Form.Control
              className={errors.email && 'error'}
              type="text"
              name="email"
              id="email"
              onChange={this.handleChange}
              onFocus={this.handleFocus}
            />
          </Form.Group>
          <Button className="btn-one" type="submit" disabled={isLoading}>
            {
              isLoading && <ButtonSpinner />
            }
            {isLoading ? 'Loading...' : 'Continue'}
          </Button>
        </Form>
      </div>
    );
  }
}

ConnectedInitiateResetForm.propTypes = {
  InitiateReset: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export const mapStateToProps = state => state.resetPasswordState;

export function mapDispatchToProps(dispatch) {
  return {
    InitiateReset: payload => dispatch(initiateReset(payload)),
  };
}

const InitiateResetForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedInitiateResetForm);
export default InitiateResetForm;
