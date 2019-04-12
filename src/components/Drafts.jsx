import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import { ToastContainer } from 'react-toastify';

const Drafts = ({ authorArticles }) => {
  const postsPublished = authorArticles.filter(post => post.published === true)
    .map(authorArticle => (
      <div key={authorArticle.id} className="single-article">
        <h3>{authorArticle.title}</h3>
        <span className="description">{authorArticle.description}</span>

        <br />
        <hr />
      </div>
    ));

  const postsDrafts = authorArticles.filter(post => post.published === false).map(authorArticle => (
    <div key={authorArticle.id} className="single-article">
      <h3>{authorArticle.title}</h3>
      <span className="description">{authorArticle.description}</span>

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
  authorArticles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number,
    PropTypes.string, PropTypes.array])),
};
Drafts.defaultProps = {
  authorArticles: [],
};
export default Drafts;
