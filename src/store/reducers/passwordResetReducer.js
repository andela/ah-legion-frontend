import { IS_LOADING, REDIRECT } from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  redirect: false,
};

function passwordResetReducer(state = initialState, action) {
  if (action.type === IS_LOADING) {
    return Object.assign({}, state, action.payload);
  }
  if (action.type === REDIRECT) {
    return Object.assign({}, state, action.payload);
  }

  return state;
}

export default passwordResetReducer;
