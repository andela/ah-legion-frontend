/* eslint-disable class-methods-use-this */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { registerUser, showErrors } from '../store/actions/registerActions';
import validate from '../utils/registerFormValidator';
import store from '../store/store';
import { IS_LOADING, LOGIN } from '../store/actions/actionTypes';
import ButtonSpinner from './ButtonSpinner';

const { REACT_APP_FRONTEND_URL } = process.env;

export class ConnectedRegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };

    this.swapForm = () => {
      store.dispatch({ type: LOGIN });
    };

    this.handleFocus = (event) => {
      event.target.classList.remove('error');
    };

    this.handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    };

    this.handleSubmit = (event) => {
      const { RegisterUser } = this.props;
      event.preventDefault();
      let {
        email, username,
      } = this.state;
      const { password, confirmPassword } = this.state;
      email = email.trim();
      username = username.trim();
      const errors = validate(username, email, password, confirmPassword);
      if (Object.keys(errors).length === 0) {
        store.dispatch({ type: IS_LOADING, payload: { isLoading: true } });
        const payload = {
          user: {
            email,
            username,
            password: confirmPassword,
            callback_url: REACT_APP_FRONTEND_URL,
          },
        };
        RegisterUser(payload);
      } else {
        store.dispatch(showErrors(errors));
      }
    };
  }

  render() {
    const { errors, isLoading } = this.props;
    return (
      <div className="center">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Text id="email-error" className="error-text">{errors.email}</Form.Text>
            <Form.Control
              className={errors.email ? 'error' : ''}
              type="text"
              name="email"
              onChange={this.handleChange}
              onFocus={this.handleFocus}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Text id="username-error" className="error-text">{errors.username}</Form.Text>
            <Form.Control
              className={errors.username && 'error'}
              type="text"
              name="username"
              id="username"
              onChange={this.handleChange}
              onFocus={this.handleFocus}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Text id="password-error" className="error-text">{errors.password}</Form.Text>
            <Form.Control
              className={errors.password && 'error'}
              type="password"
              name="password"
              onChange={this.handleChange}
              onFocus={this.handleFocus}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Text id="confirmPassword-error" className="error-text">{errors.confirmPassword}</Form.Text>
            <Form.Control
              className={errors.confirmPassword && 'error'}
              type="password"
              name="confirmPassword"
              onChange={this.handleChange}
              onFocus={this.handleFocus}
            />
          </Form.Group>
          <Button className="btn-one" type="submit" disabled={isLoading}>
            {
              isLoading && <ButtonSpinner />
            }
            { isLoading ? 'Loading...' : 'REGISTER' }
          </Button>
          <p className="swap-modal-text">
            Already have an account?&nbsp;
            <span role="button" tabIndex={0} className="swap-modal-span" onClick={this.swapForm} onKeyPress={this.swapForm}>
            Click here
            </span>
            &nbsp;to login.
          </p>

        </Form>
      </div>
    );
  }
}

ConnectedRegisterForm.propTypes = {
  errors: PropTypes.shape({}).isRequired,
  RegisterUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    RegisterUser: payload => dispatch(registerUser(payload)),
  };
}

const mapStateToProps = state => state.registerState;

const RegisterForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedRegisterForm);
export default RegisterForm;
