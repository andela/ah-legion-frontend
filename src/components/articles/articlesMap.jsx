import React from 'react';
import { Row } from 'reactstrap';
import smartTruncate from 'smart-truncate';
import PropTypes from 'prop-types';

export default function ArticlesMapComponent(props) {
  const { articles } = props;
  const articleItems = articles.length > 0 ? (
    articles.map(article => (
      <div className="article-card" key={article.id}>
        <div className="color-overlay">
          <div className="article-content">
            <div className="article-header">
              <h3 className="article-title">{article.title}</h3>
            </div>
            <p className="article-desc">{smartTruncate(article.body, 100)}</p>
            <button type="submit" className="read-more-button">Read more</button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>
      <strong className="container">
              You have not written any articles. Write your first Article here
      </strong>
    </p>
  );
  return (
    <div className="article-list">
      <Row className="article-items">{articleItems}</Row>
    </div>
  );
}

ArticlesMapComponent.propTypes = {
  articles: PropTypes.shape.isRequired,
};
