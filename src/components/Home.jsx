import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import AllArticles from './AllArticles';
import ArticlesByCriteria from './ArticlesByCriteria';

const Home = ({ articles }) => (
  <Container>
    <Row>
      <Col xs={3}>
        <ArticlesByCriteria articles={articles} start={0} end={1} />
      </Col>

      <Col xs={{ offset: 1 }}>
        <Row>
          <Col>
            <div className="home-view">
              <ArticlesByCriteria articles={articles} start={2} end={3} />
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="home-view">
              <ArticlesByCriteria articles={articles} start={1} end={2} />
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="home-view">
              <ArticlesByCriteria articles={articles} start={2} end={3} />
            </div>
          </Col>
        </Row>
      </Col>

      <Col xs={3}>
        <ArticlesByCriteria articles={articles} start={0} end={1} />
      </Col>
    </Row>

    {/* Start Second Section */}
    <Row>
      <Col>
        <Card className="welcome-card">
          <Card.Body>
            <Row>
              <Col>
                <h2>Welcome to Author&apos;s Haven</h2>
                <br />
                <span className="author">
                    We are community of like minded authors to foster
                    inspiration and innovation by leveraging the modern web.
                    Whatever your interest, you can always find fresh thinking
                    and unique perspectives.
                </span>
                <br />
              </Col>
              <Col xs={3}>
                <img
                  src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80"
                  alt=""
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    {/* End Second Section */}

    <Row>
      <Col>
        <AllArticles articles={articles} />
      </Col>
      <Col xs={{ span: 3, offset: 1 }}>
        <Row>
          <Col>
            <h3>Popular on Author&apos;s Haven</h3>
            <hr />
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
);
Home.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number,
    PropTypes.string, PropTypes.array])),
};

Home.defaultProps = {
  articles: [],
};
export default Home;
