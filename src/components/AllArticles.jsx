import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import unixTimeToDate from '../utils/dateFormatter';
import extractImageFromBody from '../utils/imageExtractor';
import BookmarkButton from './BookmarkButton';

const AllArticles = ({ articles }) => (articles ? (
  articles.map(article => (
    <div key={article.id}>

      <div className="home-view-last">
        <img
          src={extractImageFromBody(article.body)}
          alt=""
        />

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <h3><Link a href="#" className="title-link">{article.title}</Link></h3>

        <span className="description">{article.description}</span>
        <br />
        <span className="author">{article.author.username}</span>
        <br />
        <span className="preview-footer">
          <span className="meta">
            {unixTimeToDate(article.created_at)}
            &nbsp;.&nbsp;
            {article.reading_time}
          &nbsp;read&nbsp;
          </span>
          <BookmarkButton article={article} />
        </span>
      </div>
    </div>
  ))
) : (
  <div>Loading...</div>
));

AllArticles.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])),
};

AllArticles.defaultProps = {
  articles: [],
};
export default AllArticles;
