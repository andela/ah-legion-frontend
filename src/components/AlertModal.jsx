/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import store from '../store/store';
import { SHOW_ALERT } from '../store/actions/actionTypes';

export class ConnectedAlertModal extends React.Component {
  constructor() {
    super();

    this.handleClose = () => {
      const { dispatch } = this.props;
      dispatch({ type: SHOW_ALERT, payload: { showAlert: false } });
    };
  }

  render() {
    const { showAlert, message, colorClass } = this.props;
    return (
      <Modal className="authentication-modal" id="alert-modal" show={showAlert} onHide={this.handleClose}>
        <Modal.Header className={`alert-modal-header ${colorClass}`} closeButton>
          <h4 className="header-txt">Message</h4>
        </Modal.Header>
        <Modal.Body className="alert-modal-body">{message}</Modal.Body>
        <Modal.Footer className="authentication-modal-footer">
          <Button className="btn-one" variant="primary" onClick={this.handleClose}>
              OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ConnectedAlertModal.propTypes = {
  showAlert: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  colorClass: PropTypes.string,
};

ConnectedAlertModal.defaultProps = {
  dispatch: store.dispatch,
  colorClass: 'alert success',
};

export const mapStateToProps = state => state.alertModalState;

const AlertModal = connect(mapStateToProps)(ConnectedAlertModal);
export default AlertModal;
