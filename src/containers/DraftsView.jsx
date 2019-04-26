import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllArticlesByAuthor, deleteAnArticle } from '../store/actions/articles';
import Drafts from '../components/Drafts';

export class DraftsView extends Component {
  componentWillMount() {
    const { fetchArticlesByAuthor } = this.props;
    fetchArticlesByAuthor();
  }

onDelete = (slug) => {
  const { deleteArticle } = this.props;
  deleteArticle(slug);
}

render() {
  const { authorArticles } = this.props;
  return <Drafts authorArticles={authorArticles.authorArticles} onDelete={this.onDelete} />;
}
}

export const mapStateToProps = (state) => {
  const { authorArticles, deletedArticle } = state;
  return { authorArticles, deletedArticle };
};
export const mapDispatchToProps = dispatch => ({
  fetchArticlesByAuthor: () => dispatch(fetchAllArticlesByAuthor()),
  deleteArticle: slug => dispatch(deleteAnArticle(slug)),
});

DraftsView.propTypes = {
  fetchArticlesByAuthor: PropTypes.func,
  deleteArticle: PropTypes.func,
  authorArticles: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.array, PropTypes.object, PropTypes.number, PropTypes.string],
  )),
};

DraftsView.defaultProps = {
  deleteArticle: () => {},
  fetchArticlesByAuthor: () => {},
  authorArticles: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DraftsView);
