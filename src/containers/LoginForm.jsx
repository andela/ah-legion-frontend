import React from 'react';
import {
  Form, Button, Alert,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import loginAction from '../store/actions/authActions/LoginAction';
import validateLoginForm from '../utils/validation';
import store from '../store/store';
import { REGISTER, IS_LOADING } from '../store/actions/actionTypes';
import ButtonSpinner from '../components/ButtonSpinner';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {},
      touched: false,
      show: true,
    };
  }

  onAlertClose = () => {
    this.setState({
      show: false,
    });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, touched: true });
  };

  handleSubmit = (event) => {
    const { email, password } = this.state;
    const { LoginUser } = this.props;
    event.preventDefault();
    const formErrors = validateLoginForm(email, password);
    if (formErrors.length === 0) {
      this.setState({
        formErrors: [],
      });
      const data = { email, password };
      store.dispatch({ type: IS_LOADING, payload: { isLoading: true } });
      LoginUser(data);
    } else {
      this.setState({
        formErrors,
        touched: false,
      });
    }
  };

  swapModal = () => {
    store.dispatch({ type: REGISTER });
  };

  render() {
    const { loginUser } = this.props;
    const { errors, isLoading } = loginUser;
    const { formErrors, touched, show } = this.state;
    return (
      <div>
        <Form className="main-container" onSubmit={this.handleSubmit}>
          <Form.Group name="email">
            {errors && (
              <Alert
                className="close-login-alert"
                dismissible
                variant="danger"
                show={show}
                onClick={this.onAlertClose}
              >
                <p>
                  <small>{errors}</small>
                </p>
              </Alert>
            )}
            <Form.Label htmlFor="email">Email address</Form.Label>
            <div className="text-danger email-warning">
              {formErrors[0] === 'email' && !touched && formErrors[1]}
            </div>
            <p className="text-danger email-warning">{errors.email}</p>
            <Form.Control
              className={
                formErrors[0] === 'email' ? 'red-form-border' : 'email-input'
              }
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group name="password">
            <Form.Label htmlFor="password">Password</Form.Label>
            <div className="text-danger password-warning">
              {formErrors[0] === 'password' && !touched && formErrors[1]}
            </div>
            <p className="text-danger password-warning">{errors.password}</p>
            <Form.Control
              className={
                formErrors[0] === 'password'
                  ? 'red-form-border'
                  : 'password-input'
              }
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button className="btn-one" type="submit" disabled={isLoading}>
            {
              isLoading && <ButtonSpinner className="btn-disabled btn-one" />
            }
            { isLoading ? 'Loading...' : 'Sign In' }
          </Button>
          <p className="swap-modal-text">
            Don&#39;t have an account?
            &nbsp;
            <span
              role="button"
              tabIndex={0}
              className="swap-modal-span"
              onClick={this.swapModal}
              onKeyPress={this.swapModal}
            >
              Click here
            </span>
            &nbsp;
            to register.
          </p>
        </Form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.shape({
    loggedIn: PropTypes.bool,
    errors: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    isLoading: PropTypes.bool,
  }).isRequired,
  LoginUser: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    LoginUser: payload => dispatch(loginAction(payload)),
  };
}

export const mapStateToProps = (state) => {
  const { loginUser } = state;
  return {
    loginUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
