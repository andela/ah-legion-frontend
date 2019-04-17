import axiosConfig from '../../axiosConfig';
import { SHOW_MODAL, SHOW_ALERT, IS_LOADING, LOGIN, INITIATE_RESET } from './actionTypes';

export function initiateReset(payload) {
  return dispatch => axiosConfig.request({
    method: 'post',
    data: payload,
    url: 'user/password-reset/',
  })
    .then((response) => {
      dispatch({
        type: SHOW_MODAL,
        payload: { modalShow: false },
      });
      dispatch({
        type: SHOW_ALERT,
        payload: { message: response.data.message, showAlert: true, colorClass: 'alert-success' },
      });
      dispatch({ type: IS_LOADING, payload: { isLoading: false } });
    });
}

export function passwordReset(payload) {
  return dispatch => axiosConfig.request({
    method: 'put',
    data: payload,
    url: 'user/password-reset/',
  })
    .then((response) => {
      let { message } = response.data;
      message = `${message} You can now sign in.`;
      dispatch({
        type: LOGIN,
      });
      dispatch({
        type: SHOW_ALERT,
        payload: { message, showAlert: true, colorClass: 'alert-success' },
      });
      dispatch({ type: IS_LOADING, payload: { isLoading: false } });
    })
    .catch((error) => {
      if (error.response.status === 404) {
        let { message } = error.response.data;
        message = `${message} Try again`;
        dispatch({
          type: INITIATE_RESET,
        });
        dispatch({
          type: SHOW_ALERT,
          payload: { message, showAlert: true, colorClass: 'alert-danger' },
        });
      }
      dispatch({ type: IS_LOADING, payload: { isLoading: false } });
    });
}
