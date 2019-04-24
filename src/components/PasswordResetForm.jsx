import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ButtonSpinner from './ButtonSpinner';
import { passwordReset } from '../store/actions/passwordResetActions';
import validate from '../utils/registerFormValidator';
import store from '../store/store';
import { IS_LOADING } from '../store/actions/actionTypes';

export class ConnectedPasswordResetForm extends Component {
  constructor() {
    super();
    this.state = {
      confirmPassword: '',
      password: '',
      errors: {},
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    const { password, confirmPassword } = this.state;
    const { PasswordReset, token } = this.props;
    event.preventDefault();
    const errors = validate('', '', password, confirmPassword);
    if (!errors.password && !errors.confirmPassword) {
      const payload = {
        user_password: {
          password,
          confirm_password: confirmPassword,
          token,
        },
      };
      PasswordReset(payload);
      store.dispatch({ type: IS_LOADING, payload: { isLoading: true } });
    } else {
      const passwordError = errors.password;
      const confirmPasswordError = errors.confirmPassword;
      this.setState({ errors: { password: passwordError, confirmPassword: confirmPasswordError } });
    }
  };

  render() {
    const { isLoading } = this.props;
    const { errors } = this.state;
    return (
      <div className="center" id="initiate-reset-form">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>New password</Form.Label>
            <Form.Text className="error-text">{errors.password}</Form.Text>
            <Form.Control
              className={errors.password && 'error'}
              type="password"
              name="password"
              id="password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Text className="error-text">{errors.confirmPassword}</Form.Text>
            <Form.Control
              className={errors.confirmPassword && 'error'}
              type="password"
              name="confirmPassword"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button className="btn-one" type="submit" disabled={isLoading}>
            {
              isLoading && <ButtonSpinner />
            }
            {isLoading ? 'Loading...' : 'Reset'}
          </Button>
        </Form>
      </div>
    );
  }
}

ConnectedPasswordResetForm.propTypes = {
  PasswordReset: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};

export const mapStateToProps = state => state.resetPasswordState;

export function mapDispatchToProps(dispatch) {
  return {
    PasswordReset: payload => dispatch(passwordReset(payload)),
  };
}

const PasswordResetForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedPasswordResetForm);
export default PasswordResetForm;
