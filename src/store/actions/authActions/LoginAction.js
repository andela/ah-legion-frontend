import axiosConfig from '../../../axiosConfig';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  IS_LOADING,
  LOGGED_IN,
} from '../actionTypes';
import ShowModal from '../changeFormAction';

const loginAction = loginData => dispatch => axiosConfig.request({
  method: 'post',
  url: '/user/login/',
  data: { user: loginData },
})
  .then((response) => {
    const {
      token, username, email, profile,
    } = response.data.user;
    const imageUrl = profile.image_url;
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('email', email);
    window.localStorage.setItem('username', username);
    window.localStorage.setItem('profileImage', imageUrl);
    dispatch(ShowModal({
      modalShow: false,
    }));
    dispatch({
      type: LOGIN_SUCCESS,
    });
    dispatch({
      type: LOGGED_IN,
    });
    dispatch({
      type: IS_LOADING,
      payload: { isLoading: false },
    });
  })
  .catch((error) => {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.errors.error,
    });
    dispatch({
      type: IS_LOADING,
      payload: { isLoading: false },
    });
  });

export default loginAction;
