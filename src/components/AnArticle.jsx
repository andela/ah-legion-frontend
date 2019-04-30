import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactHtmlParser from 'react-html-parser';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import store from '../store/store';
import { REPORT_ARTICLE } from '../store/actions/actionTypes';

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


class AnArticle extends Component {
  dispatchReportArticle = (event) => {
    event.preventDefault();
    const { data } = this.props;
    const { article } = data;
    const { slug } = article;
    if (event.target.name) {
      store.dispatch({ type: REPORT_ARTICLE, slug });
    }
  };

  render() {
    const { data } = this.props;
    const { article } = data;
    return (
      <div className="row">
        <div className="col line-spacing">
          <h2 className="line-spacing">{article.title}</h2>
          <div className="profile line-spacing">
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
                <span className="profile-author-name line-spacing">
                  {article.author.username}
                </span>
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
          <div className="row single-article">
            <div>{ReactHtmlParser(article.body)}</div>
          </div>
          <div>
            {article.tagList.map(item => <span key={item} className="article-tags">{item}</span>)}
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={(
                <Popover
                  id="popover-positioned-bottom"
                >
                  <a
                    name="reportArticle"
                    className="report-article"
                    href={this.dispatchReportArticle}
                    onClick={this.dispatchReportArticle}
                  >
                    Report this article.
                  </a>
                </Popover>
              )}
            >
              <i className="fas fa-ellipsis-h" />
            </OverlayTrigger>
          </div>
        </div>
      </div>
    );
  }
}
AnArticle.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default AnArticle;
