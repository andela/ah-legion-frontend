import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllArticlesByAuthor } from '../store/actions/articles';
import Drafts from '../components/Drafts';

export class DraftsView extends Component {
  componentWillMount() {
    const { fetch } = this.props;
    fetch();
  }

  render() {
    const { authorArticles } = this.props;
    return <Drafts authorArticles={authorArticles.authorArticles} />;
  }
}

export const mapStateToProps = (state) => {
  const { authorArticles } = state;
  return { authorArticles };
};

export const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(fetchAllArticlesByAuthor()),
});
DraftsView.propTypes = {
  fetch: PropTypes.func,
  authorArticles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number,
    PropTypes.string, PropTypes.array])),
};

DraftsView.defaultProps = {
  fetch: () => {},
  authorArticles: [],
};

export default connect(
  mapStateToProps,
  fetchAllArticlesByAuthor(),
)(DraftsView);
