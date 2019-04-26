import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactHtmlParser from 'react-html-parser';

const ratings = (aRating) => {
  const stars = [];
  const aStar = (<FontAwesomeIcon icon="star" />);
  const payload = { star: aStar, key: '' };
  let counter = 0;
  while (counter < aRating) {
    payload.key = counter;
    stars.push(payload);
    counter += 1;
  }
  return (
    <p>
      {stars.map(item => <span className="text-warning" key={counter.key}>{item.star}</span>)}
    </p>
  );
};

const currentDate = (date) => {
  const thisDate = new Date(date);
  return thisDate.toDateString(date);
};


const AnArticle = (props) => {
  const { data } = props;
  const { article } = data;
  return (
    <div className="row">
      <div className="col">
        <h2>{article.title}</h2>
        <br />
        <div className="profile">
          <div className="row">
            <div className="col-md-1 centered">
              <img
                className="same-line"
                src={article.author.image_url}
                height="50"
                alt="The Author"
              />
            </div>
            <div className="col-md-7">
              <span className="profile-author-name">
                {article.author.username}
              </span>
              <br />
              <span className="read-time">
                {
                  currentDate(article.updated_at)
                }
                &nbsp; . &nbsp;
                {article.reading_time}
                &nbsp;read
              </span>
              {
                ratings(parseInt(article.average_rating, 10))
              }
            </div>
          </div>
        </div>
        <br />
        <div className="row single-article">
          <div>{ReactHtmlParser(article.body)}</div>
        </div>
        <div>
          {article.tagList.map(item => <span key={item} className="article-tags">{item}</span>)}
        </div>
      </div>
    </div>
  );
};
AnArticle.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default AnArticle;
