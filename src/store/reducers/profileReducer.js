import {
  PROFILE_FETCHED,
  PROFILE_UPDATE_SUCESSFUL,
  PROFILE_UPDATE_FAILED,
  AUTHENTICATION_FAILED,
  PROFILE_FETCH_FAILED,
  FOLLOW_AUTHOR_SUCCESSFUL,
  UNFOLLOW_AUTHOR_SUCCESSFUL,
  FOLLOW_AUTHOR_FAILED,
  UNFOLLOW_AUTHOR_FAILED,
  AUTHOR_PROFILE_FETCHED_SUCCESSFUL,
  AUTHOR_PROFILE_FETCH_FAILED,
  ALL_AUTHOR_PROFILES_FETCHED_SUCCESSFUL,
  ALL_AUTHOR_PROFILES_FETCH_FAILED,
} from '../actions/actionTypes';

const initialState = {
  profileData: {},
  profileUpdated: false,
  errors: [],
  error: false,
  authenticated: true,
  followStats: {},
  authorProfile: {},
  allAuthorProfiles: {},
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
    case FOLLOW_AUTHOR_SUCCESSFUL:
      return {
        ...state,
        authorProfile: { profile: action.payload.profile.user_of_interest },
      };

    case FOLLOW_AUTHOR_FAILED:
      return {
        ...state,
        errors: action.payload,
      };

    case UNFOLLOW_AUTHOR_SUCCESSFUL:
      return {
        ...state,
        authorProfile: { profile: action.payload.profile.user_of_interest },
      };

    case UNFOLLOW_AUTHOR_FAILED:
      return {
        ...state,
        errors: action.payload,
      };
    case AUTHOR_PROFILE_FETCHED_SUCCESSFUL:
      return {
        ...state,
        authorProfile: action.payload,
      };

    case AUTHOR_PROFILE_FETCH_FAILED:
      return {
        ...state,
        errors: action.payload,
      };

    case ALL_AUTHOR_PROFILES_FETCHED_SUCCESSFUL:
      return {
        ...state,
        allAuthorProfiles: action.payload,
      };

    case ALL_AUTHOR_PROFILES_FETCH_FAILED:
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
};
