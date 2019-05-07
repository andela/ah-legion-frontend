import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import store from '../store/store';
import AnArticle from '../components/AnArticle';
import Comments from '../components/Comments';
import { LOGIN, REMOVE_REACTION } from '../store/actions/actionTypes';
import { fetchAnArticle, fetchArticleComments } from '../store/actions/commentsActions';
import {
  fetchAllLikes,
  fetchUserLikeStatus,
  createLike,
  updateLike,
  deleteLike,
} from '../store/actions/likeArticleActions';

export class GetAnArticle extends Component {
  componentDidMount() {
    const { fetchTheArticle, fetchTheArticleComments, match } = this.props;
    const { slug } = match.params;
    store.dispatch({ type: REMOVE_REACTION });
    fetchTheArticle(slug);
    fetchTheArticleComments(slug);
  }

  handleLikeClicked = (changeLike) => {
    const {
      hasLiked,
      likeState,
      likeID, match,
      dispatchCreateLike,
      dispatchUpdateLike,
      dispatchDeleteLike,
    } = this.props;
    const { slug } = match.params;
    if ((hasLiked) && (changeLike)) {
      const likeData = {
        is_like: true,
      };
      dispatchUpdateLike(slug, likeID, likeData);
      return true;
    }
    if ((hasLiked) && (likeState)) {
      dispatchDeleteLike(slug, likeID);
      return true;
    }
    if (hasLiked === false) {
      const likeData = {
        is_like: true,
      };
      dispatchCreateLike(slug, likeData);
      return true;
    }
    return false;
  }

  handleDislikeClicked = (changeLike) => {
    const {
      hasLiked,
      likeState,
      likeID, match,
      dispatchCreateLike,
      dispatchUpdateLike,
      dispatchDeleteLike,
    } = this.props;
    const { slug } = match.params;
    if ((hasLiked) && (changeLike)) {
      const likeData = {
        is_like: false,
      };
      dispatchUpdateLike(slug, likeID, likeData);
      return true;
    }
    if (hasLiked === false) {
      const likeData = {
        is_like: false,
      };
      dispatchCreateLike(slug, likeData);
      return true;
    }
    if ((hasLiked) && (likeState === false)) {
      dispatchDeleteLike(slug, likeID);
      return true;
    }
    return false;
  }

  handleLiking = (event) => {
    event.preventDefault();
    const { id } = event.target;
    const buttonClicked = id;
    const LIKE_BUTTON = 'likeButton';
    const UNLIKE_BUTTON = 'unlikeButton';
    const {
      hasLiked,
      likeState,
      isLoggedIn,
    } = this.props;

    if (isLoggedIn === false) {
      store.dispatch({ type: LOGIN });
    }
    if ((UNLIKE_BUTTON === buttonClicked) && (isLoggedIn)) {
      if ((hasLiked) && (likeState)) {
        this.handleDislikeClicked(true);
      } else {
        this.handleDislikeClicked(false);
      }
    }
    if ((LIKE_BUTTON === buttonClicked) && (isLoggedIn)) {
      if ((hasLiked) && (likeState === false)) {
        this.handleLikeClicked(true);
      } else {
        this.handleLikeClicked(false);
      }
    }
  }

