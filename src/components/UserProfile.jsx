import React, { Component } from 'react';
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
  Col
} from "reactstrap";

class UserProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      username: "",
      first_name: "",
      last_name: "",
      bio: "",
      website: "",
      city: "",
      phone: null,
      country: ""
    }

    this.onProfileSave = this.onProfileSave.bind(this);
  }
  componentDidMount(){
    this.props.fetchProfile()
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  const response = nextProps.profile_data
  if(response.user){
    if(response.user.detail){
    console.log("your session has expired, log in again")
    this.props.history.push('/login')}
    else{
      const email = nextProps.profile_data.user.email
      const { username, first_name, last_name, bio,website, city, phone, country } = nextProps.profile_data.user.profile
      this.setState({
          username:username,
          first_name:first_name,
          last_name:last_name,
          bio:bio,
          website:website,
          city:city,
          phone:phone,
          country:country,
          email:email
      })
    }
  }
  else
  {
    console.log(response.error)
  }
  
  }
  onChange = (e) => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  onProfileSave(e){
    e.preventDefault();
    console.log(this.state)
    this.props.updateProfile(this.state)
  }
  render() {
    return (
      <div className="content">
      <br/>
          <Row>
            <Col md="7">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Your Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form className="input-form">
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            defaultValue= {this.state.username}
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
                            defaultValue={this.state.first_name}
                            placeholder="First Name"
                            type="text"
                            name="first_name"
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Last Name
                          </label>
                          <Input 
                          placeholder="Last Name"
                          defaultValue={this.state.last_name}
                          name="last_name"
                          onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Phone</label>
                          <Input
                            defaultValue={this.state.number}
                            placeholder="Phone Number"
                            type="phonenumber"
                            name="phone"
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            defaultValue={this.state.email}
                            placeholder="Email"
                            type="email"
                            name="email"
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Website</label>
                          <Input
                            defaultValue={this.state.website}
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
                            defaultValue={this.state.city}
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
                            defaultValue={this.state.country}
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
                            defaultValue={this.state.bio}
                            cols="80"
                            placeholder="A short story on your life"
                            rows="4"
                            type="textarea"
                            name="bio"
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={this.onProfileSave}>
                    Save 
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="5">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require('../assets/img/alien.jpg')}
                      />
                      <h5 className="title">{this.state.username}</h5>
                    </a>
                    <p className="description">Author</p>
                  </div>
                  <div className="card-description">
                    {this.state.bio}
                  </div>
                </CardBody>
                <CardFooter className="card-footer">
                <hr />
                  <div className="stats-container">
                  <Row>
                    <Col xs={6} sm={6} md={6} lg={3} className="ml-auto">
                      <h5>
                        12
                        <br/>
                        <small>Articles</small>
                      </h5>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={4} className="mr-auto ml-auto">
                      <h5>
                        20
                        <br/>
                        <small>Followers</small>
                      </h5>
                    </Col>
                    <Col lg={3} className="mr-auto">
                      <h5>
                        24
                        <br/>
                        <small>Following</small>
                      </h5>
                    </Col>
                  </Row>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          
        </div>
    )
  }
}

export default UserProfile