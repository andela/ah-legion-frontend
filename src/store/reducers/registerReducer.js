import { SHOW_ERRORS, IS_LOADING } from '../actions/actionTypes';

const initialState = {
  errors: {},
  isLoading: false,
};

function registerReducer(state = initialState, action) {
  if (action.type === SHOW_ERRORS) {
    return Object.assign({}, state, {
      errors: action.payload,
    });
  }
  if (action.type === IS_LOADING) {
    return Object.assign({}, state, action.payload);
  }

  return state;
}

export default registerReducer;
