import {
  SHOW_ALERT,
  DELETE_COMMENT,
} from '../actions/actionTypes';

const initialState = {
  showAlert: false,
  isDeleteComment: false,
  message: '',
  colorClass: '',
};

function alertModalReducer(state = initialState, action) {
  switch (action.type) {
    case (SHOW_ALERT):
      return Object.assign({}, state, action.payload);
    case (DELETE_COMMENT):
      return ({
        ...state,
        deleteData: action.payload,
        isDeleteComment: true,
        colorClass: 'alert-danger',
        showAlert: true,
      });
    default:
      break;
  }
  return state;
}

export default alertModalReducer;