  render() {
    const {
      isFetchingArticle,
      isFetchingComments,
      errors, isLoggedIn,
      article, comments,
      hasLiked, likeState,
      totalLikes,
      totalDislikes, match,
      getAllLikes, getUserLikeStatus,
    } = this.props;
    let username = false;
    const { slug } = match.params;
    getAllLikes(slug);

    if (isLoggedIn && username === false) {
      username = localStorage.getItem('username');
      getUserLikeStatus(slug);
    }
    if (isFetchingArticle) {
      return (<div className="article-loading">Loading...</div>);
    }
    if (errors) {
      return (<div className="article-errors">Return 404...</div>);
    }
    if (isFetchingComments) {
      return (<div className="comments-loading">Loading...</div>);
    }

    return (
      <div className="main-container an-article">
        <ToastContainer />
        <div className="row">
          <div className="col-md-2">
            <div className="the-sidebar position-fixed">
              <div className="sidebar-content">
                <a
                  href={this.handleLiking}
                  onClick={this.handleLiking}
                  className="like-link"
                  id="likeButton"
                >
                  <i
                    id="likeButton"
                    className={((hasLiked) && (isLoggedIn) && (likeState)) ? (
                      'fas fa-thumbs-up fa-2x'
                    ) : (
                      'far fa-thumbs-up fa-2x'
                    )
                    }
                  />
                  <i
                    id="likeButton"
                    className="like-content"
                  >
                    {totalLikes}
                  </i>
                </a>
                <a
                  href={this.handleLiking}
                  onClick={this.handleLiking}
                  className="like-link"
                  id="unlikeButton"
                >
                  <i
                    id="unlikeButton"
                    className={((hasLiked) && (isLoggedIn) && (likeState === false)) ? (
                      'fas fa-thumbs-down fa-2x'
                    ) : (
                      'far fa-thumbs-down fa-2x'
                    )
                    }
                  />
                  <i
                    id="unlikeButton"
                    className="like-content"
                  >
                    {totalDislikes}
                  </i>
                </a>
              </div>
            </div>
          </div>
          <div className="auth col-md-10">
            <div className="article-div">
              <AnArticle data={article} />
            </div>
            <div>
              <Comments data={comments} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GetAnArticle.propTypes = {
  isFetchingArticle: PropTypes.bool.isRequired,
  isFetchingComments: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  article: PropTypes.shape({}),
  match: PropTypes.shape({}).isRequired,
  errors: PropTypes.string,
  comments: PropTypes.shape({}),
  fetchTheArticle: PropTypes.func,
  fetchTheArticleComments: PropTypes.func,
  hasLiked: PropTypes.bool.isRequired,
  likeState: PropTypes.bool.isRequired,
  likeID: PropTypes.number.isRequired,
  totalLikes: PropTypes.number.isRequired,
  totalDislikes: PropTypes.number.isRequired,
  getAllLikes: PropTypes.func,
  getUserLikeStatus: PropTypes.func,
  dispatchCreateLike: PropTypes.func,
  dispatchUpdateLike: PropTypes.func,
  dispatchDeleteLike: PropTypes.func,
};

GetAnArticle.defaultProps = {
  article: {},
  errors: null,
  comments: [],
  fetchTheArticle: () => {},
  fetchTheArticleComments: () => {},
  getAllLikes: () => {},
  getUserLikeStatus: () => {},
  dispatchCreateLike: () => {},
  dispatchUpdateLike: () => {},
  dispatchDeleteLike: () => {},
};

export const mapStateToProps = state => ({
  article: state.getCommentsReducer,
  comments: state.getCommentsReducer,
  isLoggedIn: state.loginUser.loggedIn,
  errors: state.getCommentsReducer.errors,
  author: state.getCommentsReducer.author,
  isFetchingArticle: state.getCommentsReducer.isFetchingArticle,
  isFetchingComments: state.getCommentsReducer.isFetchingComments,
  hasLiked: state.likeArticleState.hasLiked,
  likeState: state.likeArticleState.likeState,
  likeID: state.likeArticleState.likeID,
  totalLikes: state.likeArticleState.totalLikes,
  totalDislikes: state.likeArticleState.totalDislikes,
});

export const mapDispatchToProps = dispatch => ({
  fetchTheArticle: (slug) => {
    dispatch(fetchAnArticle(slug));
  },
  fetchTheArticleComments: (slug) => {
    dispatch(fetchArticleComments(slug));
  },
  getAllLikes: (slug) => {
    dispatch(fetchAllLikes(slug));
  },
  getUserLikeStatus: (slug) => {
    dispatch(fetchUserLikeStatus(slug));
  },
  dispatchCreateLike: (slug, likeData) => {
    dispatch(createLike(slug, likeData));
  },
  dispatchUpdateLike: (slug, pk, likeData) => {
    dispatch(updateLike(slug, pk, likeData));
  },
  dispatchDeleteLike: (slug, pk) => {
    dispatch(deleteLike(slug, pk));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GetAnArticle);
