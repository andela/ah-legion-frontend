import React from 'react';
import PropTypes from 'prop-types';
import unixTimeToDate from '../utils/dateFormatter';
import extractImageFromBody from '../utils/imageExtractor';

class AllArticles extends React.Component {
  removeDuplicates = (articles) => {
    const filteredList = [...new Set(articles)];
    return filteredList;
  };

  render() {
    const { articles } = this.props;
    const properList = this.removeDuplicates(articles);
    return (properList ? (
      properList.map(article => (
        <div key={article.id}>

          <div className="home-view-last">
            <img
              src={extractImageFromBody(article.body)}
              alt=""
            />

            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <h3><a href="#" className="title-link">{article.title}</a></h3>

            <span className="description">{article.description}</span>
            <br />
            <span className="author">{article.author.username}</span>
            <br />
            <span className="meta">
              {unixTimeToDate(article.created_at)}
  &nbsp;.&nbsp;
              {article.reading_time}
  &nbsp;read
            </span>
          </div>
        </div>
      ))) : (
        <div className="loading-articles">Loading...</div>
    ));
  }
}

AllArticles.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])),
};

AllArticles.defaultProps = {
  articles: [],
};
export default AllArticles;
