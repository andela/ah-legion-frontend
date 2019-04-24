import firebase from 'firebase';
import { LOGIN_SUCCESS, SOCIAL_LOGIN_FAIL } from '../actionTypes';
import ShowModal from '../changeFormAction';
import axiosConfig from '../../../axiosConfig';

export const createLoginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const createLoginFailure = provider => ({
  type: SOCIAL_LOGIN_FAIL,
  provider,
});

export const socialLoginAction = (accessToken, authProvider, accessTokenSecret = '') => (dispatch) => {
  let provider = authProvider;
  // google provider is named differently in our backend.
  if (authProvider === 'google') {
    provider = 'google-oauth2';
  }

  const authData = {
    access_token: accessToken,
    access_token_secret: accessTokenSecret,
    provider,
  };

  return axiosConfig.request({
    method: 'post',
    data: authData,
    url: 'user/oauth/',
  })
    .then((res) => {
      localStorage.setItem('token', res.data.user.token);
      dispatch(createLoginSuccess());
      dispatch(ShowModal({ modalShow: false }));
    })
    .catch(() => {
      dispatch(createLoginFailure(authProvider));
    });
};

export const googleLoginAction = () => (dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const token = result.credential.accessToken;
      dispatch(socialLoginAction(token, 'google'));
    }).catch(() => {
      dispatch(createLoginFailure('google'));
    });
};

export const twitterLoginAction = () => (dispatch) => {
  const provider = new firebase.auth.TwitterAuthProvider();
  return firebase.auth().signInWithPopup(provider).then((result) => {
    const token = result.credential.accessToken;
    const { secret } = result.credential;
    dispatch(socialLoginAction(token, 'twitter', secret));
  }).catch(() => {
    dispatch(createLoginFailure('twitter'));
  });
};

export const facebookLoginAction = () => (dispatch) => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const token = result.credential.accessToken;
      dispatch(socialLoginAction(token, 'facebook'));
    })
    .catch(() => {
      dispatch(createLoginFailure('facebook'));
    });
};
