import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArticleMapComponent from './articlesMap';
import fetchPersonalArticles from '../../store/actions/articleActions';

export class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    const { fetchPersonalUserArticles } = this.props;
    fetchPersonalUserArticles();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      articles: newProps.personalArticles.personalArticles.Articles,
    });
  }

  render() {
    const { articles } = this.state;
    return (
      <ArticleMapComponent articles={articles} />
    );
  }
}

Articles.propTypes = {
  fetchPersonalUserArticles: PropTypes.func,
};

Articles.defaultProps = {
  fetchPersonalUserArticles: () => {},
};


const mapStateToProps = state => ({
  personalArticles: state.personalArticles,
});

const mapDispatchToProps = dispatch => ({
  fetchPersonalUserArticles: () => {
    dispatch(fetchPersonalArticles());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
