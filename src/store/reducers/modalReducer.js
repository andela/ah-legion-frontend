import { SHOW_MODAL, REGISTER, LOGIN, INITIATE_RESET, PASSWORD_RESET, EDIT_COMMENT } from '../actions/actionTypes';

const initialState = {
  component: '',
  modalShow: false,
};

const registerPayload = {
  component: 'register',
  modalShow: true,
};

const loginPayload = {
  component: 'login',
  modalShow: true,
};

const intiateResetPayload = {
  component: 'initiate-reset',
  modalShow: true,
};

const passwordResetPayload = {
  component: 'password-reset',
  modalShow: true,
};

function modalReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case (SHOW_MODAL):
      return Object.assign({}, state, payload);
    case (REGISTER):
      return Object.assign({}, state, registerPayload);
    case (LOGIN):
      return Object.assign({}, state, loginPayload);
    case (INITIATE_RESET):
      return Object.assign({}, state, intiateResetPayload);
    case (PASSWORD_RESET):
      return Object.assign({}, state, passwordResetPayload);
    case (EDIT_COMMENT):
      return ({
        ...state,
        editData: action.payload,
        component: 'edit-comment',
        modalShow: true,
      });
    default:
      return state;
  }
}

export default modalReducer;
