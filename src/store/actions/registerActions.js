import { SHOW_ERRORS, SHOW_ALERT, SHOW_MODAL, IS_LOADING } from './actionTypes';
import axiosConfig from '../../axiosConfig';


export function showErrors(payload) {
  return { type: SHOW_ERRORS, payload };
}

export function registerUser(payload) {
  return dispatch => axiosConfig.request({
    method: 'post',
    data: payload,
    url: 'user/register/',
  })
    .then((response) => {
      dispatch({
        type: SHOW_MODAL,
        payload: { modalShow: false },
      });
      dispatch({
        type: SHOW_ALERT,
        payload: { message: response.data.user.message, showAlert: true },
      });
      dispatch({ type: IS_LOADING, payload: { isLoading: false } });
      dispatch(showErrors({}));
    })
    .catch((e) => {
      const requestErrors = e.response.data.errors;
      const errors = {};
      Object.keys(requestErrors).map((key) => {
        const [errorMsg] = requestErrors[key];
        errors[key] = errorMsg;
        return errors;
      });
      dispatch({ type: IS_LOADING, payload: { isLoading: false } });
      dispatch(showErrors(errors));
    });
}
