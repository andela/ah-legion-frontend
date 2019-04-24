import { IS_LOADING, SET_TOKEN } from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  token: '',
};

function passwordResetReducer(state = initialState, action) {
  if (action.type === IS_LOADING) {
    return Object.assign({}, state, action.payload);
  }
  if (action.type === SET_TOKEN) {
    return Object.assign({}, state, action.payload);
  }

  return state;
}

export default passwordResetReducer;
