import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

function UserStats(props) {
  const { articlesNum, followersNum, followingNum } = props;
  return (
    <div className="stats-container">
      <Row>
        <Col xs={6} sm={6} md={6} lg={3} className="ml-auto">
          <h5>
            {articlesNum}
            <br />
            <small>Articles</small>
          </h5>
        </Col>
        <Col xs={6} sm={6} md={6} lg={4} className="mr-auto ml-auto">
          <h5>
            {followersNum}
            <br />
            <small>Followers</small>
          </h5>
        </Col>
        <Col lg={3} className="mr-auto">
          <h5>
            {followingNum}
            <br />
            <small>Following</small>
          </h5>
        </Col>
      </Row>
    </div>
  );
}

UserStats.propTypes = {
  followingNum: PropTypes.number.isRequired,
  followersNum: PropTypes.number.isRequired,
  articlesNum: PropTypes.number.isRequired,
};

export default UserStats;
