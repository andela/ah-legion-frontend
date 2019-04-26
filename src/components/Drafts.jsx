import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import { ToastContainer } from 'react-toastify';

const Drafts = ({ authorArticles, onDelete }) => {
  const postsPublished = authorArticles.filter(post => post.published === true)
    .map(authorArticle => (
      <div key={authorArticle.id} className="single-article">
        <h3><Link to={`/article/${authorArticle.slug}/edit`} className="title-link">{authorArticle.title}</Link></h3>
        <span className="description">{authorArticle.description}</span>
        <button
          className="delete"
          type="button"
          onClick={() => { onDelete(authorArticle.slug); }}
        >
delete
        </button>
        <span className="description">{authorArticle.body}</span>

        <br />
        <hr />
      </div>
    ));

  const postsDrafts = authorArticles.filter(post => post.published === false).map(authorArticle => (
    <div key={authorArticle.id} className="single-article">
      <h3>{authorArticle.title}</h3>
      <span className="description">{authorArticle.description}</span>
      <button
        className="delete"
        type="button"
        onClick={() => { onDelete(authorArticle.slug); }}
      >
delete
      </button>

      <br />
      <hr />
    </div>
  ));

  return (
    <Container>
      <Row>
        <Col>
          <div className="wrapper">
            <ToastContainer />
            <Tabs defaultActiveKey="drafts" id="tabs">
              <Tab label="Drafts">
                <br />
                <br />
                {postsDrafts}
              </Tab>

              <Tab label="Published">
                <br />
                <br />
                {postsPublished}
              </Tab>
            </Tabs>

          </div>

        </Col>
      </Row>
    </Container>
  );
};
Drafts.propTypes = {
  onDelete: PropTypes.func,
  authorArticles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number,
    PropTypes.string, PropTypes.array])),
};
Drafts.defaultProps = {
  onDelete: () => {},
  authorArticles: [],
};
export default Drafts;
