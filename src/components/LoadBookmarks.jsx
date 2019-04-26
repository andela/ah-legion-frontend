import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { getUserBookmarks } from '../store/actions/bookmarkActions';


class ConnectedLoadBookmarks extends React.Component {
  render() {
    const { GetUserBookmarks } = this.props;
    GetUserBookmarks();
    return '';
  }
}

ConnectedLoadBookmarks.propTypes = {
  GetUserBookmarks: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    GetUserBookmarks: () => dispatch(getUserBookmarks()),
  };
}

const LoadBookmarks = connect(null, mapDispatchToProps)(ConnectedLoadBookmarks);

export default LoadBookmarks;
