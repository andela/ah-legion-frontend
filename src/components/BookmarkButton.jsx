import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bookmarkArticle } from '../store/actions/bookmarkActions';

export class ConnectedBookmarkButton extends React.Component {
  handleClick = () => {
    const { article, BookmarkArticle } = this.props;
    const isArticleBookmarked = this.isArticleBookmarked();
    const method = isArticleBookmarked ? 'delete' : 'post';
    const payload = { method, article };
    BookmarkArticle(payload);
  };

  isArticleBookmarked = () => {
    const { article, bookmarks } = this.props;
    const index = bookmarks.findIndex(containedArticle => containedArticle.id === article.id);
    let isArticleBookmarked = false;
    if (index === -1) {
      isArticleBookmarked = false;
    } else {
      isArticleBookmarked = true;
    }
    return isArticleBookmarked;
  }

  render() {
    const { isLoggedIn } = this.props;
    const isArticleBookmarked = this.isArticleBookmarked();
    return (<span className={isLoggedIn ? 'bookmark' : 'hidden'} onClick={this.handleClick} onKeyPress={this.handleClick} role="button" tabIndex={0}><i className={`fa${isArticleBookmarked ? 's' : 'r'} fa-bookmark`} /></span>);
  }
}

ConnectedBookmarkButton.propTypes = {
  BookmarkArticle: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  article: PropTypes.shape({}).isRequired,
  bookmarks: PropTypes.arrayOf({}).isRequired,
};

export const mapStateToProps = state => ({
  isLoggedIn: state.loginUser.loggedIn,
  ...state.bookmarkState,
});

export function mapDispatchToProps(dispatch) {
  return {
    BookmarkArticle: payload => dispatch(bookmarkArticle(payload)),
  };
}

const BookmarkButton = connect(mapStateToProps, mapDispatchToProps)(ConnectedBookmarkButton);
export default BookmarkButton;
