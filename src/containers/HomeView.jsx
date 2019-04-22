import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { fetchAllArticles } from '../store/actions/articles';

export class HomeView extends Component {
  componentWillMount() {
    const next = `${process.env.REACT_APP_BASE_URL}articles/`;
    const { fetchArticles } = this.props;
    fetchArticles(next);
  }

  render() {
    const { articles } = this.props;
    const items = articles.articles.results;
    return <Home articles={items} />;
  }
}

HomeView.propTypes = {
  fetchArticles: PropTypes.func,
  articles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

HomeView.defaultProps = {
  fetchArticles: () => {},
  articles: [],
};
export const mapStateToProps = (state) => {
  const { articles } = state;
  const { next } = articles.articles;
  return { articles, next };
};
export const mapDispatchToProps = dispatch => ({
  fetchArticles: next => dispatch(fetchAllArticles(next)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeView);
