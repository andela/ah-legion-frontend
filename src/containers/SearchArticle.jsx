import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { Nav, Tab, Col, Row } from 'react-bootstrap';
import { fetchSearchUpdate } from '../store/actions/searchActions';
import {
  SEARCH_UPDATE_AUTHOR,
  SEARCH_UPDATE_TITLE,
  SEARCH_UPDATE_TAGS,
  SEARCH_UPDATE_BODY,
  SEARCH_UPDATE_DESCRIPTION,
} from '../store/actions/actionTypes';

export class SearchArticle extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: SEARCH_UPDATE_AUTHOR,
    };
  }

  loadMoreArticles = () => {
    const { key } = this.state;
    let searchData = {};
    const {
      authorHasNext, titleHasNext, tagsHasNext, bodyHasNext,
      descriptionHasNext, fetchResultsUpdate,
    } = this.props;
    let myURL = null;
    switch (key) {
      case SEARCH_UPDATE_AUTHOR:
        myURL = authorHasNext;
        break;
      case SEARCH_UPDATE_TITLE:
        myURL = titleHasNext;
        break;
      case SEARCH_UPDATE_TAGS:
        myURL = tagsHasNext;
        break;
      case SEARCH_UPDATE_BODY:
        myURL = bodyHasNext;
        break;
      case SEARCH_UPDATE_DESCRIPTION:
        myURL = descriptionHasNext;
        break;
      default:
        myURL = null;
    }
    if (myURL) {
      searchData = {
        searchURL: myURL,
        action: key,
      };
      fetchResultsUpdate(searchData);
    }
  };

  selectedTab = (selectedKey) => {
    this.setState({ key: selectedKey });
  };

  render() {
    const { key } = this.state;
    const loader = <div className="loader">Loading ...</div>;
    const {
      authorSearchResults, titleSearchResults, tagsSearchResults,
      bodySearchResults, descriptionSearchResults, authorCount,
      titleCount, tagsCount, bodyCount, descriptionCount,
      authorHasNext, titleHasNext, tagsHasNext, bodyHasNext,
      descriptionHasNext,
    } = this.props;
    return (
      <Tab.Container
        id="left-tabs-example"
        activeKey={key}
        onSelect={this.selectedTab}
      >
        <Row>
          <Col sm={2}>
            <div className="position-fixed">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey={SEARCH_UPDATE_AUTHOR}>{`Author (${authorCount})`}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={SEARCH_UPDATE_TITLE}>{`Title (${titleCount})`}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={SEARCH_UPDATE_TAGS}>{`Tags (${tagsCount})`}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={SEARCH_UPDATE_BODY}>{`Body (${bodyCount})`}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={SEARCH_UPDATE_DESCRIPTION}>{`Description (${descriptionCount})`}</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>
          <Col sm={9} className="auth">
            <Tab.Content>
              <Tab.Pane eventKey={SEARCH_UPDATE_AUTHOR}>
                <h2 className="line-spacing">Search Results (Author)</h2>
                <hr />
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.loadMoreArticles}
                  hasMore={authorHasNext}
                  loader={loader}
                >
                  <div className="tracks">
                    {
                    authorSearchResults.map(item => (
                      <div key={item} className="search_results">
                        <h3>
                          <Link
                            to={'/article/'.concat(item.slug)}
                            href={'/article/'.concat(item.slug)}
                            className="title-link"
                          >
                            {item.title}
                          </Link>
                        </h3>
                        {ReactHtmlParser((item.body.substring(0, 150)).concat('....'))}
                        <hr />
                      </div>
                    ))
                    }
                  </div>
                </InfiniteScroll>
              </Tab.Pane>
              <Tab.Pane eventKey={SEARCH_UPDATE_TITLE}>
                <h2 className="line-spacing">Search Results (Title)</h2>
                <hr />
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.loadMoreArticles}
                  hasMore={titleHasNext}
                  loader={loader}
                >
                  <div className="tracks">
                    {
                    titleSearchResults.map(item => (
                      <div key={item} className="search_results">
                        <h3>
                          <Link
                            to={'/article/'.concat(item.slug)}
                            href={'/article/'.concat(item.slug)}
                            className="title-link"
                          >
                            {item.title}
                          </Link>
                        </h3>
                        {ReactHtmlParser((item.body.substring(0, 150)).concat('....'))}
                        <hr />
                      </div>
                    ))
                    }
                  </div>
                </InfiniteScroll>
              </Tab.Pane>
              <Tab.Pane eventKey={SEARCH_UPDATE_TAGS}>
                <h2 className="line-spacing">Search Results (Tags)</h2>
                <hr />
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.loadMoreArticles}
                  hasMore={tagsHasNext}
                  loader={loader}
                >
                  <div className="tracks">
                    {
                    tagsSearchResults.map(item => (
                      <div key={item} className="search_results">
                        <h3>
                          <Link
                            to={'/article/'.concat(item.slug)}
                            href={'/article/'.concat(item.slug)}
                            className="title-link"
                          >
                            {item.title}
                          </Link>
                        </h3>
                        {ReactHtmlParser((item.body.substring(0, 150)).concat('....'))}
                        <hr />
                      </div>
                    ))
                    }
                  </div>
                </InfiniteScroll>
              </Tab.Pane>
              <Tab.Pane eventKey={SEARCH_UPDATE_BODY}>
                <h2 className="line-spacing">Search Results (Body)</h2>
                <hr />
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.loadMoreArticles}
                  hasMore={bodyHasNext}
                  loader={loader}
                >
                  <div className="tracks">
                    {
                    bodySearchResults.map(item => (
                      <div key={item} className="search_results">
                        <h3>
                          <Link
                            to={'/article/'.concat(item.slug)}
                            href={'/article/'.concat(item.slug)}
                            className="title-link"
                          >
                            {item.title}
                          </Link>
                        </h3>
                        {ReactHtmlParser((item.body.substring(0, 150)).concat('....'))}
                        <hr />
                      </div>
                    ))
                    }
                  </div>
                </InfiniteScroll>
              </Tab.Pane>
              <Tab.Pane eventKey={SEARCH_UPDATE_DESCRIPTION}>
                <h2 className="line-spacing">Search Results (Description)</h2>
                <hr />
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.loadMoreArticles}
                  hasMore={descriptionHasNext}
                  loader={loader}
                >
                  <div className="tracks">
                    {
                    descriptionSearchResults.map(item => (
                      <div key={item} className="search_results">
                        <h3>
                          <Link
                            to={'/article/'.concat(item.slug)}
                            href={'/article/'.concat(item.slug)}
                            className="title-link"
                          >
                            {item.title}
                          </Link>
                        </h3>
                        {ReactHtmlParser((item.body.substring(0, 150)).concat('....'))}
                        <hr />
                      </div>
                    ))
                    }
                  </div>
                </InfiniteScroll>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

