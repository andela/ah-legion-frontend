/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import { Container, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import RegisterForm from './RegisterForm';
import EditCommentForm from './EditCommentForm';
import Login from './Login';
import SocialAccount from './SocialAccount';
import ShowModal from '../store/actions/changeFormAction';
import { showErrors } from '../store/actions/registerActions';
import { IS_LOADING } from '../store/actions/actionTypes';
import InitiateResetForm from './InitateResetForm';
import PasswordResetForm from './PasswordResetForm';

export class ConnectedAuthenticationModal extends React.Component {
  render() {
    const { modalShow, dispatch, component } = this.props;
    const onHide = () => {
      dispatch(ShowModal({ modalShow: false }));
      dispatch({ type: IS_LOADING, payload: { isLoading: false } });
      dispatch(showErrors({}));
    };
    let CurrentComponent;
    let headerMessage;
    switch (component) {
      case ('register'):
        CurrentComponent = RegisterForm;
        headerMessage = 'Join Author\'s Haven';
        break;
      case ('login'):
        CurrentComponent = Login;
        headerMessage = 'Welcome back';
        break;
      case ('initiate-reset'):
        CurrentComponent = InitiateResetForm;
        headerMessage = 'Forgot your password?';
        break;
      case ('password-reset'):
        CurrentComponent = PasswordResetForm;
        headerMessage = 'Create your new Password';
        break;
      case ('edit-comment'):
        CurrentComponent = EditCommentForm;
        headerMessage = 'Edit Comment';
        break;
      default:
        CurrentComponent = Login;
        headerMessage = 'Welcome back';
        break;
    }
    return (
      <Modal
        show={modalShow}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="authentication-modal"
      >
        <Modal.Header className="authentication-modal-header" closeButton>
          <h3 className="col-md-10 col-md-offset-5">{headerMessage}</h3>
        </Modal.Header>
        <Modal.Body className="authentication-modal-body">
          <Container>
            <CurrentComponent />
            { (component === 'register' || component === 'login') && <SocialAccount /> }
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}


export const mapStateToProps = state => state.modalState;

ConnectedAuthenticationModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  component: PropTypes.string.isRequired,
  modalShow: PropTypes.bool.isRequired,
};

const AuthenticationModal = connect(mapStateToProps)(ConnectedAuthenticationModal);
export default AuthenticationModal;
