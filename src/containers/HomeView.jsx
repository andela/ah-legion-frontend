import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { fetchAllArticles } from '../store/actions/articles';

export class HomeView extends Component {
  componentDidMount() {
    const { fetchArticles } = this.props;
    fetchArticles();
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
  return { articles };
};
export const mapDispatchToProps = dispatch => ({
  fetchArticles: () => dispatch(fetchAllArticles()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeView);
