import { connect } from 'react-redux';
import UserProfile from '../components/UserProfile';
import { fetchProfile, updateProfile } from '../actions/profile_actions';

const  mapStateToProps = state => ({
    profile_data: state.profile.profile_data
});

const mapDispatchToProps = (dispatch) => {
    return {
      fetchProfile: () => {
        dispatch(fetchProfile())
      },
      updateProfile: (profile_update_info) => {
          dispatch(updateProfile(profile_update_info))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)

