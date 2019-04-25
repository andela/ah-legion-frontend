import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Card, Spinner,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { IS_LOADING } from '../store/actions/actionTypes';
import store from '../store/store';
import AllArticles from './AllArticles';
import ArticlesByCriteria from './ArticlesByCriteria';
import { fetchAllArticles } from '../store/actions/articles';

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMoreItems: true,
    };
  }

  loadMore = () => {
    const { next, previous, count } = this.props;
    if (count <= 10) {
      this.setState({
        hasMoreItems: false,
      });
    }
    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        if (this.state.hasMoreItems) {
          store.dispatch(fetchAllArticles(next));
          store.dispatch({ type: IS_LOADING, payload: true });
        }
      }
      if (next === null && previous) {
        this.setState({
          hasMoreItems: false,
        });
      }
    };
  };

  render() {
    const { articles } = this.props;
    const { results } = articles;
    const { hasMoreItems } = this.state;
    const loader = <Spinner className="loader" key="loader" animation="grow" variant="secondary" />;
    return (
      <Container>
        <Row>
          <Col xs={3}>
            <ArticlesByCriteria articles={results} start={0} end={1} />
          </Col>

          <Col xs={{ offset: 1 }}>
            <Row>
              <Col>
                <div className="home-view">
                  <ArticlesByCriteria articles={results} start={2} end={3} />
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="home-view">
                  <ArticlesByCriteria articles={results} start={1} end={2} />
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="home-view">
                  <ArticlesByCriteria articles={results} start={2} end={3} />
                </div>
              </Col>
            </Row>
          </Col>

          <Col xs={3}>
            <ArticlesByCriteria articles={results} start={0} end={1} />
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
            <InfiniteScroll
              key="infiniteScroller"
              pageStart={0}
              loadMore={this.loadMore}
              hasMore={hasMoreItems}
              loader={loader}
            >
              <AllArticles className="all-articles" articles={results} />
            </InfiniteScroll>
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
  }
}
Home.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  ),
  next: PropTypes.string.isRequired,
  previous: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

Home.defaultProps = {
  articles: [],
};

export const mapStateToProps = (state) => {
  const { articles } = state;
  const { next, previous, count } = articles.articles;
  return {
    articles,
    next,
    previous,
    count,
  };
};

export default connect(mapStateToProps)(Home);
