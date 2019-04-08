/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import { Container, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import RegisterForm from './RegisterForm';
import Login from './Login';
import ShowModal from '../store/actions/changeFormAction';
import { showErrors } from '../store/actions/registerActions';
import { IS_LOADING } from '../store/actions/actionTypes';

export class ConnectedAuthenticationModal extends React.Component {
  render() {
    const { modalShow, dispatch, isRegister } = this.props;
    const onHide = () => {
      dispatch(ShowModal({ modalShow: false }));
      dispatch({ type: IS_LOADING, payload: { isLoading: false } });
      dispatch(showErrors({}));
    };
    let Form;
    let headerMessage;
    if (isRegister) {
      Form = RegisterForm;
      headerMessage = <h3 className="col-md-10 col-md-offset-5">Join Author&apos;s Haven</h3>;
    } else {
      Form = Login;
      headerMessage = <h3 className="col-md-10 col-md-offset-5">Welcome back</h3>;
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
          {headerMessage}
        </Modal.Header>
        <Modal.Body className="authentication-modal-body">
          <Container>
            <Form />
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

export const mapStateToProps = (state) => {
  const { isRegister, modalShow } = state.modalState;
  return {
    isRegister,
    modalShow,
  };
};

ConnectedAuthenticationModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isRegister: PropTypes.bool.isRequired,
  modalShow: PropTypes.bool.isRequired,
};

const AuthenticationModal = connect(mapStateToProps)(ConnectedAuthenticationModal);
export default AuthenticationModal;
