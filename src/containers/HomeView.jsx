import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { fetchAllArticles } from '../store/actions/articles';

export class HomeView extends Component {
  componentDidMount() {
    fetchAllArticles();
  }

  render() {
    const { articles } = this.props;
    const items = articles.articles.results;
    return <Home articles={items} />;
  }
}

HomeView.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number,
    PropTypes.string, PropTypes.array])),

};

HomeView.defaultProps = {
  articles: [],
};
export const mapStateToProps = (state) => {
  const { articles } = state;
  return { articles };
};
export const mapDispatchToProps = dispatch => ({
  fetchAllArticles: () => dispatch(fetchAllArticles()),
});
export default connect(
  mapStateToProps,
  fetchAllArticles(),
)(HomeView);
