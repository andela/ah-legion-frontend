import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { followAuthor, unfollowAuthor } from '../../store/actions/profileActions';


export function FollowUnfollow(props) {
  const { profile } = props;
  const { following, username } = profile;
  const buttonLabel = following ? 'Unfollow' : 'Follow';
  const onFollowUnfollowClick = (e) => {
    e.preventDefault();
    if (buttonLabel === 'Follow') {
      props.followAuthor(username);
    } else {
      props.unfollowAuthor(username);
    }
  };
  return (
    <div>
      <Button type="submit" className="btn-one" onClick={onFollowUnfollowClick}>
        {buttonLabel}
      </Button>
    </div>
  );
}

FollowUnfollow.propTypes = {
  followAuthor: PropTypes.func,
  unfollowAuthor: PropTypes.func,
  profile: PropTypes.shape,
};

FollowUnfollow.defaultProps = {
  followAuthor: () => {},
  unfollowAuthor: () => {},
  profile: {},
};

export const mapDispatchToProps = dispatch => ({
  followAuthor: (username) => {
    dispatch(followAuthor(username));
  },
  unfollowAuthor: (username) => {
    dispatch(unfollowAuthor(username));
  },
});

export default connect(null, mapDispatchToProps)(FollowUnfollow);
