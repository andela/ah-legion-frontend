import { LOGIN_SUCCESS, LOGIN_FAIL, IS_LOADING } from '../actions/actionTypes';
import { isLoggedIn } from '../../utils/tokenValidator';

const initialState = {
  logged_in: !!isLoggedIn,
  errors: '',
  isLoading: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        logged_in: true,
        errors: '',
      };
    case LOGIN_FAIL:
      return {
        ...state,
        logged_in: false,
        errors: action.payload,
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
