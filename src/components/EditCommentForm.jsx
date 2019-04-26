import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { SHOW_MODAL } from '../store/actions/actionTypes';
import store from '../store/store';
import { editAComment } from '../store/actions/commentsActions';
import ButtonSpinner from './ButtonSpinner';

export class EditCommentForm extends Component {
  constructor() {
    super();
    this.state = {
      editedComment: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  editComment = (event) => {
    event.preventDefault();
    const { editData } = this.props;
    const { editComment } = this.props;
    const { editedComment } = this.state;
    const { slug, id } = editData;
    editComment(slug, id, editedComment);
    store.dispatch({ type: SHOW_MODAL, payload: { modalShow: false } });
  };

  render() {
    const { isLoading } = this.props;
    return (
      <div className="center">
        <br />
        <br />
        <Form>
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows="6"
              onChange={this.handleChange}
              name="editedComment"
            />
          </Form.Group>
          <Button
            className="btn-one"
            type="submit"
            disabled={isLoading}
            onClick={this.editComment}
          >
            {
              isLoading && <ButtonSpinner />
            }
            { isLoading ? 'Loading...' : 'Edit' }
          </Button>
          <p className="swap-modal-text">
            Type an your replacement comment here.
          </p>

        </Form>
      </div>
    );
  }
}

EditCommentForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  editData: PropTypes.shape({}).isRequired,
  editComment: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  editData: state.modalState.editData,
  isEditComment: state.modalState.isEditComment,
});

export const mapDispatchToProps = dispatch => ({
  editComment: (slug, pk, comment) => {
    dispatch(editAComment(slug, pk, comment));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCommentForm);
