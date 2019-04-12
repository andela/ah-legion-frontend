import { SHOW_MODAL } from './actionTypes';

function ShowModal(payload) {
  return {
    type: SHOW_MODAL,
    payload,
  };
}

export default ShowModal;
