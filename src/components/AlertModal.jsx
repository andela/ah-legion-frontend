/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import store from '../store/store';
import { deleteAComment } from '../store/actions/commentsActions';
import { SHOW_ALERT } from '../store/actions/actionTypes';

export class ConnectedAlertModal extends React.Component {
  constructor() {
    super();

    this.handleClose = () => {
      const { dispatch } = this.props;
      dispatch({ type: SHOW_ALERT, payload: { showAlert: false } });
    };

    this.deleteComment = () => {
      const { dispatch, deleteData, deleteComment } = this.props;
      const { slug, id } = deleteData;
      deleteComment(slug, id);
      dispatch({ type: SHOW_ALERT, payload: { showAlert: false } });
    };
  }

  render() {
    const {
      showAlert,
      message,
      isDeleteComment,
      colorClass,
    } = this.props;
    return (
      <Modal className="authentication-modal" id="alert-modal" show={showAlert} onHide={this.handleClose}>
        <Modal.Header className={`alert-modal-header ${colorClass}`} closeButton>
          {
            isDeleteComment ? (
              <h4 className="header-txt">Delete Comment</h4>
            ) : (
              <h4 className="header-txt">Message</h4>
            )
          }
        </Modal.Header>
        {
            isDeleteComment ? (
              <Modal.Body className="authentication-modal-body">
              &nbsp;&nbsp;
              Are you sure you want to delete this comment?
              </Modal.Body>
            ) : (
              <Modal.Body className="alert-modal-body">{message}</Modal.Body>
            )
        }
        <Modal.Footer className="authentication-modal-footer">
          {
            isDeleteComment ? (
              <Button className="btn-one" variant="primary" onClick={this.deleteComment}>
                Delete
              </Button>
            ) : (
              <Button className="btn-one" variant="primary" onClick={this.handleClose}>
                OK
              </Button>
            )
          }
        </Modal.Footer>
      </Modal>
    );
  }
}

ConnectedAlertModal.propTypes = {
  showAlert: PropTypes.bool.isRequired,
  isDeleteComment: PropTypes.bool.isRequired,
  deleteData: PropTypes.shape({}),
  deleteComment: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  colorClass: PropTypes.string,
};

ConnectedAlertModal.defaultProps = {
  deleteData: {},
  dispatch: store.dispatch,
  colorClass: 'alert success',
};

export const mapStateToProps = state => state.alertModalState;

export const mapDispatchToProps = dispatch => ({
  deleteComment: (slug, comment) => {
    dispatch(deleteAComment(slug, comment));
  },
});

const AlertModal = connect(mapStateToProps, mapDispatchToProps)(ConnectedAlertModal);
export default AlertModal;
