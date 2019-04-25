import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardText,
  CardFooter,
  Col,
  Row,
} from 'reactstrap';
import { fetchAuthorProfile } from '../../store/actions/profileActions';
import FollowUnfollow from './FollowUnfollow';
import UserStats from './UserStats';


export class AuthorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorProfile: {},
    };
  }

  componentDidMount = () => {
    const { match, getAuthorProfile } = this.props;
    const { params } = match;
    const { username } = params;
    getAuthorProfile(username);
  }

  componentWillReceiveProps = (newProps) => {
    const { authorProfile } = newProps;
    this.setState({
      authorProfile,
    });
  }

  render() {
    const { authorProfile } = this.state;
    const { bio, username } = authorProfile;
    const imageUrl = authorProfile.image_url;
    return (
      <div className="content">
        <Row>
          <Col md="6">
            <Card className="profile-card-user">
              <div className="profile-card-user-items">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="card-photo">
                      <img
                        alt="..."
                        className="avatar"
                        src={imageUrl}
                      />
                    </div>
                    <h5 className="title">{username}</h5>
                    <FollowUnfollow profile={authorProfile} />
                  </div>
                  <div className="card-description">{bio}</div>
                </CardBody>
                <CardFooter className="card-footer">
                  <hr />
                  <UserStats
                    articlesNum={20}
                    followersNum={3}
                    followingNum={2}
                  />
                  <hr />
                  <p>
                    <strong className="container">Articles Written</strong>
                  </p>
                  Articles belonging to this user goes here
                </CardFooter>
              </div>
            </Card>
          </Col>
          <Col>
            Other articles goes here
          </Col>

        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authorProfile: state.profile.authorProfile.profile,
  authorArticles: state.articles.authorArticles,
});

export const mapDispatchToProps = dispatch => ({
  getAuthorProfile: (username) => {
    dispatch(fetchAuthorProfile(username));
  },
});

AuthorProfile.propTypes = {
  match: PropTypes.shape,
  getAuthorProfile: PropTypes.func,
};

AuthorProfile.defaultProps = {
  match: {},
  getAuthorProfile: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorProfile);
