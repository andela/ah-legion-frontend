import { SHOW_MODAL, REGISTER, LOGIN } from '../actions/actionTypes';

const initialState = {
  isRegister: false,
  modalShow: false,
};

const registerPayload = {
  isRegister: true,
  modalShow: true,
};

const loginPayload = {
  isRegister: false,
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
    default:
      break;
  }

  return state;
}

export default modalReducer;
