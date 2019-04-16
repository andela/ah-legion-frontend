import { SHOW_ALERT } from '../actions/actionTypes';

const initialState = {
  showAlert: false,
  message: '',
};

function alertModalReducer(state = initialState, action) {
  if (action.type === SHOW_ALERT) {
    return Object.assign({}, state, action.payload);
  }
  return state;
}

export default alertModalReducer;
