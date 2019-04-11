import 'bootstrap';
import 'jquery';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import moment from 'moment';
import store from '../store/store';
import { EDIT_COMMENT, DELETE_COMMENT, FINISH_DELETE, FINISH_EDIT } from '../store/actions/actionTypes';
import { createAComment, createAReply } from '../store/actions/commentsActions';

export class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisComment: '',
      thisReply: '',
      replyId: '',
      comments: '',
      slug: '',
      isLoggedIn: false,
      newComment: {},
      newReply: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleSubmitReply = this.handleSubmitReply.bind(this);
    this.dispatchEditComment = this.dispatchEditComment.bind(this);
    this.dispatchDeleteComment = this.dispatchDeleteComment.bind(this);
  }

  componentDidMount() {
    const { data } = this.props;
    const { comments, slug } = data;
    this.setState({
      comments,
      slug,
    });
  }

  componentWillReceiveProps(newProps) {
    const { comments } = this.state;
    const {
      data,
      changedCommentData,
      changedComment,
    } = newProps;
    const { state } = this;
    const incomingComment = data.newComment;
    const incomingReply = data.newReply;
    const existingComment = state.newComment;
    const existingReply = state.newReply;
    if ((changedCommentData) && (changedComment)) {
      if (newProps.changedComment) {
        for (let count = 0; count < comments.length; count += 1) {
          if (comments[count].id === changedCommentData.id) {
            comments.splice(count, 1, changedCommentData);
            this.setState({
              comments,
            });
            store.dispatch({ type: FINISH_EDIT });
            break;
          }
        }
      }
    }
    if (data.deletedComment) {
      for (let count = 0; count < comments.length; count += 1) {
        if (comments[count].id === data.deletedCommentId) {
          comments.splice(count, 1);
          this.setState({
            comments,
          });
          store.dispatch({ type: FINISH_DELETE });
          break;
        }
      }
    }

    this.setState({
      isLoggedIn: newProps.isLoggedIn,
    });
    if (incomingComment) {
      if ((existingComment !== incomingComment)
    && (Object.keys(incomingComment).length !== 0)) {
        comments.unshift(incomingComment.Comment);
        this.setState({
          comments,
          newComment: incomingComment,
        });
      }
    }
    if (incomingReply) {
      if ((existingReply !== incomingReply)
    && (Object.keys(incomingReply).length !== 0)) {
        const replyInstance = data.newReply.Comment;
        const commentId = parseInt(state.replyId, 10);
        for (let count = 0; count < comments.length; count += 1) {
          if (comments[count].id === commentId) {
            comments[count].comments.unshift(replyInstance);
            break;
          }
        }
        this.setState({
          comments,
          newReply: incomingReply,
        });
      }
    }
  }

  handleSubmitComment = (event) => {
    event.preventDefault();
    const { thisComment, slug } = this.state;
    const { createComment } = this.props;
    createComment(slug, thisComment);
    this.setState({
      thisComment: '',
    });
  }

  dispatchEditComment = (event) => {
    event.preventDefault();
    const { slug } = this.state;
    if (event.target.name) {
      const splitId = (event.target.name).split('-');
      const thisId = parseInt(splitId[1], 10);
      const payload = {
        slug,
        id: thisId,
      };
      store.dispatch({ type: EDIT_COMMENT, payload });
    }
  };

  dispatchDeleteComment = (event) => {
    event.preventDefault();
    const { slug } = this.state;
    const splitId = (event.target.name).split('-');
    const thisId = parseInt(splitId[1], 10);
    const payload = {
      slug,
      id: thisId,
    };
    store.dispatch({ type: DELETE_COMMENT, payload });
  };

  handleSubmitReply = (event) => {
    event.preventDefault();
    const { state } = this;
    const { slug } = state;
    const { createReply } = this.props;
    const commentId = event.target.name;
    const theReply = state[commentId];
    createReply(slug, commentId, theReply);
    this.setState({
      [event.target.name]: '',
      replyId: event.target.name,
    });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    const { comments, thisComment } = this.state;
    const { state } = this;
    const { isLoggedIn } = this.props;
    let username = false;

    if (isLoggedIn) {
      username = localStorage.getItem('username');
    }

    return (
      <div className="row my-comments">
        <div className="col-md-10 offset-md-1">
          {/* Add review section */}
          <br />
          <br />
          <hr />
          <h2>Comments</h2>
          <br />
          <div className="card">
            <br />
            <div className="row">
              <br />
              <div className="col-sm-12">
                <form>
                  <div className="form-row">
                    <div className="col-md-1">
                      &nbsp;
                    </div>
                    <div className="col-md-8">
                      <Input
                        className="form-control mb-4"
                        placeholder="Leave a comment..."
                        id="thisComment"
                        value={thisComment}
                        type="textarea"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col-md-3 centered">
                      <button
                        type="submit"
                        onClick={this.handleSubmitComment}
                        className="btn btn-one submitComment"
                      >
                        <FontAwesomeIcon icon="comment-alt" />
                      Comment
                      </button>
                      <br />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {
          (comments.length > 0) ? (
            <div className="accordion" id="commentsAccordion">
              {comments.map(aComment => (
                <div className="card" key={aComment.id}>
                  <div
                    className="card-header comment-color"
                    id={'accordion-'.concat(aComment.id)}
                  >
                    <div className="row">
                      <div className="col-md-2">
                        <img
                          src={aComment.author.image_url}
                          width="60"
                          height="60"
                          className="comment-author"
                          alt="Commentor"
                        />
                        <p
                          className="comment-time"
                        >
                          {moment(aComment.created_at).fromNow()}
                        </p>
                      </div>
                      <div className="col-md-10">
                        <div className="clearfix" />
                        <p className="text-info">
                          <strong>{aComment.author.username}</strong>
                          {
                            (username === aComment.author.username) ? (
                              <div className="float-right">
                                <a
                                  name={'delete-'.concat(aComment.id)}
                                  href={this.dispatchDeleteComment}
                                  onClick={this.dispatchDeleteComment}
                                  className="float-right text-danger the-pointer"
                                >
                                  <FontAwesomeIcon icon="trash-alt" />
                                  Delete
                                </a>
                                <a
                                  name={'edit-'.concat(aComment.id)}
                                  href={this.dispatchEditComment}
                                  onClick={this.dispatchEditComment}
                                  className=" float-right text-info the-pointer"
                                >
                                  <FontAwesomeIcon icon="edit" />
                                  Edit
                                </a>
                              </div>
                            ) : (
                              <div className="float-right" />
                            )
                          }
                        </p>
                        <p>{aComment.body}</p>
                        <br />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <form>
                          <div className="form-row">
                            <div className="col-md-1">
                                  &nbsp;
                            </div>
                            <div className="col-md-8">
                              <Input
                                id={aComment.id}
                                type="textarea"
                                row="4"
                                className="form-control mb-4"
                                value={state[aComment.id]}
                                placeholder="Type your reply here..."
                                onChange={this.handleChange}
                              />
                            </div>
                            <div className="col-md-2 centered">
                              <button
                                type="button"
                                name={aComment.id}
                                onClick={this.handleSubmitReply}
                                className="btn btn-two reply-btn"
                              >
                                <FontAwesomeIcon icon="reply" />
                                Submit
                              </button>
                              <br />
                              <button
                                type="button"
                                className="btn btn-two"
                                data-toggle="collapse"
                                data-target={'#collapse-'.concat(aComment.id)}
                              >
                                <span className="badge badge-light">
                                  {aComment.comments.length}
                                </span>
                                Replies
                              </button>
                              <br />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <hr />
                  </div>
                  <div
                    id={'collapse-'.concat(aComment.id)}
                    className="collapse"
                    aria-labelledby="headingOne"
                    data-parent="#commentsAccordion"
                  >
                    {aComment.comments.map(subComments => (
                      <div className="card-body" key={subComments.id}>
                        <div className="row">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-10 ">
                                <p className="text-info">
                                  <strong>
                                    {subComments.author.username}
                                  </strong>
                                </p>
                                <p>{subComments.body}</p>
                              </div>
                              <div className="col-md-2">
                                <img
                                  src={subComments.author.image_url}
                                  width="50"
                                  height="50"
                                  className="rounded-circle comment-author"
                                  alt="Commentor"
                                />
                                <p className="comment-time">
                                  {moment(aComment.created_at).fromNow()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            }
            </div>
          ) : (
            <span>
              &nbsp;
            </span>
          )
        }
        </div>
      </div>
    );
  }
}
export const mapDispatchToProps = dispatch => ({
  createComment: (slug, comment) => {
    dispatch(createAComment(slug, comment));
  },
  createReply: (slug, pk, data) => {
    dispatch(createAReply(slug, pk, data));
  },
});

export const mapStateToProps = state => ({
  comments: state.getCommentsReducer,
  newComment: state.getCommentsReducer.thisComment,
  isLoggedIn: state.loginUser.loggedIn,
  changedComment: state.getCommentsReducer.changedComment,
  changedCommentData: state.getCommentsReducer.changedCommentData.Comment,
});

Comments.propTypes = {
  data: PropTypes.shape({}),
  isLoggedIn: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  createReply: PropTypes.func.isRequired,
};

Comments.defaultProps = {
  data: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
