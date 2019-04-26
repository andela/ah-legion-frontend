/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import UserArticles from '../articles/Articles';
import UserStats from './UserStats';
import AlertComponent from '../Alerts';
import store from '../../store/store';
import { LOGIN } from '../../store/actions/actionTypes';
import {
  fetchProfile,
  updateProfile,
} from '../../store/actions/profileActions';

export class UserProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      bio: '',
      website: '',
      city: '',
      phone: null,
      imageUrl: '',
      country: '',
      image: '',
      showAlert: false,
      alertHeading: '',
      alertBody: '',
      variant: '',
      formErrorFields: [],
    };

    this.onProfileSave = this.onProfileSave.bind(this);
    this.onAlertClick = this.onAlertClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { fetchUserProfile } = this.props;
    fetchUserProfile();
  }

  componentWillReceiveProps(nextProps) {
    const { authenticated, error } = nextProps;
    if (authenticated) {
      if (error) {
        const { formErrorFields } = this.state;
        const errorKeys = Object.keys(nextProps.errors.errors);
        errorKeys.forEach((item) => {
          formErrorFields.push(item);
        });
        if (errorKeys.includes('profile')) {
          const errorProfileFields = Object.keys(nextProps.errors.errors.profile);
          errorProfileFields.forEach((item) => {
            formErrorFields.push(item);
          });
        }
        this.setState({
          formErrorFields,
          showAlert: true,
          variant: 'danger',
          alertBody: 'There was an error updating your profile, kindly check fields in red again',
          alertHeading: 'Error saving profile!',
        });
      } else {
        const { email } = nextProps.profileData.user;
        const {
          username,
          bio,
          website,
          city,
          phone,
          country,
          image,
        } = nextProps.profileData.user.profile;
        const firstName = nextProps.profileData.user.profile.first_name;
        const lastName = nextProps.profileData.user.profile.last_name;
        const imageUrl = nextProps.profileData.user.profile.image_url;
        this.setState({
          username,
          firstName,
          lastName,
          bio,
          website,
          city,
          phone,
          country,
          email,
          image,
          imageUrl,
        });
        if (nextProps.profileUpdated) {
          this.setState({
            showAlert: true,
            variant: 'success',
            alertBody: 'Your profile info is now upto date',
            alertHeading: 'Profile update successful!!',
          });
        }
      }
    } else {
      const redirect = () => {
        store.dispatch({
          type: LOGIN,
        });
      };
      redirect();
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onProfileSave(e) {
    this.setState({
      formErrorFields: [],
    });
    const { updateUserProfile } = this.props;
    e.preventDefault();
    const {
      email, username, bio, website, city, country, phone,
      image, firstName, lastName,
    } = this.state;

    const userInfo = {
      first_name: firstName,
      last_name: lastName,
      email,
      image,
      username,
      bio,
      website,
      city,
      country,
      phone,
    };
    updateUserProfile(userInfo);
  }

  onAlertClick() {
    this.setState({
      showAlert: false,
    });
  }

  render() {
    const {
      variant, showAlert, alertHeading, alertBody,
    } = this.state;

    const errorChecker = (field, errorMessage) => {
      const { formErrorFields } = this.state;
      if (formErrorFields.includes(field)) {
        return errorMessage;
      }
      return '';
    };

    const {
      formErrorFields, imageUrl, username, bio, firstName,
      lastName, city, country, phone, email, website,
    } = this.state;
    return (
      <div className="content">
        <br />
        <AlertComponent
          showAlert={showAlert}
          onAlertClick={this.onAlertClick}
          alertBody={alertBody}
          alertHeading={alertHeading}
          variant={variant}
        />
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

                    <p className="description">Author</p>
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
                  <UserArticles />
                </CardFooter>
              </div>
            </Card>
          </Col>
          <Col md="6">
            <Card className="profile-form">
              <CardHeader>
                <h5 className="title">Edit Your Profile</h5>
              </CardHeader>
              <CardBody>
                <Form className="input-form" id="user-input-form">
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label id="username">
                          Username
                          {errorChecker('username', ': should be unique')}
                        </label>
                        <Input
                          className={formErrorFields.includes('username') ? 'red-border' : ''}
                          defaultValue={username}
                          placeholder="username"
                          type="text"
                          name="username"
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          defaultValue={firstName}
                          placeholder="First Name"
                          type="text"
                          name="firstName"
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Last Name</label>
                        <Input
                          placeholder="Last Name"
                          defaultValue={lastName}
                          name="lastName"
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>
                          Phone
                          {' '}
                          {errorChecker('phone', ': should be a valid phone number')}
                        </label>
                        <Input
                          className={formErrorFields.includes('phone') ? 'red-border' : ''}
                          defaultValue={phone}
                          placeholder="Phone Number"
                          type="phonenumber"
                          name="phone"
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>
                          Email
                          {errorChecker('email', ': should be unique and valid')}
                        </label>
                        <Input
                          name="email"
                          className={formErrorFields.includes('email') ? 'red-border' : ''}
                          defaultValue={email}
                          placeholder="Email"
                          type="email"
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>
                          Website
                          {errorChecker('website', ': should be in the right format')}
                        </label>
                        <Input
                          className={formErrorFields.includes('website') ? 'red-border' : ''}
                          defaultValue={website}
                          placeholder="Website URL"
                          name="website"
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue={city}
                          placeholder="City"
                          type="text"
                          name="city"
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="6">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          defaultValue={country}
                          placeholder="Country"
                          type="text"
                          name="country"
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                      <FormGroup>
                        <label>Bio</label>
                        <Input
                          defaultValue={country}
                          cols="80"
                          placeholder="A short story on your life"
                          rows="4"
                          type="textarea"
                          name="bio"
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>Profile Picture</label>
                        <Input
                          defaultValue={country}
                          placeholder="A short story on your life"
                          rows="4"
                          type="file"
                          name="image"
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
                <Button
                  className="btn-one"
                  color="primary"
                  type="submit"
                  onClick={this.onProfileSave}
                >
                  Save
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

UserProfileComponent.propTypes = {
  fetchUserProfile: PropTypes.func,
  profileData: PropTypes.shape.isRequired,
  profileUpdated: PropTypes.bool,
  updateUserProfile: PropTypes.func,
  error: PropTypes.bool,
  errors: PropTypes.shape,
  authenticated: PropTypes.bool,

};
UserProfileComponent.defaultProps = {
  fetchUserProfile: () => {},
  profileUpdated: false,
  updateUserProfile: () => {},
  error: false,
  errors: false,
  authenticated: true,

};

const mapStateToProps = state => ({
  profileData: state.profile.profileData,
  profileUpdated: state.profile.profileUpdated,
  errors: state.profile.errors,
  error: state.profile.error,
  authenticated: state.profile.authenticated,
});

export const mapDispatchToProps = dispatch => ({
  fetchUserProfile: () => {
    dispatch(fetchProfile());
  },
  updateUserProfile: (profileUpdateInfo) => {
    dispatch(updateProfile(profileUpdateInfo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileComponent);
