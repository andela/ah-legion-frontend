import { LOGIN_SUCCESS, LOGIN_FAIL, IS_LOADING } from '../actions/actionTypes';
import { isLoggedIn } from '../../utils/tokenValidator';

const initialState = {
  loggedIn: !!isLoggedIn,
  errors: '',
  isLoading: false,
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
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    default:
      return state;
  }
};

export default loginReducer;