SearchArticle.propTypes = {
  match: PropTypes.shape({}).isRequired,
  authorSearchResults: PropTypes.shape([]).isRequired,
  titleSearchResults: PropTypes.shape([]).isRequired,
  tagsSearchResults: PropTypes.shape([]).isRequired,
  bodySearchResults: PropTypes.shape([]).isRequired,
  descriptionSearchResults: PropTypes.shape([]).isRequired,
  authorCount: PropTypes.number.isRequired,
  titleCount: PropTypes.number.isRequired,
  tagsCount: PropTypes.number.isRequired,
  bodyCount: PropTypes.number.isRequired,
  descriptionCount: PropTypes.number.isRequired,
  authorHasNext: PropTypes.bool.isRequired,
  titleHasNext: PropTypes.bool.isRequired,
  tagsHasNext: PropTypes.bool.isRequired,
  bodyHasNext: PropTypes.bool.isRequired,
  descriptionHasNext: PropTypes.bool.isRequired,
  fetchResultsUpdate: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  authorSearchResults: state.searchState.authorSearchResults,
  titleSearchResults: state.searchState.titleSearchResults,
  tagsSearchResults: state.searchState.tagsSearchResults,
  bodySearchResults: state.searchState.bodySearchResults,
  descriptionSearchResults: state.searchState.descriptionSearchResults,
  authorCount: state.searchState.authorCount,
  titleCount: state.searchState.titleCount,
  tagsCount: state.searchState.tagsCount,
  bodyCount: state.searchState.bodyCount,
  descriptionCount: state.searchState.descriptionCount,
  authorHasNext: state.searchState.authorHasNext,
  titleHasNext: state.searchState.titleHasNext,
  tagsHasNext: state.searchState.tagsHasNext,
  bodyHasNext: state.searchState.bodyHasNext,
  descriptionHasNext: state.searchState.descriptionHasNext,
});

export const mapDispatchToProps = dispatch => ({
  fetchResultsUpdate: (searchData) => {
    dispatch(fetchSearchUpdate(searchData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchArticle);
