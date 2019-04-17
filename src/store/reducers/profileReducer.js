import {
  PROFILE_FETCHED,
  PROFILE_UPDATE_SUCESSFUL,
  PROFILE_UPDATE_FAILED,
  AUTHENTICATION_FAILED,
  PROFILE_FETCH_FAILED,
} from '../actions/actionTypes';

const initialState = {
  profileData: {},
  profileUpdated: false,
  errors: [],
  error: false,
  authenticated: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_FETCHED:
      return {
        ...state,
        profileData: action.payload,

      };
    case PROFILE_FETCH_FAILED:
      return {
        ...state,
        errors: action.payload,

      };
    case PROFILE_UPDATE_SUCESSFUL:
      return {
        ...state,
        profileData: action.payload,
        profileUpdated: true,
        authenticated: true,
        error: false,
      };
    case PROFILE_UPDATE_FAILED:
      return {
        ...state,
        errors: action.payload,
        error: true,
      };
    case AUTHENTICATION_FAILED:
      return {
        ...state,
        errors: action.payload,
        authenticated: false,
      };

    default:
      return state;
  }
};
