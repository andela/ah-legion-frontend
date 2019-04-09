import { LOGIN_SUCCESS, LOGIN_FAIL, SOCIAL_LOGIN_FAIL, IS_LOADING, LOGOUT } from '../actions/actionTypes';
import { isLoggedIn } from '../../utils/tokenValidator';

const initialState = {
  loggedIn: !!isLoggedIn,
  errors: '',
  isLoading: false,
  socialLoginError: false,
  provider: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        errors: '',
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false,
        errors: action.payload,
      };
    case SOCIAL_LOGIN_FAIL:
      return {
        ...state,
        logged_in: false,
        provider: action.provider,
        socialLoginError: true,
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
