import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllArticles } from '../store/actions/articles';
import AllArticles from '../components/Articles';

class Articles extends Component {
  componentWillMount() {
    const { articles } = this.props.articles;
    const { fetchAllArticles } = this.props.fetchAllArticles();
  }

  render() {
    return (
     <AllArticles articles={this.props.articles.articles} />

    );
  }
}

const mapStateToProps = state => ({ articles: state.articles });
const mapDispatchToProps = dispatch => ({
  fetchAllArticles: articles => dispatch(fetchAllArticles()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Articles);
